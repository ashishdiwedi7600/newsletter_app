const path = require('path');
const database = require('../Storage/template.json')
const fs = require('fs');
const filePath = path.join(__dirname, '../Storage/template.json');
const emailJson = path.join(__dirname, '../Storage/emails.json');
const imgPath = path.join(__dirname, '../Storage/images.json');
const verificationTemplate = require('../Storage/verificationTemplate')
const sendNewsletter = require('../Utils/sendVerification')
const directory = path.join(__dirname, '../Storage/uploadImages')
const { v4: uuidv4 } = require('uuid');
const imageGallery = require('../Models/imagesGallery');
// const signUpSchema = require('../Models/signUp')
const bcrypt = require('bcrypt')
const { nextTick } = require('process');
const { generateOTP, generatePassword } = require('../helper/helper');
const { insertRecord } = require('../db_config/models');



// exports.register = async (req, res) => {
//     console.log(req.body)
//     const { name, email, phone } = req.body
//     let randomPassword = await generatePassword()
//     const verificationPasscode = await generateOTP()
//     const accountStatus = "not verified"
//     console.log("hhhhhhh", randomPassword)


//     await bcrypt.hash(randomPassword, 10, async function (err, hash) {
//         if (err) return new Error("somme error occurred");
//         randomPassword = hash
//         let result = await insertRecord({ name, email, phone, randomPassword, verificationPasscode, accountStatus })
//         if (result.status === 200) {
//             const sendVerification = await sendNewsletter([email], verificationTemplate.verifyTemplate())
//             if (sendVerification?.accepted?.length) {
//                 res.send({ status: 200, msg: "user added successfully" })
//             }
//         }
//         else {
//             res.send(500)
//         }
//     })
// }
// exports.login = async (req, res) => {
//     console.log("dsddffghhhjjj", req.foundUser)
//     const { email, password } = req.body




//     // const randomPassword = await generatePassword()
//     // const verificationPasscode = await generateOTP()
//     // const accountStatus = "not verified"

//     // const result = await insertRecord({ name, email, phone, randomPassword, verificationPasscode ,accountStatus})
//     // // console.log("jhgfghj", result)
//     // if (result.status === 200) {
//     //     const sendVerification = await sendNewsletter([email], verificationTemplate.verifyTemplate())
//     //     if (sendVerification?.accepted?.length) {
//     //         res.send({ status: 200, msg: "user added successfully" })
//     //     }
//     // }
//     // else {
//     //     res.send(500)
//     // }
// }

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
    const sentTemplate = await sendNewsletter(emailArr, JSON.parse(value))
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