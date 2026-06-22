import { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Building2, Star, Award, Gem } from 'lucide-react';
import armLogo from '../assets/sponsors/arm_logo.svg';

// sponsor tiers and who belongs in each

const tiers = [
  {
    id: 'platinum',
    label: 'Platinum',
    Icon: Gem,
    gradient: 'linear-gradient(135deg, #64748b 0%, #94a3b8 50%, #cbd5e1 100%)',
    accent: '#475569',
    glow: 'rgba(148,163,184,0.35)',
    cardBg: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
    border: 'rgba(148,163,184,0.5)',
    badgeBg: 'linear-gradient(135deg, #475569, #94a3b8)',
    sponsors: [
      {
        name: 'ARM',
        tagline: 'Semiconductor & Software Design',
        location: 'Austin, TX (& United Kingdom)',
        description: 'ARM is an established global semiconductor and software design company headquartered in the United Kingdom. They have had a strong presence in Austin for nearly 29 years and are actively growing new facilities here in the city.',
        yearsInAustin: 29,
        logo: armLogo,
        website: 'https://www.arm.com',
      },
    ],
  },
  {
    id: 'gold',
    label: 'Gold',
    Icon: Award,
    gradient: 'linear-gradient(135deg, #b45309 0%, #d97706 50%, #fbbf24 100%)',
    accent: '#b45309',
    glow: 'rgba(251,191,36,0.3)',
    cardBg: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
    border: 'rgba(251,191,36,0.5)',
    badgeBg: 'linear-gradient(135deg, #b45309, #f59e0b)',
    sponsors: [],
  },
  {
    id: 'silver',
    label: 'Silver',
    Icon: Star,
    gradient: 'linear-gradient(135deg, #374151 0%, #6b7280 50%, #9ca3af 100%)',
    accent: '#4b5563',
    glow: 'rgba(156,163,175,0.3)',
    cardBg: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
    border: 'rgba(156,163,175,0.5)',
    badgeBg: 'linear-gradient(135deg, #374151, #6b7280)',
    sponsors: [],
  },
];

// individual sponsor card

function SponsorCard({ sponsor, tier }) {
  const cardRef = useRef(null);
  const spotRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    const spot = spotRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    card.style.transform = `perspective(1000px) rotateX(${((y - cy) / cy) * -5}deg) rotateY(${((x - cx) / cx) * 5}deg) scale(1.02)`;
    if (spot) { spot.style.left = `${x}px`; spot.style.top = `${y}px`; spot.style.opacity = '1'; }
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    const spot = spotRef.current;
    if (card) card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    if (spot) spot.style.opacity = '0';
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative', overflow: 'hidden', borderRadius: 24,
        background: tier.cardBg, border: `1px solid ${tier.border}`,
        boxShadow: `0 8px 40px ${tier.glow}, 0 2px 12px rgba(0,0,0,0.06)`,
        transition: 'transform 0.15s ease, box-shadow 0.2s ease',
        cursor: 'default',
      }}
    >
      {/* follows your mouse */}
      <div ref={spotRef} style={{
        position: 'absolute', width: 240, height: 240, borderRadius: '50%',
        background: `radial-gradient(circle, ${tier.glow} 0%, transparent 70%)`,
        transform: 'translate(-50%, -50%)', pointerEvents: 'none',
        opacity: 0, transition: 'opacity 0.2s', zIndex: 0,
      }} />

      
      <div style={{ height: 5, background: tier.gradient, position: 'relative', zIndex: 1 }} />

      <div style={{ padding: '36px 36px 32px', position: 'relative', zIndex: 1 }}>
        
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28, gap: 16 }}>

          
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            minWidth: 120, height: 80, borderRadius: 16, padding: '12px 20px',
            background: 'white', border: `1px solid ${tier.border}`,
            boxShadow: `0 4px 16px ${tier.glow}`,
          }}>
            {sponsor.logo
              ? <img src={sponsor.logo} alt={sponsor.name} style={{ maxHeight: 56, maxWidth: 120, objectFit: 'contain' }} />
              : <span style={{ fontWeight: 900, fontSize: '1.5rem', letterSpacing: '-0.03em', color: tier.accent }}>{sponsor.name}</span>
            }
          </div>

          
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '6px 14px', borderRadius: 999,
            background: tier.badgeBg,
            boxShadow: `0 4px 12px ${tier.glow}`,
          }}>
            <tier.Icon size={13} color="white" strokeWidth={2.5} />
            <span style={{ color: 'white', fontWeight: 900, fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {tier.label} Sponsor
            </span>
          </div>
        </div>

        
        <h3 style={{ fontWeight: 900, fontSize: '1.6rem', color: '#0f172a', margin: '0 0 4px', letterSpacing: '-0.02em' }}>
          {sponsor.name}
        </h3>
        <p style={{ fontWeight: 700, fontSize: '0.88rem', color: tier.accent, margin: '0 0 16px', letterSpacing: '0.02em' }}>
          {sponsor.tagline}
        </p>

        
        <p style={{ fontSize: '0.93rem', lineHeight: 1.75, color: '#475569', margin: '0 0 24px' }}>
          {sponsor.description}
        </p>

        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 28 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '6px 14px', borderRadius: 999,
            background: 'white', border: `1px solid ${tier.border}`,
            fontSize: '0.8rem', fontWeight: 700, color: '#475569',
          }}>
            <MapPin size={13} color={tier.accent} />
            {sponsor.location}
          </div>
          {sponsor.yearsInAustin && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '6px 14px', borderRadius: 999,
              background: 'white', border: `1px solid ${tier.border}`,
              fontSize: '0.8rem', fontWeight: 700, color: '#475569',
            }}>
              <Building2 size={13} color={tier.accent} />
              {sponsor.yearsInAustin}+ years in Austin
            </div>
          )}
        </div>

        
        {sponsor.website && (
          <a
            href={sponsor.website}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 24px', borderRadius: 12,
              background: tier.gradient, color: 'white',
              fontWeight: 800, fontSize: '0.85rem', textDecoration: 'none',
              boxShadow: `0 6px 20px ${tier.glow}`,
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            Visit ARM.com
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
        )}
      </div>
    </div>
  );
}

