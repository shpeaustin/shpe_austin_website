import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, UserCheck, CreditCard, CheckCircle, Mail, Download, ArrowRight } from 'lucide-react';
import { FAQChatDemo } from '../components/ai_input/FAQChatDemo';
import memberPDF from '../assets/How-to-become-a-member-in-Austin-SHPE-Professional-Chapter.pdf';

// membership steps — order matters

const steps = [
  {
    number: '01',
    Icon: Monitor,
    title: 'Use a Computer',
    accent: '#001F5B',
    gradient: 'linear-gradient(135deg, #001F5B 0%, #0a2a5e 100%)',
    light: '#e8eef8',
    detail: 'Before starting, grab a computer instead of your phone. This reduces the chance of making a mistake during registration — the process involves several form fields and account setup steps.',
  },
  {
    number: '02',
    Icon: UserCheck,
    title: 'Create or Log In to SHPEConnect',
    accent: '#0070C0',
    gradient: 'linear-gradient(135deg, #0070C0 0%, #005a9e 100%)',
    light: '#e0f0ff',
    detail: 'Head to SHPEConnect and create an account if you don\'t have one, or log in to your existing account. This is the national SHPE membership portal where all accounts are managed.',
  },
  {
    number: '03',
    Icon: CreditCard,
    title: 'Register & Select Austin Chapter',
    accent: '#D33A02',
    gradient: 'linear-gradient(135deg, #D33A02 0%, #a82d01 100%)',
    light: '#fff0eb',
    detail: 'Complete the membership registration and make sure to select the Austin, TX chapter. Your membership type should read "ATX Professional-Regular" to confirm you\'re in the right chapter.',
  },
  {
    number: '04',
    Icon: CheckCircle,
    title: 'Verify Your Membership',
    accent: '#FD652F',
    gradient: 'linear-gradient(135deg, #FD652F 0%, #D33A02 100%)',
    light: '#fff4ee',
    detail: 'In your SHPEConnect profile, go to My Profile → My Memberships. Confirm it shows: Chapter: Austin, TX — Type: ATX Professional-Regular. If anything looks off, see the FAQ below.',
  },
];

const faqs = [
  {
    q: 'How do I verify my membership to the Austin Professional Chapter?',
    a: 'In your SHPEConnect profile, click "My Memberships." You should see Chapter: Austin, TX and Type: ATX Professional-Regular. If that\'s what shows up, you\'re all set.',
  },
  {
    q: 'How do I change my chapter to the Austin Professional Chapter?',
    a: 'Send an email to membership@shpe.org requesting a chapter change to the Austin Professional Chapter. They\'ll update your record and confirm once it\'s done.',
  },
  {
    q: 'I see a national chapter but no regional chapter. What should I do?',
    a: 'Email membership@shpe.org and let them know you need to be added to the Austin Professional Chapter. Include your name and account email to speed things up.',
  },
];

// each step card — tilts on hover when not active

