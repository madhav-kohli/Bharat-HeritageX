import React, { useState } from 'react';
import { Music2, Calendar, Sparkles, MapPin, Check } from 'lucide-react';

export const CulturePage: React.FC = () => {
  const [tab, setTab] = useState<'dance' | 'festivals'>('dance');

  const classicalDances = [
    {
      name: 'Bharatanatyam',
      state: 'Tamil Nadu',
      origin: 'Natya Shastra (Sage Bharata)',
      theme: 'Spiritual devotion (Bhakti), geometric footwork, and precise mudras.',
      keyInstruments: ['Mridangam', 'Nadaswaram', 'Flute', 'Cymbals (Thalam)'],
    },
    {
      name: 'Kathak',
      state: 'Uttar Pradesh',
      origin: 'Ancient temple storytellers (Kathakars)',
      theme: 'Swift chakkars (spins), rhythmic tatkar footwork, and subtle abhinaya.',
      keyInstruments: ['Tabla', 'Sarangi', 'Harmonium', 'Ghungroo (bells)'],
    },
    {
      name: 'Kathakali',
      state: 'Kerala',
      origin: '17th Century Temple Theater',
      theme: 'Vibrant green face makeup (Paccha), monumental headgear, and heroic epics.',
      keyInstruments: ['Chenda', 'Maddalam', 'Chengila', 'Ilathalam'],
    },
    {
      name: 'Odissi',
      state: 'Odisha',
      origin: 'Ancient Jagannath Temple Maharis',
      theme: 'Sculptural Tribhangi postures (three bends) and lyrical torso movements.',
      keyInstruments: ['Mardala', 'Bansuri flute', 'Manjira', 'Sitar'],
    }
  ];

  const festivals = [
    {
      name: 'Deepavali (Diwali)',
      season: 'Kartika (Oct–Nov)',
      significance: 'Festival of lights commemorating victory of truth and the return of Lord Rama.',
      traditions: ['Clay diyas and oil lamps', 'Intricate Rangoli art', 'Sharing festive sweets']
    },
    {
      name: 'Holi (Vasantotsav)',
      season: 'Phalguna (Feb–Mar)',
      significance: 'Festival of vibrant organic colors and arrival of fertile spring.',
      traditions: ['Gulal powders & flowers', 'Holika Dahan bonfire', 'Gujiya sweets']
    },
    {
      name: 'Durga Puja',
      season: 'Ashwin (Sep–Oct)',
      significance: 'Grand worship of Goddess Durga over Mahishasura; inscribed on UNESCO Intangible Cultural Heritage list.',
      traditions: ['Magnificent theme pandals', 'Dhunuchi dance to Dhak drums', 'Sindoor Khela']
    },
    {
      name: 'Onam',
      season: 'Chingam (Aug–Sep)',
      significance: 'Kerala’s harvest festival celebrating egalitarian King Mahabali.',
      traditions: ['Pookalam floral carpets', 'Vallam Kali snake boat races', 'Grand Onasadya feast']
    }
  ];

  return (
    <div className="w-full h-full flex flex-col bg-black text-zinc-100">
      {/* Top Bar Switcher */}
      <div className="p-4 sm:p-5 border-b border-white/10 bg-black/90 backdrop-blur-md shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Living Cultural Traditions
          </span>
          <h2 className="font-heritage text-2xl font-black text-white mt-0.5">
            Arts, Rhythms & Sacred Celebrations
          </h2>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 p-1 bg-zinc-950 rounded-xl border border-white/10 self-start sm:self-auto">
          <button
            onClick={() => setTab('dance')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              tab === 'dance' ? 'bg-amber-500 text-black shadow-sm font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Classical Dances (8)
          </button>
          <button
            onClick={() => setTab('festivals')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              tab === 'festivals' ? 'bg-amber-500 text-black shadow-sm font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Living Festivals
          </button>
        </div>
      </div>

      {/* Content Viewport */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar bg-black">
        {tab === 'dance' ? (
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {classicalDances.map((dance, i) => (
              <div 
                key={i}
                className="p-5 sm:p-6 rounded-2xl card-3d-black flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2 text-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      Classical Tradition
                    </span>
                    <span className="text-zinc-400 flex items-center gap-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" /> {dance.state}
                    </span>
                  </div>

                  <h3 className="font-heritage text-xl font-bold text-white mb-1">
                    {dance.name}
                  </h3>
                  <p className="text-xs text-amber-400/80 mb-2">
                    Origin: {dance.origin}
                  </p>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                    {dance.theme}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block mb-1.5">
                    Sacred Accompanying Instruments
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {dance.keyInstruments.map((inst, idx) => (
                      <span key={idx} className="text-[11px] px-2 py-0.5 rounded-md bg-zinc-900 text-zinc-200 border border-white/5">
                        {inst}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {festivals.map((fest, idx) => (
              <div 
                key={idx}
                className="p-5 sm:p-6 rounded-2xl card-3d-black flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      {fest.season}
                    </span>
                    <Calendar className="w-4 h-4 text-amber-400" />
                  </div>

                  <h3 className="font-heritage text-xl font-bold text-white mb-2">
                    {fest.name}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                    {fest.significance}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block mb-2">
                    Rituals & Customs
                  </span>
                  <div className="space-y-1.5">
                    {fest.traditions.map((trad, tIdx) => (
                      <div key={tIdx} className="flex items-center gap-2 text-xs text-zinc-300">
                        <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{trad}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
