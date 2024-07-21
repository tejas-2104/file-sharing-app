const nodemailer = require('nodemailer');

const sendEmail = async (receiver, downloadLink) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: receiver,
        subject: 'File Download Link',
        text: `You can download your file using this link: ${downloadLink}`
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
