import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ChatMessage, Language } from '../types';
import { generateAgronomicAdvisorReply } from '../data/agronomicAdvisor';
import {
  BotMessageSquare,
  Send,
  Sparkles,
  Trash2,
  User,
  RefreshCw,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Copy,
  Check,
  Share2,
  Leaf,
  Info,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

// Formatted message parser that renders bolding, lists, and callout sections
const FormattedMessage: React.FC<{ text: string }> = ({ text }) => {
  const lines = useMemo(() => text.split('\n'), [text]);

  const renderFormattedLine = (line: string) => {
    // Parse **bold** markdown
    const parts = line.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={idx} className="font-bold text-stone-900">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <div className="space-y-1.5 text-xs sm:text-sm leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="h-1" />;
        }

        // Bullet point lines
        if (trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('* ')) {
          const content = trimmed.replace(/^[•\-\*]\s*/, '');
          return (
            <div key={idx} className="flex items-start gap-2 pl-1.5 my-0.5">
              <span className="text-emerald-700 font-bold shrink-0 mt-0.5">•</span>
              <span className="flex-1">{renderFormattedLine(content)}</span>
            </div>
          );
        }

        // Numbered list lines (e.g., "1.", "१.")
        const numberedMatch = trimmed.match(/^([0-9]+|[०-९]+)\.\s*(.*)$/);
        if (numberedMatch) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-1.5 my-1">
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold shrink-0 mt-0.5">
                {numberedMatch[1]}
              </span>
              <span className="flex-1">{renderFormattedLine(numberedMatch[2])}</span>
            </div>
          );
        }

        // Highlight callout blocks (Tips, warnings, icons)
        if (
          trimmed.startsWith('💡') ||
          trimmed.startsWith('🌱') ||
          trimmed.startsWith('⚠️') ||
          trimmed.startsWith('🌸') ||
          trimmed.startsWith('🌿') ||
          trimmed.startsWith('🌾') ||
          trimmed.startsWith('🍅') ||
          trimmed.startsWith('🧅') ||
          trimmed.startsWith('🔍')
        ) {
          return (
            <div
              key={idx}
              className="my-1.5 p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200/80 text-emerald-950 font-medium"
            >
              {renderFormattedLine(trimmed)}
            </div>
          );
        }

        // Default line
        return <p key={idx}>{renderFormattedLine(trimmed)}</p>;
      })}
    </div>
  );
};

