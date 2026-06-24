import { useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Award, Globe, Plane, MapPin, Plus,
  Wine, Gift, Handshake,
  Activity, Waves, Heart,
  Users, Camera, ChevronRight, Zap
} from 'lucide-react';



const categories = [
  {
    id: 'professional',
    label: 'Professional Development',
    shortLabel: 'Pro Dev',
    accent: '#001F5B',
    accentLight: '#e8eef8',
    gradient: 'linear-gradient(135deg, #001F5B 0%, #0a2a5e 100%)',
    why: 'We invest in our members\' careers because we know the path for Hispanic professionals can come with extra obstacles. These events are designed to give you tools, exposure, and connections that move the needle.',
    events: [
      { name: 'SHPEtinas Conference', Icon: Award, description: 'An empowering conference dedicated to Latina engineers and professionals — featuring keynotes, workshops, and networking to celebrate and elevate Latinas in STEM.' },
      { name: 'Regional Leadership Forums', Icon: Globe, description: 'Collaborative gatherings with SHPE chapters across the region to share best practices, align on initiatives, and grow as leaders within the organization.' },
      { name: 'National Conference', Icon: Plane, description: 'The largest gathering of Hispanic STEM professionals in the nation. Connect with Fortune 500 recruiters, attend technical sessions, and compete nationally.' },
      { name: 'Professional Outings', Icon: MapPin, description: 'Visits to company headquarters, innovation labs, and professional spaces — a behind-the-scenes look at where your career could take you.' },
      { name: 'And More…', Icon: Plus, description: 'From resume workshops to mock interviews and lunch-and-learns, we are always adding new opportunities to help members grow professionally.' },
    ],
  },
  {
    id: 'networking',
    label: 'Networking',
    shortLabel: 'Networking',
    accent: '#0070C0',
    accentLight: '#e0f0ff',
    gradient: 'linear-gradient(135deg, #0070C0 0%, #005a9e 100%)',
    why: 'Your network is your net worth. We create spaces where genuine connections happen — with peers, mentors, and industry leaders who want to see you succeed.',
    events: [
      { name: 'Happy Hours', Icon: Wine, description: 'Casual after-work get-togethers where members unwind, meet new faces, and build friendships that extend well beyond the professional setting.' },
      { name: 'White Elephant — December', Icon: Gift, description: 'Our beloved holiday tradition. A fun gift exchange that brings the SHPE Austin familia together to celebrate the year and each other.' },
      { name: 'Joint Events with SWE, WTS & Others', Icon: Handshake, description: 'Collaborative events with SWE, WTS, and other local professional organizations — expanding your network across disciplines and industries.' },
      { name: 'And More…', Icon: Plus, description: 'Speed networking nights, industry mixers, and partner events are always in the pipeline. Follow us on social to stay in the loop.' },
    ],
  },
  {
    id: 'activities',
    label: 'Activities',
    shortLabel: 'Activities',
    accent: '#D33A02',
    accentLight: '#fff0eb',
    gradient: 'linear-gradient(135deg, #D33A02 0%, #a82d01 100%)',
    why: 'Community is more than career talk. We play, volunteer, and adventure together because the strongest professional bonds are built outside the office.',
    events: [
      { name: 'Volleyball', Icon: Activity, description: 'Friendly games open to all skill levels — a great way to stay active and meet members you might not cross paths with at professional events.' },
      { name: 'Soccer Competitions', Icon: Zap, description: 'Competitive and recreational soccer that brings out everyone\'s competitive side and channels that SHPE team spirit onto the field.' },
      { name: 'Tubing', Icon: Waves, description: 'Austin\'s rivers are our playground. Group tubing trips where members disconnect, recharge, and bond in true Texas fashion.' },
      { name: 'Volunteering', Icon: Heart, description: 'Giving back is core to who we are. We partner with local drives like Coats for Kids and other community initiatives to make a real impact.' },
      { name: 'And More…', Icon: Plus, description: 'Escape rooms, food tours, game nights — if it sounds fun, we\'ve probably done it or are planning it. Members always have a say in what\'s next.' },
    ],
  },
];

// event card — tilts on hover

