import sgMail from "./config";

type RoomLinkParams = {
    candidateEmail: string;
    candidateName: string;
    jobTitle: string;
    roomLink: string;
};

export const sendRoomLink = async (params: RoomLinkParams) => {
    const { candidateEmail, candidateName, jobTitle, roomLink } = params;

    try {
        // Ensure 'from' is never undefined
        const fromEmail = process.env.EMAIL_USER!;

        const htmlContent = `
      <p>Hi ${candidateName},</p>
      <p>Join the interview using this link:</p>
      <p><a href="${roomLink}" target="_blank">Click here to join the interview</a></p>
      <p>– Job Portal Team</p>
    `;

        const msg = {
            to: candidateEmail,
            from: fromEmail,
            subject: `Your Video Interview Link: ${jobTitle}`,
            html: htmlContent,
        };

        const response = await sgMail.send(msg);
        console.log(`Video room link email sent to ${candidateEmail}`);
        return response;
    } catch (error: any) {
        console.error("Error sending room link email:", error.response?.body || error);
        throw new Error("Room link email could not be sent");
    }
};
