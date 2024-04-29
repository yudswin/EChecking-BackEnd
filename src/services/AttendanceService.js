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
        let { type, quiz, courseID } = newAttend;
        // const checkCode = null;
        code = generateRandomString(6);

        try {
            // while ((checkCode = await Attendance.findOne({ code: code })) == null) {
            //     code = generateRandomString(6);
            // }

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
                    message: 'The order is not defined'
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
                    message: 'The order is not defined'
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

module.exports = {
    createAttentdance,
    getAllAttendance,
    getDetails
}