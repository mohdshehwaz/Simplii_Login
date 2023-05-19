const nodemailer = require('../config/nodemailer');

exports.sendMail = (user,randomStr) => {
    nodemailer.transporter.sendMail({
        from:'shahbazpashauoh@gmail.com',
        to:user.email,
        subject:'OTP',
        html:`<h1>Your New OTP is <h1/>
            <p>${randomStr}<p/>
        `
    },(err,info) => {
        if(err){
            console.log("Error in sending mail",err);
            return;
        }
        console.log("Email has been successfully send", info);
        return;
    });
}