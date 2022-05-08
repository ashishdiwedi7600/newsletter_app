var nodemailer = require('nodemailer');
const { google } = require('googleapis');
// const newsletter =require('../Storage/ashish')


// These id's and secrets should come from .env file.
const CLIENT_ID = '449203691628-4md32e6jnpti5lopaipnfbupomfc36us.apps.googleusercontent.com';
const CLEINT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04sJcE-XeFEyNCgYIARAAGAQSNwF-L9IrSDWxHGo27-FIlKx4bobWSLFzsW3cIP214vEn4FQlW1d73_RAkx5xTG9oNHN2iPGQ0UQ';

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
          user: 'adiwedi1@kloudrac.com',
          clientId: CLIENT_ID,
          clientSecret: CLEINT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });
  
      const mailOptions = {
        from: 'adiwedi1@kloudrac.com',
        to: emailsArr,
        subject: 'Newsletter',
        text: 'Hello from gmail email using API',
        // html: code
      };
  
      const result = await transport.sendMail(mailOptions);
      return result;
    } catch (error) {
      return error;
    }
  }

  
  module.exports = sendMail;
//   sendMail();


