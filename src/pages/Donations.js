import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, ShoppingBag, Heart, Users, Sparkles } from 'lucide-react';

const impacts = [
  {
    Icon: GraduationCap,
    label: 'Scholarships',
    description: 'Funding students on their path to a STEM degree.',
    accent: '#001F5B',
    light: '#e8eef8',
    gradient: 'linear-gradient(135deg, #001F5B 0%, #0a2a5e 100%)',
  },
  {
    Icon: ShoppingBag,
    label: 'Food Banks',
    description: 'Donating to local food banks to fight hunger in Austin.',
    accent: '#0070C0',
    light: '#e0f0ff',
    gradient: 'linear-gradient(135deg, #0070C0 0%, #005a9e 100%)',
  },
  {
    Icon: Heart,
    label: 'Community Drives',
    description: 'Coats for Kids, school supply drives, and more.',
    accent: '#D33A02',
    light: '#fff0eb',
    gradient: 'linear-gradient(135deg, #D33A02 0%, #a82d01 100%)',
  },
  {
    Icon: Users,
    label: 'K–12 Outreach',
    description: 'Funding STEM events that inspire the next generation.',
    accent: '#FD652F',
    light: '#fff4ee',
    gradient: 'linear-gradient(135deg, #FD652F 0%, #D33A02 100%)',
  },
];

// ── TILT IMPACT CARD ──────────────────────────────────────────────────────────

