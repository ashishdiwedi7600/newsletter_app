const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');

var options = {
    auth: {
        //take it from sendgrid (https://app.sendgrid.com) 
        api_key: 'jbdsajbjbkjbdkj'
    }
}

const mailer = nodemailer.createTransport(sgTransport(options));


const emailTemplate = (verifyCode) => ` ${verifyCode} `;

const sendMailTo = async (emailsArr, code) => {
    var email = {
        to: emailsArr,
        from: 'ankityadaav772@gmail.com', //registered Email on sendgrid
        subject: 'Newsletter From Ashish and Ankit',
        text: 'Awesome sauce',
        html: emailTemplate(JSON.parse(code)) 
    };

    const result = new Promise((resolve, reject) => {

        mailer.sendMail(email, function (err, res) {
            if (err) {
                reject(err)
            }
            resolve(res)
        });

    })

    return await result

}

module.exports = sendMailTo;
