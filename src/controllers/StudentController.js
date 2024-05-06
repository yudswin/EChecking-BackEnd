const StudentService = require('../services/StudentService')
const JwtService = require('../services/JwtService')

const createStudent = async (req, res) => {
    try {
        const { firstName, lastName, studentID, phone, studentPassword, confirmPassword, email } = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        if (!email || !studentPassword || !confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is email'
            })
        } else if (studentPassword !== confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The password is equal confirmPassword'
            })
        }
    //    console.log(req.body)
        const response = await StudentService.createStudent(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const refreshToken = async (req, res) =>{
    try{
        const refresh_token = req.headers.token.split(' ')[1]       // create Beare in Headers of Postman  (put the refresh token to headers  => verify refresh token => ))
        if(!refresh_token){
            return res.status(200).json({
                status: "ERROR",
                msg: "The refresh token is required"
            })
        }

        const response = await JwtService.refreshTokenJwtService(refresh_token)
        return res.status(200).json(response)
    }catch(error){
        return res.status(404).json({
            mgs: error
        })
    }
} 
const loginStudent = async (req, res) => {
    try {
        const { studentID, password } = req.body
        if (!studentID || !password) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        } 
        const response = await StudentService.loginStudent(req.body)
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
    createStudent,
    loginStudent,
    updateStudent,
    refreshToken,
    logoutStudent
}
