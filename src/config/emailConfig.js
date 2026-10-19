// Web3Forms Email Configuration
// ============================================================
// To receive form enquiries directly to your email inbox:
// 1. Visit: https://web3forms.com
// 2. Enter your desired recipient email address to generate a free Access Key
// 3. Paste the Access Key below, or add VITE_WEB3FORMS_ACCESS_KEY to your .env file
// ============================================================

export const EMAIL_CONFIG = {
  // Enter your Web3Forms Access Key here
  accessKey: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || 'YOUR_ACCESS_KEY_HERE',

  // Default corporate email
  recipientEmail: 'cse.22084013125@gmail.com',

  // Email subject line for incoming messages
  emailSubject: 'New Lead: Mahek Real Estate Website Enquiry'
};
