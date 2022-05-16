const multer = require('multer');
const path = require('path');
// const filePath2 = path.join(__dirname, './storage');
let imgKey = [];
const imgBaseUrl = "https://templateella.herokuapp.com/";
const { google } = require('googleapis');
const fs = require('fs');
const { handleImg,generatePublicURL} =require('./googleDrive')


const 
    CLIENT_ID = "449203691628-4md32e6jnpti5lopaipnfbupomfc36us.apps.googleusercontent.com",
    CLIENT_SECRET = "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",
    REDIRECT_URI = "https://developers.google.com/oauthplayground",

    refresh_token = "1//04Kl8Z5mIjXA_CgYIARAAGAQSNwF-L9IrkQ3QkbFHmWlQwOM-US1SB8uZ3fqdqidAKark00AXW1CzlmdNmp1eQXWbO9W3w1s-4QQ"

const auth2Client =  new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

auth2Client.setCredentials({refresh_token});

const drive = google.drive({
    version: 'v3', 
    auth : auth2Client
});

const filePath = path.join(__dirname,'../Storage/uploadImages') 


exports.uploadImg = (key) => {

  imgKey=key
  const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, filePath)
        },
        
        filename: async function (req, file, cb) {
          const [name,ext] = file.originalname.split('.');
          if(ext == 'png' || ext == 'PNG' || ext == 'jpg' ||ext == 'JPG') {
          cb(null, Date.now() + path.extname(file.originalname))
          } //Appending extension
          else
          cb(new Error('Wrong File formet (user only .png, .jpg, .PNG)'))
        },
        // path: function (req,res,cb){
        //   cb(null ,`${imgBaseUrl}/${req?.file?.filename}`) 
        // }
      })
      
    return multer({ storage: storage }).array(key,8)
}





// try {
//     const response = await drive.files.create({
//         requestBody : {
//             name : `${req.file?.originalname}`,
//             mine_type: `${req.file?.mimetype}`,
//         },
//         media : {
//             mine_type :  `${req.file?.mimetype}`,
//             body : fs.createReadStream(`${req.file?.path}`)
//         }
//     });
//  console.log(response)

// }catch(err){
//     console.log(err.message);
// }

  
