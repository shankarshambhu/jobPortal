import sgMail from "@sendgrid/mail";

// Set SendGrid API key from environment variable
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export default sgMail;
