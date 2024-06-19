const Lecturer = require('../models/LecturerModel')
const LecturerService = require('../services/LecturerService')
const JwtService = require('../services/JwtService')
const mongoose = require('mongoose');

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

const loginLecturer = async (req, res) => {
    try {
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
    } catch (error) {
        return res.status(404).json({
            mgs: error
        })
    }
}


const updateLecturer = async (req, res) => {
    try {
        const { lecturerID, ...updateData } = req.body;
        if (!lecturerID) {
            return res.status(400).json({
                status: "ERROR",
                message: "Lecturer ID is required"
            });
        }
        const lecturer = await Lecturer.findOne({ lecturerID });
        if (!lecturer) {
            return res.status(404).json({
                status: "ERROR",
                message: "Lecturer not found"
            });
        }
        const result = await LecturerService.updateLecturer(lecturer._id, updateData);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            status: "ERROR",
            message: error.message
        });
    }
};

const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.headers.token.split(' ')[1]       // create Beare in Headers of Postman  (put the refresh token to headers  => verify refresh token => ))
        if (!refreshToken) {
            return res.status(200).json({
                status: "ERROR",
                msg: "The refresh token is required"
            })
        }

        const response = await JwtService.refreshTokenJwtService(refreshToken, 'lecturer')
        return res.status(200).json(response)
    } catch (error) {
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
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                status: "ERR",
                message: "Email is required",
            });
        }

        const lecturer = await LecturerService.findLecturerByEmail(email);
        if (!lecturer || lecturer.status === "Error") {
            return res.status(400).json({
                status: "ERR",
                message: "Email is not found.",
            });
        }
        const response = await LecturerService.sendOTP(email);

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            status: "ERR",
            message: error.message,
        });
    }
  };
  const verifyOtp = async (req, res) => {
    const {email,otp } = req.body;
    const checkOtp = await LecturerService.verifyOtp(email, otp);
    if(!checkOtp){
        return res.status(400).json({
            status: "ERR",
            message: "Invalid OTP.",
        });
    }
    if (!otp) {
        return res.status(400).json({
            status: "ERR",
            message: "OTP are required.",
        });
    }
    return res.status(200).json({
        status: "OK",
        message: "OTP is verified.",
    });
};
const changePassword = async (req, res) => {
    const { email, otp, newPassword, confirmPassword } = req.body;
    if (!email || !otp || !newPassword || !confirmPassword) {
      return res.status(400).json({
        status: "ERR",
        message: "Email, OTP, new password, and confirm password are required.",
      });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        status: "ERR",
        message: "New password and confirm password do not match.",
      });
    }
    if (newPassword.length < 4) {
      return res.status(400).json({
        status: "ERR",
        message: "New password must be at least 4 characters long.",
      });
    }
  
    // Find the lecturer by email to ensure they exist
    const lecturer = await Lecturer.findOne({ email: email });
    if (!lecturer) {
      return res.status(404).json({
        status: "ERR",
        message: "No lecturer found with this email.",
      });
    }
  
    // Verify the OTP
    const isValidOtp = await LecturerService.verifyOtp(email, otp);
    if (!isValidOtp) {
      return res.status(400).json({
        status: "ERR",
        message: "Invalid OTP.",
      });
    }
  
    const response = await LecturerService.changePassword(email, otp, newPassword);
    return res.status(200).json(response);
  }
const verifyEmail = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                status: "ERR",
                message: "Email is required",
            });
        }
        const checkLecturer = await LecturerService.findLecturerByEmail(email);
        if (!checkLecturer) {
            return res.status(400).json({
                status: "ERR",
                message: "Lecturer already exists",
            });
        }
        const response = await LecturerService.sendOTP(email);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            status: "ERR",
            message: error.message,
        });
    }
}
module.exports = {
    createLecturer,
    loginLecturer,
    updateLecturer,
    refreshToken,
    logoutLecturer,
    getDetails,
    forgotPassword,
    verifyOtp,
    changePassword,
    verifyEmail

}
