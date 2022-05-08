const multer = require('multer');
const path = require('path');
const filePath = path.join(__dirname, '../Storage/uploadImages');
let imgKey = [];
const imgBaseUrl = "https://templateella.herokuapp.com/";



  

exports.uploadImg = (key) => {
  imgKey=key
  const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, filePath)
        },
        filename: function (req, file, cb) { 
          const [name,ext] = file.originalname.split('.');
          if(ext == 'png' || ext == 'PNG' || ext == 'jpg' ||ext == 'JPG') 
          cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
          else
          cb(new Error('Wrong File formet (user only .png, .jpg, .PNG)'))
        },
        path: function (req,res,cb){
          cb(null ,`${imgBaseUrl}/${req?.file?.filename}`)
        }
      })

    return multer({ storage: storage }).array(key,5)
}

exports.handleImg = (req, res, next) => {
  
  next();
}