const path = require('path');
const database = require('../Storage/template.json')
const fs = require('fs');
const filePath = path.join(__dirname, '../Storage/template.json');
const emailJson = path.join(__dirname, '../Storage/emails.json');
const imgPath = path.join(__dirname, '../Storage/images.json');
const newsletter = require('../Storage/originalTemplate')
const sendNewsletter = require('../Utils/Nodemailer2')
const directory = path.join(__dirname, '../Storage/uploadImages')
const { v4: uuidv4 } = require('uuid');
const imageGallery = require('../Models/imagesGallery');
const { nextTick } = require('process');



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
    const sentTemplate = sendNewsletter(emailArr, JSON.parse(value))
    // const data = fs.readFileSync(emailJson, 'utf8');
    // let dataJson = JSON.parse(data);
    // emailArr.map(async (email) => {
    //     const foundEmail = dataJson.some(el => el.username === email)
    //     if (!foundEmail) dataJson.push({ email_id: dataJson.length + 1, username: email })
    // })
    // const newEmaillist = JSON.stringify(dataJson);
    // fs.writeFile(emailJson, newEmaillist, (err,data) => {
    //     if (err) return console.error(err);
    //     res.send({msg:"successfully"})  

    //  });  
    res.status(200).send({ msg: 'successfully' })
}

exports.saveImages = async (req, res, next) => {
    const value = req.body.imagesDetails
    const allImages = value.map(({ value }) => ({ "image": value.browerUrl }))
    console.log(allImages);
    const uploadStatus = await imageGallery.gallery.insertMany(allImages)
    await imageGallery.gallery.find({}, (err, result) => {
        if (err) return next(new Error("no image url exist"));
        res.status(201).send({ msg: "files successfully uploaded", uploadStatus, result });
    }).clone().catch(function (err) { console.log(err) })


}