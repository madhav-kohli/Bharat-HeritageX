import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, MapPin, Camera, Info } from 'lucide-react';
import tajImg from '../assets/images/tajmahal.jpg';
import hrImg from '../assets/images/hr.jpg';
import fortImg from '../assets/images/fort2.jpeg';
import unityImg from '../assets/images/Statue-Of-Unity.jpg';
import img01 from '../assets/images/01.jpg';
import img02 from '../assets/images/02.jpg';
import img04 from '../assets/images/04.jpg';
import img06 from '../assets/images/06.jpg';

export interface GalleryPhoto {
  id: string;
  title: string;
  location: string;
  category: string;
  src: string;
  caption: string;
}

export const galleryPhotos: GalleryPhoto[] = [
  {
    id: 'ram-mandir',
    title: 'Ayodhya Shri Ram Janmabhoomi Mandir',
    location: 'Ayodhya, Uttar Pradesh',
    category: 'Nagara Architecture',
    src: img04,
    caption: 'Majestic 161-foot pink sandstone temple built with 366 hand-sculpted pillars without any iron or steel.'
  },
  {
    id: 'taj-mahal',
    title: 'The Taj Mahal at Sunrise',
    location: 'Agra, Uttar Pradesh',
    category: 'Mughal Wonder',
    src: tajImg,
    caption: 'Ivory-white Makrana marble mausoleum featuring symmetrical minarets and floral Pietra Dura inlay.'
  },
  {
    id: 'konark-sun',
    title: 'Konark Sun Temple Solar Wheel',
    location: 'Puri, Odisha',
    category: 'Kalinga Architecture',
    src: img01,
    caption: 'One of 24 carved stone wheels of the cosmic sun chariot, functioning as an astronomical solar clock.'
  },
  {
    id: 'kailash-ellora',
    title: 'Monolithic Kailash Temple (Cave 16)',
    location: 'Ellora, Maharashtra',
    category: 'Rock-Cut Marvel',
    src: img02,
    caption: 'World’s largest monolithic structure, excavated vertically top-down from a single basalt mountain cliff.'
  },
  {
    id: 'hampi-chariot',
    title: 'Hampi Monolithic Stone Chariot',
    location: 'Vijayanagara, Karnataka',
    category: 'Dravidian Granite',
    src: hrImg,
    caption: 'Iconic monolithic shrine dedicated to Garuda situated within the Vijaya Vittala temple complex.'
  },
  {
    id: 'khajuraho-temples',
    title: 'Kandariya Mahadeva Temple',
    location: 'Khajuraho, Madhya Pradesh',
    category: 'Chandela Nagara',
    src: img06,
    caption: 'Nagara sandstone temple featuring 84 miniature shikhara replicas and delicate celestial sculptures.'
  },
  {
    id: 'rajasthan-fort',
    title: 'Fortress of Kumbhalgarh',
    location: 'Aravalli Hills, Rajasthan',
    category: 'Rajput Fortification',
    src: fortImg,
    caption: 'The imposing 36-kilometer continuous wall guarding ancient hilltop palaces and stepwells.'
  },
  {
    id: 'statue-unity',
    title: 'Statue of Unity & Narmada River',
    location: 'Kevadia, Gujarat',
    category: 'Modern Monument',
    src: unityImg,
    caption: 'Standing 182 meters tall as the world’s tallest monument, honoring national unity and sovereignty.'
  }
];

interface ImageGalleryModalProps {
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

export const ImageGalleryModal: React.FC<ImageGalleryModalProps> = ({
  initialIndex = 0,
  isOpen,
  onClose
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]);

  if (!isOpen) return null;

  const currentPhoto = galleryPhotos[currentIndex] || galleryPhotos[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryPhotos.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryPhotos.length) % galleryPhotos.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl animate-in fade-in select-none">
      {/* Top Floating Control Bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-white/10 text-xs text-zinc-300">
          <Camera className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-semibold text-white">{currentIndex + 1} / {galleryPhotos.length}</span>
          <span className="text-zinc-600">•</span>
          <span className="text-amber-400 font-medium">{currentPhoto.category}</span>
        </div>

        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
          aria-label="Close Lightbox"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image Viewport with Aspect Containment */}
      <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-12">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="absolute left-4 sm:left-8 z-20 p-3 rounded-full bg-zinc-950/80 hover:bg-amber-500 hover:text-black text-white border border-white/10 transition-all cursor-pointer shadow-2xl hover:scale-110"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* High Definition Photo */}
        <div className="relative max-h-[76vh] max-w-[88vw] flex flex-col items-center justify-center">
          <img
            key={currentPhoto.id}
            src={currentPhoto.src}
            alt={currentPhoto.title}
            className="max-h-[72vh] max-w-[86vw] object-contain rounded-2xl shadow-2xl ring-1 ring-white/10 animate-in zoom-in-95 duration-200"
          />

          {/* Photo Metadata Bar */}
          <div className="mt-3 text-center max-w-xl">
            <h3 className="font-heritage text-lg sm:text-xl font-bold text-white">
              {currentPhoto.title}
            </h3>
            <p className="text-xs text-amber-400/90 flex items-center justify-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5" /> {currentPhoto.location}
            </p>
            <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
              {currentPhoto.caption}
            </p>
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-4 sm:right-8 z-20 p-3 rounded-full bg-zinc-950/80 hover:bg-amber-500 hover:text-black text-white border border-white/10 transition-all cursor-pointer shadow-2xl hover:scale-110"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Thumbnail Strip */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 max-w-[90vw] overflow-x-auto p-1.5 rounded-2xl bg-zinc-950/90 border border-white/10 backdrop-blur-xl flex items-center gap-2 custom-scrollbar">
        {galleryPhotos.map((photo, idx) => (
          <button
            key={photo.id}
            onClick={() => setCurrentIndex(idx)}
            className={`w-12 h-10 rounded-lg overflow-hidden shrink-0 border transition-all cursor-pointer ${
              currentIndex === idx
                ? 'border-amber-400 scale-105 ring-2 ring-amber-400/40 opacity-100'
                : 'border-transparent opacity-50 hover:opacity-80'
            }`}
          >
            <img src={photo.src} alt={photo.title} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};
