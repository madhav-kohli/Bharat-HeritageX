import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Landmark, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  MapPin, 
  Menu, 
  X, 
  Flame,
  ArrowUpRight,
  Volume2,
  VolumeX,
  Bell,
  Download
} from 'lucide-react';
import tajMahalBg from './assets/images/tajmahal.jpg';
import { Logo } from './components/Logo';
import { ExploreMap } from './components/ExploreMap';
import { RamMandir3D } from './components/RamMandir3D';
import { InteractiveHistoricalTimeline } from './components/InteractiveHistoricalTimeline';
import { MonumentsPage } from './components/MonumentsPage';
import { HeritageAIBot } from './components/HeritageAIBot';
import { ambientAudio } from './utils/ambientAudio';

export type PageView = 'home' | 'map' | 'rammandir' | 'timeline' | 'monuments';

export default function App() {
  const [activeView, setActiveView] = useState<PageView>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const unsubscribe = ambientAudio.subscribe((muted) => {
      setIsMuted(muted);
    });
    return () => unsubscribe();
  }, []);

  const handleToggleMute = () => {
    ambientAudio.toggleMute();
  };

  const handleRingBell = () => {
    ambientAudio.playTempleBell(740, 0.35);
  };

  const navigationTabs = [
    { id: 'home', label: 'Explore', icon: Compass },
    { id: 'map', label: 'Interactive Map', icon: MapPin },
    { id: 'rammandir', label: 'Ram Mandir 3D', icon: Flame, isNew: true },
    { id: 'timeline', label: 'Timeline', icon: Clock },
    { id: 'monuments', label: 'Monuments', icon: Landmark },
  ];

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-black text-zinc-100 selection:bg-amber-500 selection:text-black">
      {/* ===================== Top Minimalist Navigation ===================== */}
      <header className="h-18 shrink-0 glass-black z-40 px-5 sm:px-10 flex items-center justify-between border-b border-white/5">
        <div onClick={() => setActiveView('home')} className="cursor-pointer">
          <Logo size="md" />
        </div>

        {/* Clean Segmented Navigation Control */}
        <nav className="hidden md:flex items-center gap-1 p-1 bg-zinc-950/80 rounded-2xl border border-white/10 shadow-lg">
          {navigationTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeView === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id as PageView)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-black shadow-md font-bold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : tab.isNew ? 'text-orange-400' : 'text-zinc-400'}`} />
                <span>{tab.label}</span>
                {tab.isNew && !isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Top Right Quick Launcher & Download */}
        <div className="hidden sm:flex items-center gap-2.5">
          <a
            href="/bharat-heritage-x.zip"
            download="bharat-heritage-x.zip"
            className="px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            title="Download Complete Project ZIP to extract into your repository"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden lg:inline">Download ZIP</span>
          </a>

          <button
            onClick={() => setActiveView(activeView === 'map' ? 'rammandir' : 'map')}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs tracking-wider uppercase transition-all duration-300 shadow-md shadow-amber-500/10 cursor-pointer flex items-center gap-2"
          >
            <span>{activeView === 'home' ? 'Launch Map' : 'Switch View'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-900"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-18 left-0 right-0 z-50 bg-black/95 border-b border-white/10 p-4 space-y-1.5 shadow-2xl backdrop-blur-2xl">
          {navigationTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeView === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveView(tab.id as PageView);
                  setMobileMenuOpen(false);
                }}
                className={`w-full p-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${
                  isActive ? 'bg-amber-500 text-black font-bold' : 'text-zinc-300 hover:bg-zinc-900'
                }`}
              >
                <Icon className="w-4 h-4 text-amber-400" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* ===================== Main Views Container ===================== */}
      <main className="flex-1 w-full relative overflow-hidden bg-black">
        {/* 1. ULTRA-CLEAN LUXURY HOME (Zero Clutter, Pure Aesthetic) */}
        {activeView === 'home' && (
          <div className="h-full w-full flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden select-none bg-black">
            {/* Subtle Atmospheric Backdrop */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <img
                src={tajMahalBg}
                alt=""
                className="w-full h-full object-cover object-center opacity-25 filter contrast-125 brightness-75 scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/60" />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-amber-500/10 rounded-full blur-3xl" />
            </div>

            {/* Unboxed Minimal Kicker */}
            <div className="relative z-10 max-w-4xl mx-auto text-center pt-2">
              <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-amber-400/90">
                National Cultural Archive • भारत
              </p>
            </div>

            {/* Center Confident Statement */}
            <div className="relative z-10 max-w-3xl mx-auto my-auto text-center flex flex-col items-center">
              <h1 className="font-heritage text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.05] mb-4">
                <span className="block text-zinc-100">BHARAT</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-300 to-amber-500">
                  HERITAGE X
                </span>
              </h1>

              <p className="max-w-lg text-sm sm:text-base text-zinc-400 font-normal leading-relaxed mb-8">
                An immersive digital expedition across five millennia of sacred architecture, 
                rock-cut wonders, and interactive 3D spatial models.
              </p>

              {/* Just 2 Sharp, Clean Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3.5 w-full sm:w-auto">
                <button
                  onClick={() => setActiveView('map')}
                  className="px-7 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2.5 cursor-pointer hover:scale-102"
                >
                  <MapPin className="w-4 h-4 text-black" />
                  <span>Explore Interactive Map</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>

                <button
                  onClick={() => setActiveView('rammandir')}
                  className="px-6 py-3.5 rounded-xl border border-white/15 bg-zinc-950/80 hover:bg-zinc-900 text-zinc-200 hover:text-white font-semibold text-xs sm:text-sm tracking-wide transition-all flex items-center justify-center gap-2.5 cursor-pointer hover:border-amber-400/40"
                >
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>Launch Ram Mandir 3D</span>
                </button>
              </div>
            </div>

            {/* Clean, Uncluttered 3-Pillar Discovery Footer Strip */}
            <div className="relative z-10 max-w-4xl mx-auto w-full grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10 text-left">
              <div 
                onClick={() => setActiveView('map')} 
                className="group cursor-pointer hover:opacity-100 opacity-80 transition-opacity"
              >
                <div className="flex items-center justify-between text-xs text-amber-400 font-bold mb-1">
                  <span>01 / Heritage Atlas</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <p className="text-xs text-zinc-400 line-clamp-2">
                  Stylized vector India map with interactive location pins and architectural cards.
                </p>
              </div>

              <div 
                onClick={() => setActiveView('rammandir')} 
                className="group cursor-pointer hover:opacity-100 opacity-80 transition-opacity"
              >
                <div className="flex items-center justify-between text-xs text-amber-400 font-bold mb-1">
                  <span>02 / Ram Mandir 3D</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <p className="text-xs text-zinc-400 line-clamp-2">
                  Real-time WebGL Nagara model with 366 pillars and fluttering saffron Dhwaja.
                </p>
              </div>

              <div 
                onClick={() => setActiveView('timeline')} 
                className="group cursor-pointer hover:opacity-100 opacity-80 transition-opacity"
              >
                <div className="flex items-center justify-between text-xs text-amber-400 font-bold mb-1">
                  <span>03 / Historical Timeline</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <p className="text-xs text-zinc-400 line-clamp-2">
                  Chronological vertical timeline from Indus Valley to Modern India with 3D tilt.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 2. INTERACTIVE EXPLORE MAP VIEW */}
        {activeView === 'map' && (
          <div className="h-full w-full">
            <ExploreMap />
          </div>
        )}

        {/* 3. RAM MANDIR 3D ANIMATED MODEL */}
        {activeView === 'rammandir' && (
          <div className="h-full w-full">
            <RamMandir3D />
          </div>
        )}

        {/* 4. HISTORICAL TIMELINE VIEW */}
        {activeView === 'timeline' && (
          <div className="h-full w-full">
            <InteractiveHistoricalTimeline />
          </div>
        )}

        {/* 5. MONUMENTS CATALOG VIEW (With Lightbox & Passport) */}
        {activeView === 'monuments' && (
          <div className="h-full w-full">
            <MonumentsPage />
          </div>
        )}
      </main>

      {/* ===================== Footer Bar with Ambient Sound Mute Toggle ===================== */}
      <footer className="h-10 shrink-0 bg-black/90 border-t border-white/5 px-4 sm:px-8 flex items-center justify-between text-[11px] text-zinc-400 z-30 select-none">
        {/* Left: Ambient Audio Control Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleToggleMute}
            className={`flex items-center gap-2 px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
              !isMuted
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                : 'bg-zinc-900 border-white/10 text-zinc-400 hover:text-white'
            }`}
            title={isMuted ? 'Click to enable ambient temple bells & wind' : 'Click to mute soundscape'}
          >
            {!isMuted ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-semibold text-amber-300">Ambient Sound: Active</span>
                {/* Micro Audio Wave Bars */}
                <div className="flex items-center gap-0.5 h-2.5">
                  <span className="w-0.5 h-2.5 bg-amber-400 rounded-full animate-pulse" />
                  <span className="w-0.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
                  <span className="w-0.5 h-3 bg-amber-400 rounded-full animate-pulse" />
                </div>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span>Ambient Sound: Muted</span>
              </>
            )}
          </button>

          {/* Quick Bell Ring Button */}
          <button
            onClick={handleRingBell}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-amber-300 border border-white/10 transition-colors cursor-pointer"
            title="Ring Sacred Temple Bell"
          >
            <Bell className="w-3 h-3 text-amber-400" />
            <span>Ring Bell</span>
          </button>
        </div>

        {/* Center/Right: Subtle Branding */}
        <div className="flex items-center gap-4 text-zinc-500">
          <span className="hidden md:inline font-heritage text-[10px] tracking-wider text-zinc-400">
            सत्यमेव जयते • 5000 Years of Heritage
          </span>
          <span className="text-[10px]">Bharat Heritage X</span>
        </div>
      </footer>

      {/* Floating AI Heritage Scholar Bot */}
      <HeritageAIBot />
    </div>
  );
}
