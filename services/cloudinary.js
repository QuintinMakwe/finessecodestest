const cloudinary = require('cloudinary').v2;
const accessEnv = require('./accessEnv');
const accesssEnv = require('./accessEnv');
const AppError = require('./errorUtil');

cloudinary.config({
    cloud_name: accesssEnv("CLOUD_NAME"),
    api_key: accesssEnv("CLOUD_API_KEY"),
    api_secret: accessEnv('CLOUD_API_SECRET')
})

module.exports.uploadImage = (imagePath) => {
    return new Promise((res, rej)=>{
        cloudinary.uploader.upload(imagePath, {use_filename: true, }, (err, result)=> {
            if(err) return rej(err);
            res(result)
        })
    }).then(result =>{
        return result
    }).catch(err => {
        throw new AppError(err)
    })
}

module.exports.deleteImage = (imagePublicId) => {
    return new Promise((res, rej)=>{
        cloudinary.uploader.destroy(imagePublicId, (err, result)=>{
            if(err) return rej(err);
            res(result)
        })
    }).then(result => {
        return result 
    }).catch(err => {
        throw new AppError(err)
    })
}

module.exports.searchImage = (imagePublicIds) => {
    return new Promise((res, rej)=> {
        cloudinary.api.resources_by_ids([...imagePublicIds], (err, result)=>{
            if(err) return rej(err);
            res(result)
        })
    }).then(result => {
        return result
    }).catch(err=> {
        throw new AppError(err)
    })
}