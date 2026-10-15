import React, { useState } from 'react';
import { Landmark, MapPin, Sparkles, ArrowRight, X, Maximize2, Camera, Check, Award, Bookmark, Bell, Scale } from 'lucide-react';
import tajImg from '../assets/images/tajmahal.jpg';
import hrImg from '../assets/images/hr.jpg';
import fortImg from '../assets/images/fort2.jpeg';
import unityImg from '../assets/images/Statue-Of-Unity.jpg';
import meenakshiImg from '../assets/images/15_02_meenakshi.jpg';
import img01 from '../assets/images/01.jpg';
import img02 from '../assets/images/02.jpg';
import img03 from '../assets/images/03.jpg';
import img04 from '../assets/images/04.jpg';
import img05 from '../assets/images/05.jpg';
import img06 from '../assets/images/06.jpg';
import img07 from '../assets/images/07.jpg';
import shoreTempleImg from '../assets/images/5_02_shore-temple.jpg';
import sikriImg from '../assets/images/1_01_fatehpur_sikri.jpg';
import varanasiImg from '../assets/images/11_01_varanasi-india.jpg';
import victoriaImg from '../assets/images/17_01_victoria-memorial.jpg';
import { ImageGalleryModal } from './ImageGallery';
import { HeritageComparisonModal } from './HeritageComparisonModal';
import { ambientAudio } from '../utils/ambientAudio';

export interface MonumentItem {
  id: string;
  name: string;
  hindiName: string;
  region: 'North' | 'South' | 'East' | 'West' | 'Central';
  state: string;
  builtYear: string;
  dynasty: string;
  style: string;
  isUnesco: boolean;
  image: string;
  description: string;
  architectureDetails: string[];
}

