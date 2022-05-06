const path = require('path');
const database = require('../Storage/template.json')
const fs = require('fs');
const filePath = path.join(__dirname, '../Storage/template.json');
const emailJson = path.join(__dirname, '../Storage/emails.json');
const imgPath = path.join(__dirname, '../Storage/images.json');
const sendNewsletter = require('../Utils/Nodemailer')
const { v4: uuidv4 } = require('uuid');
const imgBaseUrl = "https://cc67-2405-201-402e-a82c-bc8c-4551-8bc0-410b.ngrok.io";



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



exports.sendNewsletter = async (req, res) => {
    const emailArr = req.body.emails
    const value = req.body.template_code
    const data = fs.readFileSync(emailJson, 'utf8');
    let dataJson = JSON.parse(data);
    emailArr.map(async (email) => {
        const foundEmail = dataJson.some(el => el.username === email)
        if (!foundEmail) dataJson.push({ email_id: dataJson.length + 1, username: email })
    })
    const newEmaillist = JSON.stringify(dataJson);
    fs.writeFile(emailJson, newEmaillist, (err,data) => {
        if (err) return console.error(err);
        res.send({msg:"successfully"})  
        
     }); 
     console.log(value);
    const sentTemplate = sendNewsletter(emailArr, (value) ) 
    res.status(200).send({ msg: 'successfully', data: sentTemplate })
}

exports.saveImages = async (req, res) => {
    try {
        const data = fs.readFileSync(imgPath, 'utf8');
        let dataJson = JSON.parse(data);
        let newUpload = {}
        req.files.map(async (file) => {
            newUpload = {
                id: uuidv4(),
                image: `${imgBaseUrl}/${file?.filename}`,
            }
            dataJson.push(newUpload)
        })
        const newImagesList = JSON.stringify(dataJson);
        fs.writeFile(imgPath, newImagesList, () => { });
        const images = fs.readFile(imgPath,  (err, data) => {
            if (err) return console.error(err);
        const imageJson = JSON.parse(data)
            res.send({ status: 200,  msg: "Image uploaded Succefully successfully" ,data:imageJson});

        });

    }
    catch (err) {
        console.error(err)
    }

}