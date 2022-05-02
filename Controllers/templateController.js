const path = require('path');
const database = require('../Storage/template.json')
const fs = require('fs');
const filePath = path.join(__dirname, '../Storage/template.json');


exports.gettemplate = async (req, res) => {
    const data = fs.readFileSync(filePath, 'utf8');
    res.send({ status: 200, data: JSON.parse(data) });
}
exports.addTemplate = async (req, res) => {
    req.body.id = database.length + 1
    const data = fs.readFileSync(filePath, 'utf8');
    const dataJson = JSON.parse(data);
    const newData = [...dataJson, createStudent(req.body)]
    const newStudentList = JSON.stringify(newData)
    fs.writeFile(filePath, newStudentList, () => { });
    res.send({ status: 200, data: req.body, msg: "data added successfully" });
}