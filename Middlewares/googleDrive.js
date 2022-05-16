
const { google } = require('googleapis');
const fs = require('fs');

const
    CLIENT_ID = "449203691628-4md32e6jnpti5lopaipnfbupomfc36us.apps.googleusercontent.com",
    CLIENT_SECRET = "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",
    REDIRECT_URI = "https://developers.google.com/oauthplayground",

    refresh_token = "1//04Kl8Z5mIjXA_CgYIARAAGAQSNwF-L9IrkQ3QkbFHmWlQwOM-US1SB8uZ3fqdqidAKark00AXW1CzlmdNmp1eQXWbO9W3w1s-4QQ"

const auth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

auth2Client.setCredentials({ refresh_token });

const drive = google.drive({
    version: 'v3',
    auth: auth2Client
});

exports.handleImg = async (req, res, next) => {
    const files = req.files

    let imageStatus = files.map((val) => {
        const promise = new Promise(async (resolve, reject) => {
            try {
                const pushStatus = await drive.files.create({
                    requestBody: {
                        name: `${val?.originalname}`,
                        mine_type: `${val?.mimetype}`,
                        parents: ['1FSIjQzbezvcI_uL0fayjNH81-5GnsbIs']
                    },
                    media: {
                        mine_type: `${val?.mimetype}`,
                        body: fs.createReadStream(`${val?.path}`)
                    }
                })
                // console.log(pushStatus.data);
                // req.body.id=pushStatus.data.id
                resolve(pushStatus)


            } catch (err) {
                console.log(err.message);
            }
        });
        return (promise)
    })
    const imagesDetails = await Promise.all([...imageStatus]).then((values) => values.map(({ data }) => data));
    // console.log("image",imagesDetails)
    const urls = await generatePublicURL(imagesDetails)
    req.body.imageUrls = imagesDetails
    next()



}



const generatePublicURL = async (fileId) => {
    let imaupload = fileId.map(({ id }) => {
        return new Promise(async (resolve, reject) => {
            try {
                await drive.permissions.create({
                    fileId: id,
                    requestBody: {
                        role: 'reader',
                        type: 'anyone'
                    }
                })
                const result = await drive.files.get({
                    fileId: id,
                    fields: 'webViewLink,  webContentLink'
                })
                return resolve(result.data)
            } catch (error) {
                console.log(error.message);
            }
        }


        )
    })
    return await Promise.all([...imaupload]).then((value) => value).catch((e) => console.log(e))



}

// generatePublicURL();
