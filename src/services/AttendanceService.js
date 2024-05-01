const Attendance = require('../models/AttendanceModel');

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

const createAttentdance = (newAttend) => {
    return new Promise(async (resolve, reject) => {
        if (!newAttend) {
            return reject(new Error(' is undefined'));
        }
        const { type, quiz, courseID } = newAttend;

        try {
            let code = generateRandomString(6);
            let isCodeExist = await Attendance.findOne({ code: code});
            while (isCodeExist) {
                code = generateRandomString(6);
                isCodeExist = await Attendance.findOne({ code: code});
            }

            const createAttentdance = await Attendance.create({
                code,
                type,
                quiz,
                courseID: courseID
            });
            if (newAttend) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createAttentdance
                });
            }
        } catch (e) {
            reject(e);
        }
    });
}


const getAllAttendance = (courseId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const sessions = await Attendance.find({
                courseID: courseId
            }).sort({ createdAt: -1, updatedAt: -1 })
            if (course === null) {
                resolve({
                    status: 'ERR',
                    message: 'The attendance is not defined'
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCESSS',
                data: sessions
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetails = (sessionId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const session = await Attendance.findById({
                _id: sessionId
            })
            if (session === null) {
                resolve({
                    status: 'ERR',
                    message: 'The session is not defined'
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCESSS',
                data: session
            })
        } catch (e) {
            reject(e)
        }
    })
}

const updateAttendance = (sessionId, data) => {
    return new Promise (async (resolve, reject) => {
        try {
            const session = await Attendance.findById({
                _id: sessionId
            })
            if (session === null) {
                resolve({
                    status: 'ERR',
                    message: 'The session is not defined'
                })
            }
            const updateSession = await Attendance.findByIdAndUpdate({
                _id: sessionId
            }, data, { new: true })

            resolve ({
                status: 'OK',
                message: 'SUCCESS',
                data: updateSession
            })
        } catch (e) { 
            reject(e)
        }
    })
}

const resetCode = (sessionId) => {
    return new Promise (async (resolve, reject) => {
        try {
            const session = await Attendance.findById({
                _id: sessionId
            })
            if (session === null) {
                resolve({
                    status: 'ERR',
                    message: 'The session is not defined'
                })
            }
            let code = generateRandomString(6);
            let isCodeExist = await Attendance.findOne({ code: code });
            while (isCodeExist) {
                code = generateRandomString(6);
                isCodeExist = await Attendance.findOne({ code: code });
            }

            const resetCode = await Attendance.findByIdAndUpdate({
                _id: sessionId
            }, { code: code }, { new: true })

            resolve ({
                status: 'OK',
                message: 'SUCCESS',
                data: resetCode
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsByCode = (code) => {
    return new Promise(async (resolve, reject) => {
        if (!code) {
            resolve({
                status: 'ERR',
                message: 'The code is required'
            })
        }
        try {
            const session = await Attendance.findOne({
                code: code
            })
            if (!session) {
                resolve({
                    status: 'ERR',
                    message: 'The session is not defined'
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: session
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createAttentdance,
    getAllAttendance,
    getDetails,
    updateAttendance,
    resetCode,
    getDetailsByCode
}