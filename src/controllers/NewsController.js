const axios = require("axios");

// Use your actual API Key
const NEWS_API_KEY = "b81568e97ccf428fa1872b5be1ffd28e";

// In-memory storage for demonstration
// Replace with a real DB in production
let fakeDB = [];

/**
 * Sort the articles by date (descending).
 */
function sortByDateDescending(arr) {
    return [...arr].sort((a, b) => new Date(b.date) - new Date(a.date));
}

/**
 * Utility: get the newest article in our local DB.
 */
function getLatestNews() {
    if (fakeDB.length === 0) return null;
    const sorted = sortByDateDescending(fakeDB);
    return sorted[0];
}

/**
 * Utility: clean up old data in fakeDB.
 * Example: keep only the newest 100 articles.
 */
function cleanupFakeDB() {
    const sorted = sortByDateDescending(fakeDB);
    const kept = sorted.slice(0, 100);
    fakeDB = kept;
}

/**
 * Utility: fetch fresh news about "health" from NewsAPI.org
 * and store them in local fakeDB.
 */
async function fetchAndStoreNews() {
    const url = "https://newsapi.org/v2/top-headlines";
    const params = {
        apiKey: NEWS_API_KEY,
        country: "us",
        category: "health",  // only fetch health-related articles
        pageSize: 50         // fetch up to 50 articles
    };

    const response = await axios.get(url, { params });
    const articles = response.data.articles || [];

    const newData = articles.map((item, index) => ({
        id: `${Date.now()}-${index}`,
        author: item.author || "Unknown",
        content: item.description || "No content",
        date: item.publishedAt || new Date().toISOString(),
        title: item.title || "",
        sourceName: item.source?.name || ""
    }));

    // Merge new data into fakeDB
    fakeDB.push(...newData);

    // Clean up old data (keep only the newest 100)
    cleanupFakeDB();

    return newData;
}

exports.checkNewsStatus = (req, res) => {
    try {
        // 1. Get the newest article in local DB
        const latest = getLatestNews();
        if (!latest) {
            return res.status(500).json({ message: "No news found in local DB." });
        }

        // 2. We expect a date in the request body
        const clientDateString = req.body.date;
        if (!clientDateString) {
            return res.status(400).json({ message: "Missing date in request body." });
        }

        const clientDate = new Date(clientDateString);
        const latestDate = new Date(latest.date);

        // 3. Compare difference with 1 week (in ms)
        const msInOneWeek = 7 * 24 * 60 * 60 * 1000;
        const diff = latestDate.getTime() - clientDate.getTime();

        // If the newest news is older than client date by >= 1 week => 304
        // Else => 200
        if (diff >= msInOneWeek) {
            return res.status(304).json({
                message: "News Not Modified (more than one week old)",
            });
        } else {
            return res.status(200).json({
                message: "News OK (under one week).",
            });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.refreshNews = async (req, res) => {
    try {
        // 1. Fetch fresh data from NewsAPI and store in fakeDB
        const newData = await fetchAndStoreNews();

        // 2. Return response
        return res.status(200).json({
            message: "Health news successfully refreshed",
            fetchedCount: newData.length,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.getNewsList = (req, res) => {
    try {
        // 1. Sort news by date descending
        const sorted = sortByDateDescending(fakeDB);

        // 2. Return the newest 30 (or fewer if not enough data)
        const data = sorted.slice(0, 30);

        return res.status(200).json({
            message: "Retrieved health news list successfully",
            count: data.length,
            data,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
