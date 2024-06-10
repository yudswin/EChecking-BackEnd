const Student = require("../models/StudentModel")
const nodemailer = require("nodemailer");
const OTP = require("../models/OTPModel")
// const User = require("../models/StudentModel.js")
const bcrypt = require("bcrypt")
const { generalAccessToken, generalRefreshToken } = require("./JwtService.js")




const createStudent = (newStudent) => {
    return new Promise(async (resolve, reject) => {
        const { firstName, lastName, studentID, phone, password, email } = newStudent
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
            const hash = bcrypt.hashSync(password, 10)
            //   console.log(hash)
            const createdStudent = await Student.create({
                firstName,
                lastName,
                studentID,
                phone,
                password: hash,
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


const loginStudent = (StudentLogin) => {
    return new Promise(async (resolve, reject) => {
        const { studentID, password } = StudentLogin
        //   console.login
        try {
            const checkStudent = await Student.findOne({
                studentID: studentID
            })
            if (checkStudent === null) {
                resolve({
                    status: "Error",
                    message: "The student is not defined",
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkStudent.password)
            //    console.log(comparePassword)

            if (!comparePassword) {
                resolve({
                    status: "Error",
                    message: "Password or student is incorrect",
                })
            }
            const accessToken = await generalAccessToken({
                id: checkStudent.id,
            })

            const refreshToken = await generalRefreshToken({ // when access token is expired => provide the new access_token
                id: checkStudent.id,
            })

            //    console.log(access_token)
            resolve({
                status: "OK",
                message: "SIGN-IN SUCCESS",
                accessToken,
                refreshToken,
            })

        } catch (e) {
            reject(e);
        }
    })
}

const updateStudent = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkStudent = await Student.findOne({
                _id: id
            })

            if (checkStudent === null) {
                resolve({
                    status: "Error",
                    mgs: "The student is not defined"
                })
            }

            const updatedStudent = await Student.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: updatedStudent
            })

        } catch (e) {
            reject(e);
        }
    })
}

const getDetails = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkStudent = await Student.findOne({
                _id: id
            })
            if (checkStudent === null) {
                resolve({
                    status: "Error",
                    mgs: "The student is not defined"
                })
            }
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: checkStudent
            })
        } catch (e) {
            reject(e);
        }
    })
}

const getAllStudents = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const students = await Student.find({})
            if (students === null) {
                resolve({
                    status: "Error",
                    mgs: "The student is not defined"
                })
            }
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: students
            })
        } catch (e) {
            reject(e);
        }
    })
}
const findStudentByEmail = (email) => {
    return new Promise(async (resolve, reject) => {
    try {
        const student = await Student.findOne({ email: email });
        if(student === null){
            resolve({
                status: "Error",
                message: "The student is not defined"
            })
        }
        else{
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: student
            })
        }
    } catch (error) {
        reject(error)
    }
    })
}
function generateRandomString(length) {
    const characters = '0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
const sendOTP = (email) => {
return new Promise(async (resolve, reject) => {
    const otpCode = generateRandomString(4)
    console.log(otpCode)
    try {
        const createdOTP = await OTP.create({
          otp: otpCode,
          email
        })
        if(createdOTP){
            const info = await transporter.sendMail(mailOption,function(err,info)   {
                if(err){
                    console.log(err)
                }
                else{
                    console.log("Email sent:" +info.response)
                }
            })
            if(info){
                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    data: info
                })
            }
            else{
                resolve({
                    status: "Error",
                    message: "The OTP is not created"
                })
            }
               
        }
        else{
            resolve({
                status: "Error",
                message: "The OTP is not created"
            })
        }
    } catch (error) {
        reject(error)
    }
})
}
const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
const mailOption = {
    from: process.env.EMAIL, // sender address
    to: "nqd5758@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
};

module.exports = {
    createStudent,
    loginStudent,
    updateStudent,
    getDetails,
    getAllStudents,
    findStudentByEmail,
    sendOTP,
    generateRandomString,
  
}
