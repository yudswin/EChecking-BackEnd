const Student = require("../models/StudentModel")
// const User = require("../models/StudentModel.js")
const bcrypt = require("bcrypt")
const { generalAccessToken, generalRefreshToken } = require("./JwtService.js")




const createStudent = (newStudent) => {
    return new Promise(async (resolve, reject) => {
        const {  firstName, lastName, studentID, phone, password, email } = newStudent
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
                password : hash,
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


const loginStudent = (StudentLogin) =>{
    return new Promise( async (resolve, reject)=>{
        const{ studentID, password } = StudentLogin
     //   console.login
        try{
            const checkStudent = await Student.findOne({ 
                studentID: studentID
            })
            if(checkStudent === null){ 
                resolve({
                    status: "Error",
                    message: "The student is not defined",
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkStudent.password)
        //    console.log(comparePassword)

            if(!comparePassword){
                resolve({
                    status: "Error",
                    message: "Password or student is incorrect",
                })
            }
            const access_token = await generalAccessToken({
                id: checkStudent.id,
            })

            const refresh_token = await generalRefreshToken({ // when access token is expired => provide the new access_token
                id: checkStudent.id,
            })

        //    console.log(access_token)
            resolve({
                status: "OK",
                message: "SIGN-IN SUCCESS",
                access_token,
                refresh_token,
            })
            
        }catch(e){
            reject(e);
        }
    })
}

const updateStudent = (id, data) =>{
    return new Promise( async (resolve, reject)=>{
        try{
            const checkStudent = await Student.findOne({
                _id: id  
            })

            if(checkStudent === null){
                resolve({
                    status: "Error",
                    mgs: "The student is not defined"
                })
            }

            const updatedStudent = await Student.findByIdAndUpdate(id, data, {new: true})
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: updatedStudent
            })
            
        }catch(e){
            reject(e);
        }
    })
}

const getDetails = (id) =>{
    return new Promise( async (resolve, reject)=>{
        try{
            const checkStudent = await Student.findOne({
                _id: id
            })
            if(checkStudent === null){
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
        }catch(e){
            reject(e);
        }
    })
}



module.exports = {
    createStudent, 
    loginStudent,
    updateStudent,
    getDetails
}
