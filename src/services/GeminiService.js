const { GoogleGenerativeAI } = require("@google/generative-ai");

const generateSummary = async (text) => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-002" });

    return new Promise(async (resolve, reject) => {
        try {
            const response = await model.generateContent(text);
            if (response) {
                const text = response.response.candidates[0].content.parts.map(part => part.text).join(' ').trim();
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: text
                });
            } else {
                reject(new Error('No response from model'));
            }
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    generateSummary
};