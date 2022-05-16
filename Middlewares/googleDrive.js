
const { google } = require('googleapis');
const multer = require('multer');
const fs = require('fs');
const stream = require('stream');
const GOOGLE_DRIVE_BASEURL  = "https://drive.google.com/uc?id=";


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


async function uploadFileToGoogleDrive(req, res, next) {

    const { files = [] } = req;

    try {
        const uploadedImageStatus = files?.map(async (file) => {

            const bufferStream = new stream.PassThrough();
            bufferStream.end(file.buffer);

            try {
                return await new Promise((resolve, reject) => {

                    const result = drive.files.create({
                        requestBody: {
                            name: file.originalname,
                            parents: ['1FSIjQzbezvcI_uL0fayjNH81-5GnsbIs']
                        },
                        media: {
                            mineType: file.mimeType,
                            body: bufferStream
                        },
                        fields: 'id,name',
                    });

                    resolve(result);
                });
            } catch (err) {
                return err;
            }


        })

        // Uploaded Images Status
        const uploadStatus = await Promise.allSettled(uploadedImageStatus);
        // To Set access permissions
        const imagesDetails = await generatePublicURLOfGoogleDriveFiles(uploadStatus);
        // console.log(imagesDetails);

        req.body.imagesDetails = imagesDetails;
        next()

    } catch (err) {
        console.log(err.message);
    }
}

// uploadFile()


async function generatePublicURLOfGoogleDriveFiles(uploadStatus = []) {
    try {

        const changePremissions = uploadStatus.map(({ value }) => {

            const imageDetails = value?.data;
            return new Promise(async (resolve,) => {
                //   TO Change Uploaded files Permission
                await drive.permissions.create({
                    fileId: imageDetails.id,
                    requestBody: {
                        role: 'reader',
                        type: 'anyone'
                    }
                })
                // TO Generate Public view/download drive link
                const result = await drive.files.get({
                    fileId: imageDetails.id,
                    fields: 'webViewLink,  webContentLink'
                })
                imageDetails.browerUrl = GOOGLE_DRIVE_BASEURL + imageDetails.id;
                resolve({...result?.data, ...imageDetails });
            })

        })

        return await Promise.allSettled(changePremissions);
    } catch (error) {
        console.log(error.message);
    }
}

// generatePublicURL();

async function deleteFileFromGoogleDrive(fileId) {

    try {
        const response = await drive.files.delete({ fileId })
        return response
    } catch (err) {
        console.log(err.message);
    }

}

// deleteFile();



module.exports = {
    multer: multer(),
    uploadFileToGoogleDrive,
    deleteFileFromGoogleDrive,
    generatePublicURLOfGoogleDriveFiles
};
