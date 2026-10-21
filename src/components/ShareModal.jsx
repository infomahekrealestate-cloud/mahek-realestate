import { useState, useEffect } from 'react';
import {
  X, Check, Copy, Share2, ExternalLink,
  Building2, BookOpen
} from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';

export default function ShareModal({
  isOpen,
  onClose,
  shareData = null
}) {
  const [copied, setCopied] = useState(false);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCopied(false);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !shareData) return null;

  const {
    title = 'Mahek Real Estate',
    text = 'Discover premier developments and milestones by Mahek Real Estate.',
    url = (typeof window !== 'undefined' ? window.location.href : 'https://mahekgroup.com/'),
    image = '',
    type = 'project', // 'project' | 'blog'
    category = ''
  } = shareData;

  const encodedUrl = encodeURIComponent(url);

  // Social Channels configuration (WhatsApp and Facebook)
  const shareChannels = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      description: 'Send to chat or status',
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title}\n${text}\n\n${url}`)}`,
      bgColor: 'bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white border-[#25D366]/30',
      icon: <WhatsAppIcon className="w-5 h-5 fill-current" />
    },
    {
      id: 'facebook',
      name: 'Facebook',
      description: 'Share on news feed',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      bgColor: 'bg-[#1877F2]/10 hover:bg-[#1877F2] text-[#1877F2] hover:text-white border-[#1877F2]/30',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      )
    }
  ];

  const handleCopyLink = async () => {
    let success = false;
    if (navigator?.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(url);
        success = true;
      } catch {
        success = false;
      }
    }

    if (!success) {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = url;
        textArea.style.position = 'fixed';
        textArea.style.top = '-9999px';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        success = document.execCommand('copy');
        document.body.removeChild(textArea);
      } catch {
        success = false;
      }
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleNativeShare = async () => {
    if (navigator?.share) {
      try {
        await navigator.share({
          title,
          text,
          url
        });
      } catch {
        // User dismissed native dialog
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        className="relative bg-white w-full max-w-lg rounded-2xl border border-[#c59b27]/30 shadow-[0_20px_60px_-15px_rgba(197,155,39,0.3)] overflow-hidden z-10 my-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-modal-title"
      >
        {/* Subtle decorative gold glow */}
        <div className="absolute -top-16 -right-16 w-44 h-44 bg-[#c59b27]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-neutral-100 bg-neutral-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#c59b27]/10 border border-[#c59b27]/30 text-[#9a7210] flex items-center justify-center">
              <Share2 className="w-4 h-4 text-[#c59b27]" />
            </div>
            <div>
              <h3 id="share-modal-title" className="text-sm sm:text-base font-serif font-bold text-neutral-900 leading-tight">
                Share {type === 'blog' ? 'Article' : 'Project'}
              </h3>
              <p className="text-[11px] text-neutral-500 font-medium">
                Choose a platform or copy link
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Share Dialog"
            className="w-8 h-8 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200/60 transition-colors flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5">

          {/* Item Preview Card */}
          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-neutral-50 border border-neutral-200">
            {image ? (
              <img
                src={image}
                alt=""
                className="w-14 h-14 rounded-lg object-cover border border-neutral-200 shrink-0"
              />
            ) : (
              <div className="w-14 h-14 rounded-lg bg-[#c59b27]/10 border border-[#c59b27]/30 flex items-center justify-center shrink-0 text-[#c59b27]">
                {type === 'blog' ? <BookOpen className="w-6 h-6" /> : <Building2 className="w-6 h-6" />}
              </div>
            )}
            <div className="min-w-0 flex-1">
              {category && (
                <span className="text-[10px] font-bold text-[#9a7210] uppercase tracking-wider block mb-0.5">
                  {category}
                </span>
              )}
              <h4 className="text-xs sm:text-sm font-bold text-neutral-900 truncate leading-snug">
                {title}
              </h4>
              <p className="text-[11px] text-neutral-500 truncate mt-0.5 font-medium">
                {url}
              </p>
            </div>
          </div>

          {/* Social Share Options Grid */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-2.5">
              Share via Social Media
            </p>
            <div className="grid grid-cols-2 gap-3">
              {shareChannels.map((channel) => (
                <a
                  key={channel.id}
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200 cursor-pointer group text-center hover:scale-102 hover:shadow-sm ${channel.bgColor}`}
                >
                  <div className="mb-1.5 transition-transform group-hover:scale-110">
                    {channel.icon}
                  </div>
                  <span className="text-xs font-bold leading-tight">
                    {channel.name}
                  </span>
                  <span className="text-[10px] opacity-75 hidden sm:inline">
                    {channel.description}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Copy Link Section */}
          <div>
            <label htmlFor="share-url-field" className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5 block">
              Page Link
            </label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  id="share-url-field"
                  type="text"
                  readOnly
                  value={url}
                  className="w-full pl-3 pr-8 py-2 text-xs bg-neutral-100/80 border border-neutral-300 rounded-xl text-neutral-700 font-mono focus:outline-none select-all"
                />
              </div>

              <button
                type="button"
                onClick={handleCopyLink}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                  copied
                    ? 'bg-emerald-600 text-white border border-emerald-600'
                    : 'bg-[#c59b27] hover:bg-[#aa7f17] text-white border border-[#c59b27] hover:shadow-md'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Optional Native Share Button on Mobile */}
          {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
            <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
              <span className="text-xs text-neutral-500">
                On mobile or tablet?
              </span>
              <button
                type="button"
                onClick={handleNativeShare}
                className="text-xs font-bold text-[#9a7210] hover:text-neutral-900 inline-flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>Open Device Share Menu</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
