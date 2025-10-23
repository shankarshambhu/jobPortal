import sgMail from "./config";

export const sendInterviewEmail = async (
    candidateEmail: string,
    candidateName: string,
    jobTitle: string,
    scheduledTime: string
) => {
    try {
        const msg = {
            to: candidateEmail,
            from: process.env.EMAIL_USER!, // e.g., no-reply@yourdomain.com
            subject: `Interview Scheduled: ${jobTitle}`,
            html: `
        <p>Hi ${candidateName},</p>
        <p>Congratulations! You have been shortlisted for the <strong>${jobTitle}</strong> position.</p>
        <p>Your interview is scheduled for: <strong>${new Date(
                scheduledTime
            ).toLocaleString()}</strong></p>
        <p>Good luck!</p>
        <p>– Job Portal Team</p>
      `,
        };

        const response = await sgMail.send(msg);
        console.log(`Interview email sent to ${candidateEmail}`);
        return response;
    } catch (error: any) {
        console.error("Error sending interview email:", error.response?.body || error);
        throw new Error("Email could not be sent");
    }
};
