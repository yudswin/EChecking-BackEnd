const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();



const authLecturerMiddleWare = (req, res, next) => {
    const accessToken = req.headers['token'] ? req.headers['token'].split(' ')[1] : null;

    if (!accessToken) {
        return res.status(403).json({ message: "Access token is required" });
    }

    jwt.verify(accessToken, process.env.ACCESS_TOKEN, (err, lecturerData) => {
        if (err) {
            return res.status(401).json({ message: "Invalid or expired access token" });
        }
        // Lưu trữ thông tin lecturer vào request để sử dụng ở các hàm xử lý sau
        req.lecturer = lecturerData;
        next();
    });
}
const authUserMiddleWare = (req, res, next) => {
    if (!req.headers.token) {
        return res.status(401).json({
            message: 'No token provided',
            status: 'ERROR'
        });
    }

    const tokenParts = req.headers.token.split(' ');

    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(401).json({
            message: 'Token is not in proper format',
            status: 'ERROR'
        });
    }

    const token = tokenParts[1];
    console.log('Token received:', token);
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            console.error('Token verification error:', err);
            return res.status(401).json({
                message: 'Failed to authenticate token',
                status: 'ERROR'
            });
        }
        next();
    });
};

const multerErrorHandlingMiddleware = (err, req, res, next) => {
    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({
            status: 'ERROR',
            message: 'File Limit Exceeded'
        });
    }
    next(err);
};

module.exports = {
    authLecturerMiddleWare,
    authUserMiddleWare,
    multerErrorHandlingMiddleware
};
