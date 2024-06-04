const RecordService = require('../services/RecordService')

const createRecord = async (req, res) => {
    try {
        const { studentID } = req.body;
        const sessionID = req.params.sessionId;
        
        if (!sessionID) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The session ID is required'
            });
        }

        if (!studentID) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The name is required'
            });
        }
        const response = await RecordService.createRecord(sessionID, req.body, req.files);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}

const getAllRecord = async (req, res) => {
    try {
        const sessionID = req.params.sessionId;

        if (!sessionID) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The session ID is required'
            });
        }

        const response = await RecordService.getAllRecord(sessionID);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    
    }
}

const createNormal = async (req, res) => {
    try {
        const { studentID } = req.body;
        const sessionID = req.params.sessionId;
        
        if (!studentID) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The name is required'
            });
        }
        const response = await RecordService.createNormal(sessionID, req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
};



module.exports = {
    createRecord,
    getAllRecord,
    createNormal
}