export const monumentsList: MonumentItem[] = [
  {
    id: 'ram-mandir',
    name: 'Ayodhya Shri Ram Mandir',
    hindiName: 'श्री राम जन्मभूमि मंदिर',
    region: 'North',
    state: 'Uttar Pradesh',
    builtYear: '2024 CE',
    dynasty: 'Nagara Revival (Bharat)',
    style: 'Nagara (Gurjara-Chaulukya) Stone',
    isUnesco: false,
    image: img04,
    description: 'A monumental sandstone temple constructed over 161 feet high using 366 uniquely sculpted pillars of Bansi Paharpur pink sandstone without any iron or steel, engineered to endure for millennia.',
    architectureDetails: [
      'Built purely with interlocking stone without steel reinforcement',
      '366 intricately carved pillars depicting 16 statues of deities on each column',
      'Five sacred mandapas: Gudh, Rang, Nritya, Kirtan, and Prarthana mandap'
    ]
  },
  {
    id: 'taj-mahal',
    name: 'Taj Mahal',
    hindiName: 'ताजमहल',
    region: 'North',
    state: 'Uttar Pradesh',
    builtYear: '1632–1653 CE',
    dynasty: 'Mughal Empire',
    style: 'Indo-Islamic Symmetrical Marble',
    isUnesco: true,
    image: tajImg,
    description: 'An immense mausoleum of ivory-white marble on the Yamuna riverbank, celebrated globally for its perfect octagonal symmetry and floral Pietra Dura stone inlays.',
    architectureDetails: [
      'Bulbous central dome rising 73 meters',
      'Four minarets tilted outward at 1.5 degrees for seismic protection',
      'Charbagh quadripartite paradise garden layout'
    ]
  },
  {
    id: 'konark-sun-temple',
    name: 'Konark Sun Temple',
    hindiName: 'कोणार्क सूर्य मंदिर',
    region: 'East',
    state: 'Odisha',
    builtYear: '13th Century CE',
    dynasty: 'Eastern Ganga Dynasty',
    style: 'Kalinga Chariot Architecture',
    isUnesco: true,
    image: img01,
    description: 'Conceived as a colossal stone chariot of Surya (the Sun God) with 24 carved wheels pulled by seven horses. The 24 wheels function as astronomical sundials calculating solar time accurately.',
    architectureDetails: [
      '24 intricately carved stone sundial wheels measuring exact minutes',
      'Khondalite stone construction with iron clamp joinery',
      'Jagmohan assembly hall soaring over 100 feet'
    ]
  },
  {
    id: 'kailash-temple',
    name: 'Kailash Temple (Ellora Cave 16)',
    hindiName: 'कैलाश मंदिर एलोरा',
    region: 'West',
    state: 'Maharashtra',
    builtYear: '756–774 CE',
    dynasty: 'Rashtrakuta Dynasty',
    style: 'Monolithic Rock-Cut Dravidian',
    isUnesco: true,
    image: img02,
    description: 'The world’s largest monolithic rock excavation. Carved top-down from a single basalt cliff face by Rashtrakuta artisans, excavating over 200,000 tonnes of solid stone without any scaffolding.',
    architectureDetails: [
      'Entire temple carved vertically top-to-bottom from living basalt rock',
      'Monolithic life-sized stone elephants and victory pillars (Dhvajastambhas)',
      'Intricate multi-tiered Dravidian vimana complex'
    ]
  },
  {
    id: 'hampi-ruins',
    name: 'Hampi Vijayanagara Capital',
    hindiName: 'हम्पी विजयनगर',
    region: 'South',
    state: 'Karnataka',
    builtYear: '14th–16th Century CE',
    dynasty: 'Vijayanagara Empire',
    style: 'Dravidian Monolithic Granite',
    isUnesco: true,
    image: hrImg,
    description: 'Sprawling ancient metropolis set amidst dramatic boulder-strewn landscapes, boasting the iconic monolithic Stone Chariot and musical pillared mandapas.',
    architectureDetails: [
      '56 musical stone pillars producing acoustic saptaswara octaves',
      'Monolithic Garuda Chariot carved from granite blocks',
      'Virupaksha Temple’s 50-meter soaring gateway'
    ]
  },
  {
    id: 'khajuraho',
    name: 'Khajuraho Monument Group',
    hindiName: 'खजुराहो स्मारक समूह',
    region: 'Central',
    state: 'Madhya Pradesh',
    builtYear: '950–1050 CE',
    dynasty: 'Chandela Dynasty',
    style: 'Nagara Sandstone Architecture',
    isUnesco: true,
    image: img06,
    description: 'A breathtaking constellation of Hindu and Jain temples renowned for their nagara-style architectural symbolism and intricately sculpted celestial nymphs (Apsaras).',
    architectureDetails: [
      'Kandariya Mahadeva temple rising 31 meters with 84 miniature shikhara replicas',
      'Granite and fine-grained sandstone assembled without mortar',
      'Celebration of human emotions, spirituality, and cosmic consciousness'
    ]
  },
  {
    id: 'brihadisvara',
    name: 'Brihadisvara Temple (Big Temple)',
    hindiName: 'बृहदेश्वर मंदिर तंजावुर',
    region: 'South',
    state: 'Tamil Nadu',
    builtYear: '1010 CE',
    dynasty: 'Chola Dynasty',
    style: 'Imperial Chola Dravidian Granite',
    isUnesco: true,
    image: img03,
    description: 'Built by emperor Raja Raja Chola I, featuring a 216-foot granite vimana. The crowning cupola is carved from a single 80-tonne granite boulder hoisted 66 meters high using a 6-km inclined earthen ramp.',
    architectureDetails: [
      'Entire structure built using 130,000 tonnes of granite without binding mortar',
      'Single-stone 80-ton Kumbam cupola at the apex',
      'One of the largest monolithic Nandi bull statues in India'
    ]
  },
  {
    id: 'meenakshi-amman',
    name: 'Meenakshi Amman Temple',
    hindiName: 'मीनाक्षी अम्मन मंदिर',
    region: 'South',
    state: 'Tamil Nadu',
    builtYear: '1623–1655 CE',
    dynasty: 'Nayaka Dynasty',
    style: 'Dravidian Gopuram Architecture',
    isUnesco: false,
    image: meenakshiImg,
    description: 'Historic Hindu temple on the southern bank of the Vaigai River with 14 soaring rainbow-colored gopurams (towers), the tallest rising 52 meters, adorned with 33,000 stone statues.',
    architectureDetails: [
      'Hall of Thousand Pillars (Ayiram Kaal Mandapam) with 985 carved stone pillars',
      'Golden Lotus Pond (Porthamarai Kulam) for ritual ablution',
      'Towering multi-tiered gopurams encrusted with polychrome stucco sculptures'
    ]
  },
  {
    id: 'golden-temple',
    name: 'Sri Harmandir Sahib (Golden Temple)',
    hindiName: 'श्री हरमंदिर साहिब',
    region: 'North',
    state: 'Punjab',
    builtYear: '1589–1604 CE',
    dynasty: 'Sikh Architecture (Guru Arjan Dev)',
    style: 'Indo-Islamic & Rajput Syncretic Marble',
    isUnesco: false,
    image: img05,
    description: 'The holiest Gurdwara of Sikhism surrounded by the Amrit Sarovar (Pool of Nectar). Overlaid with 500 kilograms of pure gold foil during Maharaja Ranjit Singh’s reign, with four open doors welcoming all humanity.',
    architectureDetails: [
      'Gilded central sanctum covered with pure gold leaf and copper plates',
      'Four open entrances symbolizing universal equality and brotherhood',
      'Houses the world’s largest community kitchen (Langar) feeding 100,000 daily'
    ]
  },
  {
    id: 'qutub-minar',
    name: 'Qutub Minar & Iron Pillar',
    hindiName: 'कुतुब मीनार',
    region: 'North',
    state: 'Delhi',
    builtYear: '1192–1220 CE',
    dynasty: 'Delhi Sultanate & Gupta Era',
    style: 'Indo-Islamic Brick & Fluted Stone',
    isUnesco: true,
    image: img07,
    description: 'A 72.5-meter red sandstone minaret with 379 steps, accompanied by the 1,600-year-old Gupta Iron Pillar that has resisted rust and corrosion despite exposure to monsoon weather.',
    architectureDetails: [
      'Highest brick minaret in the world with projecting carved balconies',
      'Gupta iron pillar forged with high-phosphorus forge welding resisting oxidation',
      'Intricate calligraphic Quranic bands and honeycomb stalactite corbels'
    ]
  },
  {
    id: 'rajasthan-forts',
    name: 'Hill Forts of Rajasthan',
    hindiName: 'राजस्थान के पर्वतीय दुर्ग',
    region: 'West',
    state: 'Rajasthan',
    builtYear: '7th–18th Century CE',
    dynasty: 'Rajput Dynasties',
    style: 'Rajput Military Fort Architecture',
    isUnesco: true,
    image: fortImg,
    description: 'Imposing hill fortifications (Chittorgarh, Kumbhalgarh, Mehrangarh) built into the Aravalli hills, integrating defensive ramparts with delicate jharokha balconies.',
    architectureDetails: [
      'Kumbhalgarh wall extends 36 kilometers (second longest after Great Wall)',
      'Stepped rainwater harvesting baoris inside forts',
      'Carved sandstone jharokhas with natural cross-ventilation'
    ]
  },
  {
    id: 'statue-of-unity',
    name: 'Statue of Unity',
    hindiName: 'स्टैच्यू ऑफ यूनिटी',
    region: 'West',
    state: 'Gujarat',
    builtYear: '2018 CE',
    dynasty: 'Modern Republic of Bharat',
    style: 'Monumental Bronze Clad Engineering',
    isUnesco: false,
    image: unityImg,
    description: 'The world’s tallest statue (182 meters) dedicated to Sardar Vallabhbhai Patel, the Iron Man who integrated 562 princely states into one united India.',
    architectureDetails: [
      '182 meters tall (nearly double the Statue of Liberty)',
      'Built with 1,700 tonnes of bronze cladding panels',
      'Engineered to withstand 180 km/h wind speeds and severe earthquakes'
    ]
  },
  {
    id: 'shore-temple',
    name: 'Shore Temple of Mahabalipuram',
    hindiName: 'तट मंदिर महाबलीपुरम',
    region: 'South',
    state: 'Tamil Nadu',
    builtYear: '700–728 CE',
    dynasty: 'Pallava Dynasty (Narasimhavarman II)',
    style: 'Dravidian Structural Granite',
    isUnesco: true,
    image: shoreTempleImg,
    description: 'One of the oldest structural stone temples of South India, perched directly on the Bay of Bengal coastline, carved from blocks of local granite designed to catch the first rays of the rising sun.',
    architectureDetails: [
      'Multi-tiered stepped pyramidal Dravidian shikharas facing the roaring ocean',
      'Monolithic row of carved Nandi bulls enclosing the sacred temple precinct',
      'Engineered to withstand 1,300 years of coastal salt spray and cyclone tides'
    ]
  },
  {
    id: 'fatehpur-sikri',
    name: 'Fatehpur Sikri & Buland Darwaza',
    hindiName: 'फतेहपुर सीकरी • बुलंद दरवाजा',
    region: 'North',
    state: 'Uttar Pradesh',
    builtYear: '1571–1585 CE',
    dynasty: 'Mughal Empire (Emperor Akbar)',
    style: 'Mughal & Rajput Red Sandstone',
    isUnesco: true,
    image: sikriImg,
    description: 'The short-lived imperial capital of Emperor Akbar, featuring the colossal 54-meter Buland Darwaza (Gate of Magnificence), the white marble tomb of Salim Chishti, and the Panch Mahal.',
    architectureDetails: [
      'Highest gateway in the world (54 meters from ground level)',
      'Panch Mahal: Five-tiered pillared wind tower inspired by Buddhist viharas',
      'Ibadat Khana: Historical chamber of interfaith theological dialogues'
    ]
  },
  {
    id: 'varanasi-ghats',
    name: 'Varanasi Ghats & Kashi Vishwanath',
    hindiName: 'काशी विश्वनाथ एवं वाराणसी घाट',
    region: 'North',
    state: 'Uttar Pradesh',
    builtYear: 'Ancient – 1780 CE (Ahilyabai Holkar)',
    dynasty: 'Eternal Spiritual Capital / Maratha Holkar',
    style: 'Ancient Riverfront Step Architecture',
    isUnesco: false,
    image: varanasiImg,
    description: 'One of the oldest continuously inhabited cities on Earth. Features 84 monumental stone ghats along the sacred Ganges riverbank, centered around the gold-spires of Kashi Vishwanath.',
    architectureDetails: [
      '84 stone stepped ghats designed to accommodate seasonal monsoon water fluctuations',
      'Kashi Vishwanath golden spire plated with 1 tonne of gold by Maharaja Ranjit Singh',
      'Ancient spiritual hub celebrated by Mark Twain as "older than history, older than tradition"'
    ]
  },
  {
    id: 'victoria-memorial',
    name: 'Victoria Memorial Hall',
    hindiName: 'विक्टोरिया मेमोरियल',
    region: 'East',
    state: 'West Bengal',
    builtYear: '1906–1921 CE',
    dynasty: 'Indo-Saracenic Revival',
    style: 'Indo-Saracenic & British Classical Marble',
    isUnesco: false,
    image: victoriaImg,
    description: 'A colossal white Makrana marble monument set within 64 acres of landscaped gardens in Kolkata, synthesizing British Renaissance design with Mughal domed kiosks.',
    architectureDetails: [
      'Constructed using the same Makrana marble quarries as the Taj Mahal',
      '16-foot bronze Angel of Victory atop the central dome that rotates with wind',
      'Houses priceless royal archives, Mughal miniatures, and historic paintings'
    ]
  }
];

