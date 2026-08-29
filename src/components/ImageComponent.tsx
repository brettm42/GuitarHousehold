import * as React from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { resolveImageArray } from '../infrastructure/imageutils';

type ImageProps = {
  imageSet: ReadonlyArray<string | undefined>;
  isMobile?: boolean;
  title?: string;
  altText?: string;
  maxHeight?: number;
};

export default function ImageComponent({
  imageSet: rawImageSet,
  title,
  altText,
}: ImageProps): React.ReactElement {
  const imageSet = resolveImageArray(rawImageSet);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const touchStartX = React.useRef<number | null>(null);

  if (imageSet.length === 0) {
    return <span />;
  }

  const caption = `${title ? `${title} ` : ''}${altText || 'Guitar Image'}`;

  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % imageSet.length);
  };

  const prevImage = () => {
    setActiveIndex((prev) => (prev - 1 + imageSet.length) % imageSet.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) {
      nextImage();
    } else if (diff < -50) {
      prevImage();
    }
    touchStartX.current = null;
  };

  if (imageSet.length === 1) {
    return (
      <div className="relative w-full h-80 sm:h-96 md:h-[480px] bg-neutral-100 rounded-xl overflow-hidden shadow-sm border border-neutral-200 flex items-center justify-center p-4">
        <Image
          src={imageSet[0]}
          alt={caption}
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          priority
          className="object-contain p-2"
        />
      </div>
    );
  }

  return (
    <div
      className="flex flex-col space-y-3 w-full bg-white rounded-xl shadow-xs border border-neutral-200 p-3"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Main Image View */}
      <div className="relative w-full h-80 sm:h-96 md:h-[480px] bg-neutral-100 rounded-lg overflow-hidden flex items-center justify-center">
        <Image
          src={imageSet[activeIndex]}
          alt={`${caption} - ${activeIndex + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          priority={activeIndex === 0}
          className="object-contain p-2 transition-opacity duration-300"
        />

        {/* Navigation arrows */}
        <button
          type="button"
          onClick={prevImage}
          aria-label="Previous image"
          className="absolute left-2 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors focus:outline-none"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={nextImage}
          aria-label="Next image"
          className="absolute right-2 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors focus:outline-none"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Tabs / Thumbnails */}
      <div className="flex items-center justify-center space-x-2 overflow-x-auto py-1">
        {imageSet.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveIndex(idx)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeIndex === idx
                ? 'bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-xs'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            Image {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
