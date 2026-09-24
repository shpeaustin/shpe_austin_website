import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, LayoutList, Presentation, Check } from 'lucide-react';
import { slideStagger } from './slideBlocks';

// one slide at a time with a progress rail, or the whole thing stacked as a
// single scrollable/printable page. same slide data feeds both.

const slideVariants = {
  enter: (d) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0, scale: 0.96 }),
  center: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.32, 0.72, 0, 1] } },
  exit: (d) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0, scale: 0.96, transition: { duration: 0.35, ease: [0.32, 0.72, 0, 1] } }),
};

const fadeVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const SWIPE_THRESHOLD = 60;

function SlideHeader({ slide, index, accent, gradient }) {
  const { Icon } = slide;
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 24 }}>
      <div style={{
        flexShrink: 0, width: 48, height: 48, borderRadius: 15, background: gradient,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: `0 8px 22px ${accent}33`,
      }}>
        {Icon ? <Icon size={22} color="white" strokeWidth={2.1} /> : null}
      </div>
      <div style={{ minWidth: 0 }}>
        <p style={{
          margin: '0 0 4px', fontSize: '0.67rem', fontWeight: 900,
          letterSpacing: '0.11em', textTransform: 'uppercase', color: accent,
        }}>
          {String(index + 1).padStart(2, '0')} · {slide.kicker}
        </p>
        <h2 style={{
          margin: 0, fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em',
          fontSize: 'clamp(1.35rem, 3.4vw, 1.95rem)', lineHeight: 1.2,
        }}>
          {slide.title}
        </h2>
      </div>
    </div>
  );
}

