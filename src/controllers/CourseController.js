const CourseService = require('../services/CourseService')

const createCourse = async (req, res) => {
    try {
        const { name, description } = req.body;
        
        if (!name) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The name is required'
            });
        } else if (!description) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The description is required'
            });
        }
        const response = await CourseService.createCourse(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e
        });
    }
};

const getDetails = async (req, res) => {
    try {
        const { courseId } = req.params.id
        const response = await CourseService.getDetails(courseId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllCourse = async (req, res) => {
    try {
        const lecturer = req.params.lecturerId
        if (!lecturer) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const response = await CourseService.getAllCourse(lecturer)
        return res.status(200).json(response)
    } catch (e) {
        // console.log(e)
        return res.status(404).json({
            message: e
        })
    }
}


module.exports = {
    createCourse,
    getDetails,
    getAllCourse
}