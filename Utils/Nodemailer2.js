var nodemailer = require('nodemailer');
const { google } = require('googleapis');
// const newsletter =require('../Storage/ashish')


// These id's and secrets should come from .env file.
const CLIENT_ID = '525209363917-fi16gne2m0nv9ckgmpcinpg4fa13bklb.apps.googleusercontent.com';
const CLEINT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04sl2PjYOpojyCgYIARAAGAQSNwF-L9IryBjiL1sUDd3hiJ47RIWMbnbFE1QNgjHlKZBRBhG0SL2E7IfSURbq7mXRKkHsUbrLVmE';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail(emailsArr,code) {
    console.log("success",emailsArr);
    try {
      const accessToken = await oAuth2Client.getAccessToken();
  
      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'Newsletter@kloudrac.com',
          clientId: CLIENT_ID,
          clientSecret: CLEINT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });
  
      const mailOptions = {
        from: 'Newsletter@kloudrac.com',
        to: emailsArr,
        subject: 'Newsletter',
        text: 'Newsletter from kloudrac',
        html: code
      };
  
      const result = await transport.sendMail(mailOptions);
      return result;
    } catch (error) {
      return error;
    }
  }

  
  module.exports = sendMail;
//   sendMail();


