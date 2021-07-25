const nodemailer = require('nodemailer')

const sendEmail = async (receiverEmail, output) => {	    
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "bkdanang.tutor@gmail.com", 
                pass: "bkdntutor"
            }
        })
        let mailOptions = {
            from: '"DNTutor"', //Email người gửi
            to: receiverEmail, 
            subject: '------Thông báo nhận lớp-----',         
            html: output,
        }
        let info = await transporter.sendMail(mailOptions)
        console.log('Message sent: %s', info.messageId);
    } catch(error) {
        throw error
    }
}
module.exports = {
    sendEmail
}