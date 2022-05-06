const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');

var options = {
    auth: {
        api_key: 'S...'

    }
}

const mailer = nodemailer.createTransport(sgTransport(options));



const sendMailTo = async (emailsArr, code) => {
    // console.log(code);
    var email = {
        to: emailsArr, 
        // from: 'ankityadaav772@gmail.com', //registered Email on sendgrid
        from: 'abhardwaj1@kloudrac.com', //registered Email on sendgrid
        subject: 'Newsletter From Ashish and Ankit',
        text: 'Newsletter',
        html: code
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
