const Record = require('../models/RecordModel');

const createRecord = (session, newRecord) => {
    return new Promise(async (resolve, reject) => {
        if (!newRecord) {
            return reject(new Error(' is undefined'));
        }
        const { studentID, submissionPath } = newRecord;
        try {
            const createRecord = await Record.create({
                sessionID: session,
                studentID,
                submissionPath,
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
    createRecord
}