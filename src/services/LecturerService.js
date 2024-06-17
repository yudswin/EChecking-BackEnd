

const Lecturer = require("../models/LecturerModel")
const User = require("../models/StudentModel.js")
const bcrypt = require("bcrypt")
const { generalAccessToken, generalRefreshToken } = require("./JwtService.js")
const nodemailer = require("nodemailer");
const OTP = require("../models/OTPModel");


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
            const accessToken = await generalAccessToken({
                id: checkLecturer.id,
                role: 'lecturer'
            })

            const refreshToken = await generalRefreshToken({ // when access token is expired => provide the new access_token
                id: checkLecturer.id,
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
const findLecturerByEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            const lecturer = await Lecturer.findOne({ email: email });
            if (lecturer === null) {
                resolve({
                    status: "Error",
                    message: "The lecturer is not defined",
                });
            } else {
                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    data: student,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};
function generateRandomString(length) {
    const characters = "0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
const sendOTP = (email) => {
    return new Promise(async (resolve, reject) => {
        const otpCode = generateRandomString(4);
        console.log("Generated OTP:", otpCode);
        try {
            const createdOTP = await OTP.create({
                otp: otpCode,
                email,
            });
            if (createdOTP) {
                const mailOptions = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: "Reset Password",
                    html: `
            <div style="width: full; height: full; padding: 40px; background: rgba(24, 20, 20, 0.987); color: #fff; border-radius: 10px; margin: 0 auto; text-align: center;">
              <h2 style="color: #fff;">Reset Your Password</h2>
              <p style="color: #fff;">Your OTP code is: <strong>${otpCode}</strong>.This code will expire in 10 minutes.If you did not request this, please ignore this email.</p>
            </div>
          `,
        };
                const info = await transporter.sendMail(
                    mailOptions,
                    function (err, info) {
                        if (err) {
                            console.log(err);
                            reject({
                                status: "Error",
                                message: "Failed to send email",
                                error: err,
                            });
                        } else {
                            console.log("Email sent:" + info.response);
                            resolve({
                                status: "OK",
                                message: "SUCCESS",
                                data: info,
                            });
                        }
                    }
                );
            } else {
                resolve({
                    status: "Error",
                    message: "The OTP is not created",
                });
            }
        } catch (error) {
            console.log(error);
            reject({
                status: "Error",
                message: "Error in OTP creation or email sending",
                error: error,
            });
        }
    });
};
const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

const changePassword = async (email, otp, newPassword) => {
    return new Promise(async (resolve, reject) => {
        try {
            const otpRecord = await OTP.findOne({ otp: otp });
            if (!otpRecord) {
                resolve({
                    status: "Error",
                    message: "Invalid OTP or OTP has expired",
                    data: otpRecord
                });
                return;
            }

            const hashedPassword = bcrypt.hashSync(newPassword, 10);
            const updatedLecturer = await Lecturer.findOneAndUpdate(
                { email: email },
                { password: hashedPassword },
                { new: true }
            );
            if (!updatedLecturer) {
                resolve({
                    status: "Error",
                    message: "Lecturer not found",
                });
                return;
            }
            await OTP.deleteOne({ email: email, otp: otp });

            resolve({
                status: "OK",
                message: "Password updated successfully",
                data: updatedLecturer,
            });
        } catch (error) {
            reject({
                status: "Error",
                message: "Failed to update password",
                error: error,
            });
        }
    }).catch((error) => {
        console.error("Error in changePassword:", error);
        // Additional error handling or logging here
    });
};


module.exports = {
    createLecturer,
    loginLecturer,
    updateLecturer,
    getDetails,
    sendOTP,
    changePassword,
    generateRandomString,
    findLecturerByEmail
};