import { useState, useEffect, useMemo, useRef } from 'react';
import {
  X, ZoomIn, ZoomOut, RotateCcw, ExternalLink,
  ChevronLeft, ChevronRight, Layers
} from 'lucide-react';

export default function ImageLightboxModal({
  isOpen,
  onClose,
  imageSrc,
  images = [],
  initialIndex = 0,
  title,
  subtitle
}) {
  const [scale, setScale] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartXRef = useRef(null);
  const touchStartYRef = useRef(null);

  // Normalize image input: handle array of objects, array of strings, or single imageSrc fallback
  const normalizedImages = useMemo(() => {
    if (Array.isArray(images) && images.length > 0) {
      return images.map((item, index) => {
        if (typeof item === 'string') {
          return {
            url: item,
            title: title || `Image ${index + 1}`,
            subtitle: subtitle || ''
          };
        }
        return {
          url: item.url || item.image || item.src || '',
          title: item.title || title || `Image ${index + 1}`,
          subtitle: item.subtitle || subtitle || ''
        };
      }).filter((img) => Boolean(img.url));
    }

    if (imageSrc) {
      return [{
        url: imageSrc,
        title: title || 'Project Preview',
        subtitle: subtitle || ''
      }];
    }

    return [];
  }, [images, imageSrc, title, subtitle]);

  // Sync activeIndex whenever initialIndex or isOpen changes
  useEffect(() => {
    if (isOpen) {
      const validIndex = Math.max(0, Math.min(initialIndex || 0, normalizedImages.length - 1));
      setActiveIndex(validIndex);
      setScale(1);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialIndex, normalizedImages.length]);

  const totalImages = normalizedImages.length;
  const currentImage = normalizedImages[activeIndex] || normalizedImages[0] || null;

  const handleNext = () => {
    if (totalImages <= 1) return;
    setScale(1);
    setActiveIndex((prev) => (prev + 1) % totalImages);
  };

  const handlePrev = () => {
    if (totalImages <= 1) return;
    setScale(1);
    setActiveIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const handleSelectIndex = (idx) => {
    if (idx >= 0 && idx < totalImages) {
      setScale(1);
      setActiveIndex(idx);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === '+' || e.key === '=') {
        setScale((s) => Math.min(s + 0.35, 3.5));
      } else if (e.key === '-') {
        setScale((s) => Math.max(s - 0.35, 0.75));
      } else if (e.key === '0') {
        setScale(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, totalImages, onClose]);

  // Touch Swipe navigation on mobile/tablets
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;

    // Trigger only if horizontal swipe dominates and exceeds threshold
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  if (!isOpen || !currentImage) return null;

  const zoomIn = () => setScale((s) => Math.min(s + 0.35, 3.5));
  const zoomOut = () => setScale((s) => Math.max(s - 0.35, 0.75));
  const resetZoom = () => setScale(1);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-md transition-opacity duration-200 select-none"
      role="dialog"
      aria-modal="true"
    >
      {/* Lightbox Top Control Bar */}
      <div className="flex items-center justify-between px-3 sm:px-6 py-3 bg-black/70 border-b border-neutral-800 text-white z-20 shrink-0 gap-3">
        {/* Title, Subtitle & Counter */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-sm sm:text-base font-bold font-serif text-[#dfba52] truncate">
              {currentImage.title || title || 'Project Gallery'}
            </h4>
            {totalImages > 1 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-mono font-bold bg-[#c59b27]/20 text-[#dfba52] border border-[#c59b27]/40 shrink-0">
                {activeIndex + 1} / {totalImages}
              </span>
            )}
          </div>
          {currentImage.subtitle && (
            <p className="text-[11px] sm:text-xs text-neutral-400 truncate mt-0.5">
              {currentImage.subtitle}
            </p>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Zoom Controls */}
          <div className="flex items-center gap-0.5 bg-white/10 rounded-lg p-1 border border-white/10">
            <button
              type="button"
              onClick={zoomOut}
              className="p-1 sm:p-1.5 rounded hover:bg-white/20 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              title="Zoom Out (-)"
              aria-label="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <span className="text-[10px] sm:text-xs font-mono px-1 sm:px-1.5 text-neutral-300 hidden sm:inline">
              {Math.round(scale * 100)}%
            </span>
            <button
              type="button"
              onClick={zoomIn}
              className="p-1 sm:p-1.5 rounded hover:bg-white/20 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              title="Zoom In (+)"
              aria-label="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <button
              type="button"
              onClick={resetZoom}
              className="p-1 sm:p-1.5 rounded hover:bg-white/20 text-neutral-300 hover:text-white transition-colors ml-0.5 cursor-pointer"
              title="Reset Zoom (0)"
              aria-label="Reset Zoom"
            >
              <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

          {/* Open Original */}
          <a
            href={currentImage.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 sm:p-2 rounded-lg bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs cursor-pointer"
            title="Open Original Image"
          >
            <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden md:inline">Original</span>
          </a>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-lg bg-red-600/80 hover:bg-red-600 text-white transition-colors ml-1 cursor-pointer"
            title="Close (ESC)"
            aria-label="Close Gallery"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Main Image Viewport Area */}
      <div
        className="flex-1 relative overflow-hidden flex items-center justify-center p-2 sm:p-6"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Previous Image Button (Desktop & Mobile) */}
        {totalImages > 1 && (
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-black/60 hover:bg-[#c59b27] text-white flex items-center justify-center border border-white/20 hover:border-[#c59b27] shadow-2xl transition-all cursor-pointer backdrop-blur-md group active:scale-95"
            title="Previous Image (Left Arrow)"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 group-hover:-translate-x-0.5 transition-transform" />
          </button>
        )}

        {/* Current Image */}
        <div
          className="transition-transform duration-150 ease-out max-w-full max-h-full flex items-center justify-center"
          style={{ transform: `scale(${scale})` }}
        >
          <img
            key={currentImage.url}
            src={currentImage.url}
            alt={currentImage.title || 'Enlarged project view'}
            className="max-w-[92vw] sm:max-w-[85vw] max-h-[70vh] sm:max-h-[75vh] object-contain rounded-xl shadow-2xl border border-white/10 bg-neutral-900/50 animate-in fade-in zoom-in-95 duration-200"
          />
        </div>

        {/* Next Image Button (Desktop & Mobile) */}
        {totalImages > 1 && (
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-black/60 hover:bg-[#c59b27] text-white flex items-center justify-center border border-white/20 hover:border-[#c59b27] shadow-2xl transition-all cursor-pointer backdrop-blur-md group active:scale-95"
            title="Next Image (Right Arrow)"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 group-hover:translate-x-0.5 transition-transform" />
          </button>
        )}
      </div>

      {/* Bottom Thumbnails & Hints Bar */}
      <div className="bg-black/80 border-t border-neutral-850 py-2 px-3 sm:px-6 shrink-0 z-20 space-y-1.5">
        {/* Horizontal Thumbnails Carousel if multiple images */}
        {totalImages > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto py-1 px-1 justify-center no-scrollbar max-w-4xl mx-auto">
            {normalizedImages.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectIndex(idx)}
                className={`relative w-12 h-9 sm:w-16 sm:h-12 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                  activeIndex === idx
                    ? 'border-[#c59b27] scale-105 shadow-md ring-2 ring-[#c59b27]/40 opacity-100'
                    : 'border-white/20 opacity-50 hover:opacity-100'
                }`}
                title={img.title || `Image ${idx + 1}`}
              >
                <img
                  src={img.url}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}

        {/* Navigation Hints */}
        <div className="text-center text-[10px] sm:text-xs text-neutral-400">
          <span>Use </span>
          <kbd className="px-1.5 py-0.5 bg-neutral-800 rounded text-neutral-200 font-mono text-[10px]">←</kbd>
          <span> / </span>
          <kbd className="px-1.5 py-0.5 bg-neutral-800 rounded text-neutral-200 font-mono text-[10px]">→</kbd>
          <span> or swipe to change images • </span>
          <kbd className="px-1.5 py-0.5 bg-neutral-800 rounded text-neutral-200 font-mono text-[10px]">ESC</kbd>
          <span> to close</span>
        </div>
      </div>
    </div>
  );
}