export const Chatbot: React.FC<{ isEmbeddedFloating?: boolean }> = ({
  isEmbeddedFloating = false,
}) => {
  const { t, language, setLanguage, activeScanContext } = useApp();

  const [inputMessage, setInputMessage] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: t.welcomeChat,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language: language,
    },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Auto scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Clean up speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Categorized Agricultural Quick Questions
  const promptCategories = useMemo(
    () => [
      { id: 'all', label: language === 'mr' ? 'सर्व प्रश्न' : language === 'hi' ? 'सभी प्रश्न' : 'All Topics' },
      { id: 'yellow', label: language === 'mr' ? '🍃 पाने पिवळी' : language === 'hi' ? '🍃 पीली पत्तियां' : '🍃 Yellow Leaves' },
      { id: 'tomato', label: language === 'mr' ? '🍅 टोमॅटो करपा' : language === 'hi' ? '🍅 टमाटर झुलसा' : '🍅 Tomato Blight' },
      { id: 'onion', label: language === 'mr' ? '🧅 कांदा थ्रिप्स' : language === 'hi' ? '🧅 प्याज थ्रिप्स' : '🧅 Onion Thrips' },
      { id: 'rice', label: language === 'mr' ? '🌾 भात ब्लास्ट' : language === 'hi' ? '🌾 धान झुलसा' : '🌾 Rice Blast' },
      { id: 'cotton', label: language === 'mr' ? '🌱 कापूस बोंडअळी' : language === 'hi' ? '🌱 कपास सुंडी' : '🌱 Cotton Bollworm' },
      { id: 'organic', label: language === 'mr' ? '🌿 सेंद्रिय फवारणी' : language === 'hi' ? '🌿 जैविक उपचार' : '🌿 Organic & Neem' },
      { id: 'flower', label: language === 'mr' ? '🌸 फूलगळ नियंत्रण' : language === 'hi' ? '🌸 फूल गिरना' : '🌸 Flower Drop' },
      { id: 'fertilizer', label: language === 'mr' ? '⚖️ खत वेळापत्रक' : language === 'hi' ? '⚖️ खाद समय सारणी' : '⚖️ NPK Schedule' },
    ],
    [language]
  );

  const categorizedQuestions = useMemo(() => {
    const list: Record<string, string[]> = {
      all: [
        t.preset1 || 'How do I identify and manage early blight in tomato without high costs?',
        t.preset2 || 'My rice leaves have spindle-shaped brown spots. What should I do?',
        t.preset3 || 'Natural, affordable ways to prevent purple blotch in onions.',
        t.preset4 || 'What are the first signs of pink bollworm in cotton?',
      ],
      yellow: [
        language === 'mr'
          ? 'माझ्या पिकाची पाने पिवळी पडत आहेत. कोणते खत किंवा फवारणी करावी?'
          : language === 'hi'
          ? 'मेरी फसल की पत्तियां पीली पड़ रही हैं। क्या उपाय करें?'
          : 'What should I do for yellow leaves on tomato?',
        language === 'mr'
          ? 'पाने पिवळी पडणे आणि शिरा हिरव्या राहणे (झिंक कमतरता) कसे दूर करावे?'
          : language === 'hi'
          ? 'पत्तियों में नसों के बीच पीलापन (जिंक/लोहा कमी) कैसे ठीक करें?'
          : 'How to fix iron and zinc deficiency chlorosis in crops?',
      ],
      tomato: [
        language === 'mr'
          ? 'टोमॅटोवरील करपा (Early Blight) कमी खर्चात कसा बरा करावा?'
          : language === 'hi'
          ? 'टमाटर के अगेती झुलसा का कम लागत वाला उपचार बताएं।'
          : 'How do I treat early blight in tomato economically?',
        language === 'mr'
          ? 'टोमॅटो चुरडा-मुरडा (Leaf Curl) आणि पांढरी माशी कशी रोखावी?'
          : language === 'hi'
          ? 'टमाटर में पत्ती मरोड़ और सफेद मक्खी का नियंत्रण कैसे करें?'
          : 'How to control tomato leaf curl virus and whiteflies?',
      ],
      onion: [
        language === 'mr'
          ? 'कांद्यावरील जांभळा करपा आणि थ्रिप्स (फुलकिडे) वर सर्वोत्तम फवारणी कोणती?'
          : language === 'hi'
          ? 'प्याज के बैंगनी धब्बे और थ्रिप्स पर कौन सा छिड़काव करें?'
          : 'Natural, affordable ways to prevent purple blotch and thrips in onions.',
        language === 'mr'
          ? 'कांद्याचा आकार आणि साठवण क्षमता वाढवण्यासाठी गंधक (सल्फर) कसे वापरावे?'
          : language === 'hi'
          ? 'प्याज का कंद बड़ा करने के लिए सल्फर का प्रयोग कैसे करें?'
          : 'How to use sulphur to improve onion bulb size and storage?',
      ],
      rice: [
        language === 'mr'
          ? 'भातावर तांबेरा / ब्लास्ट (Leaf Blast) आला आहे, काय करावे?'
          : language === 'hi'
          ? 'धान में ब्लास्ट रोग और तना छेदक का क्या समाधान है?'
          : 'My rice leaves have spindle-shaped brown blast spots. What should I do?',
        language === 'mr'
          ? 'भातातील खोडकिडा (Stem Borer) आणि पांढरी लोंबी कशी थांबवावी?'
          : language === 'hi'
          ? 'धान में मृत गाभा और सफेद बालियां आने पर क्या करें?'
          : 'How to manage yellow stem borer in paddy fields?',
      ],
      cotton: [
        language === 'mr'
          ? 'कापूस पिकातील गुलाबी बोंडअळी रोखण्यासाठी फेरोमोन ट्रॅप कसे वापरावे?'
          : language === 'hi'
          ? 'कपास में गुलाबी सुंडी नियंत्रण के लिए फेरोमोन ट्रैप कैसे लगाएं?'
          : 'What are the first signs of pink bollworm in cotton and how to control it?',
        language === 'mr'
          ? 'कापसाची पाने लाल का पडतात (मॅग्नेशियम कमतरता)?'
          : language === 'hi'
          ? 'कपास की पत्तियां लाल क्यों पड़ जाती हैं?'
          : 'Why do cotton leaves turn red and how to fix it?',
      ],
      organic: [
        language === 'mr'
          ? 'आंबट ताक आणि हळद फवारणीचे योग्य प्रमाण काय आहे?'
          : language === 'hi'
          ? 'खट्टी छाछ और हल्दी के घोल का छिड़काव कैसे तैयार करें?'
          : 'How to prepare and use sour buttermilk and turmeric foliar spray?',
        language === 'mr'
          ? '१०,००० ppm निंबोळी तेल (Neem Oil) फवारणीचे अचूक प्रमाण सांगा.'
          : language === 'hi'
          ? 'नीम के तेल (10,000 ppm) का सही स्प्रे अनुपात क्या है?'
          : 'What is the correct dilution ratio for 10,000 ppm neem oil?',
      ],
      flower: [
        language === 'mr'
          ? 'फुलोऱ्यात फूलगळ आणि फळगळ का होते? बोरॉन फवारणी कशी करावी?'
          : language === 'hi'
          ? 'फूल और छोटे फल झड़ने से रोकने के लिए बोरॉन का उपयोग कैसे करें?'
          : 'How to prevent flower and fruit drop using boron and irrigation management?',
      ],
      fertilizer: [
        language === 'mr'
          ? '१९:१९:१९ आणि ०:५२:३४ खतांचा वापर कधी आणि किती करावा?'
          : language === 'hi'
          ? '19:19:19 और 0:52:34 का छिड़काव किस समय करना चाहिए?'
          : 'When should I apply 19:19:19 and 0:52:34 fertilizers?',
      ],
    };
    return list[selectedCategory] || list.all;
  }, [selectedCategory, language, t]);

  // Handle Send Message
  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language: language,
      referencedScanId: activeScanContext ? activeScanContext.id : undefined,
    };

    // Append user message immediately
    const updatedHistory = [...messages, userMsg];
    setMessages(updatedHistory);
    setInputMessage('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          language: language,
          scanContext: activeScanContext || undefined,
          history: updatedHistory,
        }),
      });

      const data = await res.json();
      const reply = data?.reply || generateAgronomicAdvisorReply(text, language, activeScanContext || undefined);

      const assistantMsg: ChatMessage = {
        id: `reply-${Date.now()}`,
        sender: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language: language,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.warn('Network issue calling /api/chat, utilizing instant agricultural advisor:', err);
      // Instant authentic advisor reply
      const fallbackReply = generateAgronomicAdvisorReply(text, language, activeScanContext || undefined);
      const fallbackMsg: ChatMessage = {
        id: `reply-${Date.now()}`,
        sender: 'assistant',
        text: fallbackReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language: language,
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Text-To-Speech (Read aloud for farmers)
  const handleSpeak = (text: string, msgId: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (speakingId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    setSpeakingId(msgId);

    // Clean markdown before speaking
    const cleanSpeechText = text
      .replace(/\*\*/g, '')
      .replace(/[•\-\*]/g, '')
      .replace(/🌱|🍅|🌾|🧅|💡|⚠️|🌸|🌿|💊|🏛️|📋/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanSpeechText);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    // Detect language code
    if (language === 'mr') {
      utterance.lang = 'mr-IN';
    } else if (language === 'hi') {
      utterance.lang = 'hi-IN';
    } else {
      utterance.lang = 'en-IN';
    }

    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    window.speechSynthesis.speak(utterance);
  };

  // Copy Message to Clipboard
  const handleCopy = (text: string, id: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  // Share via WhatsApp / Native
  const handleShare = (text: string) => {
    const shareText = `*AgriCare Sahayak Advice:*\n\n${text}\n\nVia AgriCare Kisan Platform`;
    if (navigator.share) {
      navigator
        .share({
          title: 'AgriCare Crop Advisory',
          text: shareText,
        })
        .catch(() => {});
    } else {
      const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  // Speech-to-Text Microphone Input
  const handleToggleVoiceInput = () => {
    const SpeechRec =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRec) {
      alert(
        language === 'mr'
          ? 'आपल्या ब्राऊझरमध्ये व्हॉईस इनपुट सपोर्ट उपलब्ध नाही.'
          : language === 'hi'
          ? 'आपके ब्राउज़र में वॉइस इनपुट उपलब्ध नहीं है।'
          : 'Voice input is not supported in this browser. Please type your message.'
      );
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRec();
      recognitionRef.current = recognition;
      recognition.continuous = false;
      recognition.interimResults = false;

      if (language === 'mr') recognition.lang = 'mr-IN';
      else if (language === 'hi') recognition.lang = 'hi-IN';
      else recognition.lang = 'en-IN';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0]?.[0]?.transcript;
        if (transcript) {
          setInputMessage(transcript);
        }
      };

      recognition.start();
    } catch (err) {
      console.warn('Voice recognition error:', err);
      setIsListening(false);
    }
  };

  // Clear Chat History
  const handleClearChat = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setSpeakingId(null);
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'assistant',
        text: t.welcomeChat,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language: language,
      },
    ]);
  };

  return (
    <div
      className={`${
        isEmbeddedFloating
          ? 'h-full flex flex-col'
          : 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6'
      }`}
    >
      {/* Header if standalone page */}
      {!isEmbeddedFloating && (
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
            <BotMessageSquare className="w-4 h-4 text-emerald-700" />
            <span>AI Agricultural Sahayak (24/7 ICAR Knowledge)</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            {t.chatTitle}
          </h1>
          <p className="text-stone-700 text-xs sm:text-sm">
            {t.chatSubtitle}
          </p>
        </div>
      )}

      {/* Main Chat Box */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm flex flex-col overflow-hidden flex-1 h-[620px] max-h-[80vh]">
        {/* Chat Top Toolbar */}
        <div className="p-3 bg-stone-50 border-b border-stone-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white flex items-center justify-center font-bold shadow-xs">
              <Leaf className="w-4 h-4 text-emerald-200" />
            </div>
            <div>
              <span className="font-bold text-stone-900 block leading-tight">
                AgriCare Sahayak (ॲग्रीकेअर सहाय्यक)
              </span>
              <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                ICAR & KVK Grounded Advisor
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Selector Inside Chat */}
            <div className="flex items-center bg-white border border-stone-200 rounded-lg p-0.5 shadow-xs">
              {(['en', 'mr', 'hi'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLanguage(l)}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-colors cursor-pointer ${
                    language === l
                      ? 'bg-emerald-700 text-white'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  {l === 'en' ? 'EN' : l === 'mr' ? 'मराठी' : 'हिन्दी'}
                </button>
              ))}
            </div>

            <button
              onClick={handleClearChat}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/50 cursor-pointer transition-colors"
              title="Clear conversation"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scan Context Tag if present */}
        {activeScanContext && (
          <div className="px-4 py-2.5 bg-emerald-50 border-b border-emerald-100 text-xs text-emerald-950 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>
                Active Scan Context:{' '}
                <strong>{activeScanContext.cropName || activeScanContext.identifiedCrop}</strong> —{' '}
                <span className="text-emerald-800 font-medium">{activeScanContext.mostLikelyDisease}</span>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() =>
                  handleSendMessage(
                    language === 'mr'
                      ? `${activeScanContext.cropName || 'पिकावरील'} ${activeScanContext.mostLikelyDisease} रोगावर नेमकी औषध फवारणी व उपाय सांगा.`
                      : language === 'hi'
                      ? `${activeScanContext.cropName || 'फसल के'} ${activeScanContext.mostLikelyDisease} रोग पर सटीक छिड़काव व उपचार बताएं।`
                      : `What is the recommended treatment and foliar dosage for ${activeScanContext.mostLikelyDisease} on ${activeScanContext.cropName || 'this crop'}?`
                  )
                }
                className="text-[10px] font-bold bg-white text-emerald-800 hover:bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded shadow-xs cursor-pointer transition-colors"
              >
                Ask Treatment
              </button>
            </div>
          </div>
        )}

        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-stone-50/40">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            const isSpeaking = speakingId === msg.id;

            return (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'} group`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white flex items-center justify-center shrink-0 text-xs font-bold mt-0.5 shadow-xs">
                    AS
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-xs relative ${
                    isUser
                      ? 'bg-emerald-700 text-white rounded-br-xs'
                      : 'bg-white text-stone-900 border border-stone-200 rounded-bl-xs'
                  }`}
                >
                  {isUser ? (
                    <p className="whitespace-pre-line text-xs sm:text-sm leading-relaxed">
                      {msg.text}
                    </p>
                  ) : (
                    <FormattedMessage text={msg.text} />
                  )}

                  {/* Message Bottom Action Bar */}
                  <div
                    className={`flex items-center justify-between gap-3 mt-2 pt-1 border-t ${
                      isUser
                        ? 'border-emerald-600/60 text-emerald-200'
                        : 'border-stone-100 text-stone-400'
                    } text-[10px]`}
                  >
                    <span>{msg.timestamp}</span>

                    {!isUser && (
                      <div className="flex items-center gap-1">
                        {/* Audio Speak Aloud Button */}
                        <button
                          type="button"
                          onClick={() => handleSpeak(msg.text, msg.id)}
                          className={`p-1 rounded hover:bg-stone-100 text-stone-500 hover:text-stone-800 transition-colors cursor-pointer ${
                            isSpeaking ? 'text-emerald-700 font-bold bg-emerald-50' : ''
                          }`}
                          title={isSpeaking ? 'Stop speaking' : 'Listen to advice (Read aloud)'}
                        >
                          {isSpeaking ? (
                            <VolumeX className="w-3.5 h-3.5 text-emerald-700 animate-pulse" />
                          ) : (
                            <Volume2 className="w-3.5 h-3.5" />
                          )}
                        </button>

                        {/* Copy Button */}
                        <button
                          type="button"
                          onClick={() => handleCopy(msg.text, msg.id)}
                          className="p-1 rounded hover:bg-stone-100 text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
                          title="Copy advice"
                        >
                          {copiedId === msg.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600 font-bold" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>

                        {/* WhatsApp Share Button */}
                        <button
                          type="button"
                          onClick={() => handleShare(msg.text)}
                          className="p-1 rounded hover:bg-stone-100 text-stone-500 hover:text-emerald-700 transition-colors cursor-pointer"
                          title="Share on WhatsApp"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-xl bg-stone-800 text-white flex items-center justify-center shrink-0 text-xs font-bold mt-0.5 shadow-xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-2.5 justify-start animate-fade-in">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-xs">
                AS
              </div>
              <div className="bg-white border border-stone-200 rounded-2xl rounded-bl-xs px-4 py-3 text-xs text-stone-600 flex items-center gap-2.5 shadow-xs">
                <RefreshCw className="w-4 h-4 animate-spin text-emerald-600" />
                <span className="font-medium">
                  {language === 'mr'
                    ? 'ॲग्रीकेअर सहाय्यक कृषी मार्गदर्शक सल्ला तयार करत आहे...'
                    : language === 'hi'
                    ? 'एग्रीकेयर सहायक कृषि संदर्शिका से उत्तर तैयार कर रहा है...'
                    : 'AgriCare Sahayak is formulating ICAR-grounded advice...'}
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Prompt Category Pills */}
        <div className="px-3 py-2 bg-stone-50 border-t border-stone-200">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {promptCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Preset Questions for current category */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-1 scrollbar-none">
            {categorizedQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(q)}
                className="text-[11px] px-3 py-1 rounded-full bg-white border border-stone-200 text-stone-700 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-900 shrink-0 transition-colors cursor-pointer shadow-xs"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Input Field & Controls */}
        <div className="p-3 bg-white border-t border-stone-200 flex items-center gap-2">
          {/* Voice Input Microphone Button */}
          <button
            type="button"
            onClick={handleToggleVoiceInput}
            className={`p-2.5 rounded-xl border transition-colors cursor-pointer shrink-0 ${
              isListening
                ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border-stone-300'
            }`}
            title={isListening ? 'Listening... click to stop' : 'Speak your question (Voice Input)'}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            placeholder={
              isListening
                ? language === 'mr'
                  ? 'ऐकत आहे... बोला...'
                  : language === 'hi'
                  ? 'सुन रहा हूँ... बोलिए...'
                  : 'Listening... please speak...'
                : t.chatPlaceholder
            }
            className="flex-1 text-xs sm:text-sm px-4 py-2.5 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-stone-50/50"
          />

          <button
            type="button"
            disabled={!inputMessage.trim() || isLoading}
            onClick={() => handleSendMessage()}
            className="p-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-300 text-white rounded-xl shadow-xs transition-colors cursor-pointer shrink-0"
            title="Send query"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        {/* Responsible AI Advisory Footer Disclaimer */}
        <div className="p-2 bg-stone-100 text-[10px] text-stone-500 text-center border-t border-stone-200 flex items-center justify-center gap-1.5">
          <Info className="w-3 h-3 text-stone-400 shrink-0" />
          <span>{t.chatDisclaimer}</span>
        </div>
      </div>
    </div>
  );
};
