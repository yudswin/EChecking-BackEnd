const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()

const generalAccessToken = async (payload) => {
    const accessToken = jwt.sign({
        ...payload
    }, process.env.ACCESS_TOKEN, { expiresIn: '30s' })

    return accessToken
}

const generalRefreshToken = async (payload) => {
    const refreshToken = jwt.sign({
        ...payload
    }, process.env.REFRESH_TOKEN, { expiresIn: '365d' })

    return refreshToken
}

const refreshTokenJwtService = (token) => {
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
                if (err) {
                    resolve({
                        status: 'ERR',
                        message: 'Authentication failed.'
                    })
                }
                const accessToken = await generalAccessToken({
                    id: user?.id
                })
                resolve({
                    status: 'OK',
                    message: 'Token refreshed successfully.',
                    accessToken
                })
            })
        } catch (e) {
            reject(e)
        }
    })

}

module.exports = {
    generalAccessToken,
    generalRefreshToken,
    refreshTokenJwtService
}
