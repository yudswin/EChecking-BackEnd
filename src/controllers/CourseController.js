const CourseService = require('../services/CourseService')

const createCourse = async (req, res) => {
    try {
        const { name, description, lecturerID } = req.body
        if (!name) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The name is required'
            })
        } else if (!description) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The description is required'
            })
        } else if (!lecturerID) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The lecturerId is required'
            })
        }
        const response = await CourseService.createCourse(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createCourse
}