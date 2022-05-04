const router = require('express').Router();
const templateController = require('../Controllers/templateController');
const { uploadImg,handleImg}=require('../Middlewares/multer');

(()=>{

    getRequest()

    postRequest()

    patchRequest()

    deleteRequest()

})();




function getRequest(){
    router.get('/', templateController.gettemplate)

}

function postRequest(){
    router.post('/addTemplate', templateController.addTemplate)
    router.post('/sendNewsletter', templateController.sendNewsletter)
    router.post('/uploadImages',uploadImg('images'),handleImg,(req,res)=>{
        console.log("files",req.files);
        console.log("body",req.body);
        res.send({msg:"Success"})
    } )
}

function patchRequest(){
    router.patch('/saveTemplate',templateController.saveTemplate)
    
}

function deleteRequest(){
    
}

module.exports = router