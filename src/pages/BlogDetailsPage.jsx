import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Calendar, ArrowLeft, ArrowRight, Share2, Check,
  CheckCircle2, Building2, Send, Home, ChevronRight,
  Phone, Mail, Compass
} from 'lucide-react';
import { getArticleById, getRelatedArticles } from '../data/articles';
import WhatsAppIcon from '../components/WhatsAppIcon';
import ShareModal from '../components/ShareModal';

export default function BlogDetailsPage() {
  const { id } = useParams();

  const article = useMemo(() => getArticleById(id), [id]);
  const relatedArticles = useMemo(() => getRelatedArticles(id, 3), [id]);

  const [copiedLink, setCopiedLink] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  // Set page SEO metadata dynamically
  useEffect(() => {
    if (article) {
      document.title = `${article.title} | Mahek Real Estate News`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', article.excerpt);
      }
    }
  }, [article]);

  if (!article) {
    return (
      <div className="min-h-screen bg-white pt-24 pb-16 flex items-center justify-center px-4">
        <div className="text-center max-w-md bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-sm">
          <div className="w-14 h-14 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-neutral-400 mb-3">
            <Compass className="w-7 h-7" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-neutral-900 mb-2">Article Not Found</h2>
          <p className="text-xs sm:text-sm text-neutral-500 mb-5">
            The article you are looking for does not exist or has been relocated.
          </p>
          <Link
            to="/#blog"
            className="px-5 py-2.5 bg-[#c59b27] hover:bg-[#aa7f17] text-white text-xs font-semibold rounded-xl transition-colors shadow-sm inline-block"
          >
            Back to All News
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    setShareModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white pt-16 sm:pt-20 md:pt-24 pb-10 selection:bg-[#c59b27] selection:text-white">
      {/* Toast Notification */}
      {copiedLink && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-neutral-900 text-white text-xs font-bold shadow-xl flex items-center gap-2 border border-[#c59b27] animate-in fade-in duration-200">
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span>Article link copied to clipboard!</span>
        </div>
      )}

      {/* 1. Compact Breadcrumb Bar */}
      <div className="bg-[#faf8f2] border-b border-[#c59b27]/20 py-2 sm:py-2.5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between text-xs text-neutral-500">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 sm:gap-2 truncate">
            <Link to="/" className="hover:text-[#9a7210] flex items-center gap-1 shrink-0">
              <Home className="w-3.5 h-3.5 text-[#c59b27]" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3 h-3 text-neutral-400 shrink-0" />
            <Link to="/#blog" className="hover:text-[#9a7210] shrink-0">
              News
            </Link>
            <ChevronRight className="w-3 h-3 text-neutral-400 shrink-0" />
            <span className="text-[#9a7210] font-semibold truncate max-w-[150px] sm:max-w-xs md:max-w-md">
              {article.title}
            </span>
          </nav>

          <Link
            to="/#blog"
            className="flex items-center gap-1 text-neutral-600 hover:text-[#9a7210] font-semibold text-xs shrink-0 ml-3"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">All News</span>
          </Link>
        </div>
      </div>

      {/* 2. Main Article Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8">
          
          {/* Main Story Column (8 cols) */}
          <div className="lg:col-span-8 space-y-4 sm:space-y-5">
            
            {/* Header: Badges, Title, Meta & Share */}
            <header className="space-y-2.5 sm:space-y-3 pb-3 sm:pb-4 border-b border-neutral-100">
              {/* Badges Row */}
              <div className="flex items-center gap-2 flex-wrap text-xs">
                <span className="px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider text-[10px] sm:text-[11px] bg-[#faf8f2] border border-[#c59b27]/40 text-[#9a7210]">
                  {article.categoryBadge || article.category}
                </span>

                <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium bg-neutral-100 text-neutral-700">
                  {article.milestone}
                </span>

                <span className="flex items-center gap-1 text-[11px] text-neutral-500 font-medium ml-auto">
                  <Calendar className="w-3 h-3 text-[#c59b27]" />
                  <span>{article.date}</span>
                </span>
              </div>

              {/* Title */}
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-bold font-serif text-neutral-900 leading-snug">
                {article.title}
              </h1>

              {/* Author & Action Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-1 text-xs text-neutral-600">
                <div className="flex items-center gap-1.5 text-neutral-700">
                  <Building2 className="w-3.5 h-3.5 text-[#c59b27] shrink-0" />
                  <span>Published by <strong className="text-neutral-900 font-semibold">{article.author}</strong></span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleShare}
                    className="px-3 py-1.5 rounded-lg bg-white border border-[#c59b27]/30 hover:border-[#c59b27] text-[#9a7210] hover:bg-[#faf8f2] text-xs font-semibold transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
                    title="Copy Article Link"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{copiedLink ? 'Copied' : 'Share'}</span>
                  </button>

                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                      `*${article.title}* | Mahek Real Estate News\n` +
                      `📅 ${article.date} • ${article.category}\n\n` +
                      `👉 Read Full Story: ${typeof window !== 'undefined' ? window.location.href : ''}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
                    title="Share on WhatsApp"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </header>

            {/* Featured Image */}
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-[#c59b27]/25 shadow-sm bg-neutral-950 aspect-[16/10] sm:aspect-[16/9]">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-contain bg-neutral-950"
                loading="eager"
              />
            </div>

            {/* Lead Story Summary */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-[#faf8f2] border-l-4 border-[#c59b27] text-neutral-800 text-xs sm:text-sm md:text-base font-medium leading-relaxed">
              {article.excerpt}
            </div>

            {/* Story Paragraphs */}
            <article className="space-y-3 sm:space-y-4 text-xs sm:text-sm md:text-base text-neutral-700 leading-relaxed font-normal">
              {article.fullStory.map((paragraph, idx) => (
                <p key={idx}>
                  {paragraph}
                </p>
              ))}
            </article>

            {/* Key Highlights Card */}
            {article.highlights && article.highlights.length > 0 && (
              <section className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-[#c59b27]/25 shadow-xs space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-neutral-100">
                  <CheckCircle2 className="w-4 h-4 text-[#c59b27]" />
                  <h2 className="text-sm sm:text-base font-bold font-serif text-neutral-900">
                    Key Highlights & Strategic Impact
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                  {article.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-[#faf8f2] border border-[#c59b27]/20 flex items-start gap-2 text-xs sm:text-sm text-neutral-800"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#c59b27] shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Bottom Actions Bar */}
            <div className="p-4 rounded-xl bg-white border border-[#c59b27]/25 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-neutral-600 font-medium text-center sm:text-left">
                Interested in our developments or strategic partnerships?
              </span>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Link
                  to="/#contact"
                  className="flex-1 sm:flex-none px-4 py-2 bg-[#c59b27] hover:bg-[#aa7f17] text-white font-bold rounded-lg transition-colors shadow-2xs text-center flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Enquire Now</span>
                </Link>
                <Link
                  to="/#blog"
                  className="flex-1 sm:flex-none px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold rounded-lg transition-colors text-center cursor-pointer"
                >
                  All News
                </Link>
              </div>
            </div>
          </div>

          {/* Right Sidebar Column (4 cols) */}
          <aside className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-[#c59b27]/30 shadow-xs lg:sticky lg:top-24 space-y-4">
              
              {/* Header */}
              <div className="border-b border-[#c59b27]/20 pb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#9a7210]">
                  Corporate Relations
                </span>
                <h3 className="text-base sm:text-lg font-bold font-serif text-neutral-900 mt-0.5">
                  Connect With Mahek Group
                </h3>
                <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                  For press releases, joint venture proposals, or plot demarcations.
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <a
                  href={`https://wa.me/919376622000?text=${encodeURIComponent(
                    `Hello Mahek Real Estate,\n\nI was reading your article about *${article.title}* and would like more information.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold rounded-xl transition-all shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                  <span>WhatsApp Inquiry</span>
                </a>

                <Link
                  to="/#contact"
                  className="w-full py-2.5 px-3 bg-[#c59b27] hover:bg-[#aa7f17] text-white text-xs font-bold rounded-xl transition-all shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer text-center"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Direct Inquiry</span>
                </Link>
              </div>

              {/* Direct Contact Info */}
              <div className="pt-3 border-t border-neutral-100 space-y-2.5 text-xs text-neutral-700">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#c59b27] shrink-0" />
                  <a href="tel:+919377744633" className="hover:text-[#9a7210] font-medium">
                    +91 93777 44633
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#c59b27] shrink-0" />
                  <a href="mailto:info.mahekrealestate@gmail.com" className="hover:text-[#9a7210] font-medium">
                    info.mahekrealestate@gmail.com
                  </a>
                </div>
              </div>

              {/* Division Note */}
              <div className="pt-2 text-[11px] text-neutral-500 bg-[#faf8f2] p-2.5 rounded-lg border border-[#c59b27]/20 leading-relaxed">
                <strong className="text-neutral-800 font-semibold block mb-0.5">{article.author}</strong>
                Established enterprise under Mahek Real Estate, Surat.
              </div>
            </div>
          </aside>
        </div>

        {/* 3. Related Articles Section */}
        {relatedArticles.length > 0 && (
          <section className="mt-8 sm:mt-10 pt-4 sm:pt-5 border-t border-[#c59b27]/20">
            <div className="flex items-center justify-between mb-3.5">
              <div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#9a7210]">
                  More Press Releases
                </span>
                <h3 className="text-lg sm:text-xl font-bold font-serif text-neutral-900 mt-0.5">
                  Related News & Milestones
                </h3>
              </div>
              <Link
                to="/#blog"
                className="text-xs font-bold text-[#c59b27] hover:text-[#9a7210] flex items-center gap-1"
              >
                <span>All Stories</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 md:gap-5">
              {relatedArticles.map((rel) => (
                <article
                  key={rel.id}
                  className="card-hover-fx bg-white rounded-xl border border-[#c59b27]/25 hover:border-[#c59b27] overflow-hidden hover:shadow-md flex flex-col group"
                >
                  <div className="aspect-[16/10] bg-neutral-100 overflow-hidden relative isolate">
                    <img
                      src={rel.image}
                      alt={rel.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out will-change-transform"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-white/95 text-[#9a7210] border border-[#c59b27]/30 shadow-2xs">
                      {rel.categoryBadge || rel.category}
                    </div>
                  </div>

                  <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1 text-[10px] text-neutral-500 mb-1">
                        <Calendar className="w-3 h-3 text-[#c59b27]" />
                        <span>{rel.date}</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold font-serif text-neutral-900 group-hover:text-[#9a7210] transition-colors line-clamp-2 mb-1.5 leading-snug">
                        <Link to={`/blog/${rel.id}`}>
                          {rel.title}
                        </Link>
                      </h4>
                      <p className="text-[11px] sm:text-xs text-neutral-600 line-clamp-2 leading-relaxed mb-3">
                        {rel.excerpt}
                      </p>
                    </div>

                    <Link
                      to={`/blog/${rel.id}`}
                      className="py-1.5 px-3 rounded-lg bg-[#faf8f2] hover:bg-[#c59b27] text-[#9a7210] hover:text-white border border-[#c59b27]/30 text-xs font-bold text-center transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>Read Story</span>
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Share Options Modal */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        shareData={article ? {
          title: article.title,
          text: article.excerpt,
          url: typeof window !== 'undefined' ? window.location.href : '',
          image: article.image,
          type: 'blog',
          category: article.category
        } : null}
      />
    </div>
  );
}
