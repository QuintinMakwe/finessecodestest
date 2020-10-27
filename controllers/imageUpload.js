const cloudinary = require('../services/cloudinary');
const AppError = require('../services/errorUtil');

class Image{
    static async uploadImage(req, res, next){
        try{
            const files = req.files 
            let resultArr = [];
            if(files){
                for(let i =0 ; i < files.length; i ++){
                    const file = files[i];
                    const result = await cloudinary.uploadImage(file.path)
                    resultArr.push(result);
                }
                res.status(200).json({status: "success", message: "image successfully uploaded", data: resultArr})
            }else{
                res.status(400).json({status: "fail", message: "you must provide a file", data: null})
            }
        }catch(err){
            next(err);
        }
    }
    
    static async viewImage(req, res, next){
        try{
            const {publicId} = req.query
            let publicIdArr 
            if(publicId){
                publicIdArr = publicId.split(';')
            }else{
                throw new AppError("you must provide an image id else there'd be nothing to search for", "400")
            }
            const result = await cloudinary.searchImage(publicIdArr);
            res.status(200).json({
                status: "success", 
                message: `image(s) with id(s) ${publicIdArr} successfuully fetched`,
                data: result})}
        catch(err){
            next(err);
        }
    }

    static async deleteImage(req, res, next){
        try{
            const {publicId} = req.query
            const publicIdArr = publicId.split(';');
            let resultArr = []
            for(let i = 0; i < publicIdArr.length; i++){
                let publicId = publicIdArr[i]
                const result = await cloudinary.deleteImage(publicId);
                resultArr.push({[publicId]: result})
            }
            res.status(200).json({status: "success", message: `you have successfully deleted image(s) with id(s) ${publicIdArr}`, data: resultArr})
        }catch(err){
            next(err);
        }
    }
}

module.exports = Image;