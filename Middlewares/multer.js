const multer  = require('multer');
const path = require('path');   
const filePath = path.join(__dirname, '../Storage/uploadImages');
let imgKey = [];
const imgBaseUrl = "  https://1184-2405-201-402e-a82c-58ea-9a5c-b65f-cdd2.ngrok.io";

exports.uploadImg = (key,val) => {
  imgKey=[val]
  console.log("key",val);
  imgKey = key[val];
  const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, filePath)
        },
        filename: function (req, file, cb) {
          const [name,ext] = file.originalname.split('.');
          if(ext == 'png' || ext == 'PNG' || ext == 'jpg') 
          cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
          else
          cb(new Error('Wrong File formet (user only .png, .jpg, .PNG)'))
        }
      })
      
    return multer({ storage: storage }).array(key,4)
}

exports.handleImg = (req, res, next) => {
  req.body[imgKey] = `${imgBaseUrl}/${req?.files?.filename}`;
  next();
}