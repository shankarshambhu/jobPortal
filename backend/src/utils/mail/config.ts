import nodemailer from "nodemailer";

// Create transporter using Gmail and environment variables
export const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // app password
    },
});

// Verify SMTP connection on startup
transporter.verify((err, success) => {
    if (err) {
        console.error("SMTP connection failed:", err);
    } else {
        console.log("SMTP ready to send emails");
    }
});
