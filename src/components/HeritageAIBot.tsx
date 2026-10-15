import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Bot, User, Compass, HelpCircle, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

const KNOWLEDGE_BASE: { [key: string]: string } = {
  'ram mandir': 'Shri Ram Janmabhoomi Mandir in Ayodhya is constructed in the traditional Nagara architectural style (Gurjara-Chaulukya school). It rises 161 feet high with 3 storeys, supported by 366 exquisitely hand-carved pillars of Bansi Paharpur pink sandstone without using any steel or iron. It features 5 sacred mandapas: Gudh, Rang, Nritya, Kirtan, and Prarthana mandap, crowned by an animated fluttering Saffron Dhwaja.',
  'ayodhya': 'Ayodhya is situated on the sacred banks of the Saryu River in Uttar Pradesh, regarded as the birthplace of Lord Rama. The newly consecrated Ram Mandir is an engineering marvel designed to withstand seismic shifts and natural forces for over 1,000 years.',
  'taj mahal': 'The Taj Mahal was commissioned in 1632 by Mughal Emperor Shah Jahan as a mausoleum for his beloved wife Mumtaz Mahal. Built entirely of ivory-white Makrana marble on the southern bank of the Yamuna River in Agra, it features perfect bilateral symmetry, calligraphy in thuluth script, and intricate floral Pietra Dura inlay made from 28 types of precious and semi-precious stones.',
  'kailash temple': 'The Kailash Temple (Cave 16) at Ellora, Maharashtra, is the world’s largest monolithic rock excavation. Carved top-down from a single basalt cliff by Rashtrakuta King Krishna I in the 8th century, masons removed over 200,000 tonnes of solid rock without any modern cranes or scaffolding, creating a multistory Dravidian temple complex out of a mountain.',
  'nagara vs dravidian': 'Indian temple architecture is divided into two primary classical styles: \n1. **Nagara (North India)**: Features a curvilinear mountain-like beehive spire called a Shikhara, square sanctum (garbhagriha), and elevated stone plinth (jagati), crowned by an Amalaka and Kalash (e.g., Ayodhya Ram Mandir, Khajuraho, Konark).\n2. **Dravidian (South India)**: Features towering pyramidical gateways (Gopurams), a stepped pyramid sanctum tower (Vimana), pillared mandapas, and large temple water tanks (Kalyani) (e.g., Brihadisvara, Meenakshi Amman).',
  'classical dances': 'India’s Sangeet Natak Akademi recognizes 8 classical dance traditions: Bharatanatyam (Tamil Nadu), Kathak (Northern India), Kathakali (Kerala), Odissi (Odisha), Kuchipudi (Andhra Pradesh), Mohiniyattam (Kerala), Manipuri (Manipur), and Sattriya (Assam). Each synthesizes Nritta (pure dance), Nritya (expressive storytelling), and Natya (dramatic narrative).',
  'konark': 'The Konark Sun Temple in Odisha was built in the 13th century by King Narasimhadeva I of the Eastern Ganga dynasty. Designed as a colossal 24-wheeled chariot of Surya (the Sun God) pulled by 7 galloping stone horses, its 24 wheels function as precision sundials that accurately calculate time to the exact minute.',
  'hampi': 'Hampi in Karnataka was the capital of the Vijayanagara Empire from the 14th to 16th centuries. Set amidst surreal granite boulders, it is famous for the monolithic Stone Chariot at the Vijaya Vittala temple and 56 musical pillars that emit musical notes when gently tapped.',
  'unesco': 'India currently has 42+ UNESCO World Heritage Sites, spanning monumental cultural wonders like the Taj Mahal, Ajanta & Ellora, Hampi, Chola Temples, Rani ki Vav, and natural heritage sites like Kaziranga and the Western Ghats.',
};

