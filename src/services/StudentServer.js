const User = require("../models/StudentModel")
const bcrypt = require("bcrypt")
const { genneralAccessToken, genneralRefreshToken } = require("./JwtService")

const loginStudent = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { id, password } = userLogin
        try {
            const checkUser = await User.findOne({
                _id: id
            })
            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
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
            const checkUser = await User.findOne({
                _id: id
            })
            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }

            const updatedUser = await User.findByIdAndUpdate(id, data, { new: true })
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
    loginStudent,
    updateStudent
};