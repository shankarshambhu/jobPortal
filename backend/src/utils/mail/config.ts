import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "shankarshambhu13870@gmail.com",
        pass: "oxqh sppv zkck juwj", // app password
    },
});
