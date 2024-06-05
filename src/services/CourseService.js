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

const getDetails = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const course = await Course.findById({
                _id: id
            })
            if (course === null) {
                resolve({
                    status: 'ERR',
                    message: 'The order is not defined'
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCESSS',
                data: course
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllCourse = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const course = await Course.find({
                lecturerID: id
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

const updateCourse = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const course = await Course.findByIdAndUpdate({
                _id: id
            }, data, { new: true })
            if (course === null) {
                resolve({
                    status: 'ERR',
                    message: 'The course is not defined'
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: course
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getCourseName = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const course = await Course.findById({
                _id: id
            })
            if (course === null) {
                resolve({
                    status: 'ERR',
                    message: 'The course is not defined'
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: course.name
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteCourse = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const course = await Course.findByIdAndDelete({
                _id: id
            })
            if (course === null) {
                resolve({
                    status: 'ERR',
                    message: 'The course is not defined'
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: course
            })
        } catch (e) {
            reject(e)
        }
    })
}


module.exports = {
    createCourse,
    getDetails,
    getAllCourse,
    updateCourse,
    getCourseName,
    deleteCourse
}