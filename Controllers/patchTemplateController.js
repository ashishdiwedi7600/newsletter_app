const path = require('path');
const fs = require('fs');
const filePath3 = path.join(__dirname, '../Storage/savedTemplate.json');


exports.saveTemplate = async (req, res) => {
    const id = req.body.template_id
    const code = req.body.template_code
    const data = fs.readFileSync(filePath3, 'utf8');
    const dataJson = JSON.parse(data);
    if (dataJson.length == 0) {
        const newData = [...dataJson, req.body]
        const newTemplate = JSON.stringify(newData)
        fs.writeFile(filePath3, newTemplate, () => { });
    }
    else {
        let index = dataJson.findIndex(template_id => template_id.template_id == id);
        dataJson[index].template_code = code
        res.send({ 'index': dataJson[index].template_code })
    }
}