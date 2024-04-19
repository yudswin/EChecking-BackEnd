// const LecturerRouter = require('./LecturerRouter')
const CourseRouter = require('./CourseRouter')

const routes = (app) => {
    // app.use('/api/lecturer', LecturerRouter)
    app.use('/api/course', CourseRouter)

}

module.exports = routes