function ImpactCard({ item, index }) {
  const cardRef = useRef(null);
  const spotRef = useRef(null);
  const { Icon } = item;

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    const spot = spotRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    card.style.transform = `perspective(900px) rotateX(${((y - cy) / cy) * -7}deg) rotateY(${((x - cx) / cx) * 7}deg) scale(1.03)`;
    if (spot) { spot.style.left = `${x}px`; spot.style.top = `${y}px`; spot.style.opacity = '1'; }
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    const spot = spotRef.current;
    if (card) card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
    if (spot) spot.style.opacity = '0';
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
      style={{ willChange: 'transform' }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          position: 'relative', overflow: 'hidden', borderRadius: 20,
          background: 'white', border: `1px solid ${item.accent}18`,
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          transition: 'transform 0.15s ease, box-shadow 0.2s ease',
          padding: '28px 24px', cursor: 'default',
        }}
      >
        {/* cursor spotlight */}
        <div ref={spotRef} style={{
          position: 'absolute', width: 180, height: 180, borderRadius: '50%',
          background: `radial-gradient(circle, ${item.accent}14 0%, transparent 70%)`,
          transform: 'translate(-50%, -50%)', pointerEvents: 'none',
          opacity: 0, transition: 'opacity 0.2s', zIndex: 0,
        }} />

        {/* top accent bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: item.gradient }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 16,
            background: item.light, display: 'flex',
            alignItems: 'center', justifyContent: 'center', marginBottom: 18,
          }}>
            <Icon size={24} color={item.accent} strokeWidth={2} />
          </div>
          <h3 style={{ fontWeight: 900, fontSize: '1.05rem', color: '#0f172a', margin: '0 0 8px' }}>{item.label}</h3>
          <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>{item.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────────

export default function Donations() {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <main style={{ paddingTop: '60px', background: '#f8fafc', minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        padding: '80px 24px 72px', textAlign: 'center',
        background: 'linear-gradient(135deg, #D33A02 0%, #7a1e01 100%)',
      }}>
        {/* blobs */}
        <div style={{ position: 'absolute', width: 480, height: 480, borderRadius: '50%', background: '#FD652F', top: -140, right: -80, filter: 'blur(100px)', opacity: 0.25, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: 320, height: 320, borderRadius: '50%', background: '#001F5B', bottom: -80, left: -60, filter: 'blur(80px)', opacity: 0.2, pointerEvents: 'none' }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ position: 'relative', zIndex: 1, maxWidth: 660, margin: '0 auto' }}
        >
          {/* animated heart icon */}
          <motion.div
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            style={{ display: 'inline-flex', marginBottom: 20 }}
          >
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
              border: '2px solid rgba(255,255,255,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Heart size={32} color="white" fill="white" />
            </div>
          </motion.div>

          <h1 style={{
            fontWeight: 900, color: 'white', margin: '0 0 20px',
            fontSize: 'clamp(2.4rem, 6vw, 3.8rem)', lineHeight: 1.05, letterSpacing: '-0.02em',
            display: 'block',
          }}>
            Make an Impact
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', lineHeight: 1.75, marginBottom: 0 }}>
            Your generosity helps SHPE Austin achieve our goals of giving back to the community in impactful ways — from scholarships for students to donations to local food banks, and so much more.
          </p>

          {/* floating thank you badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            style={{ marginTop: 32, display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 999, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)' }}
          >
            <Sparkles size={16} color="white" />
            <span style={{ color: 'white', fontWeight: 800, fontSize: '0.85rem' }}>Thank you for your support!</span>
          </motion.div>
        </motion.div>
      </section>

      {/* ── YOUR DONATION GOES TO ── */}
      <section style={{ padding: '72px 24px', maxWidth: 1000, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 44 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <div style={{ width: 6, height: 40, borderRadius: 999, background: 'linear-gradient(180deg, #D33A02, #FD652F)' }} />
            <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', color: '#D33A02', margin: 0, letterSpacing: '-0.02em' }}>
              Where Your Donation Goes
            </h2>
          </div>
          <p style={{ color: '#64748b', fontSize: '1rem', paddingLeft: 18, margin: 0 }}>
            Every dollar you give directly funds programs and initiatives that uplift our community.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gap: 18, gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))' }}>
          {impacts.map((item, i) => (
            <ImpactCard key={item.label} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* ── DONATION FORM ── */}
      <section style={{ padding: '0 24px 80px', maxWidth: 860, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 32 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <div style={{ width: 6, height: 40, borderRadius: 999, background: 'linear-gradient(180deg, #001F5B, #0070C0)' }} />
            <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', color: '#001F5B', margin: 0, letterSpacing: '-0.02em' }}>
              Donate Now
            </h2>
          </div>
          <p style={{ color: '#64748b', fontSize: '1rem', paddingLeft: 18, margin: 0 }}>
            Secure donations powered by <span style={{ fontWeight: 700, color: '#0070C0' }}>Zeffy</span> — 100% of your donation goes to SHPE Austin, no platform fees.
          </p>
        </motion.div>

        {/* iframe container */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            position: 'relative', borderRadius: 24, overflow: 'hidden',
            boxShadow: '0 24px 80px rgba(0,0,0,0.12)',
            border: '1px solid #e2e8f0',
            background: 'white',
          }}
        >
          {/* header bar */}
          <div style={{
            padding: '18px 24px', display: 'flex', alignItems: 'center', gap: 12,
            borderBottom: '1px solid #f1f5f9',
            background: 'linear-gradient(135deg, #001F5B 0%, #0070C0 100%)',
          }}>
            <div style={{ display: 'flex', gap: 6 }}>
              {['#ff5f57', '#ffbd2e', '#28c840'].map((c) => (
                <div key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c, opacity: 0.8 }} />
              ))}
            </div>
            <div style={{
              flex: 1, background: 'rgba(255,255,255,0.1)', borderRadius: 8,
              padding: '5px 14px', fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)',
              fontWeight: 600, letterSpacing: '0.01em',
            }}>
              🔒 zeffy.com — Secure Donation Form
            </div>
            <Heart size={16} color="rgba(255,255,255,0.6)" />
          </div>

          {/* loading shimmer */}
          {!iframeLoaded && (
            <div style={{
              position: 'absolute', inset: 0, top: 57,
              background: 'linear-gradient(90deg, #f8fafc 25%, #f1f5f9 50%, #f8fafc 75%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.4s infinite',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, flexDirection: 'column',
            }}>
              <Heart size={32} color="#D33A02" />
              <span style={{ color: '#94a3b8', fontWeight: 700, fontSize: '0.9rem' }}>Loading donation form…</span>
            </div>
          )}

          <iframe
            src="https://www.zeffy.com/en-US/donation-form/donate-to-shpe-austin"
            title="Donate to SHPE Austin"
            onLoad={() => setIframeLoaded(true)}
            style={{
              width: '100%',
              height: 700,
              border: 'none',
              display: 'block',
              opacity: iframeLoaded ? 1 : 0,
              transition: 'opacity 0.4s ease',
            }}
            allow="payment"
          />
        </motion.div>

        {/* trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginTop: 20 }}
        >
          {['🔒 Secure & Encrypted', '0% Platform Fees', '❤️ 100% Goes to SHPE Austin'].map((badge) => (
            <span key={badge} style={{
              padding: '6px 16px', borderRadius: 999, fontSize: '0.78rem',
              fontWeight: 700, color: '#64748b',
              background: 'white', border: '1px solid #e2e8f0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}>
              {badge}
            </span>
          ))}
        </motion.div>
      </section>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </main>
  );
}
