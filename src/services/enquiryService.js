/**
 * Centralized Enquiry Submission Service
 * Directs all customer inquiries to cse.22084013125@gmail.com
 * Multi-layer delivery:
 * 1. Direct FormSubmit AJAX delivery to cse.22084013125@gmail.com
 * 2. Local /api/enquiry SMTP delivery (Nodemailer)
 * 3. Web3Forms fallback
 */

const RECIPIENT_EMAIL = 'cse.22084013125@gmail.com';

export async function sendLeadEnquiry(payload) {
  const clientName = payload.name || payload['Client Name'] || 'Prospective Client';
  const clientPhone = payload.phone || payload['Mobile Number'] || '';
  const clientEmail = payload.email || payload['Email Address'] || '';
  const projectName = payload.projectName || payload.project || payload['Project Name'] || 'Mahek Real Estate Portfolio';
  const interestType = payload.interest || payload.projectCategory || payload['Inquiry Interest'] || 'Project Details & Availability';
  const clientMessage = (payload.message || payload['Client Message / Requirements'] || '').trim();
  const formSource = payload.source || 'Website Lead Portal';

  const now = new Date();
  const formattedDate = now.toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  let delivered = false;

  // 1. Primary Direct Delivery: FormSubmit AJAX (Delivers directly to cse.22084013125@gmail.com)
  try {
    const fsRes = await fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: `✨ [NEW LEAD] ${projectName} - ${clientName} (${clientPhone})`,
        _template: 'table',
        _captcha: 'false',
        '🏢 Organization': 'MAHEK REAL ESTATE',
        '👤 Client Name': clientName,
        '📞 Phone Number': clientPhone ? `+91 ${clientPhone.replace(/[^0-9]/g, '')}` : 'Not provided',
        '✉️ Email Address': clientEmail || 'Not provided',
        '🏗️ Interested Project': projectName,
        '🏷️ Category / Inquiry Type': interestType,
        '💬 Requirements / Note': clientMessage || 'Interested in brochure, pricing and plot/office availability',
        '📍 Source': formSource,
        '📅 Submission Time': `${formattedDate} IST`
      })
    });

    const fsData = await fsRes.json().catch(() => ({}));
    const isSuccess = fsData.success === 'true' || fsData.success === true;
    const needsActivation = Boolean(
      !isSuccess && 
      fsData.message && 
      fsData.message.toLowerCase().includes('activation')
    );

    if (isSuccess) {
      delivered = true;
    }

    if (needsActivation) {
      console.warn('FormSubmit requires one-time email activation at:', RECIPIENT_EMAIL);
    }
  } catch (err) {
    console.warn('FormSubmit network attempt:', err);
  }

  // 2. Web3Forms Browser Submission (if access key is configured)
  const web3Key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  if (web3Key && web3Key !== 'YOUR_ACCESS_KEY_HERE') {
    try {
      const w3Res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: web3Key,
          subject: `✨ [NEW LEAD] ${projectName} - ${clientName} (${clientPhone})`,
          from_name: 'Mahek Real Estate Portal',
          name: clientName,
          phone: clientPhone,
          email: clientEmail,
          project: projectName,
          interest: interestType,
          message: clientMessage || 'Interested in brochure, pricing and plot/office availability',
          source: formSource,
          date: `${formattedDate} IST`
        })
      });
      const w3Data = await w3Res.json().catch(() => ({}));
      if (w3Res.ok && (w3Data.success === true || w3Data.success === 'true')) {
        delivered = true;
      }
    } catch (err) {
      console.warn('Web3Forms dispatch attempt:', err);
    }
  }

  // 3. Secondary Delivery: Local /api/enquiry endpoint (if SMTP is configured in .env)

  try {
    const apiRes = await fetch('/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: clientName,
        phone: clientPhone,
        email: clientEmail,
        project: projectName,
        interest: interestType,
        message: clientMessage,
        source: formSource,
        recipient: RECIPIENT_EMAIL
      })
    });

    if (apiRes.ok) {
      const apiData = await apiRes.json().catch(() => ({}));
      if (apiData.success) {
        delivered = true;
      }
    }
  } catch (err) {
    // Graceful fallback
  }

  return { 
    success: true, 
    delivered, 
    needsActivation: !delivered,
    recipient: RECIPIENT_EMAIL 
  };
}

