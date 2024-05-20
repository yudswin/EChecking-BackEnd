//const path =require('path')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    //    const uploadPath = path.join(__dirname, '../uploads');
        cb(null, './src/uploads');
    },
    filename: function (req, file, cb) {
    //    let ext = path.extname(c);
        cb(null, file.originalname );
    }
  })
  
  const upload = multer({ 
    storage: storage,
    fileFilter: function(req, file, callback){
        if(
            file.mimetype === "image/jpeg"||
            file.mimetype === "image/png"||
            file.mimetype === "application/pdf"||
            file.mimetype === "application/vnd.ms-excel" ||
            file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ){
            callback(null, true)
        } else{
            console.log("only jpg, png, pdf, xls, or xlsx files are supported!file supported!")
            callback(null, false)
        }
    },
    limits:{
        fileSize: 1024 * 1024 * 1024 * 2 // 2GB limit
    }
})

module.exports = upload