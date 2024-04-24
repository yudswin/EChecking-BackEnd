// const LecturerRouter = require('./LecturerRouter')
const CourseRouter = require('./CourseRouter')
const AttendanceRouter = require('./AttendanceRouter')

const routes = (app) => {
    // app.use('/api/lecturer', LecturerRouter)
    app.use('/api/course', CourseRouter)
    app.use('/api/attendance', AttendanceRouter)

}

module.exports = routes