function TiltCard({ event, accent, accentLight, gradient }) {
  const cardRef = useRef(null);
  const spotRef = useRef(null);
  const { Icon } = event;

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    const spot = spotRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -8;
    const rotY = ((x - cx) / cx) * 8;
    card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`;
    if (spot) {
      spot.style.left = `${x}px`;
      spot.style.top = `${y}px`;
      spot.style.opacity = '1';
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    const spot = spotRef.current;
    if (card) card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
    if (spot) spot.style.opacity = '0';
  }, []);

  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } }}
      style={{ willChange: 'transform' }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '20px',
          background: 'white',
          border: `1px solid ${accent}22`,
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
          transition: 'transform 0.15s ease, box-shadow 0.15s ease',
          cursor: 'default',
        }}
      >
        {/* follows your cursor */}
        <div
          ref={spotRef}
          style={{
            position: 'absolute',
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${accent}18 0%, transparent 70%)`,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            opacity: 0,
            transition: 'opacity 0.2s ease',
            zIndex: 0,
          }}
        />

        
        <div style={{ height: 4, background: gradient }} />

        <div style={{ padding: '24px', position: 'relative', zIndex: 1 }}>
          
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: '14px',
              background: accentLight,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
            }}
          >
            <Icon size={22} color={accent} strokeWidth={2} />
          </div>

          <h3 style={{ fontWeight: 900, fontSize: '1rem', color: '#0f172a', marginBottom: 8, lineHeight: 1.3 }}>
            {event.name}
          </h3>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.65, color: '#64748b', margin: 0 }}>
            {event.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// pill selector for switching event categories

function CategorySelector({ categories, active, onChange }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 8,
        padding: '6px',
        borderRadius: '16px',
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.12)',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      {categories.map((cat) => {
        const isActive = active === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            style={{
              position: 'relative',
              padding: '10px 20px',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 800,
              fontSize: '0.8rem',
              letterSpacing: '0.04em',
              background: isActive ? 'white' : 'transparent',
              color: isActive ? cat.accent : 'rgba(255,255,255,0.6)',
              transition: 'all 0.25s ease',
              boxShadow: isActive ? '0 4px 16px rgba(0,0,0,0.15)' : 'none',
            }}
          >
            {cat.shortLabel}
          </button>
        );
      })}
    </div>
  );
}

// photo carousel for past event shots

