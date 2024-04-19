const Course = require('../models/CourseModel');


const createCourse = (newCourse) => {
    return new Promise(async (resolve, reject) => {
        if (!newCourse) {
            return reject(new Error('newCourse is undefined'));
        }

        const { name, description, lecturerID } = newCourse;
        try {
            const createdCourse = await Course.create({
                name, 
                description, 
                lecturerID
            });
            if (createdCourse) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS', 
                    data: createdCourse
                });
            }
        } catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    createCourse
}