function StepCard({ step, index, isActive, onClick }) {
  const cardRef = useRef(null);
  const spotRef = useRef(null);
  const { Icon } = step;

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    const spot = spotRef.current;
    if (!card || isActive) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    card.style.transform = `perspective(900px) rotateX(${((y - cy) / cy) * -6}deg) rotateY(${((x - cx) / cx) * 6}deg) scale(1.02)`;
    if (spot) { spot.style.left = `${x}px`; spot.style.top = `${y}px`; spot.style.opacity = '1'; }
  }, [isActive]);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    const spot = spotRef.current;
    if (card) card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
    if (spot) spot.style.opacity = '0';
  }, []);

  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut', delay: index * 0.1 } } }}
      style={{ willChange: 'transform' }}
    >
      <div
        ref={cardRef}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          position: 'relative', overflow: 'hidden', borderRadius: 20, cursor: 'pointer',
          background: isActive ? step.gradient : 'white',
          border: isActive ? 'none' : `1px solid ${step.accent}20`,
          boxShadow: isActive ? `0 20px 60px ${step.accent}40` : '0 4px 20px rgba(0,0,0,0.06)',
          transition: 'transform 0.15s ease, box-shadow 0.3s ease',
          padding: 28,
        }}
      >
        {/* follows your mouse so the card feels alive */}
        <div ref={spotRef} style={{
          position: 'absolute', width: 180, height: 180, borderRadius: '50%',
          background: `radial-gradient(circle, ${step.accent}14 0%, transparent 70%)`,
          transform: 'translate(-50%, -50%)', pointerEvents: 'none',
          opacity: 0, transition: 'opacity 0.2s', zIndex: 0,
        }} />

        {/* little glow circle when this step is selected */}
        {isActive && (
          <div style={{
            position: 'absolute', width: 180, height: 180, borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)', top: -60, right: -40, pointerEvents: 'none',
          }} />
        )}

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <span style={{
              fontSize: '2.5rem', fontWeight: 900, lineHeight: 1,
              color: isActive ? 'rgba(255,255,255,0.2)' : `${step.accent}18`,
              letterSpacing: '-0.04em',
            }}>
              {step.number}
            </span>
            <div style={{
              width: 44, height: 44, borderRadius: 14,
              background: isActive ? 'rgba(255,255,255,0.15)' : step.light,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon size={20} color={isActive ? 'white' : step.accent} strokeWidth={2} />
            </div>
          </div>

          <h3 style={{
            fontWeight: 900, fontSize: '1rem', lineHeight: 1.3, margin: '0 0 10px',
            color: isActive ? 'white' : '#0f172a',
          }}>
            {step.title}
          </h3>

          <AnimatePresence>
            {isActive && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                style={{ fontSize: '0.85rem', lineHeight: 1.65, color: 'rgba(255,255,255,0.82)', margin: 0, overflow: 'hidden' }}
              >
                {step.detail}
              </motion.p>
            )}
          </AnimatePresence>

          {!isActive && (
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0, fontWeight: 600 }}>
              Tap to expand
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}



