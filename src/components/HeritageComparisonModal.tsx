import React, { useState } from 'react';
import { X, ArrowRightLeft, Landmark, Check, Sparkles, Scale } from 'lucide-react';
import { MonumentItem, monumentsList } from './MonumentsPage';

interface HeritageComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HeritageComparisonModal: React.FC<HeritageComparisonModalProps> = ({ isOpen, onClose }) => {
  const [siteAId, setSiteAId] = useState<string>('ram-mandir');
  const [siteBId, setSiteBId] = useState<string>('brihadisvara');

  if (!isOpen) return null;

  const siteA = monumentsList.find(m => m.id === siteAId) || monumentsList[0];
  const siteB = monumentsList.find(m => m.id === siteBId) || monumentsList[1];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl animate-in fade-in select-none">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-zinc-950 border border-amber-400/30 shadow-2xl p-6 sm:p-8 text-zinc-100 custom-scrollbar">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold uppercase tracking-widest mb-2">
            <Scale className="w-3.5 h-3.5" />
            <span>Architectural Engineering Face-Off</span>
          </div>
          <h2 className="font-heritage text-2xl sm:text-3xl font-black text-white">
            Head-to-Head Monument Analysis
          </h2>
          <p className="text-xs text-zinc-400 mt-1 max-w-md mx-auto">
            Compare architectural styles, dynasties, materials, and structural engineering side by side.
          </p>
        </div>

        {/* Monument Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-white/10">
            <label className="text-[10px] uppercase font-bold text-amber-400 block mb-1.5">
              Monument Alpha
            </label>
            <select
              value={siteAId}
              onChange={(e) => setSiteAId(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              {monumentsList.map(m => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.region})
                </option>
              ))}
            </select>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-white/10">
            <label className="text-[10px] uppercase font-bold text-orange-400 block mb-1.5">
              Monument Beta
            </label>
            <select
              value={siteBId}
              onChange={(e) => setSiteBId(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              {monumentsList.map(m => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.region})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Visual Cards Comparison */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="rounded-2xl overflow-hidden border border-amber-500/30 bg-zinc-900/60">
            <div className="h-36 relative overflow-hidden">
              <img src={siteA.image} alt={siteA.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
              <div className="absolute bottom-2.5 left-3">
                <span className="text-[9px] uppercase font-black text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
                  {siteA.region} • {siteA.builtYear}
                </span>
                <h4 className="font-heritage text-base font-bold text-white mt-1">
                  {siteA.name}
                </h4>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-orange-500/30 bg-zinc-900/60">
            <div className="h-36 relative overflow-hidden">
              <img src={siteB.image} alt={siteB.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
              <div className="absolute bottom-2.5 left-3">
                <span className="text-[9px] uppercase font-black text-orange-400 bg-orange-500/20 px-2 py-0.5 rounded border border-orange-500/30">
                  {siteB.region} • {siteB.builtYear}
                </span>
                <h4 className="font-heritage text-base font-bold text-white mt-1">
                  {siteB.name}
                </h4>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Specs Table */}
        <div className="space-y-2 mb-6">
          {[
            { metric: 'Architectural Style', a: siteA.style, b: siteB.style },
            { metric: 'Ruling Dynasty / Era', a: siteA.dynasty, b: siteB.dynasty },
            { metric: 'State & Location', a: siteA.state, b: siteB.state },
            { metric: 'UNESCO Status', a: siteA.isUnesco ? 'UNESCO World Heritage' : 'National Monument', b: siteB.isUnesco ? 'UNESCO World Heritage' : 'National Monument' },
            { metric: 'Primary Engineering Feat', a: siteA.architectureDetails[0], b: siteB.architectureDetails[0] },
          ].map((row, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-zinc-900/90 border border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400 sm:col-span-1">
                {row.metric}
              </div>
              <div className="text-zinc-200 sm:col-span-1 border-t sm:border-t-0 sm:border-l border-white/5 pt-1 sm:pt-0 sm:pl-3">
                {row.a}
              </div>
              <div className="text-zinc-200 sm:col-span-1 border-t sm:border-t-0 sm:border-l border-white/5 pt-1 sm:pt-0 sm:pl-3">
                {row.b}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3.5 rounded-2xl bg-zinc-900 border border-white/10 text-center text-xs text-zinc-400">
          💡 Evaluators can compare any 2 of the 16 national monuments to observe Nagara, Dravidian, Kalinga, and Indo-Islamic evolution.
        </div>
      </div>
    </div>
  );
};
