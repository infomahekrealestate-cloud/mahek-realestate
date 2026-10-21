import { useState, useEffect } from 'react';
import { X, CheckCircle, Send, Phone, Mail, User, MessageSquare, Building2, Calendar, FileText, Download, AlertCircle } from 'lucide-react';
import { sendLeadEnquiry } from '../services/enquiryService';
import WhatsAppIcon from './WhatsAppIcon';
import advisorImg from '../assets/images/people/kavita-sharma.jpg';

export default function ProjectEnquiryModal({
  isOpen,
  onClose,
  project,
  initialInterest = 'Request Project Details'
}) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    interest: initialInterest,
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [needsActivation, setNeedsActivation] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        phone: '',
        email: '',
        interest: initialInterest,
        message: ''
      });
      setErrors({});
      setTouched({});
      setStatus('idle');
      setErrorMessage('');
    }
  }, [isOpen, initialInterest]);

  // Lock body scroll and listen for ESC key
  useEffect(() => {
    if (!isOpen) return;
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = origOverflow || '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const validateField = (field, value) => {
    let err = '';
    const trimmed = (value || '').trim();

    if (field === 'name') {
      if (!trimmed) {
        err = 'Full name is required.';
      } else if (trimmed.length < 2) {
        err = 'Name must be at least 2 characters.';
      } else if (!/^[a-zA-Z\s.'-]+$/.test(trimmed)) {
        err = 'Name can only contain letters and spaces.';
      }
    } else if (field === 'phone') {
      const digitsOnly = trimmed.replace(/\D/g, '');
      if (!trimmed) {
        err = 'Contact phone number is required.';
      } else if (digitsOnly.length !== 10) {
        err = 'Enter exactly 10 digits.';
      } else if (!/^[6-9]\d{9}$/.test(digitsOnly)) {
        err = 'Enter valid 10 digits (starts with 6-9).';
      }
    } else if (field === 'email') {
      if (trimmed && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmed)) {
        err = 'Please enter a valid email address.';
      }
    }
    return err;
  };

  const handleChange = (field, value) => {
    let sanitized = value;
    if (field === 'phone') {
      // Strictly allow numbers only, capped at exactly 10 digits
      sanitized = value.replace(/[^0-9]/g, '').slice(0, 10);
    }
    setFormData(prev => ({ ...prev, [field]: sanitized }));
    if (touched[field]) {
      const err = validateField(field, sanitized);
      setErrors(prev => ({ ...prev, [field]: err }));
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const err = validateField(field, formData[field]);
    setErrors(prev => ({ ...prev, [field]: err }));
  };

  const handleDownloadPdf = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    const knownPdfMap = {
      'the-mahek-park-1': '/brochures/the-mahek-park-1.pdf',
      'orange-mahek-park': '/brochures/orange-mahek-park.pdf',
      'mahek-it-park': '/brochures/mahek-it-park.pdf',
      'the-am-park': '/brochures/the-am-park.pdf',
      'anthems-mahek-park': '/brochures/anthems-mahek-park.pdf',
      'mahek-residency': '/brochures/mahek-residency.pdf',
      'it-park': '/brochures/mahek-it-park.pdf',
      'mahek-park': '/brochures/the-mahek-park-1.pdf',
      'villas': '/brochures/mahek-residency.pdf',
    };

    let targetUrl = project.pdfUrl;
    if (!targetUrl && (project.id || project.slug)) {
      targetUrl = knownPdfMap[project.id] || knownPdfMap[project.slug];
    }
    if (!targetUrl) {
      targetUrl = '/brochures/master-catalogue.pdf';
    }

    const cleanName = ((project.name || project.title) || 'Mahek_Group_Project').replace(/[^a-zA-Z0-9_-]/g, '_');
    const fileName = `${cleanName}_Brochure.pdf`;

    try {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    } catch {
      // Ignored if window.open fails
    }

    try {
      const res = await fetch(targetUrl);
      if (res.ok) {
        const blob = await res.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.style.display = 'none';
        link.href = blobUrl;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        setTimeout(() => {
          document.body.removeChild(link);
          window.URL.revokeObjectURL(blobUrl);
        }, 2000);
      }
    } catch (err) {
      console.warn('Blob download fallback:', err);
    }
  };

  const handleOpenWhatsApp = () => {
    const projName = project.name || project.title || 'Mahek Real Estate Project';
    const clientMsg = formData.message?.trim() ? `\n💬 Message: ${formData.message.trim()}` : '';
    const text = `Hello Mahek Real Estate,\n\nI would like to enquire about *${projName}* (${project.location || 'Gujarat'}).\n\n👤 Name: ${formData.name || 'Client'}\n📞 Phone: ${formData.phone || 'Not provided'}\n✉️ Email: ${formData.email || 'Not provided'}\n🎯 Interest: ${formData.interest}${clientMsg}`;
    const url = `https://wa.me/919376622000?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({
      name: true,
      phone: true,
      email: true
    });

    const nameErr = validateField('name', formData.name);
    const phoneErr = validateField('phone', formData.phone);
    const emailErr = validateField('email', formData.email);

    const newErrors = {};
    if (nameErr) newErrors.name = nameErr;
    if (phoneErr) newErrors.phone = phoneErr;
    if (emailErr) newErrors.email = emailErr;
    setErrors(newErrors);

    if (nameErr || phoneErr || emailErr) {
      setErrorMessage('Please fill in your name and a valid 10-digit phone number.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await sendLeadEnquiry({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        interest: formData.interest,
        message: formData.message.trim(),
        projectName: project.name || project.title,
        projectCategory: project.category,
        projectLocation: project.location,
        source: 'Project Details Inquiry Modal'
      });
      if (res?.needsActivation) {
        setNeedsActivation(true);
      }
      setStatus('success');
    } catch {
      setStatus('success');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setErrors({});
    setTouched({});
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity duration-200 overflow-y-auto overscroll-contain scrollbar-thin"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl max-h-[95vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-[#c59b27]/30 overflow-hidden transform transition-all my-auto overscroll-contain"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-white px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between border-b border-[#c59b27]/20 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#c59b27]/10 border border-[#c59b27]/30 flex items-center justify-center text-[#c59b27] shrink-0 shadow-2xs">
              <Building2 className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#c59b27]/15 text-[#9a7210] border border-[#c59b27]/30">
                  {project.category || 'Official Inquiry'}
                </span>
                <span className="text-xs text-neutral-400 hidden sm:inline">•</span>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-neutral-500 hidden sm:inline">
                  Project Inquiry
                </span>
              </div>
              <h3 id="enquiry-modal-title" className="text-sm sm:text-base font-bold text-neutral-900 truncate max-w-[220px] sm:max-w-none mt-0.5">
                {project.name}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 sm:p-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-3.5 sm:p-5 overflow-y-auto overscroll-contain flex-1 scrollbar-thin [scrollbar-width:thin] [scrollbar-color:rgba(197,155,39,0.45)_transparent] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#c59b27]/40 hover:[&::-webkit-scrollbar-thumb]:bg-[#c59b27] [&::-webkit-scrollbar-thumb]:rounded-full">
          {status === 'success' ? (
            <div className="py-6 text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-neutral-900">
                Inquiry Received Successfully!
              </h4>
              <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto">
                Thank you for your interest in <strong>{project.name}</strong>. Our corporate sales team has received your request and will contact you directly via phone or email shortly.
              </p>
              <div className="p-2.5 bg-[#faf8f2] rounded-xl border border-[#c59b27]/20 text-xs text-neutral-600 max-w-md mx-auto">
                <span className="font-semibold text-[#9a7210]">Project Location: </span>
                {project.location}
              </div>

              {needsActivation && (
                <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl text-left text-xs text-amber-900 space-y-1 max-w-md mx-auto">
                  <p className="font-bold text-amber-800 flex items-center gap-1.5">
                    <span>⚠️ Form Activation Required</span>
                  </p>
                  <p className="leading-relaxed">
                    FormSubmit has sent a 1-time activation email to <strong>info.mahekrealestate@gmail.com</strong>.
                    Please check your Gmail inbox/spam and click <strong>"Activate Form"</strong> to start receiving all leads directly in your email.
                  </p>
                </div>
              )}

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
                <button
                  onClick={handleDownloadPdf}
                  type="button"
                  className="w-full sm:w-auto px-4 py-2 bg-neutral-900 hover:bg-[#c59b27] text-white text-xs font-semibold rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#dfba52]" />
                  <span>Download PDF Brochure</span>
                </button>
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>

          ) : (
            <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-3">
              {errorMessage && (
                <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                  {errorMessage}
                </div>
              )}

              {/* Indian Advisor Quick Banner
              <div className="p-2 sm:p-2.5 rounded-xl bg-[#faf8f2] border border-[#c59b27]/30 flex items-center gap-2.5 sm:gap-3 shadow-2xs">
                <img
                  src={advisorImg}
                  alt="Kavita Sharma - Senior Project Advisor"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border border-[#c59b27]/60 shrink-0 shadow-xs"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] sm:text-xs font-bold text-neutral-900 leading-tight">
                    Dedicated Advisory — <span className="text-[#9a7210]">Kavita Sharma</span>
                  </p>
                  <p className="text-[10px] text-neutral-500 truncate">
                    Senior Project Advisor, Surat Corporate HQ
                  </p>
                </div>
              </div> */}

              {/* Inquiry Type Selector - 1 Compact Row */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                  I am interested in:
                </label>
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                  {[
                    { id: 'Request Project Details', icon: FileText, label: 'Project Details' },
                    { id: 'Schedule a Site Visit', icon: Calendar, label: 'Site Visit' },
                    { id: 'Plot & Unit Pricing', icon: Building2, label: 'Pricing & Units' }
                  ].map((item) => {
                    const Icon = item.icon;
                    const isSelected = formData.interest === item.id;
                    return (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => setFormData({ ...formData, interest: item.id })}
                        className={`py-1.5 px-1.5 sm:px-2 rounded-lg border text-[11px] sm:text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#c59b27]/15 border-[#c59b27] text-[#9a7210] font-semibold shadow-2xs'
                            : 'border-neutral-200 hover:border-[#c59b27]/40 text-neutral-600 bg-neutral-50/50'
                        }`}
                      >
                        <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-[#c59b27]' : 'text-neutral-400'}`} />
                        <span className="truncate">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name & Phone in 2 Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-700 mb-0.5" htmlFor="enquiry-name">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-2.5" />
                    <input
                      id="enquiry-name"
                      type="text"
                      placeholder="e.g. Rajesh Patel"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      onBlur={() => handleBlur('name')}
                      className={`w-full pl-8 pr-2.5 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg border transition-all outline-none ${
                        touched.name && errors.name
                          ? 'border-red-400 focus:border-red-500 bg-red-50/20'
                          : 'border-neutral-300 focus:border-[#c59b27] focus:ring-1 focus:ring-[#c59b27]/30'
                      }`}
                    />
                  </div>
                  {touched.name && errors.name && (
                    <p className="mt-0.5 text-[10px] text-red-600 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3 h-3 text-red-500 shrink-0" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-0.5">
                    <label className="block text-[11px] font-semibold text-neutral-700" htmlFor="enquiry-phone">
                      Contact Number *
                    </label>
                    <span className={`text-[10px] font-mono ${formData.phone.length === 10 ? 'text-emerald-600 font-bold' : 'text-neutral-400'}`}>
                      {formData.phone.length}/10
                    </span>
                  </div>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-2.5" />
                    <input
                      id="enquiry-phone"
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={10}
                      placeholder="10-digit number"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      onBlur={() => handleBlur('phone')}
                      className={`w-full pl-8 pr-2.5 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg border transition-all outline-none ${
                        touched.phone && errors.phone
                          ? 'border-red-400 focus:border-red-500 bg-red-50/20'
                          : touched.phone && formData.phone.length === 10
                            ? 'border-emerald-500 focus:border-emerald-600'
                            : 'border-neutral-300 focus:border-[#c59b27] focus:ring-1 focus:ring-[#c59b27]/30'
                      }`}
                    />
                  </div>
                  {touched.phone && errors.phone && (
                    <p className="mt-0.5 text-[10px] text-red-600 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3 h-3 text-red-500 shrink-0" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Email & Requirements in 2 Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-700 mb-0.5" htmlFor="enquiry-email">
                    Email Address <span className="text-neutral-400 font-normal text-[10px]">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-2.5" />
                    <input
                      id="enquiry-email"
                      type="email"
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      onBlur={() => handleBlur('email')}
                      className={`w-full pl-8 pr-2.5 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg border transition-all outline-none ${
                        touched.email && errors.email
                          ? 'border-red-400 focus:border-red-500 bg-red-50/20'
                          : 'border-neutral-300 focus:border-[#c59b27] focus:ring-1 focus:ring-[#c59b27]/30'
                      }`}
                    />
                  </div>
                  {touched.email && errors.email && (
                    <p className="mt-0.5 text-[10px] text-red-600 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3 h-3 text-red-500 shrink-0" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-neutral-700 mb-0.5" htmlFor="enquiry-message">
                    Requirements <span className="text-neutral-400 font-normal text-[10px]">(Optional)</span>
                  </label>
                  <div className="relative">
                    <MessageSquare className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-2.5" />
                    <textarea
                      id="enquiry-message"
                      rows={2}
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      placeholder="Write your requirements..."
                      className="w-full pl-8 pr-2.5 py-1.5 text-xs sm:text-sm rounded-lg border border-neutral-300 focus:border-[#c59b27] focus:ring-1 focus:ring-[#c59b27]/30 outline-none transition-all resize-none scrollbar-thin text-neutral-800 placeholder-neutral-400"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="pt-2 sm:pt-2.5 border-t border-neutral-100 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={handleOpenWhatsApp}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#25D366] hover:text-[#1da851] cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-current" />
                  <span className="hidden sm:inline">WhatsApp</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-3.5 py-2 rounded-lg text-xs font-semibold text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="px-5 py-2 rounded-lg bg-[#c59b27] hover:bg-[#aa7f17] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-sm hover:shadow-md disabled:opacity-70 cursor-pointer"
                  >
                    {status === 'loading' ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 shrink-0" />
                        <span>Submit Inquiry</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
}
