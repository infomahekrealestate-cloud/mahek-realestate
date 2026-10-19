import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Builds the exact dark-gold luxury HTML email matching the corporate lead format
 */
export function buildLeadEmailHtml({ name, phone, email, interest, project, message, source = 'Website Consultation Request' }) {
  const cleanPhone = (phone || '').replace(/[^0-9]/g, '');
  const cleanMessage = (message || '').trim();

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0c0a09; color: #ffffff; padding: 24px; border-radius: 12px; border: 1px solid #d4af37;">
      <div style="border-bottom: 2px solid #d4af37; padding-bottom: 12px; margin-bottom: 20px;">
        <h2 style="color: #fbe285; margin: 0; font-size: 20px; font-weight: bold;">✨ New Mahek Real Estate Consultation Lead</h2>
        <p style="color: #a8a29e; font-size: 12px; margin: 4px 0 0 0;">Received from Website (${source})</p>
      </div>
      
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr style="border-bottom: 1px solid #292524;">
          <td style="padding: 10px 0; color: #a8a29e; width: 35%;">Client Name:</td>
          <td style="padding: 10px 0; font-weight: bold; color: #ffffff;">${name}</td>
        </tr>
        <tr style="border-bottom: 1px solid #292524;">
          <td style="padding: 10px 0; color: #a8a29e;">Mobile Number:</td>
          <td style="padding: 10px 0; font-weight: bold; color: #fbe285;">
            <a href="tel:+91${cleanPhone}" style="color: #fbe285; text-decoration: none;">+91 ${cleanPhone}</a>
          </td>
        </tr>
        ${email ? `
        <tr style="border-bottom: 1px solid #292524;">
          <td style="padding: 10px 0; color: #a8a29e;">Email Address:</td>
          <td style="padding: 10px 0; color: #ffffff;">
            <a href="mailto:${email}" style="color: #ffffff; text-decoration: underline;">${email}</a>
          </td>
        </tr>` : ''}
        <tr style="border-bottom: 1px solid #292524;">
          <td style="padding: 10px 0; color: #a8a29e;">Business Division:</td>
          <td style="padding: 10px 0; color: #ffffff;">${interest}</td>
        </tr>
        <tr style="border-bottom: 1px solid #292524;">
          <td style="padding: 10px 0; color: #a8a29e;">Interested Project:</td>
          <td style="padding: 10px 0; color: #ffffff;">${project}</td>
        </tr>
        ${cleanMessage ? `
        <tr>
          <td style="padding: 12px 0 0 0; color: #a8a29e; vertical-align: top;">Requirements:</td>
          <td style="padding: 12px 0 0 0; color: #f5f5f4; white-space: pre-line;">${cleanMessage}</td>
        </tr>` : ''}
      </table>

      <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #292524; text-align: center;">
        <a href="https://wa.me/91${cleanPhone}?text=Hello%20${encodeURIComponent(name)},%20thank%20you%20for%20contacting%20Mahek%20Real%20Estate.%20We%20received%20your%20inquiry%20regarding%20${encodeURIComponent(project)}." style="background: #22c55e; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: bold; display: inline-block;">
          📱 Quick Reply on WhatsApp
        </a>
      </div>
    </div>
  `;
}

/**
 * Dispatches the email via SMTP Nodemailer
 */
export async function sendEnquiryEmail(payload) {
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = process.env.SMTP_PORT || 587;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const recipientEmail = process.env.ENQUIRY_RECIPIENT_EMAIL || 'cse.22084013125@gmail.com';

  if (!smtpUser || !smtpPass) {
    return {
      success: false,
      needsConfig: true,
      error: 'SMTP credentials not configured in .env'
    };
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: Number(smtpPort),
    secure: Number(smtpPort) === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass
    }
  });

  const mailHtml = buildLeadEmailHtml(payload);
  const mailSubject = `✨ New Mahek Real Estate Lead: ${payload.name} (${payload.project || 'General Enquiry'})`;

  await transporter.sendMail({
    from: `"Mahek Real Estate Portal" <${smtpUser}>`,
    to: recipientEmail,
    replyTo: payload.email || undefined,
    subject: mailSubject,
    html: mailHtml
  });

  return { success: true };
}
