const router = require('express').Router();
const googleDriveOperations = require('../Middlewares/googleDrive');

const gettemplateController = require('../Controllers/getTemplateController');
const posttemplateController = require('../Controllers/postTemplateController');
const patchtemplateController = require('../Controllers/patchTemplateController');
const { userLogin } = require('../validations/userValidate');
const { multer, uploadFileToGoogleDrive }=googleDriveOperations;


(()=>{

    getRequest()

    postRequest()

    patchRequest()

    deleteRequest()

})();




function getRequest(){
    router.get('/', gettemplateController.gettemplate)
    router.get('/getImages', gettemplateController.getImages)
    router.get('/getEmails', gettemplateController.getemails)

}

function postRequest(){
    router.post('/register', posttemplateController.register)
    router.post('/login',userLogin(), posttemplateController.login)
    router.post('/addTemplate', posttemplateController.addTemplate)
    router.post('/sendNewsletter', posttemplateController.sendNewsletter)
    router.post('/uploadImages',multer.any(),uploadFileToGoogleDrive,posttemplateController.saveImages)
}

function patchRequest(){
    router.patch('/saveTemplate',patchtemplateController.saveTemplate)
    
}

function deleteRequest(){
    
}

module.exports = router