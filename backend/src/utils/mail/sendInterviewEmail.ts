import { transporter } from "./config";

export const sendInterviewEmail = async (
    candidateEmail: string,
    candidateName: string,
    jobTitle: string,
    scheduledTime: string
) => {
    try {
        const htmlContent = `
      <p>Hi ${candidateName},</p>
      <p>Congratulations! You have been shortlisted for the <strong>${jobTitle}</strong> position.</p>
      <p>Your interview is scheduled for: <strong>${new Date(
            scheduledTime
        ).toLocaleString()}</strong></p>
      <p>Good luck!</p>
      <p>– Job Portal Team</p>
    `;

        await transporter.sendMail({
            from: '"Job Portal" <shankarshambhu13870@gmail.com>',
            to: candidateEmail,
            subject: `Interview Scheduled: ${jobTitle}`,
            html: htmlContent,
        });

        console.log(`Interview email sent to ${candidateEmail}`);
    } catch (error) {
        console.error("Error sending interview email:", error);
        throw new Error("Email could not be sent");
    }
};
