const CourseRouter = require('./CourseRouter')
const AttendanceRouter = require('./AttendanceRouter')
const RecordRouter = require('./RecordRouter')
const LecturerRouter = require('./LecturerRouter')
const StudentRouter = require('./StudentRouter')
const GeminiRouter = require('./GeminiRouter')
const NewsRouter = require('./NewsRouter')
const WebHookRouter = require('./WebHookRouter')
const express = require("express");

const routes = (app) => {
    app.use('/api/lecturer', LecturerRouter)
    app.use('/api/student', StudentRouter)
    app.use('/api/course', CourseRouter)
    app.use('/api/attendance', AttendanceRouter)
    app.use('/api/record', RecordRouter)
    app.use('/api/gemini', GeminiRouter)
    app.use('/api/news', NewsRouter)
    app.use('/api/webhook', WebHookRouter)
}

module.exports = routes