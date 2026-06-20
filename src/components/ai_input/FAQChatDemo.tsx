import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Send } from 'lucide-react';

type FAQ = { q: string; a: string };

interface Props {
  faqs: FAQ[];
}

type Phase = 'idle' | 'typing-question' | 'sending' | 'typing-answer' | 'done';

const TYPING_SPEED_Q = 18;
const TYPING_SPEED_A = 10;
const PAUSE_BEFORE_SEND = 600;
const PAUSE_BEFORE_ANSWER = 700;

export function FAQChatDemo({ faqs }: Props) {
  const [started, setStarted] = useState(false);
  const [faqIndex, setFaqIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('idle');
  const [inputText, setInputText] = useState('');
  const [currentQ, setCurrentQ] = useState('');
  const [answerText, setAnswerText] = useState('');
  const [sending, setSending] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const faq = faqs[faqIndex];

  const clearTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const after = (ms: number, fn: () => void) => {
    clearTimer();
    timeoutRef.current = setTimeout(fn, ms);
  };

  // Start animation only when section enters viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Kick off typing-question whenever faqIndex changes and we're started
  useEffect(() => {
    if (!started) return;
    setInputText('');
    setAnswerText('');
    setCurrentQ('');
    setSending(false);
    setPhase('typing-question');
  }, [faqIndex, started]);

  useEffect(() => {
    if (phase === 'typing-question') {
      const question = faq.q;
      let i = 0;
      const type = () => {
        if (i <= question.length) {
          setInputText(question.slice(0, i));
          i++;
          after(TYPING_SPEED_Q, type);
        } else {
          after(PAUSE_BEFORE_SEND, () => setPhase('sending'));
        }
      };
      after(400, type);
    }

    if (phase === 'sending') {
      setSending(true);
      after(400, () => {
        setCurrentQ(faq.q);
        setInputText('');
        setSending(false);
        after(PAUSE_BEFORE_ANSWER, () => setPhase('typing-answer'));
      });
    }

    if (phase === 'typing-answer') {
      const answer = faq.a;
      let i = 0;
      const type = () => {
        if (i <= answer.length) {
          setAnswerText(answer.slice(0, i));
          i++;
          after(TYPING_SPEED_A, type);
        } else {
          setPhase('done');
        }
      };
      after(0, type);
    }

    return clearTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const hasContent = currentQ || answerText;

  return (
    <div ref={containerRef} className="w-full max-w-xl mx-auto select-none">
      {/* chat window */}
      <div
        className="rounded-2xl border border-black/8 bg-white shadow-sm overflow-hidden mb-1"
        style={{ minHeight: 220 }}
      >
        <div className="px-4 py-4 flex flex-col gap-3" style={{ minHeight: 220 }}>

          {/* empty / waiting state */}
          {!hasContent && (
            <div className="flex-1 flex items-center justify-center" style={{ minHeight: 180 }}>
              <p className="text-xs text-slate-400">Ask a membership question…</p>
            </div>
          )}

          {/* question bubble */}
          <AnimatePresence mode="wait">
            {currentQ && (
              <motion.div
                key={`q-${faqIndex}`}
                className="flex justify-end"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="rounded-2xl rounded-br-sm px-4 py-2.5 text-sm leading-snug max-w-[85%] text-white"
                  style={{ background: '#001F5B' }}
                >
                  {currentQ}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* answer bubble */}
          <AnimatePresence mode="wait">
            {(phase === 'typing-answer' || phase === 'done') && answerText && (
              <motion.div
                key={`a-${faqIndex}`}
                className="flex items-start gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
              >
                <AiAvatar />
                <div
                  className="rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm leading-relaxed max-w-[85%]"
                  style={{ background: '#f1f5f9', color: '#1e293b' }}
                >
                  {answerText}
                  {phase === 'typing-answer' && <Cursor />}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* input bar */}
      <div className="relative border border-black/8 rounded-[22px] p-1 bg-white shadow-sm">
        <div className="relative rounded-2xl border border-black/5 bg-neutral-800/5 flex flex-col">
          <div className="relative px-4 py-3 min-h-[48px] flex items-center">
            {inputText ? (
              <span className="text-sm text-slate-800 whitespace-pre-wrap break-words leading-snug">
                {inputText}
                <Cursor />
              </span>
            ) : (
              <span className="text-sm text-black/40 pointer-events-none">Ask about membership…</span>
            )}
          </div>

          <div className="h-12 bg-black/5 rounded-b-xl flex items-center justify-between px-3">
            <div className="flex items-center gap-2">
              <div className="rounded-full p-2 bg-black/5">
                <svg className="w-4 h-4 text-black/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
                </svg>
              </div>
              <div className="rounded-full px-2 py-1 h-8 flex items-center gap-1.5 bg-[#D33A02]/10 border border-[#D33A02]/30">
                <svg className="w-4 h-4 text-[#D33A02]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
                </svg>
                <span className="text-xs text-[#D33A02] font-medium">Search</span>
              </div>
            </div>

            <motion.button
              animate={sending ? { scale: [1, 0.85, 1.1, 1] } : { scale: 1 }}
              transition={{ duration: 0.35 }}
              className="rounded-full p-2"
              style={{
                background: inputText ? 'rgba(211,58,2,0.12)' : 'rgba(0,0,0,0.05)',
                color: inputText ? '#D33A02' : 'rgba(0,0,0,0.3)',
              }}
              tabIndex={-1}
            >
              <Send className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* nav controls */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <button
          onClick={() => setFaqIndex((i) => (i - 1 + faqs.length) % faqs.length)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all"
          style={{
            background: 'rgba(0,31,91,0.08)',
            color: '#001F5B',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,31,91,0.16)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,31,91,0.08)')}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
          Prev
        </button>

        <div className="flex gap-1.5">
          {faqs.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === faqIndex ? 16 : 6,
                height: 6,
                background: i === faqIndex ? '#D33A02' : '#cbd5e1',
              }}
            />
          ))}
        </div>

        <button
          onClick={() => setFaqIndex((i) => (i + 1) % faqs.length)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all"
          style={{
            background: 'rgba(211,58,2,0.1)',
            color: '#D33A02',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(211,58,2,0.18)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(211,58,2,0.1)')}
        >
          Next
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
    </div>
  );
}

function AiAvatar() {
  return (
    <div
      className="flex-shrink-0 rounded-full flex items-center justify-center overflow-hidden mt-0.5"
      style={{ width: 26, height: 26, background: 'white', padding: 3, border: '1px solid #e2e8f0' }}
    >
      <img
        src={require('../../assets/logos/SHPE_stacked_logo_national.png')}
        alt="SHPE"
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        draggable={false}
      />
    </div>
  );
}

function Cursor() {
  return (
    <motion.span
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 0.55, repeat: Infinity, repeatType: 'reverse' }}
      className="inline-block w-0.5 h-3.5 bg-current rounded-full ml-0.5 align-middle"
    />
  );
}
