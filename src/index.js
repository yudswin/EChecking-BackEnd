const express = require("express");
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const routes = require('./routes');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path')

dotenv.config()

const app = express()

const staticFilesDirectory = './src/uploads';

app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json());
// http://localhost:3001/uploads//2.png
app.use('/uploads', express.static(staticFilesDirectory));


//const absolutePath = path.resolve(staticFilesDirectory)
// console.log(absolutePath)

app.use(cookieParser())

routes(app);


const port = process.env.PORT || 3001

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connect Db success!')
        //        console.log(absolutePath)
    })
    .catch((err) => {
        console.log(err)
    })


app.listen(port, () => {
    console.log('Server is running in port: ', + port)
})