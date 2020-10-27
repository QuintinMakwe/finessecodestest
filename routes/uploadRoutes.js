const express = require('express');
const router = express.Router();
const Image = require('../controllers/imageUpload');
const multerUpload = require('../services/multer');

router.get('/viewImage', Image.viewImage);

router.post('/upload', multerUpload.array("image", 3),Image.uploadImage);

router.delete('/deleteImage', Image.deleteImage);

module.exports = router;