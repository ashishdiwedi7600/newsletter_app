const path = require('path');
const database = require('../Storage/template.json')
const fs = require('fs');
const filePath = path.join(__dirname, '../Storage/template.json');
const filePath2 = path.join(__dirname, '../Storage/originalTemplate.js');
const filePath3 = path.join(__dirname, '../Storage/savedTemplate.json');
const newsletter=require('../Storage/originalTemplate')
const sendNewsletter = require('../Utils/Nodemailer')
const {parse} = require('node-html-parser');



exports.gettemplate = async (req, res) => {
    const {template_id=1}=req.body
    // const data = fs.readFileSync(filePath2, 'utf8');
    const templateObject=newsletter.find((v)=>v.template_id==template_id)
    // const dataJson = JSON.parse(data)
    // console.log(dataJson);
    res.send({ status: 200, data: templateObject });
}
exports.addTemplate = async (req, res) => {
    console.log(req.body)
    req.body.template_id = database.length + 1
    const data = fs.readFileSync(filePath, 'utf8');
    const dataJson = JSON.parse(data);

    const newData = [...dataJson, req.body]
    const newTemplate = JSON.stringify(newData)
    fs.writeFile(filePath, newTemplate, () => { });
    res.status(200).send({ msg: "data added successfully", data: req.body })
}
  
exports.saveTemplate = async (req, res) => {
    const id=req.body.template_id
    const code=req.body.template_code
    // console.log(id);
    const data = fs.readFileSync(filePath3, 'utf8');
    const dataJson = JSON.parse(data);
    // console.log(dataJson);
    if (dataJson.length == 0) {
        const newData = [...dataJson, req.body]
        const newTemplate = JSON.stringify(newData)
        fs.writeFile(filePath3, newTemplate, () => { });
    }
    else{
        let index = dataJson.findIndex(template_id => template_id.template_id ==id); 
        // console.log(dataJson[index].template_code);
        dataJson[index].template_code=code
        res.send({'index':dataJson[index].template_code})


    }


}

exports.sendNewsletter = async (req, res) => {
    const emailArr=req.body.emails
    const value = req.body.template_code
    const root = parse(value)

    // const data = fs.readFileSync(filePath2, 'utf8');
    // const newData = JSON.parse(data)
    console.log(root);
    // const sentTemplate = sendNewsletter(emailArr, value2)
    res.status(200).send({ msg: 'successfully', data: root })


}