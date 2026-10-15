import React, { useState } from 'react';
import { MapPin, Sparkles, Landmark, ArrowRight, X, ExternalLink, Compass } from 'lucide-react';
import tajImg from '../assets/images/tajmahal.jpg';
import hrImg from '../assets/images/hr.jpg';
import fortImg from '../assets/images/fort2.jpeg';
import unityImg from '../assets/images/Statue-Of-Unity.jpg';
import img01 from '../assets/images/01.jpg';
import img02 from '../assets/images/02.jpg';
import img04 from '../assets/images/04.jpg';
import img06 from '../assets/images/06.jpg';

export interface MapSite {
  id: string;
  name: string;
  cityState: string;
  region: 'North' | 'South' | 'East' | 'West' | 'Central';
  x: number; // Percentage X on SVG map (0-100)
  y: number; // Percentage Y on SVG map (0-100)
  year: string;
  dynasty: string;
  style: string;
  image: string;
  highlight: string;
}

const mapSites: MapSite[] = [
  {
    id: 'ram-mandir',
    name: 'Ayodhya Shri Ram Mandir',
    cityState: 'Ayodhya, Uttar Pradesh',
    region: 'North',
    x: 54,
    y: 39,
    year: '2024 CE',
    dynasty: 'Nagara Revival',
    style: 'Nagara (Gurjara-Chaulukya) Stone',
    image: img04,
    highlight: '161-foot sandstone shikhara with 366 carved pillars engineered without iron or steel.'
  },
  {
    id: 'taj-mahal',
    name: 'Taj Mahal',
    cityState: 'Agra, Uttar Pradesh',
    region: 'North',
    x: 42,
    y: 38,
    year: '1653 CE',
    dynasty: 'Mughal Empire',
    style: 'Indo-Islamic Symmetrical Marble',
    image: tajImg,
    highlight: 'Pietra Dura floral inlay of 28 gemstone varieties in pure Makrana white marble.'
  },
  {
    id: 'rajasthan-forts',
    name: 'Hill Forts of Rajasthan',
    cityState: 'Jaipur & Chittorgarh, Rajasthan',
    region: 'West',
    x: 31,
    y: 41,
    year: '8th–16th Century CE',
    dynasty: 'Rajput Dynasties',
    style: 'Rajput Military Fort Architecture',
    image: fortImg,
    highlight: 'Includes Kumbhalgarh’s 36-km defensive wall—the second longest continuous wall on Earth.'
  },
  {
    id: 'statue-of-unity',
    name: 'Statue of Unity',
    cityState: 'Kevadia, Gujarat',
    region: 'West',
    x: 27,
    y: 53,
    year: '2018 CE',
    dynasty: 'Republic of Bharat',
    style: 'Monumental Bronze Cladding',
    image: unityImg,
    highlight: 'Standing 182 meters tall, the world’s tallest statue commemorating national integration.'
  },
  {
    id: 'khajuraho',
    name: 'Khajuraho Monument Group',
    cityState: 'Chhatarpur, Madhya Pradesh',
    region: 'Central',
    x: 48,
    y: 48,
    year: '950–1050 CE',
    dynasty: 'Chandela Dynasty',
    style: 'Nagara Sandstone Architecture',
    image: img06,
    highlight: 'Celebrated for Kandariya Mahadeva’s 84 miniature shikhara replicas and sandstone sculptures.'
  },
  {
    id: 'kailash-temple',
    name: 'Kailash Temple (Ellora)',
    cityState: 'Aurangabad, Maharashtra',
    region: 'West',
    x: 35,
    y: 59,
    year: '756–774 CE',
    dynasty: 'Rashtrakuta Dynasty',
    style: 'Monolithic Rock-Cut Dravidian',
    image: img02,
    highlight: 'Carved top-down from a single basalt mountain cliff, excavating 200,000 tonnes of solid rock.'
  },
  {
    id: 'konark',
    name: 'Konark Sun Temple',
    cityState: 'Puri, Odisha',
    region: 'East',
    x: 67,
    y: 56,
    year: '1250 CE',
    dynasty: 'Eastern Ganga Dynasty',
    style: 'Kalinga Chariot Architecture',
    image: img01,
    highlight: 'Monumental stone chariot of Surya with 24 carved wheels functioning as solar sundials.'
  },
  {
    id: 'hampi',
    name: 'Hampi Vijayanagara Capital',
    cityState: 'Bellary, Karnataka',
    region: 'South',
    x: 38,
    y: 72,
    year: '14th–16th Century CE',
    dynasty: 'Vijayanagara Empire',
    style: 'Dravidian Granite Architecture',
    image: hrImg,
    highlight: 'Monolithic Garuda Chariot and 56 musical pillars that produce acoustic saptaswara notes.'
  }
];

