const multer = require('multer');
const path = require('path');
const AppError = require('./errorUtil');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(`${__dirname}/../imageUploads`));
    },
    filename: function(req, file, cb){
        cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({
    storage, 
    fileFilter: function(req, file, cb){
        const extensionType = path.extname(file.originalname);
        if(extensionType !== '.png' && extensionType !== '.jpg' && extensionType !== '.gif' && extensionType !== '.jpeg'){
            return cb(new AppError("You can only upload image files","400"))
        }
        return cb(null, true);
    },
    limits:{
        fileSize: 1024 * 1024
    }
})

module.exports = upload