import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, BookOpen, Share2 } from 'lucide-react';
import { articles, articleCategories } from '../data/articles';
import ShareModal from './ShareModal';

export default function BlogSection() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sharePost, setSharePost] = useState(null);

  const filteredArticles = useMemo(() => {
    if (selectedCategory === 'All') return articles;
    return articles.filter((a) => a.category.toLowerCase() === selectedCategory.toLowerCase());
  }, [selectedCategory]);

  return (
    <section id="blog" className="py-5 md:py-7 bg-white relative overflow-hidden border-t border-[#c59b27]/20">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#c59b27]/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-5">
         
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-neutral-900 tracking-tight">
            Our Latest <span className="gold-gradient-text">News & Milestones</span>
          </h2>
          <p className="mt-2 text-neutral-600 text-xs sm:text-sm md:text-base max-w-2xl mx-auto font-normal leading-relaxed">
            Official press announcements, cross-industry breakthroughs, and major infrastructure milestones across the Mahek Real Estate diversified enterprise.
          </p>

         

          {/* Category Filter Tabs Centered */}
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-2.5 mt-3.5">
            {articleCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-300 cursor-pointer border ${
                  selectedCategory === cat.id
                    ? 'bg-[#c59b27] border-[#c59b27] text-white shadow-sm'
                    : 'bg-white border-neutral-200 text-neutral-600 hover:border-[#c59b27] hover:text-[#9a7210]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 6 News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch">
          {filteredArticles.map((post) => (
            <article
              key={post.id}
              className="group rounded-2xl overflow-hidden bg-white border border-[#c59b27]/25 hover:border-[#c59b27] transition-all duration-300 hover:shadow-[0_15px_35px_rgba(197,155,39,0.18)] hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                {/* Article Image Banner */}
                <Link
                  to={`/blog/${post.id}`}
                  className="block relative h-52 sm:h-56 overflow-hidden bg-neutral-900 group/img"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108 group-hover/img:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md border border-[#c59b27]/40 rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#9a7210] shadow-xs">
                    {post.categoryBadge}
                  </div>

                  {/* Milestone status pill (Read time removed) */}
                  <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-[11px]">
                    <span className="font-semibold px-2.5 py-1 rounded bg-black/60 backdrop-blur-sm border border-white/20">
                      {post.milestone}
                    </span>
                  </div>
                </Link>

                {/* Article Card Content */}
                <div className="p-5 sm:p-6">
                  {/* Meta Bar */}
                  <div className="flex items-center gap-2.5 text-[11px] text-neutral-500 font-medium mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#c59b27]" />
                      <span>{post.date}</span>
                    </span>
                    <span className="hidden sm:inline">•</span>
                    <span className="hidden sm:inline truncate max-w-[170px] text-[#9a7210] font-semibold">
                      {post.author}
                    </span>
                  </div>

                  {/* Headline */}
                  <h3 className="text-base sm:text-lg font-bold font-serif text-neutral-900 group-hover:text-[#9a7210] transition-colors line-clamp-2 mb-2.5 leading-snug">
                    <Link to={`/blog/${post.id}`}>
                      {post.title}
                    </Link>
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs sm:text-sm text-neutral-600 line-clamp-3 leading-relaxed font-normal">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer: Read More & Share Action */}
              <div className="p-5 sm:p-6 pt-0">
                <div className="pt-3.5 border-t border-neutral-100 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#9a7210]">
                  <Link
                    to={`/blog/${post.id}`}
                    className="flex items-center gap-1.5 hover:text-neutral-900 transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#c59b27]" />
                    <span>Read Full Story</span>
                  </Link>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSharePost(post);
                    }}
                    title="Share Article"
                    aria-label="Share Article"
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-[#9a7210] hover:bg-neutral-100 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-semibold lowercase">share</span>
                  </button>
                </div>
              </div>

            </article>
          ))}
        </div>

      </div>

      {/* Share Article Modal */}
      <ShareModal
        isOpen={!!sharePost}
        onClose={() => setSharePost(null)}
        shareData={sharePost ? {
          title: sharePost.title,
          text: sharePost.excerpt,
          url: `${typeof window !== 'undefined' ? window.location.origin : ''}/blog/${sharePost.id}`,
          image: sharePost.image,
          type: 'blog',
          category: sharePost.category
        } : null}
      />
    </section>
  );
}
