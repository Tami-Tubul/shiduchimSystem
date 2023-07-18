const nodemailer = require('nodemailer');
const cron = require('node-cron');

exports.sendMail = (mailTo, textMail) => {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'tamihamalka@gmail.com',
            pass: 'xxxxxxxxxxxxxxxxxxxx' //סיסמת אפליקציה
        }
    });

    let mailOptions = {
        from: 'tamihamalka@gmail.com',
        to: mailTo,
        subject: 'נשלחה לך הודעה מאתר שידוכים',
        text: textMail
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
}



