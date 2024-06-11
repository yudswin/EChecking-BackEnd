const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const authLecturerMiddleWare = (req, res, next) => {
    if (!req.headers.token) {
        return res.status(401).json({
            message: 'No token provided',
            status: 'ERROR'
        })
    }
    const token = req.headers.token.split(' ')[1]
    // const LecturerId = req.params.id
    console.log('token', req.headers.token);
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, lecturer) {
        if (err) {
            return res.status(401).json({
                message: 'Failed to authenticate token / accessToken expired',
                status: 'ERROR'
            })
        }
        next()
    });
}

const authUserMiddleWare = (req, res, next) => {
    if (!req.headers.token) {
        return res.status(401).json({
            message: 'No token provided',
            status: 'ERROR'
        })
    }
    const token = req.headers.token.split(' ')[1]
    // const userId = req.params.id
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(401).json({
                message: 'Failed to authenticate token / accessToken expired',
                status: 'ERROR'
            })
        }
        next()
    });
}

const multerErrorHandlingMiddleware = (err, req, res, next) => {
    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({
            status: 'ERROR',
            message: 'File Limit Exceeded'
        });
    }
    // If not a multer error, pass it to the next error handler
    next(err);
};

module.exports = {
    authLecturerMiddleWare,
    authUserMiddleWare,
    multerErrorHandlingMiddleware
}