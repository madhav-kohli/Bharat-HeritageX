import React, { useState } from 'react';
import { 
  Clock, 
  MapPin, 
  Sparkles, 
  Landmark, 
  BookOpen, 
  ChevronRight, 
  X, 
  Award,
  Calendar
} from 'lucide-react';

export interface TimelineEra {
  id: string;
  epoch: 'Ancient' | 'Classical' | 'Medieval' | 'Modern';
  title: string;
  hindiTitle: string;
  timeframe: string;
  rulerCulture: string;
  capital: string;
  summary: string;
  keyMonuments: string[];
  achievements: string[];
  color: string;
  quote?: string;
  artifactHighlight: string;
}

const timelineData: TimelineEra[] = [
  {
    id: 'indus-valley',
    epoch: 'Ancient',
    title: 'Indus Valley Civilization',
    hindiTitle: 'सिंधु घाटी सभ्यता',
    timeframe: 'c. 3300 BCE – 1300 BCE',
    rulerCulture: 'Harappan Urban Civilization',
    capital: 'Harappa & Mohenjo-Daro',
    summary: 'One of humanity’s primary cradle civilizations, pioneering standardized weights, grid-planned brick cities, underground drainage, and tidal dockyards.',
    keyMonuments: ['The Great Bath of Mohenjo-Daro', 'Lothal Tidal Dockyard', 'Dholavira Water Reservoirs'],
    achievements: [
      'First planned urban grid systems with underground drainage',
      'Lost-wax bronze metallurgy (Dancing Girl of Mohenjo-Daro)',
      'Standardized steatite seals and maritime trade with Mesopotamia'
    ],
    color: 'from-amber-500 to-amber-700',
    quote: '"A civilization of peace, hygiene, and unparalleled civil engineering."',
    artifactHighlight: 'Pashupati Seal & Bronze Dancing Girl'
  },
  {
    id: 'vedic-mahajanapadas',
    epoch: 'Ancient',
    title: 'Vedic Age & Mahajanapadas',
    hindiTitle: 'वैदिक काल एवं महाजनपद',
    timeframe: 'c. 1500 BCE – 321 BCE',
    rulerCulture: 'Early Republics & Kingdoms (Magadha, Kosala, Vajji)',
    capital: 'Rajgir / Vaishali',
    summary: 'The formative philosophical period that gave humanity the Vedas, Upanishads, Ayurveda, the origins of democracy in the Vajji confederacy, and the emergence of Buddhism and Jainism.',
    keyMonuments: ['Early Stupas of Rajgir', 'Vaishali Assembly Hall', 'Barabar Hermitage Caves'],
    achievements: [
      'Codification of Rigveda, Samaveda, Yajurveda & Atharvaveda',
      'Foundations of Ayurvedic medicine and Vedic grammar (Panini)',
      'World’s earliest recorded democratic republics (Ganarajya of Vajji)'
    ],
    color: 'from-amber-600 to-orange-700',
    quote: '"वसुधैव कुटुम्बकम् — The World is One Family."',
    artifactHighlight: 'Upaniṣadic Treatises & Sanskrit Grammar'
  },
  {
    id: 'maurya-empire',
    epoch: 'Ancient',
    title: 'Mauryan Imperial Zenith',
    hindiTitle: 'मौर्य साम्राज्य',
    timeframe: '322 BCE – 185 BCE',
    rulerCulture: 'Emperor Chandragupta Maurya & Ashoka the Great',
    capital: 'Pataliputra (Patna)',
    summary: 'India’s first pan-subcontinental empire. Guided by Chanakya’s Arthashastra, it peaked with Ashoka’s conversion to Dhamma, erecting monolithic pillars and stupas across Asia.',
    keyMonuments: ['The Great Stupa at Sanchi', 'Ashoka Pillar at Sarnath', 'Barabar Granite Caves'],
    achievements: [
      'Erection of the Lion Capital of Ashoka (National Emblem of India)',
      'Chanakya’s Arthashastra — masterwork on statecraft and economic governance',
      'Propagation of Dhamma across Sri Lanka, Greece, and Central Asia'
    ],
    color: 'from-amber-400 to-orange-600',
    quote: '"All men are my children. What I desire for my children, I desire for all."',
    artifactHighlight: 'Monolithic Sarnath Lion Capital'
  },
  {
    id: 'gupta-golden-age',
    epoch: 'Classical',
    title: 'Gupta Empire — Golden Age',
    hindiTitle: 'गुप्त साम्राज्य • स्वर्ण युग',
    timeframe: '320 CE – 550 CE',
    rulerCulture: 'Samudragupta & Chandragupta II (Vikramaditya)',
    capital: 'Pataliputra & Ujjain',
    summary: 'The pinnacle of classical Indian science, mathematics, astronomy, and sculpture. Marked by zero and decimal system discovery, Aryabhata’s treatises, and Ajanta’s frescoes.',
    keyMonuments: ['Ajanta Cave Murals', 'Nalanda Mahavihara University', 'Deogarh Dashavatara Temple'],
    achievements: [
      'Invention of the mathematical Zero and decimal place value system',
      'Aryabhata calculated the Earth’s circumference and solar eclipse science',
      'Literary masterworks by Kalidasa (Shakuntala, Meghaduta)'
    ],
    color: 'from-yellow-400 to-amber-600',
    quote: '"An era where intellect, philosophy, and artistic perfection merged."',
    artifactHighlight: 'Rust-Resistant Iron Pillar of Delhi'
  },
  {
    id: 'chola-maritime',
    epoch: 'Classical',
    title: 'Imperial Chola Maritime Empire',
    hindiTitle: 'चोल साम्राज्य',
    timeframe: '848 CE – 1279 CE',
    rulerCulture: 'Raja Raja Chola I & Rajendra Chola I',
    capital: 'Thanjavur & Gangaikonda Cholapuram',
    summary: 'A powerhouse naval empire that dominated the Bay of Bengal, expanding trade to Sumatra, Java, and China while building towering granite Dravidian temples and sublime bronze casting.',
    keyMonuments: ['Brihadisvara Temple (Thanjavur)', 'Gangaikonda Cholapuram', 'Airavatesvara Temple'],
    achievements: [
      '216-foot granite vimana topped with an 80-ton single-stone cupola',
      'Supreme lost-wax bronze casting (iconic Nataraja — Cosmic Dancer)',
      'Blue-water navy controlling maritime silk routes across the Indian Ocean'
    ],
    color: 'from-amber-500 to-yellow-600',
    quote: '"The oceans became the lake of the Cholas."',
    artifactHighlight: 'Chola Bronze Nataraja Icon'
  },
  {
    id: 'vijayanagara-mughal',
    epoch: 'Medieval',
    title: 'Vijayanagara & Mughal Synthesis',
    hindiTitle: 'विजयनगर व मुग़ल काल',
    timeframe: '1336 CE – 1707 CE',
    rulerCulture: 'Krishnadevaraya (Vijayanagara) & Akbar / Shah Jahan',
    capital: 'Hampi (Vijayanagara) / Agra & Delhi (Mughal)',
    summary: 'An era of monumental stone cities and Indo-Islamic architecture. From Hampi’s musical stone pillars to Agra’s white marble symmetry and classical Hindustani & Carnatic music.',
    keyMonuments: ['Vijaya Vittala Temple & Stone Chariot (Hampi)', 'Taj Mahal (Agra)', 'Red Fort (Delhi)'],
    achievements: [
      'Creation of the Taj Mahal — UNESCO World Wonder of marble inlay',
      'Vijayanagara stone engineering with resonant musical pillars',
      'Kathak dance evolution and culinary masteries'
    ],
    color: 'from-amber-400 to-orange-500',
    quote: '"Where stone sang music and marble mirrored eternity."',
    artifactHighlight: 'Hampi Stone Chariot & Pietra Dura Inlays'
  },
  {
    id: 'maratha-swarajya',
    epoch: 'Medieval',
    title: 'Maratha Swarajya & Fortresses',
    hindiTitle: 'मराठा स्वराज्य',
    timeframe: '1674 CE – 1818 CE',
    rulerCulture: 'Chhatrapati Shivaji Maharaj & the Peshwas',
    capital: 'Raigad Fort / Pune',
    summary: 'A resilient confederacy built on guerrilla warfare (Ganimi Kava), naval supremacy under Kanhoji Angre, and over 350 hill and sea forts safeguarding indigenous culture and self-rule.',
    keyMonuments: ['Raigad Fort', 'Sindhudurg Sea Fort', 'Shanivar Wada'],
    achievements: [
      'Establishment of Hindavi Swarajya with egalitarian administration',
      'Unsurpassed coastal sea-fort engineering amidst Arabian Sea tides',
      'Revival of Sanskrit and Marathi legal vocabulary'
    ],
    color: 'from-orange-500 to-amber-700',
    quote: '"Freedom is our birthright, defended by the ramparts of our forts."',
    artifactHighlight: 'Shivaji Maharaj’s Royal Seal & Swords'
  },
  {
    id: 'modern-bharat',
    epoch: 'Modern',
    title: 'National Awakening & Modern Bharat',
    hindiTitle: 'आधुनिक भारत का नवजागरण',
    timeframe: '1857 CE – 1947 CE – Present',
    rulerCulture: 'Satyagraha, Democratic Republic & Space Renaissance',
    capital: 'New Delhi',
    summary: 'From the First War of Independence and Mahatma Gandhi’s nonviolent movement to the world’s largest democracy, sovereign space exploration (Chandrayaan & Mangalyaan), and digital leadership.',
    keyMonuments: ['Statue of Unity (World’s Tallest Monument)', 'India Gate', 'National War Memorial'],
    achievements: [
      'World’s longest and most progressive written constitution (Dr. B.R. Ambedkar)',
      'First nation to land on the Moon’s South Pole (Chandrayaan-3)',
      'Preservation of 42+ UNESCO World Heritage Sites and ancient living traditions'
    ],
    color: 'from-amber-300 to-amber-600',
    quote: '"Carrying 5,000 years of civilization into the stars."',
    artifactHighlight: 'Constitution of India (Illuminated Manuscript)'
  }
];