export const ExploreMap: React.FC = () => {
  const [selectedSite, setSelectedSite] = useState<MapSite>(mapSites[0]);
  const [activeRegion, setActiveRegion] = useState<string>('All');

  const regions = ['All', 'North', 'West', 'Central', 'East', 'South'];

  const filteredSites = activeRegion === 'All'
    ? mapSites
    : mapSites.filter(s => s.region === activeRegion);

  return (
    <div className="w-full h-full flex flex-col bg-black text-zinc-100 overflow-hidden select-none">
      {/* Sleek Top Header Bar */}
      <div className="p-4 sm:p-5 border-b border-white/10 bg-zinc-950/80 backdrop-blur-md shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-amber-400">
            <Compass className="w-3.5 h-3.5" />
            <span>Interactive Heritage Atlas</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-400">{mapSites.length} Landmark Sites</span>
          </div>
          <h2 className="font-heritage text-xl sm:text-2xl font-black text-white mt-0.5">
            Geographic Explorer of Bharat
          </h2>
        </div>

        {/* Minimalist Region Filter */}
        <div className="flex items-center gap-1 p-1 bg-zinc-900/90 rounded-xl border border-white/10 overflow-x-auto self-start sm:self-auto">
          {regions.map(r => (
            <button
              key={r}
              onClick={() => setActiveRegion(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeRegion === r
                  ? 'bg-amber-500 text-black shadow-sm font-bold'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map + Card Split Layout */}
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-between p-4 sm:p-8 gap-6 overflow-hidden relative">
        {/* Left Side: Clean Stylized Interactive SVG Map of India */}
        <div className="w-full lg:w-3/5 h-full flex items-center justify-center relative">
          <div className="w-full max-w-[520px] aspect-[4/5] relative flex items-center justify-center">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />

            {/* Stylized Minimal Vector Map Outline of India */}
            <svg
              viewBox="0 0 400 480"
              className="w-full h-full filter drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Subtle Grid Coordinates */}
              <defs>
                <pattern id="mapGrid" width="24" height="24" patternUnits="userSpaceOnUse">
                  <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.8" />
                </pattern>
                <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#18181b" />
                  <stop offset="50%" stopColor="#09090b" />
                  <stop offset="100%" stopColor="#141417" />
                </linearGradient>
                <linearGradient id="goldPulse" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
              </defs>

              <rect width="100%" height="100%" fill="url(#mapGrid)" />

              {/* Stylized Geometric Mainland India Polygon Contour */}
              <path
                d="M 180 30
                   C 195 20, 210 25, 220 40
                   C 235 60, 245 80, 235 105
                   C 225 120, 240 135, 260 140
                   C 285 145, 310 135, 335 145
                   C 360 155, 380 180, 365 205
                   C 350 220, 325 210, 310 225
                   C 295 240, 280 260, 265 285
                   C 250 310, 230 350, 215 390
                   C 200 425, 190 455, 180 470
                   C 170 455, 155 415, 145 375
                   C 135 330, 115 280, 105 250
                   C 95 220, 70 205, 50 195
                   C 35 185, 45 155, 70 145
                   C 95 135, 110 115, 125 95
                   C 140 75, 165 40, 180 30 Z"
                fill="url(#mapGradient)"
                stroke="rgba(245, 158, 11, 0.4)"
                strokeWidth="1.6"
              />

              {/* Inner Decorative Topographic Contours */}
              <path
                d="M 175 60 C 200 110, 220 180, 205 240 C 190 300, 180 360, 180 430"
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth="1.2"
                strokeDasharray="4 4"
                fill="none"
              />
              <path
                d="M 90 160 C 140 180, 200 190, 270 180 C 310 175, 340 190, 350 200"
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth="1.2"
                strokeDasharray="4 4"
                fill="none"
              />
            </svg>

            {/* Interactive SVG Site Markers Overlay */}
            {filteredSites.map((site) => {
              const isSelected = selectedSite?.id === site.id;
              return (
                <div
                  key={site.id}
                  style={{
                    left: `${site.x}%`,
                    top: `${site.y}%`,
                  }}
                  onClick={() => setSelectedSite(site)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                >
                  {/* Outer Pulsing Wave Ring */}
                  {isSelected && (
                    <span className="absolute -inset-2 rounded-full bg-amber-400/30 animate-ping pointer-events-none" />
                  )}

                  {/* Marker Pin */}
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl ${
                      isSelected
                        ? 'bg-amber-400 text-black scale-125 ring-4 ring-amber-400/30'
                        : 'bg-zinc-950 text-amber-400 border border-amber-500/40 hover:scale-110 hover:border-amber-400'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                  </div>

                  {/* Tooltip on Hover */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-30 pointer-events-none">
                    <div className="px-2.5 py-1 rounded-lg bg-zinc-950 border border-white/15 text-[10px] font-bold text-white whitespace-nowrap shadow-2xl backdrop-blur-md">
                      {site.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Clean Hover/Inspection Card */}
        <div className="w-full lg:w-2/5 flex flex-col justify-center">
          {selectedSite && (
            <div className="rounded-3xl card-3d-black p-6 border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-xl">
              {/* Image Preview Banner */}
              <div className="h-44 -mx-6 -mt-6 mb-5 relative overflow-hidden rounded-t-3xl">
                <img
                  src={selectedSite.image}
                  alt={selectedSite.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                <div className="absolute top-3 left-4">
                  <span className="px-2.5 py-0.5 rounded-md bg-amber-500 text-black text-[10px] font-black uppercase tracking-wider shadow">
                    {selectedSite.region} India • {selectedSite.year}
                  </span>
                </div>
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="font-heritage text-xl sm:text-2xl font-black text-white">
                    {selectedSite.name}
                  </h3>
                  <p className="text-xs text-amber-300 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5" /> {selectedSite.cityState}
                  </p>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-2 mb-4 p-3 rounded-xl bg-zinc-900/90 border border-white/5 text-xs">
                <div>
                  <span className="text-zinc-500 block text-[10px] uppercase font-bold tracking-wider">Dynasty / Era</span>
                  <span className="font-semibold text-zinc-200">{selectedSite.dynasty}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[10px] uppercase font-bold tracking-wider">Architecture</span>
                  <span className="font-semibold text-zinc-200 truncate block">{selectedSite.style}</span>
                </div>
              </div>

              {/* Highlight summary */}
              <p className="text-xs text-zinc-300 leading-relaxed mb-5">
                {selectedSite.highlight}
              </p>

              {/* Quick site selector list */}
              <div className="space-y-1 pt-3 border-t border-white/10">
                <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 block mb-1.5">
                  Click Marker or Select Site:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {mapSites.map(s => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedSite(s)}
                      className={`text-[10px] px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                        selectedSite.id === s.id
                          ? 'bg-amber-500 text-black font-bold'
                          : 'bg-zinc-900 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {s.name.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
