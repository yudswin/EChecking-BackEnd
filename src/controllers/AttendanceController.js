const AttendanceService = require('../services/AttendanceService')

const createAttentdance = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        if (!courseId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The courseId is required'
            })
        }
        const type  = req.body;
        if (!type) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Type is required'
            });
        } 
        const response = await AttendanceService.createAttentdance(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
}

const getAllAttendance = async (req, res) => {
    try {
        const courseId = req.params.courseId
        if (!courseId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The courseId is required'
            })
        }
        const response = await AttendanceService.getAllAttendance(courseId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetails = async (req, res) => {
    try {
        const sessionId = req.params.sessionId
        if (!sessionId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The sessionId is required'
            })
        }
        const response = await AttendanceService.getDetails(sessionId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateAttendance = async (req, res) => {
    try {
        const sessionId = req.params.sessionId
        if (!sessionId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The sessionId is required'
            })
        }
        
        const data = req.body
        if (!data) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The data is required'
            })
        }
        const response = await AttendanceService.updateAttendance(sessionId, req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const resetCode = async (req, res) => {
    try {
        const sessionId = req.params.sessionId
        if (!sessionId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The sessionId is required'
            })
        }
        const response = await AttendanceService.resetCode(sessionId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createAttentdance,
    getAllAttendance,
    getDetails,
    updateAttendance,
    resetCode
}