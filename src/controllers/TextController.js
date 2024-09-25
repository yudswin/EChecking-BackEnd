const GeminiService = require('../services/GeminiService');

const summarizeText = async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({
            status: 'ERROR',
            message: 'Text is required'
        });
    }
    try {
        const response = await GeminiService.generateSummary(text);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            status: "ERROR",
            message: error.message || 'Failed to generate summary'
        });
    }
};

module.exports = {
    summarizeText
};