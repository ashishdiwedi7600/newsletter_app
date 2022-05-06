const router = require('express').Router();
const gettemplateController = require('../Controllers/getTemplateController');
const posttemplateController = require('../Controllers/postTemplateController');
const patchtemplateController = require('../Controllers/patchTemplateController');
const { uploadImg,handleImg}=require('../Middlewares/multer');

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
    router.post('/addTemplate', posttemplateController.addTemplate)
    router.post('/sendNewsletter', posttemplateController.sendNewsletter)
    router.post('/uploadImages',uploadImg('image'),handleImg,posttemplateController.saveImages)
}

function patchRequest(){
    router.patch('/saveTemplate',patchtemplateController.saveTemplate)
    
}

function deleteRequest(){
    
}

module.exports = router