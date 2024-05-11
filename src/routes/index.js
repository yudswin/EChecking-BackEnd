const CourseRouter = require('./CourseRouter')
const AttendanceRouter = require('./AttendanceRouter')
const RecordRouter = require('./RecordRouter')
const LecturerRouter = require('./LecturerRouter')
const StudentRouter = require('./StudentRouter')
const express = require("express");

const routes = (app) => {
    app.use('/api/lecturer', LecturerRouter)
    app.use('/api/student', StudentRouter)
    app.use('/api/course', CourseRouter)
    app.use('/api/attendance', AttendanceRouter)
    app.use('/api/record', RecordRouter)

}

module.exports = routes