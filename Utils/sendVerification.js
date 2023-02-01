var nodemailer = require('nodemailer');
const { google } = require('googleapis');
const xoauth2 = require('xoauth2')
var smtpTransport = require('nodemailer-smtp-transport');


// These id's and secrets should come from .env file.
const CLIENT_ID = '211863108246-muggar9udbf4h48g1vgu1t6j4n8lhktu.apps.googleusercontent.com';
const CLEINT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04cmpQbMXR3YbCgYIARAAGAQSNwF-L9IrLvJP1A5TTacFw-27TD6M4Tok5uEKwcthf8rVeAZzqz0kPksHAtkTsIUula5Rys3kNy8';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail(emailsArr,code) {
    // console.log("success",emailsArr,code);
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
        subject: 'PLease Verify Your Account',
        text: 'Newsletter from Kloudrac',
        html: code
        // html: `<button onclick="alert("hi this is warning")"  link="www.google.com">Google1</button>`
      };
  
    //   console.log("result","result")
      const result = await transport.sendMail(mailOptions);
    //   console.log("result",result)
      return result;
    } catch (error) {
      return error;
    }
  }

  
  module.exports = sendMail;
//   sendMail();


