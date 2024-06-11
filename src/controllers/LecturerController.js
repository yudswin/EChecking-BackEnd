const Lecturer = require('../models/LecturerModel')
const LecturerService = require('../services/LecturerService')
const JwtService = require('../services/JwtService')


const createLecturer = async (req, res) => {
    try {
        const { firstName, lastName, lecturerID, phone, lecturerPassword, confirmPassword, email, courses } = req.body
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
        const { lecturerID, lecturerPassword } = req.body
     //   console.log(req.body)
        if (!lecturerPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        } else if (!lecturerID) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is ID'
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


const refreshToken = async (req, res) =>{
    try{
        const refreshToken = req.headers.token.split(' ')[1]       // create Beare in Headers of Postman  (put the refresh token to headers  => verify refresh token => ))
        if(!refreshToken){
            return res.status(200).json({
                status: "ERROR",
                msg: "The refresh token is required"
            })
        }

        const response = await JwtService.refreshTokenJwtService(refreshToken, 'lecturer')
        return res.status(200).json(response)
    }catch(error){
        return res.status(404).json({
            mgs: error
        })
    }
} 


const logoutLecturer = async (req, res) => {
    try {
        res.clearCookie('refreshToken')
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
        const LecturerId = req.params.id
        if (!LecturerId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The LecturerId is required'
            })
        }
        const response = await LecturerService.getDetails(LecturerId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


module.exports = {
    createLecturer, 
    loginLecturer, 
    updateLecturer,
    refreshToken,
    logoutLecturer,
    getDetails

}
