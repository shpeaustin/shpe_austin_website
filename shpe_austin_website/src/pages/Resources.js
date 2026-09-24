import { useState, useMemo, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Link2, Check, Share2, Mail, Download, ArrowLeft } from 'lucide-react';
import GuideDeck from '../components/guide/GuideDeck';
import { TiltCard } from '../components/guide/slideBlocks';
import { interviewGuide } from './resources/interviewSlides';
import { resumeGuide, resumeTemplate } from './resources/resumeSlides';

// every guide on this page lives here. adding another one is a new entry —
// no new route, no new nav link.
const GUIDES = [interviewGuide, resumeGuide];

export default function Resources() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [copied, setCopied] = useState(false);
  const deckRef = useRef(null);

  const requested = searchParams.get('guide');
  const activeGuide = GUIDES.find((g) => g.id === requested) || null;

  const goToGuide = useCallback((id) => {
    setSearchParams(id ? { guide: id } : {}, { replace: false });
    // the picker sits above the deck — bring the deck into view on switch
    requestAnimationFrame(() => {
      deckRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [setSearchParams]);

  const slides = useMemo(
    () => (activeGuide ? activeGuide.buildSlides({ goToGuide }) : []),
    [activeGuide, goToGuide],
  );

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked (insecure context / permissions) — nothing useful to do
    }
  };

  return (
    <main style={{ paddingTop: '60px', background: '#f8fafc', minHeight: '100vh' }}>

      <section style={{
        position: 'relative', overflow: 'hidden',
        padding: '80px 24px 72px', textAlign: 'center',
        background: 'linear-gradient(135deg, #001F5B 0%, #0a1a3a 100%)',
      }}>
        <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: '#0070C0', top: -150, right: -100, filter: 'blur(100px)', opacity: 0.12, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: 350, height: 350, borderRadius: '50%', background: '#FD652F', bottom: -80, left: -80, filter: 'blur(80px)', opacity: 0.12, pointerEvents: 'none' }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ position: 'relative', zIndex: 1, maxWidth: 680, margin: '0 auto' }}
        >
          <span style={{
            display: 'inline-block', fontSize: '0.7rem', fontWeight: 900,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            padding: '6px 16px', borderRadius: 999, marginBottom: 24,
            background: 'rgba(253,101,47,0.18)', color: '#FD652F',
            border: '1px solid rgba(253,101,47,0.3)',
          }}>
            Career Resources
          </span>

          <h1 style={{
            fontWeight: 900, color: 'white', margin: '0 0 20px',
            fontSize: 'clamp(2.4rem, 6vw, 3.8rem)', lineHeight: 1.05, letterSpacing: '-0.02em',
          }}>
            Level up your job search
          </h1>
          <p style={{ color: '#c8d8e8', fontSize: '1.1rem', lineHeight: 1.7, margin: '0 0 32px' }}>
            Guided walkthroughs for engineers and professionals of every discipline — no fluff, no paywall, no login. Free to use and free to share with any student, chapter, or organization that needs a boost.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.button
              type="button"
              onClick={copyLink}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '14px 28px', borderRadius: 14, border: 'none', cursor: 'pointer',
                background: 'linear-gradient(135deg, #FD652F, #D33A02)',
                color: 'white', fontWeight: 900, fontSize: '0.9rem',
                boxShadow: '0 8px 28px rgba(253,101,47,0.35)',
              }}
            >
              {copied ? <Check size={18} /> : <Link2 size={18} />}
              {copied ? 'Link copied!' : 'Copy shareable link'}
            </motion.button>
            <motion.a
              href={resumeTemplate}
              download
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '14px 28px', borderRadius: 14,
                background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)',
                color: 'white', fontWeight: 800, fontSize: '0.9rem',
                textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              <Download size={18} />
              Resume template
            </motion.a>
          </div>
        </motion.div>
      </section>

      <section ref={deckRef} style={{ padding: '64px 24px 80px', maxWidth: 1000, margin: '0 auto', scrollMarginTop: 72 }}>
        <AnimatePresence mode="wait">
          {activeGuide ? (
            <motion.div
              key={activeGuide.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            >
              {/* guide switcher — stays visible so people can hop between guides */}
              <div style={{
                display: 'flex', flexWrap: 'wrap', gap: 12,
                alignItems: 'center', justifyContent: 'space-between', marginBottom: 28,
              }}>
                <button
                  type="button"
                  onClick={() => goToGuide(null)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 7,
                    padding: '9px 16px', borderRadius: 999, cursor: 'pointer',
                    background: 'white', border: '1px solid #e2e8f0',
                    color: '#64748b', fontWeight: 800, fontSize: '0.8rem',
                  }}
                >
                  <ArrowLeft size={14} />
                  All guides
                </button>

                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {GUIDES.map((guide) => {
                    const isOn = guide.id === activeGuide.id;
                    const { Icon } = guide;
                    return (
                      <button
                        key={guide.id}
                        type="button"
                        onClick={() => goToGuide(guide.id)}
                        aria-pressed={isOn}
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: 7,
                          padding: '9px 16px', borderRadius: 999, cursor: 'pointer',
                          border: `1px solid ${isOn ? 'transparent' : '#e2e8f0'}`,
                          background: isOn ? guide.gradient : 'white',
                          color: isOn ? 'white' : '#64748b',
                          fontWeight: 800, fontSize: '0.8rem',
                        }}
                      >
                        <Icon size={14} strokeWidth={2.3} />
                        {guide.title}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div style={{ maxWidth: 820, margin: '0 auto' }}>
                <div style={{ marginBottom: 28 }}>
                  <h2 style={{
                    fontWeight: 900, fontSize: 'clamp(1.7rem, 4vw, 2.4rem)',
                    color: '#001F5B', margin: '0 0 8px', letterSpacing: '-0.02em',
                  }}>
                    {activeGuide.title}
                  </h2>
                  <p style={{ color: '#64748b', fontSize: '0.98rem', lineHeight: 1.65, margin: 0 }}>
                    {activeGuide.blurb}
                  </p>
                </div>

                <GuideDeck slides={slides} accent={activeGuide.accent} gradient={activeGuide.gradient} />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="picker"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            >
              <div style={{ marginBottom: 40 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                  <div style={{ width: 6, height: 40, borderRadius: 999, background: 'linear-gradient(180deg, #001F5B, #0070C0)' }} />
                  <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', color: '#001F5B', margin: 0, letterSpacing: '-0.02em' }}>
                    Pick a guide
                  </h2>
                </div>
                <p style={{ color: '#64748b', fontSize: '1rem', paddingLeft: 18, margin: 0 }}>
                  Click through it slide by slide, or flip to one-page view and skim the whole thing.
                </p>
              </div>

              <div style={{ display: 'grid', gap: 22, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                {GUIDES.map((guide, i) => {
                  const { Icon } = guide;
                  return (
                    <motion.div
                      key={guide.id}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{ duration: 0.5, delay: i * 0.12, ease: 'easeOut' }}
                    >
                      <TiltCard
                        accent={guide.accent}
                        onClick={() => goToGuide(guide.id)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goToGuide(guide.id); }
                        }}
                        style={{ height: '100%', cursor: 'pointer' }}
                      >
                        <div style={{ height: 6, background: guide.gradient }} />
                        <div style={{ padding: 30, display: 'flex', flexDirection: 'column', height: '100%' }}>
                          <div style={{
                            width: 52, height: 52, borderRadius: 16, marginBottom: 20,
                            background: guide.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: `0 10px 26px ${guide.accent}38`,
                          }}>
                            <Icon size={24} color="white" strokeWidth={2.1} />
                          </div>

                          <p style={{
                            margin: '0 0 8px', fontSize: '0.67rem', fontWeight: 900,
                            letterSpacing: '0.11em', textTransform: 'uppercase', color: guide.accent,
                          }}>
                            {guide.eyebrow}
                          </p>
                          <h3 style={{
                            margin: '0 0 12px', fontWeight: 900, fontSize: '1.45rem',
                            color: '#0f172a', letterSpacing: '-0.02em', lineHeight: 1.2,
                          }}>
                            {guide.title}
                          </h3>
                          <p style={{ margin: '0 0 20px', fontSize: '0.92rem', lineHeight: 1.65, color: '#64748b' }}>
                            {guide.blurb}
                          </p>

                          <ul style={{ listStyle: 'none', margin: '0 0 24px', padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {guide.highlights.map((h) => (
                              <li key={h} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: '0.85rem', color: '#475569', fontWeight: 600 }}>
                                <span style={{
                                  width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
                                  background: `${guide.accent}18`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                  <Check size={11} color={guide.accent} strokeWidth={3} />
                                </span>
                                {h}
                              </li>
                            ))}
                          </ul>

                          <span style={{
                            marginTop: 'auto', display: 'inline-flex', alignItems: 'center', gap: 8,
                            fontWeight: 900, fontSize: '0.88rem', color: guide.accent,
                          }}>
                            Start the walkthrough
                            <ArrowRight size={16} />
                          </span>
                        </div>
                      </TiltCard>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ margin: '0 auto 80px', maxWidth: 1000, padding: '0 24px' }}
      >
        <div style={{
          borderRadius: 24, padding: '40px',
          background: 'linear-gradient(135deg, #001F5B 0%, #0070C0 100%)',
          display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'center',
          boxShadow: '0 16px 48px rgba(0,31,91,0.25)',
        }}>
          <div style={{ flex: 1, minWidth: 260 }}>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
              Pass it on
            </p>
            <h3 style={{ color: 'white', fontWeight: 900, fontSize: '1.5rem', margin: '0 0 12px', letterSpacing: '-0.02em' }}>
              Built for our members. Free for everyone.
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.92rem', lineHeight: 1.65, margin: 0 }}>
              If you know a student, a chapter, or an organization that could use this, send them the link. No account required. Got a tip we should add? Let us know.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 220 }}>
            <motion.button
              type="button"
              onClick={copyLink}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                padding: '13px 24px', borderRadius: 13, border: 'none', cursor: 'pointer',
                background: 'white', color: '#001F5B', fontWeight: 900, fontSize: '0.88rem',
              }}
            >
              {copied ? <Check size={16} /> : <Share2 size={16} />}
              {copied ? 'Copied!' : 'Copy link'}
            </motion.button>
            <motion.a
              href="mailto:contact@shpeaustin.com?subject=Career%20Resources%20feedback"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                padding: '13px 24px', borderRadius: 13,
                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                color: 'white', fontWeight: 800, fontSize: '0.88rem', textDecoration: 'none',
              }}
            >
              <Mail size={16} />
              Suggest a tip
            </motion.a>
          </div>
        </div>
      </motion.section>

    </main>
  );
}
