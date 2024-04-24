const Course = require('../models/CourseModel');


const createCourse = (newCourse) => {
    return new Promise(async (resolve, reject) => {
        if (!newCourse) {
            return reject(new Error('newCourse is undefined'));
        }

        const { name, description, lecturerId } = newCourse;
        try {
            const createdCourse = await Course.create({
                name,
                description,
                lecturerID: lecturerId
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

const getDetails = async (id) => {
    const course = await Course.findById(id);
    if (!course) {
        throw new Error('Course not found');
    }
    return {
        status: 'OK',
        message: 'SUCCESS',
        data: course
    }
}

const getAllCourse = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const course = await Course.find({
                lecturer: id
            }).sort({ createdAt: -1, updatedAt: -1 })
            if (course === null) {
                resolve({
                    status: 'ERR',
                    message: 'Course is not defined'
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: course
            })

            reject(e)
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createCourse,
    getDetails,
    getAllCourse
}