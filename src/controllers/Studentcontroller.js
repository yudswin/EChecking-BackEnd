const StudentService = require('../services/StudentService')
const JwtService = require('../services/JwtService')

const loginStudent = async (req, res) => {
    try {
        const { studentID, password } = req.body
        if (!studentID || !password) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        } 
        const response = await UserService.loginStudent(req.body)
        const { refresh_token, ...newReponse } = response
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            path: '/',
        })
        return res.status(200).json({...newReponse, refresh_token})
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const updateStudent = async (req, res) => {
    try {
        const studentID = req.params.id
        const data = req.body
        if (!studentID) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The studentID is required'
            })
        }        
        const response = await StudentService.updateStudent(studentID, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const logoutStudent = async (req, res) => {
    try {
        res.clearCookie('refresh_token')
        return res.status(200).json({
            status: 'OK',
            message: 'Logout successfully'
        })
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
module.exports = {
    loginStudent,
    updateStudent,
    logoutStudent
}
