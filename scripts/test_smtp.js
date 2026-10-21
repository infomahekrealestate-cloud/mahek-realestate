import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { verifySmtpConnection, sendEnquiryEmail } from '../server/mailer.js';

dotenv.config();

async function run() {
  console.log('\n======================================================');
  console.log('       MAHEK REAL ESTATE — SMTP DIAGNOSTIC TEST       ');
  console.log('======================================================\n');

  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = process.env.SMTP_PORT || '587';
  const user = process.env.SMTP_USER || '(not set)';
  const pass = (process.env.SMTP_PASS || '').trim().replace(/\s+/g, '');
  const recipient = process.env.ENQUIRY_RECIPIENT_EMAIL || user;

  console.log('Current Configuration in .env:');
  console.log(`• SMTP Host:      ${host}`);
  console.log(`• SMTP Port:      ${port}`);
  console.log(`• SMTP User:      ${user}`);
  console.log(`• SMTP Pass:      ${pass ? `${pass.substring(0, 4)}••••••••${pass.substring(pass.length - 4)} (${pass.length} chars)` : '(empty)'}`);
  console.log(`• Recipient Mail: ${recipient}\n`);

  console.log('Testing SMTP connection handshake...');
  const verifyResult = await verifySmtpConnection();

  if (verifyResult.success) {
    console.log('✅ SMTP Handshake Successful! Connected to server.\n');
    console.log(`Sending sample test inquiry email to ${recipient}...`);

    try {
      const sendResult = await sendEnquiryEmail({
        name: 'Mahek SMTP Test Lead',
        phone: '9876543210',
        email: 'client@example.com',
        project: 'Mahek IT Park',
        interest: 'Commercial IT Space',
        message: 'This is a test message to confirm your website SMTP lead delivery is working.',
        source: 'SMTP Verification Diagnostic'
      });

      if (sendResult.success) {
        console.log(`\n🎉 SUCCESS! Test email delivered to ${recipient}`);
        console.log('Please check your inbox (and Spam folder if first time).\n');
      } else {
        console.error('❌ Failed to dispatch test email:', sendResult.error);
      }
    } catch (sendErr) {
      console.error('❌ Exception during sending:', sendErr.message);
    }
  } else {
    console.log('❌ Connection Failed!\n');
    console.log('Error Details:', verifyResult.error);
    console.log('\n------------------------------------------------------');
    console.log('HOW TO FIX:');
    if (host.includes('gmail.com')) {
      console.log('1. For Gmail, Google requires an "App Password" (not your normal account password):');
      console.log('   - Step 1: Turn ON 2-Step Verification in Google Account: https://myaccount.google.com/security');
      console.log('   - Step 2: Open App Passwords: https://myaccount.google.com/apppasswords');
      console.log('   - Step 3: Name it "Mahek Group", click Create, and copy the 16-character password.');
      console.log('   - Step 4: Paste it into .env as:');
      console.log('             SMTP_PASS=your16charpassword');
    } else {
      console.log('1. Verify your SMTP credentials with your email host (Hostinger, cPanel, Zoho, etc.):');
      console.log('   - Ensure SMTP_HOST, SMTP_PORT (465 SSL or 587 TLS), SMTP_USER and SMTP_PASS are correct.');
    }
    console.log('------------------------------------------------------\n');
  }
}

run();
