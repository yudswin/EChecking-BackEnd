const Lecturer = require("../models/LecturerModel")
const User = require("../models/StudentModel.js")
const bcrypt = require("bcrypt")
const { generalAccessToken, generalRefreshToken } = require("./JwtService.js")




const createLecturer = (newLecturer) => {
    return new Promise(async (resolve, reject) => {
        const { firstName, lastName, lecturerID, phone, lecturerPassword, email, courses } = newLecturer
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
                firstName,
                lastName,
                lecturerID,
                phone,
                lecturerPassword: hash,
                email


            })
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
        const { lecturerID, lecturerPassword } = LecturerLogin
        //   console.log(LecturerLogin)
        try {
            const checkLecturer = await Lecturer.findOne({
                lecturerID: lecturerID
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
                    message: "Password or lecturer is incorrect",
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
                message: "SIGN-IN SUCCESS",
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
                _id: id
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

const getDetails = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkLecturer = await Lecturer.findOne({
                _id: id
            })

            if (checkLecturer === null) {
                resolve({
                    status: "Error",
                    mgs: "The lecturer is not defined"
                })
            }
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: checkLecturer
            })

        } catch (e) {
            reject(e);
        }
    })
}



module.exports = {
    createLecturer,
    loginLecturer,
    updateLecturer,
    getDetails
};