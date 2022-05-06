const path = require('path');
const fs = require('fs');
const imgPath = path.join(__dirname, '../Storage/images.json');
const emailJson = path.join(__dirname, '../Storage/emails.json');
const newsletter = require('../Storage/originalTemplate')



exports.gettemplate = async (req, res) => {
    const { template_id = 1 } = req.body
    const templateObject = newsletter.find((v) => v.template_id == template_id)
    res.send({ status: 200, msg:"images mil gyi kya ",data: templateObject });
}
exports.getImages=async(req,res)=>{
    const data=fs.readFileSync(imgPath,'utf8')
    const imgData = JSON.parse(data);
    res.send({ status: 200, data: imgData });
}
exports.getemails= async (req,res)=>{
    const data=fs.readFileSync(emailJson,'utf8')
    const emails=JSON.parse(data)
    res.status(201).send({msg:'emails are here',data:emails})


}

