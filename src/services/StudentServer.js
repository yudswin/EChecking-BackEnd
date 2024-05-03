const Student = require("../models/StudentModel")
const bcrypt = require("bcrypt")
const { genneralAccessToken, genneralRefreshToken } = require("./JwtService")

const createStudent = (newStudent) => {
    return new Promise(async (resolve, reject) => {
        const {  firstName, lastName, studentID, phone, studentPassword, email } = newStudent
        try {
            const checkStudent = await Student.findOne({
                email: email
            })
            if (checkStudent !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The email is already'
                })
            }
           const hash = bcrypt.hashSync(studentPassword, 10)
        //   console.log(hash)
            const createdStudent = await Student.create({
                firstName,
                lastName,
                lecturerID,
                phone,
                studentPassword : hash,
                email
                
                
            })       
            if (createdStudent) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdStudent
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
const loginStudent = (studentLogin) => {
    return new Promise(async (resolve, reject) => {
        const { studentID, password } = studentLogin
        try {
            const checkUser = await Student.findOne({
                studentID: studentID
            })
            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'The student is not defined'
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password)

            if (!comparePassword) {
                resolve({
                    status: 'ERR',
                    message: 'The password or user is incorrect'
                })
            }
            const access_token = await genneralAccessToken({
                id: checkUser.id,
            })

            const refresh_token = await genneralRefreshToken({
                id: checkUser.id,
            })

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                access_token,
                refresh_token
            })
        } catch (e) {
            reject(e)
        }
    })
}
const updateStudent = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await Student.findOne({
                _id: id
            })
            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'The student is not defined'
                })
            }

            const updatedStudent = await Student.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updateStudent
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createStudent,
    loginStudent,
    updateStudent
};
