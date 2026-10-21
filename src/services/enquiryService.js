/**
 * Centralized Enquiry Submission Service
 * Directs all customer inquiries to info.mahekrealestate@gmail.com
 * Multi-layer delivery:
 * 1. Direct FormSubmit AJAX delivery to info.mahekrealestate@gmail.com
 * 2. Local /api/enquiry SMTP delivery (Nodemailer)
 * 3. Web3Forms fallback
 */

const RECIPIENT_EMAIL = 'info.mahekrealestate@gmail.com';

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
  let deliveryMethod = 'none';

  // 1. Primary Direct Delivery: SMTP Gateway via local /api/enquiry (Nodemailer)
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
        message: clientMessage || 'Interested in brochure, pricing and plot/office availability',
        source: formSource,
        recipient: RECIPIENT_EMAIL
      })
    });

    if (apiRes.ok) {
      const apiData = await apiRes.json().catch(() => ({}));
      if (apiData.success) {
        return { 
          success: true, 
          delivered: true, 
          method: 'smtp',
          recipient: apiData.recipient || RECIPIENT_EMAIL 
        };
      }
    } else {
      console.warn('Primary SMTP returned status:', apiRes.status);
    }
  } catch (err) {
    console.warn('Primary SMTP attempt failed, falling back to backup gateways:', err);
  }

  // 2. Secondary Direct Delivery: FormSubmit AJAX (Delivers directly to info.mahekrealestate@gmail.com)
  try {
    const fsRes = await fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: `[NEW LEAD] ${projectName} - ${clientName} (${clientPhone})`,
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
      deliveryMethod = 'formsubmit';
    }

    if (needsActivation) {
      console.warn('FormSubmit requires one-time email activation at:', RECIPIENT_EMAIL);
    }
  } catch (err) {
    console.warn('FormSubmit backup attempt failed:', err);
  }

  // 3. Fallback: Web3Forms Browser Submission (if access key is configured)
  const web3Key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  if (!delivered && web3Key && web3Key !== 'YOUR_ACCESS_KEY_HERE') {
    try {
      const w3Res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: web3Key,
          subject: `[NEW LEAD] ${projectName} - ${clientName} (${clientPhone})`,
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
        deliveryMethod = 'web3forms';
      }
    } catch (err) {
      console.warn('Web3Forms backup attempt failed:', err);
    }
  }

  return { 
    success: true, 
    delivered, 
    method: deliveryMethod,
    needsActivation: !delivered,
    recipient: RECIPIENT_EMAIL 
  };
}

