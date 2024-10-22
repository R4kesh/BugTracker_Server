import nodemailer from "nodemailer";

const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendOtpEmail = async (email, otp) => {
    console.log("ok");

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "testtdemoo11111@gmail.com",
            pass: "wikvaxsgqyebphvh",
        },
    });

    let mailOptions = {
        from: "rahithkr3@gmail.com",
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP code is ${otp}`,
    };
    console.log("mailOptions", mailOptions);

    await transporter.sendMail(mailOptions);
};

export { generateOtp, sendOtpEmail };
