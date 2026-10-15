import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ size = 'md' }) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  return (
    <div className="flex items-center gap-3 select-none group cursor-pointer">
      {/* 3D Minimalist Black & Gold Emblem */}
      <div className={`relative ${iconSizes[size]} rounded-xl p-[1px] bg-gradient-to-b from-amber-400/60 via-amber-600/20 to-transparent shadow-lg shadow-black/80 group-hover:scale-105 transition-all duration-300`}>
        <div className="w-full h-full rounded-[11px] bg-black flex items-center justify-center relative overflow-hidden border border-white/10">
          {/* Subtle Ambient Radial Light */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-transparent" />
          
          <svg
            viewBox="0 0 100 100"
            className="w-[76%] h-[76%] text-amber-400 filter drop-shadow-[0_2px_6px_rgba(245,158,11,0.3)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer Minimalist Precision Ring */}
            <circle cx="50" cy="50" r="44" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.4" />
            <circle cx="50" cy="50" r="38" stroke="#fef08a" strokeWidth="0.8" strokeDasharray="2 3" strokeOpacity="0.7" />

            {/* 16-Spoke Ashoka Geometric Ray Wheel */}
            {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((angle, i) => (
              <line
                key={i}
                x1="50"
                y1="22"
                x2="50"
                y2="50"
                transform={`rotate(${angle} 50 50)`}
                stroke="#fbbf24"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeOpacity={i % 2 === 0 ? '0.9' : '0.5'}
              />
            ))}

            {/* Inner Sacred Center Core */}
            <circle cx="50" cy="50" r="14" fill="#09090b" stroke="#f59e0b" strokeWidth="1.5" />
            <circle cx="50" cy="50" r="4" fill="#fef08a" filter="drop-shadow(0 0 4px #f59e0b)" />
          </svg>
        </div>
      </div>

      {/* Ultra-Clean Modern Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`font-heritage font-extrabold tracking-[0.08em] text-white ${textSizes[size]}`}>
            BHARAT HERITAGE
          </span>
          <span className="px-1.5 py-0.2 rounded-md bg-gradient-to-r from-amber-500 to-amber-700 text-black text-[10px] font-black tracking-widest shadow-sm">
            X
          </span>
        </div>
        <p className="text-[9px] tracking-[0.25em] uppercase text-zinc-400 font-medium -mt-0.5">
          Digital Odyssey • भारत
        </p>
      </div>
    </div>
  );
};
