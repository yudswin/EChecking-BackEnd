const Student = require('../models/StudentModel')
const StudentService = require('../services/StudentService')
const JwtService = require('../services/JwtService')


const createStudent = async (req, res) => {
    try {
        const { firstName, lastName, studentID, phone, password, confirmPassword, email} = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        if (!email || !password || !confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is email'
            })
        } else if (password !== confirmPassword) {
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

const loginStudent = async (req, res) =>{
    try{
        const { studentID, password } = req.body
     //   console.log(req.body)
        if (!password) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        } else if (!studentID) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is ID'
            })
        }

        const response = await StudentService.loginStudent(req.body)
        return res.status(200).json(response)
    }catch(error){
        return res.status(404).json({
            mgs: error
        })
    }
} 


const updateStudent = async (req, res) =>{
    try{
        const StudentId = req.params.id
        const data = req.body
        if(!StudentId){
            return res.status(200).json({
                status: "ERROR",
                msg: "The studentID is required"
            })
        }

        const response = await StudentService.updateStudent(StudentId, data)
        return res.status(200).json(response)
    }catch(error){
        return res.status(404).json({
            mgs: error
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

const getDetails = async (req, res) => {
    try {
        const studentId = req.params.id
        if (!studentId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The studentId is required'
            })
        }
        const response = await StudentService.getDetails(studentId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllStudents = async (req, res) => {
    try {
        const response = await StudentService.getAllStudents()
        return res.status(200).json(response)
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
    logoutStudent,
    getDetails,
    getAllStudents
}