export default function GuideDeck({ slides, accent = '#0070C0', gradient }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [longForm, setLongForm] = useState(false);
  const reduceMotion = useReducedMotion();

  const total = slides.length;
  const resolvedGradient = gradient || `linear-gradient(135deg, ${accent}, ${accent})`;

  const goTo = useCallback((next) => {
    const clamped = Math.max(0, Math.min(total - 1, next));
    if (clamped === activeIndex) return;
    setDirection(clamped > activeIndex ? 1 : -1);
    setActiveIndex(clamped);
  }, [total, activeIndex]);

  const goPrev = useCallback(() => goTo(activeIndex - 1), [goTo, activeIndex]);
  const goNext = useCallback(() => goTo(activeIndex + 1), [goTo, activeIndex]);

  useEffect(() => {
    if (longForm) return undefined;
    const onKey = (e) => {
      // don't hijack arrows while someone is typing or tabbing through links
      const tag = e.target?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === 'ArrowRight') { e.preventDefault(); goNext(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); goPrev(); }
      else if (e.key === 'Home') { e.preventDefault(); goTo(0); }
      else if (e.key === 'End') { e.preventDefault(); goTo(total - 1); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [longForm, goNext, goPrev, goTo, total]);

  const toggle = (
    <div className="guide-deck-toggle" style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
      <div style={{
        display: 'inline-flex', padding: 4, borderRadius: 999,
        background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      }}>
        {[
          { label: 'Walkthrough', Icon: Presentation, value: false },
          { label: 'View all as one page', Icon: LayoutList, value: true },
        ].map(({ label, Icon, value }) => {
          const isOn = longForm === value;
          return (
            <button
              key={label}
              type="button"
              onClick={() => setLongForm(value)}
              aria-pressed={isOn}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '8px 16px', borderRadius: 999, border: 'none', cursor: 'pointer',
                fontSize: '0.8rem', fontWeight: 800, whiteSpace: 'nowrap',
                background: isOn ? resolvedGradient : 'transparent',
                color: isOn ? 'white' : '#64748b',
                transition: 'color 0.2s ease',
              }}
            >
              <Icon size={14} strokeWidth={2.4} />
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );

  if (longForm) {
    return (
      <div className="guide-deck">
        <style>{`
          @media print {
            .guide-deck-toggle, .card-nav-container { display: none !important; }
            .guide-longform-slide { break-inside: avoid; page-break-inside: avoid; box-shadow: none !important; }
          }
        `}</style>
        {toggle}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {slides.map((slide, i) => (
            <motion.article
              key={slide.id}
              className="guide-longform-slide"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.12 }}
              variants={slideStagger}
              style={{
                padding: 'clamp(24px, 4vw, 38px)', borderRadius: 22,
                background: 'white', border: '1px solid #e2e8f0',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              }}
            >
              <SlideHeader slide={slide} index={i} accent={accent} gradient={resolvedGradient} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {slide.body}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    );
  }

  const activeSlide = slides[activeIndex];
  const isLast = activeIndex === total - 1;

  return (
    <div className="guide-deck">
      {toggle}

      {/* progress rail — the active segment grows so you can feel where you are */}
      <div style={{ display: 'flex', gap: 5, marginBottom: 10 }}>
        {slides.map((slide, i) => (
          <motion.button
            key={slide.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}: ${slide.title}`}
            animate={{ flex: activeIndex === i ? 3 : 1 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            style={{
              height: 5, borderRadius: 999, border: 'none', padding: 0, cursor: 'pointer',
              background: i === activeIndex ? resolvedGradient : (i < activeIndex ? `${accent}4d` : '#e2e8f0'),
            }}
          />
        ))}
      </div>

      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 16, fontSize: '0.74rem', fontWeight: 800, color: '#94a3b8',
      }}>
        <span>{activeSlide.kicker}</span>
        <span>{activeIndex + 1} of {total}</span>
      </div>

      {/* fixed min-height so the card doesn't jump between slides */}
      <div style={{
        position: 'relative', overflow: 'hidden', borderRadius: 24,
        background: 'white', border: '1px solid #e2e8f0',
        boxShadow: '0 10px 40px rgba(0,0,0,0.07)',
        minHeight: 'clamp(460px, 62vh, 640px)',
      }}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={activeSlide.id}
            custom={direction}
            variants={reduceMotion ? fadeVariants : slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag={reduceMotion ? false : 'x'}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={(e, { offset, velocity }) => {
              const power = offset.x + velocity.x * 0.2;
              if (power < -SWIPE_THRESHOLD) goNext();
              else if (power > SWIPE_THRESHOLD) goPrev();
            }}
            style={{ padding: 'clamp(24px, 4vw, 40px)', cursor: reduceMotion ? 'default' : 'grab' }}
          >
            <motion.div initial="hidden" animate="visible" variants={slideStagger}>
              <SlideHeader slide={activeSlide} index={activeIndex} accent={accent} gradient={resolvedGradient} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {activeSlide.body}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        gap: 12, marginTop: 20, flexWrap: 'wrap',
      }}>
        <motion.button
          type="button"
          onClick={goPrev}
          disabled={activeIndex === 0}
          whileHover={activeIndex === 0 ? undefined : { scale: 1.04 }}
          whileTap={activeIndex === 0 ? undefined : { scale: 0.97 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 9,
            padding: '12px 22px', borderRadius: 13, cursor: activeIndex === 0 ? 'default' : 'pointer',
            background: 'white', border: '1px solid #e2e8f0',
            color: activeIndex === 0 ? '#cbd5e1' : '#475569',
            fontWeight: 800, fontSize: '0.86rem',
          }}
        >
          <ArrowLeft size={16} />
          Back
        </motion.button>

        <p style={{ margin: 0, fontSize: '0.74rem', color: '#94a3b8', fontWeight: 600 }}>
          Use ← → or swipe
        </p>

        <motion.button
          type="button"
          onClick={isLast ? () => goTo(0) : goNext}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 9,
            padding: '12px 24px', borderRadius: 13, cursor: 'pointer', border: 'none',
            background: resolvedGradient, color: 'white',
            fontWeight: 900, fontSize: '0.86rem',
            boxShadow: `0 8px 24px ${accent}40`,
          }}
        >
          {isLast ? <Check size={16} /> : null}
          {isLast ? 'Start over' : 'Next'}
          {isLast ? null : <ArrowRight size={16} />}
        </motion.button>
      </div>
    </div>
  );
}