export const HeritageAIBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Namaste! I am Vedika, your AI Cultural Heritage Scholar. Ask me anything about India’s UNESCO monuments, Ayodhya Ram Mandir, dynasties, or architectural secrets!',
      timestamp: 'Just now'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (queryText?: string) => {
    const textToSend = (queryText || input).trim();
    if (!textToSend || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!queryText) setInput('');
    setLoading(true);

    try {
      let aiResponse = '';
      const apiKey = process.env.GEMINI_API_KEY;

      // 1. Try Gemini API first if configured
      if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
        try {
          const ai = new GoogleGenAI({ apiKey });
          const response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: textToSend,
            config: {
              systemInstruction: 'You are Vedika, an erudite and respectful scholar of Indian Cultural Heritage, history, architecture, and classical traditions for the Bharat Heritage X project. Provide accurate, fascinating, and concise answers highlighting historical dynasties, architectural styles (Nagara/Dravidian/Indo-Islamic), and civilizational significance.',
            }
          });
          aiResponse = response.text || '';
        } catch {
          aiResponse = '';
        }
      }

      // 2. Fallback to built-in Cultural Knowledge Engine if API is offline or key missing
      if (!aiResponse) {
        const lower = textToSend.toLowerCase();
        for (const [key, answer] of Object.entries(KNOWLEDGE_BASE)) {
          if (lower.includes(key)) {
            aiResponse = answer;
            break;
          }
        }
        if (!aiResponse) {
          aiResponse = `India's 5,000-year civilizational journey encompasses 42 UNESCO World Heritage Sites, from Harappan civil engineering at Dholavira to the soaring Nagara architecture of Ayodhya Ram Mandir and the monumental Chola granite vimanas. Feel free to ask about specific monuments like Taj Mahal, Konark, Kailash Temple, or classical dances!`;
        }
      }

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: 'Bharat’s heritage is eternal! Ask me about Ayodhya Ram Mandir, Taj Mahal, Kailash Temple, or Nagara vs Dravidian temple architecture.',
          timestamp: 'Just now'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const samplePrompts = [
    'Ayodhya Ram Mandir architecture',
    'What makes Kailash Temple at Ellora unique?',
    'Explain Nagara vs Dravidian styles',
    'Tell me about Konark Sun Temple'
  ];

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative px-4 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs tracking-wider uppercase transition-all duration-300 shadow-2xl shadow-amber-500/40 flex items-center gap-2 cursor-pointer hover:scale-105 group border border-amber-300/40"
          aria-label="Open AI Heritage Guide"
        >
          <div className="w-6 h-6 rounded-lg bg-black text-amber-400 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
          </div>
          <span className="font-heritage">Ask Heritage AI</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </button>
      </div>

      {/* AI Chat Window Modal */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 w-[94vw] sm:w-[420px] h-[550px] z-50 rounded-3xl bg-zinc-950 border border-white/15 shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl animate-in fade-in slide-in-from-bottom-4">
          {/* Header */}
          <div className="p-4 bg-black/90 border-b border-white/10 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-black flex items-center justify-center font-bold shadow-md">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-heritage text-sm font-bold text-white">Vedika AI</h3>
                  <span className="text-[9px] uppercase font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.2 rounded border border-amber-500/20">
                    Heritage Guide
                  </span>
                </div>
                <p className="text-[10px] text-zinc-400">Powered by Gemini & Bharat Archive</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Prompt Carousel */}
          <div className="px-3 py-2 bg-zinc-900/60 border-b border-white/5 flex gap-1.5 overflow-x-auto custom-scrollbar shrink-0">
            {samplePrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="px-2.5 py-1 rounded-lg text-[10px] font-medium bg-zinc-900 text-zinc-300 hover:text-amber-300 hover:bg-zinc-800 border border-white/5 whitespace-nowrap transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar bg-black/60">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 border border-amber-500/30">
                    <Sparkles className="w-3 h-3" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-amber-500 text-black font-medium rounded-tr-xs'
                      : 'bg-zinc-900 text-zinc-200 border border-white/10 rounded-tl-xs whitespace-pre-line'
                  }`}
                >
                  {msg.text}
                  <div className={`text-[9px] mt-1 text-right ${msg.sender === 'user' ? 'text-black/60' : 'text-zinc-500'}`}>
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-xs text-amber-400 p-2 bg-zinc-900/60 rounded-xl w-fit border border-white/5">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Consulting archaeological records...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <div className="p-3 bg-zinc-950 border-t border-white/10 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about temples, dynasties, dances..."
                className="flex-1 bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-black font-bold transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
