var nodemailer = require('nodemailer');
const { google } = require('googleapis');
const xoauth2 = require('xoauth2')
var smtpTransport = require('nodemailer-smtp-transport');


// These id's and secrets should come from .env file.
const CLIENT_ID = '918008179236-0qs4oec00kggg4lv9l4draao1qk6krvn.apps.googleusercontent.com';
const CLEINT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04oKBDpQZ0Bg9CgYIARAAGAQSNwF-L9IrDQbaSAWA6zeY4dhdhyk0aEAhat0IzIVJjwrceHBq4B8Rm-2tbDaxONZc80p0d6FFy98';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail(emailsArr,code) {
    console.log("success",emailsArr,code);
    try {
      const accessToken = await oAuth2Client.getAccessToken();

      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'newsletter@kloudrac.com',
          clientId: CLIENT_ID,
          clientSecret: CLEINT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });
  
      const mailOptions = {
        from: 'newsletter@kloudrac.com',
        to: emailsArr,
        subject: 'Newsletter',
        text: 'Newsletter from Kloudrac',
        html: code
      };
  
      console.log("result","result")
      const result = await transport.sendMail(mailOptions);
      console.log("result",result)
      return result;
    } catch (error) {
      return error;
    }
  }

  
  module.exports = sendMail;
//   sendMail();


