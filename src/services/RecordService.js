const Record = require('../models/RecordModel');
const fs = require('fs');
const path = require('path');

const createRecord = (session, newRecord, submissionPath) => {
    return new Promise(async (resolve, reject) => {

        // Handle multiple files in one path
        let path = ''
        submissionPath.forEach(function (files, index, arr) {
            path = path + files.path + ','
        });
        path = path.substring(0, path.lastIndexOf(","))

        // check path 
        if (path == "") {
            resolve({
                status: 'ERROR',
                message: 'Invalid Type of File'
            });
            return reject(new Error(' Invalid Type of File'));
        }

        if (!newRecord) {
            return reject(new Error(' is undefined'));
        }
        const { studentID } = newRecord;
        try {
            const createRecord = await Record.create({
                sessionID: session,
                studentID,
                submissionPath: path,
            })
            if (!createRecord) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createRecord
                });
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: createRecord
            });
        } catch (e) {
            reject(e);
        }
    });
}

const getAllRecord = (session) => {
    return new Promise(async (resolve, reject) => {
        try {
            const records = await Record.find({ sessionID: session });
            if (!records) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: []
                });
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: records
            });
        } catch (e) {
            reject(e);
        }
    });
}

const createNormal = (session, newRecord) => {
    return new Promise(async (resolve, reject) => {
        if (!newRecord) {
            return reject(new Error(' is undefined'));
        }
        const { studentID } = newRecord;
        try {
            const createRecord = await Record.create({
                sessionID: session,
                studentID,
            })
            if (!createRecord) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createRecord
                });
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: createRecord
            });
        } catch (e) {
            reject(e);
        }
    });
}

const getTotalRecord = (session) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalRecord = await Record.find({ sessionID: session }).countDocuments();
            if (!totalRecord) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: 0
                });
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: totalRecord
            });
        } catch (e) {
            reject(e);
        }
    });
}

const getTotalDistinctRecord = (session) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalRecord = await Record.find({ sessionID: session }).distinct('studentID').count();
            if (!totalRecord) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: 0
                });
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: totalRecord
            });
        } catch (e) {
            reject(e);
        }
    });

}

const downloadFile = (filePath) => {
    return new Promise((resolve, reject) => {
        // Validate and sanitize the filePath here if necessary
        // You can also check if the file exists and is accessible
        const absolutePath = path.resolve(filePath);
        fs.access(absolutePath, fs.constants.F_OK | fs.constants.R_OK, (err) => {
            if (err) {
                reject(err);
            } else {
                const fileStream = fs.createReadStream(absolutePath);
                resolve(fileStream);
            }
        });
    });
}


module.exports = {
    createRecord,
    getAllRecord,
    createNormal,
    getTotalRecord,
    getTotalDistinctRecord,
    downloadFile
}