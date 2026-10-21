import { useState } from 'react';
import {
  Phone, Mail, MapPin, Clock, Send,
  CheckCircle2, AlertCircle
} from 'lucide-react';
import { EMAIL_CONFIG } from '../config/emailConfig';
import { sendLeadEnquiry } from '../services/enquiryService';
import advisorImg from '../assets/images/people/kavita-sharma.jpg';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'real-estate',
    project: 'Mahek IT Park',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validateField = (field, value) => {
    let err = '';
    const trimmed = (value || '').trim();

    if (field === 'name') {
      if (!trimmed) {
        err = 'Your full name is required.';
      } else if (trimmed.length < 2) {
        err = 'Name must be at least 2 characters.';
      } else if (!/^[a-zA-Z\s.'-]+$/.test(trimmed)) {
        err = 'Name can only contain letters, spaces, and hyphens.';
      }
    } else if (field === 'email') {
      if (!trimmed) {
        err = 'Email address is required.';
      } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmed)) {
        err = 'Please enter a valid email address (e.g. name@domain.com).';
      }
    } else if (field === 'phone') {
      const digitsOnly = trimmed.replace(/[^0-9]/g, '');
      if (!trimmed) {
        err = 'Contact phone number is required.';
      } else if (digitsOnly.length !== 10) {
        err = 'Phone number must be exactly 10 digits.';
      }
    } else if (field === 'message') {
      if (trimmed && trimmed.length < 5) {
        err = 'Message must be at least 5 characters.';
      }
    }

    return err;
  };

  const handleChange = (field, value) => {
    let sanitizedValue = value;
    if (field === 'phone') {
      // Allow only numbers and cap at exactly 10 digits
      sanitizedValue = value.replace(/[^0-9]/g, '').slice(0, 10);
    }
    setFormData(prev => ({ ...prev, [field]: sanitizedValue }));
    if (touched[field]) {
      const err = validateField(field, sanitizedValue);
      setErrors(prev => ({ ...prev, [field]: err }));
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const err = validateField(field, formData[field]);
    setErrors(prev => ({ ...prev, [field]: err }));
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ['name', 'email', 'phone'];
    requiredFields.forEach(f => {
      const err = validateField(f, formData[f]);
      if (err) newErrors[f] = err;
    });
    if (formData.message.trim()) {
      const msgErr = validateField('message', formData.message);
      if (msgErr) newErrors.message = msgErr;
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({
      name: true,
      email: true,
      phone: true,
      message: true
    });

    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      return;
    }

    setLoading(true);
    setSubmitError('');

    try {
      const segmentMap = {
        'real-estate': 'Real Estate & Development (Mahek Realty)',
        'hospitality': 'Hospitality (Hilton Garden Inn Surat)',
        'textiles': 'Technical Textiles (Scap Group)',
        'pharma': 'Pharmaceuticals (Mahek Life Science)',
        'diamonds': 'Lab-Grown Diamonds (Omit Diamond)',
        'joint-venture': 'Joint Ventures & Strategic Investment',
        'other': 'General Corporate Inquiry'
      };

      const segmentName = segmentMap[formData.interest] || formData.interest;

      await sendLeadEnquiry({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        interest: segmentName,
        project: formData.project,
        message: formData.message,
        source: 'Website (Consultation Request Form)'
      });

      setSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitError('Network error connecting to email service. Please try again or reach out directly via phone.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      interest: 'real-estate',
      project: 'Mahek IT Park',
      message: ''
    });
    setErrors({});
    setTouched({});
    setSubmitError('');
  };

  return (
    <section id="contact" className="py-5 md:py-6 bg-white relative overflow-hidden">
      {/* Decorative Aura */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#c59b27]/8 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-4 md:mb-5">
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-neutral-900 tracking-tight">
            Start Your Real Estate <br />
            <span className="gold-gradient-text">Journey Today</span>
          </h2>
          <p className="mt-2 text-neutral-600 text-xs sm:text-sm md:text-base leading-relaxed font-normal">
            Whether you are acquiring a luxury home, seeking an off-plan investment, or discussing a joint development, our team is at your service.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">

          {/* Left Column: Direct Info & Location */}
          <div className="lg:col-span-5 space-y-4">

            <div className="p-4 sm:p-6 md:p-7 rounded-2xl bg-white border border-[#c59b27]/30 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold font-serif text-neutral-900 mb-3 sm:mb-4">
                Corporate Headquarters
              </h3>

              <div className="space-y-3.5">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#c59b27]/10 border border-[#c59b27]/30 flex items-center justify-center flex-shrink-0 text-[#9a7210]">
                    <MapPin className="w-4 h-4 text-[#c59b27]" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#9a7210] font-bold block mb-0.5">
                      Executive Office
                    </span>
                    <p className="text-xs sm:text-sm text-neutral-900 font-bold">
                      Mahek IT Park, OPP. R.J.D Business Hub
                    </p>
                    <p className="text-[11px] text-neutral-500 mt-0.5 leading-snug">
                      F.P. No. 11, T.P.S. No. 03 Katargam, Opp. Kash Nagar, Near Kiran Hospital, Surat, Gujarat - 395004
                    </p>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#c59b27]/10 border border-[#c59b27]/30 flex items-center justify-center flex-shrink-0 text-[#9a7210]">
                    <Phone className="w-4 h-4 text-[#c59b27]" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#9a7210] font-bold block mb-0.5">
                      Direct Hotline
                    </span>
                    <a href="tel:+919377744633" className="text-sm font-bold text-neutral-900 hover:text-[#9a7210] transition-colors block">
                      +91 93777 44633
                    </a>
                    <p className="text-[11px] text-neutral-500 mt-0.5">
                      Alt: +91 75674 41177
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#c59b27]/10 border border-[#c59b27]/30 flex items-center justify-center flex-shrink-0 text-[#9a7210]">
                    <Mail className="w-4 h-4 text-[#c59b27]" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#9a7210] font-bold block mb-0.5">
                      Corporate Email
                    </span>
                    <a href="mailto:info.mahekrealestate@gmail.com" className="text-xs sm:text-sm font-bold text-neutral-900 hover:text-[#9a7210] transition-colors block">
                      info.mahekrealestate@gmail.com
                    </a>
                    <p className="text-[11px] text-neutral-500 mt-0.5">
                      Official correspondence & investor relations
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#c59b27]/10 border border-[#c59b27]/30 flex items-center justify-center flex-shrink-0 text-[#9a7210]">
                    <Clock className="w-4 h-4 text-[#c59b27]" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#9a7210] font-bold block mb-0.5">
                      Office Hours
                    </span>
                    <p className="text-xs text-neutral-700 font-medium">
                      Monday - Saturday: 9:30 AM – 7:00 PM IST
                    </p>
                    <p className="text-[11px] text-neutral-500 font-medium">
                      Sunday: Closed
                    </p>
                  </div>
                </div>

              </div>

              {/* Private Viewing Callout */}
              <div className="mt-4 pt-3.5 border-t border-neutral-200 bg-white rounded-xl p-3 border border-[#c59b27]/20">
                <span className="text-[11px] font-bold text-[#9a7210] block mb-0.5">
                  Surat Corporate Head Office
                </span>
                <p className="text-[11px] text-neutral-600 leading-relaxed font-normal">
                  In-person executive meetings, commercial leasing discussions, and joint venture consultations are hosted at Mahek IT Park, Katargam.
                </p>
              </div>

            </div>

            {/* Dedicated Senior Client Advisor Card
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#c59b27]/30 hover:border-[#c59b27] transition-all flex items-center gap-4 shadow-sm hover:shadow-md">
              <img
                src={advisorImg}
                alt="Kavita Sharma - Senior Real Estate & Investment Advisor"
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-[#c59b27]/60 shadow-xs flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#9a7210] block">
                  Dedicated Client Desk
                </span>
                <h4 className="text-sm sm:text-base font-bold font-serif text-neutral-900 truncate">
                  Kavita Sharma
                </h4>
                <p className="text-xs text-neutral-600 font-medium truncate">
                  Senior Real Estate & Investment Advisor
                </p>
                <div className="flex items-center gap-3 mt-1.5 text-[11px] text-[#9a7210] font-semibold">
                  <a href="tel:+919377744633" className="hover:underline flex items-center gap-1">
                    <Phone className="w-3 h-3 text-[#c59b27]" />
                    <span>Call Advisory</span>
                  </a>
                  <span>•</span>
                  <a
                    href="https://wa.me/919376622000?text=Hello%20Kavita%2C%20I%20would%20like%20to%20discuss%20Mahek%20Group%20developments."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-emerald-600 font-bold flex items-center gap-1"
                  >
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div> */}

          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="p-4 sm:p-6 md:p-7 rounded-2xl bg-white border border-[#c59b27]/30 hover:shadow-xl transition-shadow duration-300">

              <div className="mb-4">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold font-serif text-neutral-900 mb-0.5">
                  Send a Message
                </h3>
                <p className="text-xs text-neutral-500">
                  Please complete the details below and an advisory specialist will reach out shortly.
                </p>
              </div>

              {submitted ? (
                <div className="py-8 text-center space-y-3 animate-in fade-in duration-500">
                  <div className="w-12 h-12 rounded-full bg-white border-2 border-[#c59b27] flex items-center justify-center mx-auto text-[#c59b27]">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold font-serif text-neutral-900">
                    Thank You for Reaching Out
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto">
                    Your inquiry has been logged with our senior development advisory team. We will contact you at <strong className="text-[#9a7210]">{formData.email || 'your email'}</strong> within 4 business hours.
                  </p>
                  <button
                    onClick={handleReset}
                    className="mt-3 px-5 py-2 rounded-xl bg-white border-2 border-[#c59b27] text-xs text-[#9a7210] font-bold uppercase hover:bg-[#c59b27] hover:text-white transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-3">

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Full Name */}
                    <div>
                      <label className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-neutral-800 block mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        onBlur={() => handleBlur('name')}
                        placeholder="e.g. David Cooper"
                        className={`w-full bg-white border rounded-xl px-3.5 py-2 text-xs sm:text-sm text-neutral-900 focus:outline-none transition-colors ${touched.name && errors.name
                          ? 'border-red-400 focus:border-red-500 bg-red-50/20'
                          : touched.name && formData.name.trim()
                            ? 'border-[#c59b27]/60 focus:border-[#c59b27]'
                            : 'border-neutral-300 focus:border-[#c59b27]'
                          }`}
                      />
                      {touched.name && errors.name && (
                        <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 text-red-500" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-neutral-800 block mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        onBlur={() => handleBlur('email')}
                        placeholder="e.g. david@example.com"
                        className={`w-full bg-white border rounded-xl px-3.5 py-2 text-xs sm:text-sm text-neutral-900 focus:outline-none transition-colors ${touched.email && errors.email
                          ? 'border-red-400 focus:border-red-500 bg-red-50/20'
                          : touched.email && formData.email.trim()
                            ? 'border-[#c59b27]/60 focus:border-[#c59b27]'
                            : 'border-neutral-300 focus:border-[#c59b27]'
                          }`}
                      />
                      {touched.email && errors.email && (
                        <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 text-red-500" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Phone Number */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-neutral-800">
                          Phone Number (10 Digits) *
                        </label>
                        {formData.phone && (
                          <span className={`text-[10px] font-semibold ${formData.phone.length === 10 ? 'text-emerald-600' : 'text-neutral-400'
                            }`}>
                            {formData.phone.length}/10
                          </span>
                        )}
                      </div>
                      <input
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={10}
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        onBlur={() => handleBlur('phone')}
                        placeholder="e.g. 9377744633"
                        className={`w-full bg-white border rounded-xl px-3.5 py-2 text-xs sm:text-sm text-neutral-900 focus:outline-none transition-colors ${touched.phone && errors.phone
                          ? 'border-red-400 focus:border-red-500 bg-red-50/20'
                          : touched.phone && formData.phone.length === 10
                            ? 'border-[#c59b27]/60 focus:border-[#c59b27]'
                            : 'border-neutral-300 focus:border-[#c59b27]'
                          }`}
                      />
                      {touched.phone && errors.phone && (
                        <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 text-red-500" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>

                    {/* Business Segment Interest */}
                    <div>
                      <label className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-neutral-800 block mb-1">
                        Business Segment
                      </label>
                      <select
                        value={formData.interest}
                        onChange={(e) => handleChange('interest', e.target.value)}
                        className="w-full bg-white border border-neutral-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-neutral-900 font-medium focus:outline-none focus:border-[#c59b27] transition-colors cursor-pointer"
                      >
                        <option value="real-estate">Real Estate & Development (Mahek Realty)</option>
                        <option value="hospitality">Hospitality (Hilton Garden Inn)</option>
                        <option value="textiles">Technical Textiles (Scap Group)</option>
                        <option value="pharma">Pharmaceuticals (Mahek Life Science)</option>
                        <option value="diamonds">Lab-Grown Diamonds (Omit Diamond)</option>
                        <option value="joint-venture">Joint Ventures & Investment</option>
                        <option value="other">General Corporate Inquiry</option>
                      </select>
                    </div>
                  </div>

                  {/* Project of Interest */}
                  <div>
                    <label className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-neutral-800 block mb-1">
                      Specific Project or Division
                    </label>
                    <select
                      value={formData.project}
                      onChange={(e) => handleChange('project', e.target.value)}
                      className="w-full bg-white border border-neutral-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-neutral-900 font-medium focus:outline-none focus:border-[#c59b27] transition-colors cursor-pointer"
                    >
                      <option value="Mahek IT Park">Mahek IT Park (Katargam, Surat)</option>
                      <option value="Hilton Garden Inn Surat">Hilton Garden Inn (Surat City Centre)</option>
                      <option value="Mahek Icon">Mahek Icon (Sumul Dairy Road, Surat)</option>
                      <option value="Mahek Diamond Park">Mahek Diamond Park</option>
                      <option value="Mahek Textile Park">Mahek Textile Park (Scap Group)</option>
                      <option value="The Mahek Park - 1">The Mahek Park - 1 & Orange Mahek Park</option>
                      <option value="Mahek Villas & Bungalows">Mahek Villas & Bungalows</option>
                      <option value="Mahek Life Science">Mahek Life Science (CMH / R CMH API)</option>
                      <option value="General Consultation">General Group Consultation</option>
                    </select>
                  </div>

                  {/* Message / Comment */}
                  <div>
                    <label className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-neutral-800 block mb-1">
                      Your Message or Inquiry
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      onBlur={() => handleBlur('message')}
                      placeholder="Write your message or inquiry..."
                      className={`w-full bg-white border rounded-xl px-3.5 py-2 text-xs sm:text-sm text-neutral-900 focus:outline-none transition-colors resize-none overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${touched.message && errors.message
                        ? 'border-red-400 focus:border-red-500 bg-red-50/20'
                        : 'border-neutral-300 focus:border-[#c59b27]'
                        }`}
                    ></textarea>
                    {touched.message && errors.message && (
                      <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 text-red-500" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Error Notification */}
                  {submitError && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-300 text-xs text-red-700 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 sm:py-3 rounded-xl bg-[#c59b27] hover:bg-[#aa7f17] text-white font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 hover:shadow-[0_4px_20px_rgba(197,155,39,0.3)] transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-70 cursor-pointer"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Transmitting Inquiry...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Consultation Request</span>
                      </span>
                    )}
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
