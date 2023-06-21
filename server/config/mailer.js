const nodemailer = require('nodemailer');
const cron = require('node-cron');

exports.sendMail = (mailTo, textMail, schedule = false) => {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'tamihamalka@gmail.com',
            pass: 'xxxxxxxxxxxxx' //סיסמת אפליקציה
        }
    });

    let mailOptions = {
        from: 'tamihamalka@gmail.com',
        to: mailTo,
        subject: 'נשלחה לך הודעה מאתר שידוכים',
        text: textMail
    };
    
    if (schedule) { //קוד זה מתזמן את השליחה פעם בחודש
        cron.schedule('0 0 1 * *', () => {
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            })
        });
    }
    else { //שליחת מייל ללא תזמון
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        })
    }
}