function PlaceholderSlide({ current, total }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'linear-gradient(135deg, #001F5B 0%, #0a1a3a 60%, #0d0d1a 100%)',
      overflow: 'hidden',
    }}>
      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.2, 0.12] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: '#0070C0', top: -100, left: -100, filter: 'blur(90px)', pointerEvents: 'none' }} />
      <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.18, 0.1] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        style={{ position: 'absolute', width: 350, height: 350, borderRadius: '50%', background: '#FD652F', bottom: -80, right: -80, filter: 'blur(80px)', pointerEvents: 'none' }} />

      {[
        { rotate: -14, x: '8%',  y: '12%', size: 80, delay: 0 },
        { rotate: 10,  x: '78%', y: '8%',  size: 64, delay: 0.6 },
        { rotate: -6,  x: '72%', y: '62%', size: 72, delay: 1.2 },
        { rotate: 18,  x: '5%',  y: '62%', size: 60, delay: 0.9 },
      ].map((p, i) => (
        <motion.div key={i} animate={{ y: [0, -8, 0] }} transition={{ duration: 3.5 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
          style={{ position: 'absolute', left: p.x, top: p.y, width: p.size, height: p.size + 18, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, transform: `rotate(${p.rotate}deg)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, backdropFilter: 'blur(4px)' }}>
          <Camera size={p.size * 0.28} color="rgba(255,255,255,0.2)" />
          <div style={{ height: 3, width: '50%', borderRadius: 999, background: 'rgba(255,255,255,0.12)' }} />
        </motion.div>
      ))}

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, textAlign: 'center', padding: '0 24px', height: '100%', justifyContent: 'center' }}>
        <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 88, height: 88, borderRadius: 24, background: 'rgba(253,101,47,0.15)', border: '1.5px solid rgba(253,101,47,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 32px rgba(253,101,47,0.15)' }}>
          <Camera size={36} color="#FD652F" strokeWidth={1.5} />
        </motion.div>
        <div>
          <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#FD652F', marginBottom: 8 }}>SHPE Austin</p>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#fff', margin: '0 0 8px', letterSpacing: '-0.01em' }}>Photos Coming Soon</h3>
          <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', fontWeight: 500, margin: 0 }}>Event memories will live here — check back after our next event!</p>
        </div>
        {total > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 999, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#FD652F' }} />
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.06em' }}>Photo {current + 1} of {total}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function Carousel({ photos = [] }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const total = photos.length;

  const go = (next) => {
    setDirection(next > current ? 1 : -1);
    setCurrent((next + total) % total);
  };

  const variants = {
    enter: (d) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0, scale: 0.96 }),
    center: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.32, 0.72, 0, 1] } },
    exit: (d) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0, scale: 0.96, transition: { duration: 0.35, ease: [0.32, 0.72, 0, 1] } }),
  };

  // next/prev indices for the peek thumbnails
  const prev = (current - 1 + total) % total;
  const next = (current + 1) % total;

  // no photos yet — single animated placeholder, no navigation
  if (total === 0) {
    return (
      <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 20, height: 400, boxShadow: '0 24px 64px rgba(0,0,0,0.18)' }}>
        <PlaceholderSlide current={0} total={0} />
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', userSelect: 'none' }}>


      <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 20, height: 400, background: '#0f172a', boxShadow: '0 24px 64px rgba(0,0,0,0.18)' }}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            style={{ position: 'absolute', inset: 0 }}
          >
            {photos[current]
              ? <img src={photos[current].url} alt={photos[current].alt ?? `Event photo ${current + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              : <PlaceholderSlide current={current} total={total} />
            }
          </motion.div>
        </AnimatePresence>

        {total > 1 && (
          <div style={{
            position: 'absolute', top: 16, right: 16, zIndex: 10,
            padding: '4px 12px', borderRadius: 999,
            background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
            fontSize: '0.75rem', fontWeight: 800, color: 'rgba(255,255,255,0.7)',
            letterSpacing: '0.05em',
          }}>
            {current + 1} / {total}
          </div>
        )}

        {total > 1 && [{ dir: -1, side: 'left', icon: '←' }, { dir: 1, side: 'right', icon: '→' }].map(({ dir, side, icon }) => (
          <button
            key={side}
            onClick={() => go(current + dir)}
            style={{
              position: 'absolute', top: '50%', [side]: 16,
              transform: 'translateY(-50%)', zIndex: 10,
              width: 44, height: 44, borderRadius: '50%', border: 'none', cursor: 'pointer',
              background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)',
              color: 'white', fontSize: '1.1rem', fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.22)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          >
            {icon}
          </button>
        ))}
      </div>


      {total > 1 && (
        <>
          <div style={{ display: 'flex', gap: 10, marginTop: 14, justifyContent: 'center' }}>
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                style={{
                  padding: 0, border: 'none', cursor: 'pointer', borderRadius: 10,
                  width: i === current ? 48 : 36, height: 36,
                  background: i === current ? 'linear-gradient(135deg, #FD652F, #D33A02)' : 'linear-gradient(135deg, #e2e8f0, #cbd5e1)',
                  flexShrink: 0,
                  transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                  boxShadow: i === current ? '0 4px 12px rgba(253,101,47,0.4)' : 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                {i === current && <Camera size={14} color="white" />}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, padding: '0 4px' }}>
            <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600 }}>← {photos[prev]?.alt ?? `Photo ${prev + 1}`}</span>
            <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600 }}>{photos[next]?.alt ?? `Photo ${next + 1}`} →</span>
          </div>
        </>
      )}
    </div>
  );
}



export default function Events() {
  const [active, setActive] = useState('professional');
  const current = categories.find((c) => c.id === active);

  return (
    <main style={{ paddingTop: '60px', background: '#f8fafc', minHeight: '100vh' }}>

      
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: '80px 24px 64px',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #001F5B 0%, #0a1a3a 100%)',
        }}
      >
        
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
            SHPE Austin
          </span>

          <h1 style={{ fontWeight: 900, color: 'white', margin: '0 0 20px', fontSize: 'clamp(2.4rem, 6vw, 3.8rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
            Events
          </h1>
          <p style={{ color: '#c8d8e8', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: 48 }}>
            From career-defining conferences to soccer games and holiday parties — SHPE Austin events are where the community comes alive.
          </p>

          
          <CategorySelector categories={categories} active={active} onChange={setActive} />
        </motion.div>
      </section>

      
      <AnimatePresence mode="wait">
        <motion.section
          key={active}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{ padding: '72px 24px', maxWidth: 1100, margin: '0 auto' }}
        >
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <div style={{ width: 6, height: 48, borderRadius: 999, background: current.gradient }} />
              <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: current.accent, margin: 0, letterSpacing: '-0.02em' }}>
                {current.label}
              </h2>
            </div>
            <p style={{ fontSize: '1rem', color: '#64748b', lineHeight: 1.7, maxWidth: 640, margin: 0, paddingLeft: 18 }}>
              {current.why}
            </p>
          </div>

          
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
            style={{
              display: 'grid',
              gap: 20,
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            }}
          >
            {current.events.map((ev) => (
              <TiltCard
                key={ev.name}
                event={ev}
                accent={current.accent}
                accentLight={current.accentLight}
                gradient={current.gradient}
              />
            ))}
          </motion.div>

          
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 40 }}>
            {categories.filter((c) => c.id !== active).map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '10px 20px', borderRadius: 12, border: `1px solid ${cat.accent}30`,
                  background: cat.accentLight, color: cat.accent,
                  fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat.shortLabel}
                <ChevronRight size={14} />
              </button>
            ))}
          </div>
        </motion.section>
      </AnimatePresence>

      
      <section style={{ padding: '72px 0', background: 'white', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', paddingLeft: 24, marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
            <div style={{ width: 6, height: 40, borderRadius: 999, background: 'linear-gradient(180deg, #FD652F, #D33A02)' }} />
            <h2 style={{ fontWeight: 900, fontSize: '2rem', color: '#D33A02', margin: 0, letterSpacing: '-0.02em' }}>
              Previous Events
            </h2>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', paddingLeft: 18, margin: 0 }}>
            Drag to explore — photos coming soon
          </p>
        </div>

        <Carousel photos={[]} />
      </section>

      
      <section style={{ position: 'relative', overflow: 'hidden', padding: '96px 24px', background: 'linear-gradient(135deg, #001F5B 0%, #0a1a3a 100%)' }}>
        <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: '#FD652F', top: -100, right: -100, filter: 'blur(80px)', opacity: 0.12, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: '#0070C0', bottom: -80, left: -80, filter: 'blur(60px)', opacity: 0.12, pointerEvents: 'none' }} />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ position: 'relative', zIndex: 1, maxWidth: 560, margin: '0 auto', textAlign: 'center' }}
        >
          <span style={{
            display: 'inline-block', fontSize: '0.7rem', fontWeight: 900,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            padding: '6px 16px', borderRadius: 999, marginBottom: 24,
            background: 'rgba(253,101,47,0.18)', color: '#FD652F',
            border: '1px solid rgba(253,101,47,0.3)',
          }}>
            Get Involved
          </span>

          <h2 style={{ fontWeight: 900, color: 'white', margin: '0 0 20px', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
            Ready to be part of something bigger?
          </h2>
          <p style={{ color: '#c8d8e8', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: 40 }}>
            Every event on this page is open to SHPE Austin members. Membership is your key to the entire familia — the programs, the connections, and the community.
          </p>

          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
            <Link
              to="/membership"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 12,
                fontWeight: 900, padding: '18px 40px', borderRadius: 16,
                background: 'linear-gradient(135deg, #FD652F, #D33A02)',
                color: 'white', fontSize: '1.05rem',
                boxShadow: '0 8px 32px rgba(253,101,47,0.35)',
                textDecoration: 'none', letterSpacing: '-0.01em',
              }}
            >
              <Users size={20} />
              Become a Member
            </Link>
          </motion.div>

          <p style={{ marginTop: 20, fontSize: '0.85rem', color: 'rgba(255,255,255,0.35)' }}>
            Already a member?{' '}
            <a
              href="https://script.google.com/macros/s/AKfycbzc3rXQ2fuJixy83MCfVvDLMk1PABBNiYn_2AQI8D7GYGDy1wCN_DqUv6vnQYhH81SF/exec"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'underline' }}
            >
              Check in to today's event
            </a>
          </p>
        </motion.div>
      </section>

    </main>
  );
}
