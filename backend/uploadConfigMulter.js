const multer = require('multer')
const path = require('path')

// storage configs
const storage = multer.diskStorage({
    destination : (req, file, callBack) => {
        callBack(null, 'uploads') // This folder should exist or will be created
    },
    filename : function(req, file, callBack){
        callBack(null, Date.now() + path.extname(file.originalname)) // appending extension to the file name
    }
})

const upload = multer({ storage });

module.exports = upload;