export default function Membership() {
  const [activeStep, setActiveStep] = useState(0);

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
          style={{ position: 'relative', zIndex: 1, maxWidth: 640, margin: '0 auto' }}
        >
          <span style={{
            display: 'inline-block', fontSize: '0.7rem', fontWeight: 900,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            padding: '6px 16px', borderRadius: 999, marginBottom: 24,
            background: 'rgba(253,101,47,0.18)', color: '#FD652F',
            border: '1px solid rgba(253,101,47,0.3)',
          }}>
            Join the Familia
          </span>

          <h1 style={{
            fontWeight: 900, color: 'white', margin: '0 0 20px',
            fontSize: 'clamp(2.4rem, 6vw, 3.8rem)', lineHeight: 1.05, letterSpacing: '-0.02em',
          }}>
            Membership
          </h1>
          <p style={{ color: '#c8d8e8', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: 40 }}>
            Becoming a SHPE Austin member is your gateway to a professional network, career resources, and a community that has your back. Here's how to get started.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.a
              href={memberPDF}
              download
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '14px 28px', borderRadius: 14,
                background: 'linear-gradient(135deg, #FD652F, #D33A02)',
                color: 'white', fontWeight: 900, fontSize: '0.9rem',
                textDecoration: 'none', boxShadow: '0 8px 28px rgba(253,101,47,0.35)',
                letterSpacing: '-0.01em',
              }}
            >
              <Download size={18} />
              Download Full Guide
            </motion.a>
            <motion.a
              href="mailto:membership@shpe.org"
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
              <Mail size={18} />
              Contact Support
            </motion.a>
          </div>
        </motion.div>
      </section>

      <section style={{ padding: '80px 24px', maxWidth: 1000, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 48 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <div style={{ width: 6, height: 40, borderRadius: 999, background: 'linear-gradient(180deg, #001F5B, #0070C0)' }} />
            <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', color: '#001F5B', margin: 0, letterSpacing: '-0.02em' }}>
              How to Join
            </h2>
          </div>
          <p style={{ color: '#64748b', fontSize: '1rem', paddingLeft: 18, margin: 0 }}>
            Four steps to become an official SHPE Austin Professional Chapter member.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}
        >
          {steps.map((step, i) => (
            <StepCard
              key={step.number}
              step={step}
              index={i}
              isActive={activeStep === i}
              onClick={() => setActiveStep(i)}
            />
          ))}
        </motion.div>

        <div style={{ marginTop: 32, display: 'flex', gap: 6 }}>
          {steps.map((step, i) => (
            <motion.div
              key={i}
              onClick={() => setActiveStep(i)}
              animate={{ flex: activeStep === i ? 3 : 1 }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              style={{
                height: 4, borderRadius: 999, cursor: 'pointer',
                background: activeStep === i ? steps[activeStep].gradient : '#e2e8f0',
              }}
            />
          ))}
        </div>
        <p style={{ textAlign: 'right', fontSize: '0.75rem', color: '#94a3b8', marginTop: 8, fontWeight: 700 }}>
          Step {activeStep + 1} of {steps.length}
        </p>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ margin: '0 24px 80px', maxWidth: 1000, marginLeft: 'auto', marginRight: 'auto' }}
      >
        <div style={{
          borderRadius: 24, padding: '40px 40px',
          background: 'linear-gradient(135deg, #001F5B 0%, #0070C0 100%)',
          display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'center',
          boxShadow: '0 16px 48px rgba(0,31,91,0.25)',
        }}>
          <div style={{ flex: 1, minWidth: 240 }}>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
              Confirm Your Registration
            </p>
            <h3 style={{ color: 'white', fontWeight: 900, fontSize: '1.5rem', margin: '0 0 12px', letterSpacing: '-0.02em' }}>
              What to look for in SHPEConnect
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem', lineHeight: 1.65, margin: 0 }}>
              After completing registration, verify your membership details match the following exactly.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1, minWidth: 240 }}>
            {[
              { label: 'Chapter', value: 'Austin, TX' },
              { label: 'Type', value: 'ATX Professional-Regular' },
            ].map(({ label, value }) => (
              <div key={label} style={{
                padding: '16px 20px', borderRadius: 14,
                background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.15)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12,
              }}>
                <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.8rem', fontWeight: 700 }}>{label}</span>
                <span style={{
                  color: 'white', fontSize: '0.9rem', fontWeight: 900,
                  padding: '4px 12px', borderRadius: 8,
                  background: 'rgba(253,101,47,0.3)', border: '1px solid rgba(253,101,47,0.4)',
                }}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <section style={{ padding: '0 24px 80px', maxWidth: 720, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 36 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <div style={{ width: 6, height: 40, borderRadius: 999, background: 'linear-gradient(180deg, #D33A02, #FD652F)' }} />
            <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', color: '#D33A02', margin: 0, letterSpacing: '-0.02em' }}>
              FAQs
            </h2>
          </div>
          <p style={{ color: '#64748b', fontSize: '1rem', paddingLeft: 18, margin: 0 }}>
            Common questions about the membership process.
          </p>
        </motion.div>

        <FAQChatDemo faqs={faqs} />

        {/* if none of the FAQs helped */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{
            marginTop: 32, padding: '28px 32px', borderRadius: 20,
            background: 'white', border: '1px solid #e2e8f0',
            display: 'flex', flexWrap: 'wrap', gap: 16,
            alignItems: 'center', justifyContent: 'space-between',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          }}
        >
          <div>
            <p style={{ fontWeight: 900, color: '#0f172a', margin: '0 0 4px', fontSize: '1rem' }}>Still need help?</p>
            <p style={{ color: '#64748b', margin: 0, fontSize: '0.88rem' }}>Reach out to SHPE national membership support directly.</p>
          </div>
          <motion.a
            href="mailto:membership@shpe.org"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '12px 22px', borderRadius: 12,
              background: 'linear-gradient(135deg, #001F5B, #0070C0)',
              color: 'white', fontWeight: 800, fontSize: '0.88rem',
              textDecoration: 'none', whiteSpace: 'nowrap',
            }}
          >
            <Mail size={16} />
            membership@shpe.org
            <ArrowRight size={14} />
          </motion.a>
        </motion.div>
      </section>

    </main>
  );
}
