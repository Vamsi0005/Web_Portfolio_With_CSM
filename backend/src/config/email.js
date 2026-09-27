import nodemailer from 'nodemailer';
import { config } from './env.js';

let transporter = null;

// Initialize transporter if SMTP credentials are provided
if (config.email.host && config.email.user && config.email.password) {
  transporter = nodemailer.createTransport({
    host: config.email.host,
    port: config.email.port,
    secure: config.email.port === 465,
    auth: {
      user: config.email.user,
      pass: config.email.password
    }
  });
}

/**
 * Attempt to send email notification for contact messages
 * Gracefully falls back to logging if email is unconfigured
 */
export const sendContactNotificationEmail = async ({ name, email, subject, message }) => {
  if (!transporter) {
    console.log(`[Email Service - Dev Mode]: New contact message received from ${name} (${email}): Subject: "${subject}". Body: "${message.substring(0, 100)}..."`);
    return { success: true, mocked: true };
  }

  try {
    const mailOptions = {
      from: config.email.from,
      to: config.email.to,
      subject: `[Portfolio Contact] ${subject} from ${name}`,
      text: `You have received a new contact inquiry:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #4f46e5;">New Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="border: none; border-top: 1px solid #eaeaea; margin: 15px 0;" />
          <p style="white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-radius: 4px;">${message}</p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[Email Service]: Contact notification sent. MessageId: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.warn(`[Email Service Warning]: Failed to send email: ${error.message}. Message saved to DB regardless.`);
    return { success: false, error: error.message };
  }
};
