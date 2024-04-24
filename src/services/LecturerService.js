const Lecturer = require("../models/LecturerModel")
const bcrypt = require("bcrypt")
const { generalAccessToken, generalRefreshToken } = require("./JwtService.js")



const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { studentName, studentPassword, confirmPassword, email, age, studentID, dePartment, birthDate, phone } = newUser
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The email is already'
                })
            }
            const hash = bcrypt.hashSync(studentPassword, 10)
            //       console.log(hash)
            const createdUser = await User.create({
                studentName,
                studentPassword: hash,
                email,
                age,
                studentID,
                dePartment,
                birthDate,
                phone
            })
            // console.log(createdUser)
            if (createdUser) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdUser
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}


const createLecturer = (newLecturer) => {
    return new Promise(async (resolve, reject) => {
        const { lecturerName, lecturerPassword, confirmPassword, email, phone, birthday, gender, department } = newLecturer
        try {
            const checkLecturer = await Lecturer.findOne({
                email: email
            })
            if (checkLecturer !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The email is already'
                })
            }
            const hash = bcrypt.hashSync(lecturerPassword, 10)
            //   console.log(hash)
            const createdLecturer = await Lecturer.create({
                lecturerName,
                lecturerPassword: hash,
                email,
                phone,
                birthday,
                gender,
                department
            })
            // console.log(createdUser)
            if (createdLecturer) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdLecturer
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}


const loginLecturer = (LecturerLogin) => {
    return new Promise(async (resolve, reject) => {
        const { email, lecturerPassword } = LecturerLogin
        //   console.log(LecturerLogin)
        try {
            const checkLecturer = await Lecturer.findOne({ // checkUser = User logged in 
                email: email
            })
            if (checkLecturer === null) { // check if the email has been existed 
                resolve({
                    status: "Error",
                    message: "The lecturer is not defined",
                })
            }
            const comparePassword = bcrypt.compareSync(lecturerPassword, checkLecturer.lecturerPassword)
            //    console.log(comparePassword)

            if (!comparePassword) {
                resolve({
                    status: "Error",
                    message: "Password or user is incorrect",
                })
            }
            const access_token = await generalAccessToken({
                id: checkLecturer.id,
            })

            const refresh_token = await generalRefreshToken({ // when access token is expired => provide the new access_token
                id: checkLecturer.id,
            })

            //    console.log(access_token)
            resolve({
                status: "OK",
                message: "SUCCESS",
                access_token,
                refresh_token,
            })

        } catch (e) {
            reject(e);
        }
    })
}

const updateLecturer = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkLecturer = await Lecturer.findOne({
                _id: id  // find user based on id
            })

            if (checkLecturer === null) {
                resolve({
                    status: "Error",
                    mgs: "The lecturer is not defined"
                })
            }

            const updatedLecturer = await Lecturer.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: updatedLecturer
            })

        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createUser,
    createLecturer,
    loginLecturer,
    updateLecturer
};