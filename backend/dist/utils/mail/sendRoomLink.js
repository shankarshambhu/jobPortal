"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRoomLink = void 0;
const config_1 = require("./config");
const sendRoomLink = async (params) => {
    const { candidateEmail, candidateName, jobTitle, roomLink } = params;
    try {
        const htmlContent = `
      <p>Hi ${candidateName},</p>
      <p>Join the interview using this link:</p>
      <p><a href="${roomLink}" target="_blank">Click here to join the interview</a></p>
      <p>– Job Portal Team</p>
    `;
        await config_1.transporter.sendMail({
            from: '"Job Portal" <shankarshambhu13870@gmail.com>',
            to: candidateEmail,
            subject: `Your Video Interview Link: ${jobTitle}`,
            html: htmlContent,
        });
        console.log(`Video room link email sent to ${candidateEmail}`);
    }
    catch (error) {
        console.error("Error sending room link email:", error);
        throw new Error("Room link email could not be sent");
    }
};
exports.sendRoomLink = sendRoomLink;
