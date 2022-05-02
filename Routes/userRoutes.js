const router = require('express').Router();
const templateController = require('../Controllers/templateController');

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
    // router.post('/fee-submission', userController.feeSubmission)
}

function patchRequest(){
    
}

function deleteRequest(){
    
}

module.exports = router