const Record = require('../models/RecordModel');

const createRecord = (session, newRecord, submissionPath) => {
    return new Promise(async (resolve, reject) => {
        
        // Handle multiple files in one path
        let path= ''
        submissionPath.forEach(function(files, index, arr) {
            path = path + files.path + ','
        });
        path = path.substring(0, path.lastIndexOf(","))

        // check path 
        if(path ==""){
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

module.exports = {
    createRecord,
    getAllRecord,
    createNormal
}