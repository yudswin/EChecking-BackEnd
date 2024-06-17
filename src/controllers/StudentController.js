const Student = require("../models/StudentModel");
const StudentService = require("../services/StudentService");
const JwtService = require("../services/JwtService");

const createStudent = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      studentID,
      phone,
      password,
      confirmPassword,
      email,
    } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);
    if (!email || !password || !confirmPassword) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is email",
      });
    } else if (password !== confirmPassword) {
      return res.status(200).json({
        status: "ERR",
        message: "The password is equal confirmPassword",
      });
    }
    //    console.log(req.body)
    const response = await StudentService.createStudent(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const loginStudent = async (req, res) => {
  try {
    const { studentID, password } = req.body;
    //   console.log(req.body)
    if (!password) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    } else if (!studentID) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is ID",
      });
    }

    const response = await StudentService.loginStudent(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      mgs: error,
    });
  }
};

const updateStudent = async (req, res) => {
  try {
    const StudentId = req.params.id;
    const data = req.body;
    if (!StudentId) {
      return res.status(200).json({
        status: "ERROR",
        msg: "The studentID is required",
      });
    }

    const response = await StudentService.updateStudent(StudentId, data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      mgs: error,
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.headers.token.split(" ")[1]; // create Beare in Headers of Postman  (put the refresh token to headers  => verify refresh token => ))
    if (!refreshToken) {
      return res.status(200).json({
        status: "ERROR",
        msg: "The refresh token is required",
      });
    }

        const response = await JwtService.refreshTokenJwtService(refreshToken, 'student')
        return res.status(200).json(response)
    }catch(error){
        return res.status(404).json({
            mgs: error
        })
    }
} 


const logoutStudent = async (req, res) => {
  try {
    res.clearCookie("refreshToken");
    return res.status(200).json({
      status: "OK",
      message: "Logout successfully",
    });
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getDetails = async (req, res) => {
  try {
    const studentId = req.params.id;
    if (!studentId) {
      return res.status(200).json({
        status: "ERR",
        message: "The studentId is required",
      });
    }
    const response = await StudentService.getDetails(studentId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const response = await StudentService.getAllStudents();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        status: "ERR",
        message: "Email is required",
      });
    }

    const student = await StudentService.findStudentByEmail(email);
    const response = await StudentService.sendOTP(email);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      status: "ERR",
      message: error.message,
    });
  }
};
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({
      status: "ERR",
      message: "Email and OTP are required.",
    });
  }
  else{
    return res.status(200).json({
      status: "OK",
      message: "OTP is verified.",
    });
  }
};
const changePassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
    return res.status(400).json({
      status: "ERR",
      message: "Email, OTP and new password are required.",
    });
  }
  else{
    const response = await StudentService.changePassword(email, otp, newPassword);
    return res.status(200).json(response);
  }
}
module.exports = {
  createStudent,
  loginStudent,
  updateStudent,
  refreshToken,
  logoutStudent,
  getDetails,
  getAllStudents,
  forgotPassword,
  verifyOtp,
  changePassword,
};