export const InteractiveHistoricalTimeline: React.FC = () => {
  const [selectedEpoch, setSelectedEpoch] = useState<string>('All');
  const [activeEra, setActiveEra] = useState<TimelineEra | null>(null);
  const [tiltCoords, setTiltCoords] = useState<{ [key: string]: { x: number; y: number } }>({});

  const epochs = ['All', 'Ancient', 'Classical', 'Medieval', 'Modern'];

  const filteredEras = selectedEpoch === 'All' 
    ? timelineData 
    : timelineData.filter(era => era.epoch === selectedEpoch);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    const rotateX = -(y / (rect.height / 2)) * 6;
    const rotateY = (x / (rect.width / 2)) * 6;

    setTiltCoords(prev => ({
      ...prev,
      [id]: { x: rotateX, y: rotateY }
    }));
  };

  const handleMouseLeave = (id: string) => {
    setTiltCoords(prev => ({
      ...prev,
      [id]: { x: 0, y: 0 }
    }));
  };

  return (
    <div className="w-full h-full flex flex-col bg-black text-zinc-100">
      {/* Sleek Minimalist Top Header Bar */}
      <div className="p-4 sm:p-5 border-b border-white/10 bg-black/90 backdrop-blur-md shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-amber-400">
            <Clock className="w-3.5 h-3.5" />
            <span>Chronological Heritage Odyssey</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-400">कालक्रम परिप्रेक्ष्य</span>
          </div>
          <h2 className="font-heritage text-2xl font-black text-white mt-0.5">
            Key Eras of Indian History
          </h2>
        </div>

        {/* Minimalist Filter Controls */}
        <div className="flex items-center gap-1 p-1 bg-zinc-950 rounded-xl border border-white/10 self-start md:self-auto overflow-x-auto max-w-full">
          {epochs.map(epoch => (
            <button
              key={epoch}
              onClick={() => setSelectedEpoch(epoch)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                selectedEpoch === epoch
                  ? 'bg-amber-500 text-black shadow-sm font-bold'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              {epoch}
            </button>
          ))}
        </div>
      </div>

      {/* Vertical Timeline Stream (Contained internal scroll) */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 relative custom-scrollbar bg-black">
        {/* Subtle Central Glowing Vertical Spine */}
        <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-[1px] -translate-x-1/2 bg-gradient-to-b from-amber-500/60 via-amber-500/20 to-transparent pointer-events-none" />

        <div className="max-w-5xl mx-auto space-y-8 sm:space-y-12 relative pb-10">
          {filteredEras.map((era, index) => {
            const isEven = index % 2 === 0;
            const tilt = tiltCoords[era.id] || { x: 0, y: 0 };

            return (
              <div 
                key={era.id}
                className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-12 ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Central Milestone Disc */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-zinc-950 border border-amber-400 items-center justify-center shadow-lg shadow-amber-500/20 z-20">
                  <span className="text-[11px] font-bold text-amber-400">
                    {index + 1}
                  </span>
                </div>

                {/* Date & Epoch Badge (Opposite Side on Desktop) */}
                <div className={`hidden md:flex w-full md:w-1/2 flex-col ${
                  isEven ? 'items-start text-left' : 'items-end text-right'
                }`}>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-amber-400/90 mb-0.5">
                    {era.epoch} Epoch
                  </span>
                  <div className="font-heritage text-base font-bold text-white">
                    {era.timeframe}
                  </div>
                  <div className="text-xs text-zinc-400 font-normal">
                    Capital: {era.capital}
                  </div>
                </div>

                {/* 3D Tilt Card (Clean Black Glass) */}
                <div className="w-full md:w-1/2">
                  <div
                    onMouseMove={(e) => handleMouseMove(e, era.id)}
                    onMouseLeave={() => handleMouseLeave(era.id)}
                    style={{
                      transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(8px)`,
                      transition: 'transform 0.12s ease-out, border-color 0.3s ease, box-shadow 0.3s ease',
                      boxShadow: tilt.x !== 0 ? '0 16px 36px -10px rgba(245, 158, 11, 0.18)' : 'none'
                    }}
                    className="relative rounded-2xl p-5 sm:p-6 card-3d-black group cursor-pointer overflow-hidden"
                    onClick={() => setActiveEra(era)}
                  >
                    {/* Top Thin Golden Line */}
                    <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/80 to-transparent" />

                    {/* Mobile Epoch Header */}
                    <div className="md:hidden flex items-center justify-between mb-2 text-xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                        {era.epoch}
                      </span>
                      <span className="text-zinc-300 font-medium">
                        {era.timeframe}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <div>
                        <h3 className="font-heritage text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                          {era.title}
                        </h3>
                        <p className="text-xs font-serif text-amber-400/80">
                          {era.hindiTitle}
                        </p>
                      </div>
                      <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center text-amber-400 shrink-0">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Ruler info */}
                    <div className="text-xs text-zinc-300 font-medium mb-3 flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                      <span>{era.rulerCulture}</span>
                    </div>

                    {/* Summary */}
                    <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                      {era.summary}
                    </p>

                    {/* Monuments Chips */}
                    <div className="pt-3 border-t border-white/10 space-y-1.5">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 flex items-center gap-1">
                        <Landmark className="w-3 h-3 text-amber-400" /> Notable Monuments
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {era.keyMonuments.slice(0, 2).map((m, mIdx) => (
                          <span 
                            key={mIdx}
                            className="text-[11px] px-2 py-0.5 rounded-md bg-zinc-900 text-zinc-200 border border-white/5"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action */}
                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-amber-400 group-hover:text-amber-300">
                      <span>Open 3D Era Dossier</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Deep-Dive Era Modal (Clean Black Glass) */}
      {activeEra && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto rounded-3xl bg-zinc-950 border border-white/15 shadow-2xl p-6 sm:p-7 text-zinc-100">
            <button
              onClick={() => setActiveEra(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                {activeEra.epoch} Epoch • {activeEra.timeframe}
              </span>
              <h2 className="font-heritage text-2xl font-black text-white mt-2.5">
                {activeEra.title}
              </h2>
              <p className="text-xs font-serif text-amber-400">
                {activeEra.hindiTitle}
              </p>
            </div>

            {activeEra.quote && (
              <blockquote className="p-3.5 rounded-xl bg-zinc-900/80 border-l-2 border-amber-500 italic text-amber-200 text-xs mb-5">
                {activeEra.quote}
              </blockquote>
            )}

            <div className="space-y-4 mb-5">
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {activeEra.summary}
              </p>
            </div>

            <div className="space-y-2 mb-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Key Historical Achievements
              </h4>
              <div className="space-y-1.5">
                {activeEra.achievements.map((ach, aIdx) => (
                  <div key={aIdx} className="text-xs text-zinc-200 bg-zinc-900/60 p-2.5 rounded-lg border border-white/5 flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{ach}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">
                  Prized Museum Artifact
                </span>
                <p className="font-heritage text-xs font-bold text-white mt-0.5">
                  {activeEra.artifactHighlight}
                </p>
              </div>
              <BookOpen className="w-5 h-5 text-amber-400 shrink-0" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