export const MonumentsPage: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [activeModal, setActiveModal] = useState<MonumentItem | null>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [passportStamps, setPassportStamps] = useState<string[]>(['ram-mandir', 'taj-mahal']);
  const [passportModalOpen, setPassportModalOpen] = useState(false);
  const [comparisonModalOpen, setComparisonModalOpen] = useState(false);

  const regions = ['All', 'North', 'South', 'West', 'East', 'Central'];

  const filtered = selectedRegion === 'All' 
    ? monumentsList 
    : monumentsList.filter(m => m.region === selectedRegion);

  const openLightbox = (index: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setGalleryIndex(index);
    setGalleryOpen(true);
  };

  const togglePassportStamp = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    ambientAudio.playTempleBell(880, 0.25);
    setPassportStamps(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full h-full flex flex-col bg-black text-zinc-100">
      {/* Top Filter & Passport Bar */}
      <div className="p-4 sm:p-5 border-b border-white/10 bg-black/90 backdrop-blur-md shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-amber-400">
            <Landmark className="w-3.5 h-3.5" />
            <span>National Heritage Registry</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-400">{monumentsList.length} Landmark Sites</span>
          </div>
          <h2 className="font-heritage text-xl sm:text-2xl font-black text-white mt-0.5">
            Architectural Marvels of Bharat
          </h2>
        </div>

        {/* Action Controls & Passport */}
        <div className="flex items-center gap-2 self-start sm:self-auto overflow-x-auto max-w-full">
          {/* Head-to-Head Architectural Comparison (USP Feature) */}
          <button
            onClick={() => setComparisonModalOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
            title="Compare Any 2 Monuments Side-by-Side"
          >
            <Scale className="w-3.5 h-3.5 text-amber-400" />
            <span>Compare Specs</span>
          </button>

          {/* Heritage Passport Trigger */}
          <button
            onClick={() => setPassportModalOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
            title="Open Heritage Passport & Visited Stamps"
          >
            <Bookmark className="w-3.5 h-3.5 text-amber-400" />
            <span>Passport: {passportStamps.length}/{monumentsList.length}</span>
          </button>

          {/* Lightbox button */}
          <button
            onClick={() => openLightbox(0)}
            className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
          >
            <Camera className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">HD Lightbox</span>
          </button>

          {/* Region filter */}
          <div className="flex items-center gap-1 p-1 bg-zinc-950 rounded-xl border border-white/10">
            {regions.map(r => (
              <button
                key={r}
                onClick={() => setSelectedRegion(r)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  selectedRegion === r
                    ? 'bg-amber-500 text-black shadow-sm font-bold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid Viewport */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar bg-black">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-16">
          {filtered.map((item, itemIdx) => {
            const isStamped = passportStamps.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => setActiveModal(item)}
                className="group relative rounded-2xl overflow-hidden card-3d-black cursor-pointer flex flex-col justify-between"
              >
                {/* Thumbnail with Lightbox click trigger */}
                <div 
                  className="w-full h-44 relative overflow-hidden shrink-0 group/thumb"
                  onClick={(e) => openLightbox(itemIdx, e)}
                  title="Click to view full-screen HD photo"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover/thumb:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-[10px] font-bold text-white border border-white/20 flex items-center gap-1">
                      <Maximize2 className="w-3 h-3 text-amber-400" /> Fullscreen HD
                    </span>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    {item.isUnesco ? (
                      <span className="px-2 py-0.5 rounded-md bg-amber-500 text-black text-[9px] font-black uppercase tracking-wider shadow">
                        UNESCO
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md bg-orange-600 text-white text-[9px] font-black uppercase tracking-wider shadow">
                        National Icon
                      </span>
                    )}
                  </div>

                  {/* Stamp Button */}
                  <button
                    onClick={(e) => togglePassportStamp(item.id, e)}
                    className={`absolute top-3 right-3 p-1.5 rounded-lg backdrop-blur-md border transition-all cursor-pointer z-10 ${
                      isStamped
                        ? 'bg-amber-500 text-black border-amber-400 font-bold'
                        : 'bg-black/60 text-zinc-300 border-white/20 hover:text-white hover:bg-black/90'
                    }`}
                    title={isStamped ? 'Stamped in Heritage Passport' : 'Stamp this site'}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Card Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                      <span className="flex items-center gap-1 text-amber-400 font-medium truncate max-w-[170px]">
                        <MapPin className="w-3 h-3 shrink-0" /> {item.state}
                      </span>
                      <span>{item.builtYear}</span>
                    </div>

                    <h3 className="font-heritage text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-[11px] font-serif text-amber-400/80 mb-2">
                      {item.hindiName}
                    </p>

                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-3">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-zinc-500 font-medium truncate max-w-[130px] text-[11px]">
                      {item.style}
                    </span>
                    <span className="text-amber-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform text-[11px]">
                      Specs <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Monument Detail Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto rounded-3xl bg-zinc-950 border border-white/15 shadow-2xl p-6 sm:p-7 text-zinc-100">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="h-48 -mx-6 -mt-6 sm:-mx-7 sm:-mt-7 mb-5 relative overflow-hidden rounded-t-3xl">
              <img src={activeModal.image} alt={activeModal.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
              <div className="absolute bottom-4 left-6">
                <span className="px-2 py-0.5 rounded-md bg-amber-500 text-black text-[10px] font-bold uppercase tracking-wider">
                  {activeModal.region} India • {activeModal.builtYear}
                </span>
                <h2 className="font-heritage text-2xl font-black text-white mt-1.5">
                  {activeModal.name}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-5 p-3.5 rounded-xl bg-zinc-900 border border-white/5 text-xs">
              <div>
                <span className="text-zinc-400 block text-[11px]">Ruling Dynasty</span>
                <span className="font-semibold text-amber-300">{activeModal.dynasty}</span>
              </div>
              <div>
                <span className="text-zinc-400 block text-[11px]">Architectural Style</span>
                <span className="font-semibold text-amber-300">{activeModal.style}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-5">
              {activeModal.description}
            </p>

            <div className="space-y-2">
              <h4 className="text-xs uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Architectural Specifications
              </h4>
              {activeModal.architectureDetails.map((detail, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-zinc-200 bg-zinc-900/60 p-2.5 rounded-lg border border-white/5">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Digital Heritage Passport Modal */}
      {passportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in select-none">
          <div className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-3xl bg-zinc-950 border border-amber-400/40 shadow-2xl p-6 text-zinc-100">
            <button
              onClick={() => setPassportModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-black flex items-center justify-center mx-auto mb-3 shadow-lg shadow-amber-500/20 font-bold">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-heritage text-2xl font-black text-white">
                Official Heritage Passport
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                You have stamped {passportStamps.length} of {monumentsList.length} national monuments.
              </p>
            </div>

            {/* Passport Stamps Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              {monumentsList.map(item => {
                const isStamped = passportStamps.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => togglePassportStamp(item.id)}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                      isStamped
                        ? 'bg-gradient-to-b from-amber-500/20 to-zinc-900 border-amber-400/60 shadow-lg'
                        : 'bg-zinc-900/40 border-white/5 opacity-40 hover:opacity-75'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-full bg-zinc-950 border border-amber-400/40 flex items-center justify-center mx-auto mb-2 text-amber-400">
                      {isStamped ? <Check className="w-4 h-4" /> : <Landmark className="w-3.5 h-3.5" />}
                    </div>
                    <div className="font-heritage text-xs font-bold text-white line-clamp-1">
                      {item.name}
                    </div>
                    <div className="text-[10px] text-zinc-400 mt-0.5">
                      {item.state}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-3 rounded-xl bg-zinc-900 border border-white/10 text-center text-xs text-amber-300">
              💡 Click any monument stamp to mark it as visited or saved!
            </div>
          </div>
        </div>
      )}

      {/* Head-to-Head Architectural Comparison Matrix (USP Feature) */}
      <HeritageComparisonModal
        isOpen={comparisonModalOpen}
        onClose={() => setComparisonModalOpen(false)}
      />

      {/* Full-Screen HD Lightbox Modal */}
      <ImageGalleryModal
        isOpen={galleryOpen}
        initialIndex={galleryIndex}
        onClose={() => setGalleryOpen(false)}
      />
    </div>
  );
};

