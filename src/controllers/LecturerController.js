const Lecturer = require('../models/LecturerModel')
const LecturerService = require('../services/LecturerService')
// const JwtService = require('../services/JwtService')

const createUser = async (req, res) => {
    try {
        const { studentName, studentPassword, confirmPassword, email, age, studentID, dePartment, birthDate, phone } = req.body
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
        const response = await LecturerService.createUser(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const createLecturer = async (req, res) => {
    try {
        const { lecturerName, lecturerPassword, confirmPassword, email, phone, birthday, gender, department } = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        if (!email || !lecturerPassword || !confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is email'
            })
        } else if (lecturerPassword !== confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The password is equal confirmPassword'
            })
        }
    //    console.log(req.body)
        const response = await LecturerService.createLecturer(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const loginLecturer = async (req, res) =>{
    try{
        const { email, lecturerPassword } = req.body
     //   console.log(req.body)
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        if (!email || !lecturerPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is email'
            })
        }

        const response = await LecturerService.loginLecturer(req.body)
        return res.status(200).json(response)
    }catch(error){
        return res.status(404).json({
            mgs: error
        })
    }
} 


const updateLecturer = async (req, res) =>{
    try{
        const LecturerId = req.params.id
        const data = req.body
        if(!LecturerId){
            return res.status(200).json({
                status: "ERROR",
                msg: "The LecturerId is required"
            })
        }

        const response = await LecturerService.updateLecturer(LecturerId, data)
        return res.status(200).json(response)
    }catch(error){
        return res.status(404).json({
            mgs: error
        })
    }
} 

module.exports = {
    createUser, 
    createLecturer, 
    loginLecturer, 
    updateLecturer
}
