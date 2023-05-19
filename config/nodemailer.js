const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:'shahbazpashauoh@gmail.com',
        pass:'jowgotamesftmacm'
    }
});
module.exports = {
    transporter:transporter
}