// placeholder card when a tier has no sponsors yet

function EmptyTierSlot({ tier }) {
  return (
    <div style={{
      borderRadius: 20, padding: '40px 32px', textAlign: 'center',
      border: `2px dashed ${tier.border}`,
      background: 'transparent',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
    }}>
      <div style={{
        width: 56, height: 56, borderRadius: '50%',
        background: `linear-gradient(135deg, ${tier.glow}, transparent)`,
        border: `2px dashed ${tier.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <tier.Icon size={22} color={tier.accent} strokeWidth={1.5} />
      </div>
      <p style={{ fontWeight: 800, color: tier.accent, margin: 0, fontSize: '0.9rem' }}>
        {tier.label} Sponsor Spot Available
      </p>
      <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.82rem' }}>
        Interested? Reach out to become a {tier.label.toLowerCase()} sponsor.
      </p>
      <a
        href="mailto:contact@shpeaustin.com"
        style={{
          marginTop: 4, display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '8px 18px', borderRadius: 10,
          background: tier.badgeBg, color: 'white',
          fontWeight: 800, fontSize: '0.78rem', textDecoration: 'none',
        }}
      >
        <Mail size={13} />
        Get in touch
      </a>
    </div>
  );
}



export default function Sponsors() {
  return (
    <main style={{ paddingTop: '60px', background: '#f8fafc', minHeight: '100vh' }}>

      
      <section style={{
        position: 'relative', overflow: 'hidden',
        padding: '80px 24px 72px', textAlign: 'center',
        background: 'linear-gradient(135deg, #001F5B 0%, #0a1a3a 100%)',
      }}>
        <div style={{ position: 'absolute', width: 480, height: 480, borderRadius: '50%', background: '#0070C0', top: -140, right: -80, filter: 'blur(100px)', opacity: 0.12, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: 320, height: 320, borderRadius: '50%', background: '#FD652F', bottom: -80, left: -60, filter: 'blur(80px)', opacity: 0.12, pointerEvents: 'none' }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ position: 'relative', zIndex: 1, maxWidth: 660, margin: '0 auto' }}
        >
          <span style={{
            display: 'inline-block', fontSize: '0.7rem', fontWeight: 900,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            padding: '6px 16px', borderRadius: 999, marginBottom: 24,
            background: 'rgba(253,101,47,0.18)', color: '#FD652F',
            border: '1px solid rgba(253,101,47,0.3)',
          }}>
            Community Partners
          </span>

          <h1 style={{
            fontWeight: 900, color: 'white', margin: '0 0 20px',
            fontSize: 'clamp(2.4rem, 6vw, 3.8rem)', lineHeight: 1.05, letterSpacing: '-0.02em',
          }}>
            Our Sponsors
          </h1>
          <p style={{ color: '#c8d8e8', fontSize: '1.1rem', lineHeight: 1.75, marginBottom: 40 }}>
            SHPE Austin's programs and community impact wouldn't be possible without the generous support of our corporate partners. We are deeply grateful for their commitment to elevating Hispanic engineers.
          </p>

          <motion.a
            href="mailto:contact@shpeaustin.com"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '14px 32px', borderRadius: 14,
              background: 'linear-gradient(135deg, #FD652F, #D33A02)',
              color: 'white', fontWeight: 900, fontSize: '0.95rem',
              textDecoration: 'none', boxShadow: '0 8px 28px rgba(253,101,47,0.35)',
              letterSpacing: '-0.01em',
            }}
          >
            <Mail size={18} />
            Become a Sponsor
          </motion.a>
        </motion.div>
      </section>

      
      <section style={{ padding: '72px 24px 80px', maxWidth: 900, margin: '0 auto' }}>
        {tiers.map((tier, tierIdx) => (
          <motion.div
            key={tier.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: tierIdx * 0.12, duration: 0.55, ease: 'easeOut' }}
            style={{ marginBottom: tierIdx < tiers.length - 1 ? 64 : 0 }}
          >
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 14,
                background: tier.gradient, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 6px 20px ${tier.glow}`,
              }}>
                <tier.Icon size={20} color="white" strokeWidth={2} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <h2 style={{ fontWeight: 900, fontSize: '1.5rem', margin: 0, letterSpacing: '-0.02em', color: tier.accent }}>
                  {tier.label} Sponsors
                </h2>
                <div style={{ height: 2, width: 60, borderRadius: 999, background: tier.gradient, opacity: 0.5 }} />
              </div>
            </div>

            
            <div style={{ display: 'grid', gap: 20, gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))' }}>
              {tier.sponsors.length > 0
                ? tier.sponsors.map((s) => <SponsorCard key={s.name} sponsor={s} tier={tier} />)
                : <EmptyTierSlot tier={tier} />
              }
            </div>
          </motion.div>
        ))}
      </section>

      
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ padding: '0 24px 80px', maxWidth: 900, margin: '0 auto' }}
      >
        <div style={{
          borderRadius: 24, overflow: 'hidden',
          background: 'linear-gradient(135deg, #001F5B 0%, #0070C0 100%)',
          boxShadow: '0 20px 60px rgba(0,31,91,0.25)',
        }}>
          
          <div style={{ height: 4, background: 'linear-gradient(90deg, #FD652F, #D33A02, #0070C0, #001F5B, #FD652F)', backgroundSize: '300% 100%', animation: 'gradientSlide 3s linear infinite' }} />

          <div style={{ padding: '48px 40px', display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'center' }}>
            <div style={{ flex: 1, minWidth: 260 }}>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 8px' }}>
                Partner with us
              </p>
              <h3 style={{ color: 'white', fontWeight: 900, fontSize: 'clamp(1.4rem, 3vw, 2rem)', margin: '0 0 12px', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                Interested in becoming a sponsor?
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '0.93rem', lineHeight: 1.7, margin: 0 }}>
                Sponsoring SHPE Austin connects your company with a talented pool of Hispanic engineers and professionals in the Austin area. Reach out and let's talk about how we can work together.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flexShrink: 0 }}>
              {[
                { tier: 'Platinum', Icon: Gem, color: '#94a3b8' },
                { tier: 'Gold', Icon: Award, color: '#f59e0b' },
                { tier: 'Silver', Icon: Star, color: '#9ca3af' },
              ].map(({ tier, Icon: TierIcon, color }) => (
                <div key={tier} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <TierIcon size={16} color={color} />
                  <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', fontWeight: 700 }}>{tier} tier available</span>
                </div>
              ))}
              <motion.a
                href="mailto:contact@shpeaustin.com"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 10,
                  padding: '14px 28px', borderRadius: 14,
                  background: 'linear-gradient(135deg, #FD652F, #D33A02)',
                  color: 'white', fontWeight: 900, fontSize: '0.9rem',
                  textDecoration: 'none', boxShadow: '0 8px 24px rgba(253,101,47,0.4)',
                }}
              >
                <Mail size={16} />
                contact@shpeaustin.com
              </motion.a>
            </div>
          </div>
        </div>
      </motion.section>

      <style>{`
        @keyframes gradientSlide {
          0% { background-position: 0% 0; }
          100% { background-position: 300% 0; }
        }
      `}</style>
    </main>
  );
}
