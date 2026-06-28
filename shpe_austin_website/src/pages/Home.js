import { useState, useCallback, useRef, useEffect } from 'react';
import { createClient } from 'contentful';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Users, HandHeart, BookOpen, Shield, Briefcase, GraduationCap, Coffee, Trophy, Heart, Star } from 'lucide-react';
import ShpeHatAnimation from './ShpeHatAnimation';

const charVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -90 },
  visible: (i) => ({
    opacity: 1, y: 0, rotateX: 0,
    transition: { delay: i * 0.055, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeUp = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: 'easeOut' },
};


const valueCards = [
  { label: 'Familia', Icon: Users, color: '#001F5B', accent: '#0070C0', desc: 'Community and belonging at the heart of everything we do.' },
  { label: 'Service', Icon: HandHeart, color: '#0070C0', accent: '#72A9BE', desc: 'Giving back to the community that lifts us up.' },
  { label: 'Education', Icon: BookOpen, color: '#D33A02', accent: '#FD652F', desc: 'Empowering minds through STEM access and development.' },
  { label: 'Resilience', Icon: Shield, color: '#FD652F', accent: '#D33A02', desc: 'Rising above challenges with strength and determination.' },
];

const THEME_MAP = {
  'social event':   { border: '#FD652F', tagBg: 'rgba(253,101,47,0.1)',  tagColor: '#FD652F' },
  'virtual event':  { border: '#0070C0', tagBg: 'rgba(0,112,192,0.1)',   tagColor: '#0070C0' },
  'workshop':       { border: '#001F5B', tagBg: 'rgba(0,31,91,0.1)',     tagColor: '#001F5B' },
  'networking':     { border: '#72A9BE', tagBg: 'rgba(114,169,190,0.1)', tagColor: '#72A9BE' },
  'default':        { border: '#0070C0', tagBg: 'rgba(0,112,192,0.1)',   tagColor: '#0070C0' },
};

function getTheme(tag) {
  return THEME_MAP[(tag ?? '').toLowerCase()] ?? THEME_MAP.default;
}

function formatEventDate(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  const datePart = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', timeZone: 'America/Chicago' });
  const timePart = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'America/Chicago' });
  return `${datePart} · ${timePart} CT`;
}

const contentfulClient =
  process.env.REACT_APP_CONTENTFUL_SPACE_ID && process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN
    ? createClient({
        space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
        accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
      })
    : null;

function useBentoPhotos() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    if (!contentfulClient) return;
    contentfulClient
      .getEntries({ content_type: 'pastEventGallery', order: '-fields.eventDate', limit: 10 })
      .then(res => {
        const flat = [];
        for (const item of res.items) {
          for (const p of (item.fields.photos ?? [])) {
            if (p.fields?.file?.url) {
              flat.push({
                url: `https:${p.fields.file.url}`,
                alt: p.fields?.title ?? item.fields.eventName ?? '',
                label: item.fields.eventName ?? '',
              });
            }
            if (flat.length === 5) break;
          }
          if (flat.length === 5) break;
        }
        setPhotos(flat);
      })
      .catch(() => {});
  }, []);

  return photos;
}

function useEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!contentfulClient) {
      setLoading(false);
      return;
    }
    contentfulClient
      .getEntries({ content_type: 'event', order: 'fields.date' })
      .then(res => {
        setEvents(
          res.items.map(item => {
            const theme = getTheme(item.fields.tag);
            const rawDate = item.fields.date;
            return {
              title: item.fields.title,
              date: formatEventDate(rawDate),
              tag: item.fields.tag,
              description: item.fields.description,
              rsvp: item.fields.rsvp ?? '#',
              flyer: item.fields.flyer?.fields?.file?.url
                ? `https:${item.fields.flyer.fields.file.url}`
                : null,
              isPast: rawDate ? new Date(rawDate) < new Date() : false,
              ...theme,
            };
          })
        );
      })
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { events, loading, error };
}

const socialLinks = [
  { Icon: FaFacebookF, href: 'https://www.facebook.com/SHPEAustin/', label: 'Facebook', color: '#1877F2' },
  { Icon: FaTwitter, href: 'https://www.facebook.com/SHPEAustin/', label: 'Twitter', color: '#1DA1F2' },
  { Icon: FaInstagram, href: 'https://www.instagram.com/shpeaustin/', label: 'Instagram', color: '#E1306C' },
  { Icon: FaLinkedinIn, href: 'https://www.linkedin.com/company/shpeaustin/', label: 'LinkedIn', color: '#0A66C2' },
];

// ambilight glow that samples colors from whatever image is active
function useAmbientVideo(videoRef, active) {
  const [colors, setColors] = useState({ top: '#000', bottom: '#000', left: '#000', right: '#000' });
  const canvasRef = useRef(null);
  const frameRef = useRef(0);

  useEffect(() => {
    if (!active) return;
    if (!canvasRef.current) canvasRef.current = document.createElement('canvas');
    const canvas = canvasRef.current;
    canvas.width = 16;
    canvas.height = 9;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    let animId;

    function avg(data, indices) {
      let r = 0, g = 0, b = 0;
      indices.forEach(i => { r += data[i]; g += data[i + 1]; b += data[i + 2]; });
      const n = indices.length;
      return `rgb(${r / n | 0},${g / n | 0},${b / n | 0})`;
    }

    function tick() {
      animId = requestAnimationFrame(tick);
      frameRef.current++;
      if (frameRef.current % 3 !== 0) return;
      const v = videoRef.current;
      if (!v || v.paused || v.readyState < 2) return;
      ctx.drawImage(v, 0, 0, 16, 9);
      const d = ctx.getImageData(0, 0, 16, 9).data;
      const row = (y) => Array.from({ length: 16 }, (_, x) => (y * 16 + x) * 4);
      const col = (x) => Array.from({ length: 9 }, (_, y) => (y * 16 + x) * 4);
      setColors({
        top:    avg(d, row(0)),
        bottom: avg(d, row(8)),
        left:   avg(d, col(0)),
        right:  avg(d, col(15)),
      });
    }

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [videoRef, active]);

  return colors;
}


// desktop bento spans — 3-col × 3-row grid
const bentoLayout = [
  { gridColumn: '1 / 3', gridRow: '1 / 3' },  // large hero
  { gridColumn: '3',     gridRow: '1' },
  { gridColumn: '3',     gridRow: '2' },
  { gridColumn: '1',     gridRow: '3' },
  { gridColumn: '2 / 4', gridRow: '3' },
];

function BentoCell({ photo, gridStyle, fitMap, onLoad, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 16 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{
        ...gridStyle,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 14,
        background: '#0f172a',
        cursor: 'default',
        boxShadow: hovered ? '0 16px 48px rgba(0,0,0,0.22)' : '0 4px 16px rgba(0,0,0,0.1)',
        transition: 'box-shadow 0.4s ease, transform 0.4s ease',
        transform: hovered ? 'scale(1.02)' : 'scale(1)',
        zIndex: hovered ? 2 : 1,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Ken Burns slow zoom */}
      <img
        src={photo.url}
        alt={photo.alt}
        onLoad={e => onLoad(e, photo.url)}
        style={{
          width: '100%', height: '100%', display: 'block',
          objectFit: fitMap[photo.url] ?? 'cover',
          transform: hovered ? 'scale(1.08)' : 'scale(1)',
          transition: 'transform 0.7s cubic-bezier(0.22,1,0.36,1)',
        }}
      />

      {/* shimmer sweep on hover */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.13) 50%, transparent 60%)',
        backgroundSize: '200% 100%',
        backgroundPosition: hovered ? '0% 0%' : '200% 0%',
        transition: 'background-position 0.6s ease',
      }} />

      {/* gradient + label */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.35s ease',
        display: 'flex', alignItems: 'flex-end', padding: '14px 16px',
        pointerEvents: 'none',
      }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#fff', letterSpacing: '0.05em', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>
          {photo.label}
        </span>
      </div>
    </motion.div>
  );
}

function BentoSection() {
  const photos = useBentoPhotos();
  const [fitMap, setFitMap] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleLoad = useCallback((e, url) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    setFitMap(prev => ({ ...prev, [url]: naturalHeight > naturalWidth ? 'contain' : 'cover' }));
  }, []);

  if (photos.length === 0) return null;

  // mobile: simple 2-col grid, all cells equal
  const mobileLayout = [
    { gridColumn: '1 / 3', gridRow: '1' },  // full width top
    { gridColumn: '1',     gridRow: '2' },
    { gridColumn: '2',     gridRow: '2' },
    { gridColumn: '1',     gridRow: '3' },
    { gridColumn: '2',     gridRow: '3' },
  ];

  const layout    = isMobile ? mobileLayout : bentoLayout;
  const columns   = isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)';
  const rowHeight = isMobile ? '160px' : '210px';
  const rows      = isMobile ? `repeat(3, ${rowHeight})` : `repeat(3, ${rowHeight})`;

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      style={{ padding: '80px 24px', background: '#fff' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <span style={{ display: 'inline-block', fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '6px 16px', borderRadius: 999, marginBottom: 16, background: 'rgba(0,112,192,0.08)', color: '#0070C0', border: '1px solid rgba(0,112,192,0.2)' }}>
            Our Community
          </span>
          <h2 style={{ fontWeight: 900, color: '#001F5B', fontSize: 'clamp(2rem, 5vw, 3rem)', margin: 0 }}>
            Moments from the Familia
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: columns,
          gridTemplateRows: rows,
          gap: 12,
        }}>
          {photos.map((photo, i) => (
            <BentoCell
              key={photo.url}
              photo={photo}
              gridStyle={layout[i] ?? {}}
              fitMap={fitMap}
              onLoad={handleLoad}
              index={i}
            />
          ))}
        </div>

        {/* stat strip */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
          gap: '0px', marginTop: 40,
          borderRadius: 16, overflow: 'hidden',
          border: '1px solid #e5e7eb',
        }}>
          {[
            { value: '30+', label: 'Years Strong' },
            { value: '100+', label: 'Members' },
            { value: '20+', label: 'Events / Year' },
            { value: '1', label: 'Big Familia' },
          ].map(({ value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                flex: '1 1 140px', padding: '24px 16px', textAlign: 'center',
                borderRight: i < 3 ? '1px solid #e5e7eb' : 'none',
                background: '#fff',
              }}
            >
              <div style={{ fontWeight: 900, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#001F5B', lineHeight: 1 }}>
                {value}
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 6 }}>
                {label}
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <a
            href="#/events"
            style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0070C0', textDecoration: 'none', letterSpacing: '0.04em' }}
            onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
            onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
          >
            See all event photos →
          </a>
        </div>
      </div>
    </motion.section>
  );
}

export default function Home() {
  const { events, loading: eventsLoading, error: eventsError } = useEvents();
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);
  const alreadyPlayed = sessionStorage.getItem('introPlayed');

  // single interval drives both the flyer and the detail panel
  useEffect(() => {
    if (events.length <= 1 || carouselPaused) return;
    const id = setInterval(() => setActiveIdx(i => (i + 1) % events.length), 6000);
    return () => clearInterval(id);
  }, [events.length, carouselPaused]);

  // resume when lightbox closes
  useEffect(() => {
    if (!lightboxSrc) setCarouselPaused(false);
  }, [lightboxSrc]);
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640;
  const [stage, setStage] = useState(alreadyPlayed ? 'done' : isMobile ? 'hat' : 'video');
  const [fadeOut, setFadeOut] = useState(false);
  const [hatDone, setHatDone] = useState(!!alreadyPlayed);
  const videoRef = useRef(null);
  const ambient = useAmbientVideo(videoRef, stage === 'video' && !isMobile);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 1.5;
  }, []);

  const handleVideoEnd = useCallback(() => {
    setFadeOut(true);
    setTimeout(() => { setFadeOut(false); setStage('hat'); }, 600);
  }, []);

  const handleHatComplete = useCallback(() => {
    sessionStorage.setItem('introPlayed', 'true');
    setHatDone(true);
  }, []);

  return (
    <main className="font-sans">
      <style>{`
        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes textShimmer {
          0%   { background-position: -300% center; }
          100% { background-position: 300% center; }
        }
        @keyframes rippleExpand {
          0%   { transform: scale(0); opacity: 0.5; }
          100% { transform: scale(6); opacity: 0; }
        }
        @keyframes flashFade {
          0%   { opacity: 1; }
          100% { opacity: 0; }
        }
        .intro-video { object-fit: cover; }
        .hat-margin  { margin-top: -120px; }
        @media (max-width: 640px) {
          .intro-video { object-fit: contain; }
          .hat-margin  { margin-top: -50px; }
        }
        .flyer-hover-overlay:hover { background: rgba(0,0,0,0.35) !important; }
        .flyer-hover-overlay:hover .flyer-hover-label { opacity: 1 !important; }
        .event-flyer-panel { width: 38%; min-width: 200px; min-height: 240px; }
        @media (max-width: 640px) {
          .event-flyer-panel { width: 100%; min-width: unset; min-height: 220px; }
        }
        @keyframes strikeSlide {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes ribbonSlide {
          from { opacity: 0; clip-path: inset(0 100% 0 0); }
          to   { opacity: 1; clip-path: inset(0 0% 0 0); }
        }
        @keyframes pastPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(211,58,2,0.0); }
          50%       { box-shadow: 0 0 0 6px rgba(211,58,2,0.18); }
        }
      `}</style>

      
      {stage === 'video' && (
        <div style={{
          transition: 'opacity 0.6s ease',
          opacity: fadeOut ? 0 : 1,
          width: '100%', height: '100vh',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden',
          background: isMobile
            ? `radial-gradient(ellipse 80% 40% at top, ${ambient.top}, transparent),
               radial-gradient(ellipse 80% 40% at bottom, ${ambient.bottom}, transparent),
               radial-gradient(ellipse 30% 80% at left, ${ambient.left}, transparent),
               radial-gradient(ellipse 30% 80% at right, ${ambient.right}, transparent),
               #000`
            : '#000',
          ...(isMobile && {
            WebkitMaskImage: 'radial-gradient(ellipse 88% 82% at center, black 45%, transparent 100%)',
            maskImage: 'radial-gradient(ellipse 88% 82% at center, black 45%, transparent 100%)',
          }),
        }}>
          <video ref={videoRef} src={require('../assets/logos/shpe_animated_video.mp4')} autoPlay muted playsInline onEnded={handleVideoEnd} className="intro-video" style={{ width: '100%', height: '100%' }} />
        </div>
      )}

      
      {(stage === 'hat' || stage === 'done') && (
        <motion.div
          initial={stage === 'hat' ? { opacity: 0, scale: 1.04 } : false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
          position: 'relative', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', minHeight: '100vh', gap: 0,
          background: '#ffffff', overflow: 'hidden',
        }}>
          {/* white flash when transitioning from the video section */}
          {stage === 'hat' && (
            <>
              <div style={{
                position: 'absolute', inset: 0, zIndex: 50, pointerEvents: 'none',
                background: 'white',
                animation: 'flashFade 0.55s ease-out forwards',
              }} />
              <div style={{
                position: 'absolute', zIndex: 49, pointerEvents: 'none',
                width: 300, height: 300, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(0,112,192,0.18) 0%, transparent 70%)',
                top: '50%', left: '50%', marginTop: -150, marginLeft: -150,
                animation: 'rippleExpand 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s forwards',
              }} />
              <div style={{
                position: 'absolute', zIndex: 49, pointerEvents: 'none',
                width: 300, height: 300, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(253,101,47,0.12) 0%, transparent 70%)',
                top: '50%', left: '50%', marginTop: -150, marginLeft: -150,
                animation: 'rippleExpand 1.1s cubic-bezier(0.22,1,0.36,1) 0.25s forwards',
              }} />
            </>
          )}

          
          <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: '#0070C0', top: '-200px', left: '-200px', filter: 'blur(160px)', opacity: 0.06, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: '#FD652F', bottom: '-160px', right: '-160px', filter: 'blur(140px)', opacity: 0.07, pointerEvents: 'none' }} />

          
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            style={{ position: 'absolute', top: 88, display: 'flex', alignItems: 'center', gap: 10 }}
          >
            <div style={{ width: 24, height: 1, background: '#d1d5db' }} />
            <div style={{ width: 24, height: 1, background: '#d1d5db' }} />
          </motion.div>

          
          <AnimatePresence>
            {hatDone && (
              <div style={{ textAlign: 'center', position: 'relative', zIndex: 1, perspective: '600px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.05em' }}>
                  {'Bienvenido a'.split('').map((char, i) => (
                    <motion.span
                      key={i}
                      custom={i}
                      variants={charVariants}
                      initial="hidden"
                      animate="visible"
                      style={{
                        display: 'inline-block',
                        fontSize: 'clamp(2rem, 5vw, 3.6rem)',
                        fontWeight: 900,
                        letterSpacing: char === ' ' ? '0.3em' : '-0.01em',
                        textTransform: 'uppercase',
                        background: 'linear-gradient(110deg, #001F5B 0%, #0070C0 30%, #FD652F 50%, #D33A02 65%, #0070C0 80%, #001F5B 100%)',
                        backgroundSize: '300% auto',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        animation: `textShimmer 5s linear infinite`,
                        animationDelay: `${i * 0.04}s`,
                        lineHeight: 1,
                      }}
                    >
                      {char === ' ' ? ' ' : char}
                    </motion.span>
                  ))}
                </div>
              </div>
            )}
          </AnimatePresence>

          
          <div className="hat-margin" style={{ position: 'relative', zIndex: 1 }}>
            <ShpeHatAnimation onComplete={handleHatComplete} speed={stage === 'done' ? 999 : 1.8} />
          </div>

          
          <AnimatePresence>
            {hatDone && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                style={{ position: 'relative', zIndex: 1, marginTop: 20, display: 'flex', alignItems: 'center', gap: 10 }}
              >
                <div style={{ width: 32, height: 2, borderRadius: 999, background: 'linear-gradient(90deg, #001F5B, #0070C0)' }} />
                <span style={{ color: '#6b7280', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Austin, TX
                </span>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#FD652F' }} />
                <span style={{ color: '#6b7280', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Est. 1994
                </span>
                <div style={{ width: 32, height: 2, borderRadius: 999, background: 'linear-gradient(90deg, #D33A02, #FD652F)' }} />
              </motion.div>
            )}
          </AnimatePresence>

          
          <AnimatePresence>
            {hatDone && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                style={{ position: 'absolute', bottom: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
              >
                <span style={{ color: '#d1d5db', fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Scroll</span>
                <motion.div
                  animate={{ y: [0, 7, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                  style={{ width: 1, height: 36, background: 'linear-gradient(180deg, #d1d5db, transparent)' }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/*
          SECTION 1 — OUR MISSION
      ══════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #001F5B 0%, #0a1a3a 100%)' }}>
        {/* ambient blobs */}
        <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: '#0070C0', top: -200, right: -150, filter: 'blur(120px)', opacity: 0.1, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: '#FD652F', bottom: -160, left: -160, filter: 'blur(100px)', opacity: 0.1, pointerEvents: 'none' }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24" style={{ display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center' }}>

          {/* left — big typographic statement */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ flex: '1 1 300px' }}
          >
            <span style={{ display: 'inline-block', fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '6px 16px', borderRadius: 999, marginBottom: 24, background: 'rgba(253,101,47,0.15)', color: '#FD652F', border: '1px solid rgba(253,101,47,0.3)' }}>
              Who We Are
            </span>
            <h2 style={{ fontWeight: 900, color: '#fff', fontSize: 'clamp(2.8rem, 6vw, 4.5rem)', lineHeight: 1.0, letterSpacing: '-0.03em', margin: '0 0 24px' }}>
              Our<br />
              <span style={{ background: 'linear-gradient(90deg, #FD652F, #ff9a6c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Mission.</span>
            </h2>
            {/* animated accent line */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
              style={{ height: 4, borderRadius: 999, background: 'linear-gradient(90deg, #FD652F, #0070C0)', marginBottom: 28 }}
            />
            <motion.a
              href="#/about"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontWeight: 800, fontSize: '0.9rem', borderRadius: 12,
                padding: '14px 26px', background: 'rgba(253,101,47,0.15)',
                color: '#FD652F', textDecoration: 'none',
                border: '1px solid rgba(253,101,47,0.3)',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(253,101,47,0.25)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(253,101,47,0.15)'}
            >
              Learn More →
            </motion.a>
          </motion.div>

          {/* right — mission text + pillars */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{ flex: '1 1 320px' }}
          >
            <p style={{ color: '#c8d8e8', fontSize: 'clamp(1.05rem, 2vw, 1.2rem)', lineHeight: 1.8, marginBottom: 36 }}>
              SHPE changes lives by empowering the Hispanic community to realize its fullest potential and to impact the world through STEM awareness, access, support, and development.
            </p>
            {/* pillars */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {['Awareness', 'Access', 'Support', 'Development'].map((pillar, i) => (
                <motion.div
                  key={pillar}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                  style={{
                    padding: '14px 18px', borderRadius: 12,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', gap: 10,
                  }}
                >
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#FD652F', flexShrink: 0 }} />
                  <span style={{ fontWeight: 800, fontSize: '0.85rem', color: '#fff', letterSpacing: '0.02em' }}>{pillar}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/*
          SECTION 2 — SHPE VALUES
      ══════════════════════════════════════ */}
      <section className="py-24 px-6" style={{ background: '#f8fafc' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-xl mx-auto mb-14"
        >
          <span style={{ display: 'inline-block', fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '6px 16px', borderRadius: 999, marginBottom: 16, background: 'rgba(0,112,192,0.08)', color: '#0070C0', border: '1px solid rgba(0,112,192,0.18)' }}>
            What Drives Us
          </span>
          <h2 style={{ fontWeight: 900, color: '#001F5B', fontSize: 'clamp(2rem, 5vw, 3rem)', margin: 0, letterSpacing: '-0.02em' }}>
            SHPE Values
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {valueCards.map(({ label, Icon, color, accent, desc }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -10, scale: 1.02 }}
              style={{
                position: 'relative', overflow: 'hidden', borderRadius: 22,
                padding: '36px 28px 32px',
                background: `linear-gradient(145deg, ${color} 0%, ${accent} 100%)`,
                boxShadow: `0 16px 48px ${color}35`,
                cursor: 'default', minHeight: 260,
                display: 'flex', flexDirection: 'column',
                transition: 'box-shadow 0.3s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = `0 24px 64px ${color}55`}
              onMouseLeave={e => e.currentTarget.style.boxShadow = `0 16px 48px ${color}35`}
            >
              {/* giant background number */}
              <div style={{
                position: 'absolute', bottom: -16, right: 10,
                fontSize: '9rem', fontWeight: 900, lineHeight: 1,
                color: 'rgba(255,255,255,0.07)', userSelect: 'none',
                letterSpacing: '-0.04em', pointerEvents: 'none',
              }}>
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* subtle dot texture */}
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />

              {/* top-right glow blob */}
              <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', filter: 'blur(30px)', pointerEvents: 'none' }} />

              <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: 'rgba(255,255,255,0.18)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 'auto', paddingBottom: 0,
                }}>
                  <Icon size={24} color="#fff" strokeWidth={1.8} />
                </div>

                <div style={{ marginTop: 28 }}>
                  <h3 style={{ fontWeight: 900, fontSize: '1.4rem', color: '#fff', margin: '0 0 10px', letterSpacing: '-0.02em' }}>
                    {label}
                  </h3>
                  <p style={{ fontSize: '0.83rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.72)', margin: 0 }}>
                    {desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/*
          SECTION 2.5 — COMMUNITY PHOTOS BENTO
      ══════════════════════════════════════ */}
      <BentoSection />

      {/*
          SECTION 3 — UPCOMING EVENTS
      ══════════════════════════════════════ */}
      <section className="py-28 px-6" style={{ background: '#f8fafc' }}>
        <motion.div {...fadeUp} className="text-center max-w-xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4" style={{ background: 'rgba(211,58,2,0.08)', color: '#D33A02', border: '1px solid rgba(211,58,2,0.2)' }}>
            What's Coming Up
          </span>
          <h2 className="font-black" style={{ color: '#001F5B', fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            Upcoming Events
          </h2>
        </motion.div>

        
        <AnimatePresence>
          {lightboxSrc && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setLightboxSrc(null)}
              style={{
                position: 'fixed', inset: 0, zIndex: 1000,
                background: 'rgba(0,0,0,0.85)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '24px', cursor: 'zoom-out',
              }}
            >
              <motion.img
                src={lightboxSrc}
                alt="Event flyer"
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{ maxWidth: '90vw', maxHeight: '90vh', borderRadius: 12, boxShadow: '0 32px 80px rgba(0,0,0,0.5)', objectFit: 'contain' }}
                onClick={e => e.stopPropagation()}
              />
              <button
                onClick={() => setLightboxSrc(null)}
                style={{
                  position: 'absolute', top: 20, right: 24,
                  background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%',
                  width: 40, height: 40, cursor: 'pointer', color: '#fff', fontSize: 20,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                ×
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {eventsLoading && (
          <div className="max-w-4xl mx-auto mb-10">
            <div className="rounded-2xl overflow-hidden flex flex-wrap" style={{ background: '#f3f4f6', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', minHeight: 260 }}>
              <div className="event-flyer-panel" style={{ background: '#e5e7eb', flexShrink: 0 }} />
              <div className="p-8 flex flex-col gap-3 flex-1">
                <div style={{ height: 12, width: '35%', background: '#e5e7eb', borderRadius: 999 }} />
                <div style={{ height: 20, width: '75%', background: '#e5e7eb', borderRadius: 999 }} />
                <div style={{ height: 12, width: '100%', background: '#e5e7eb', borderRadius: 999 }} />
                <div style={{ height: 12, width: '60%', background: '#e5e7eb', borderRadius: 999 }} />
                <div style={{ height: 38, width: 110, background: '#e5e7eb', borderRadius: 999, marginTop: 8 }} />
              </div>
            </div>
          </div>
        )}

        {eventsError && (
          <div className="text-center mb-10" style={{ color: '#9ca3af', fontSize: '0.95rem' }}>
            Unable to load events right now. Check back soon!
          </div>
        )}

        {!eventsLoading && !eventsError && events.length === 0 && (
          <div className="text-center mb-10" style={{ color: '#9ca3af', fontSize: '0.95rem' }}>
            No upcoming events at the moment — check back soon!
          </div>
        )}

        {!eventsLoading && !eventsError && events.length > 0 && (() => {
          const ev = events[activeIdx];
          const FlyerPlaceholder = ({ color }) => (
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, color: `${color}88` }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" />
              </svg>
              <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Flyer Soon</span>
            </div>
          );
          return (
            <div
              className="max-w-5xl mx-auto mb-10"
              onMouseEnter={() => setCarouselPaused(true)}
              onMouseLeave={() => { if (!lightboxSrc) setCarouselPaused(false); }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 48, flexWrap: 'wrap', justifyContent: 'center' }}>

                {/* Left: event details */}
                <div style={{ flex: 1, minWidth: 280 }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIdx}
                      initial={{ opacity: 0, x: -24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 24 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 999, background: ev.tagBg, color: ev.tagColor }}>
                          {ev.tag}
                        </span>
                        <span style={{ position: 'relative', display: 'inline-block', fontSize: '0.78rem', fontWeight: 600, color: ev.isPast ? '#9ca3af' : '#9ca3af' }}>
                          {ev.date}
                          {ev.isPast && (
                            <span style={{
                              position: 'absolute', left: 0, right: 0,
                              top: '50%', height: 2, borderRadius: 999,
                              background: '#D33A02',
                              transformOrigin: 'left center',
                              animation: 'strikeSlide 0.55s cubic-bezier(0.22,1,0.36,1) 0.1s both',
                            }} />
                          )}
                        </span>
                        {ev.isPast && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            style={{
                              fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.1em',
                              textTransform: 'uppercase', padding: '3px 10px', borderRadius: 999,
                              background: 'rgba(211,58,2,0.1)', color: '#D33A02',
                              border: '1px solid rgba(211,58,2,0.3)',
                              animation: 'pastPulse 2.5s ease-in-out 0.8s infinite',
                            }}
                          >
                            Event Has Passed
                          </motion.span>
                        )}
                      </div>
                      <h3 style={{ fontWeight: 900, fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: ev.isPast ? '#9ca3af' : '#001F5B', marginBottom: 12, lineHeight: 1.2, letterSpacing: '-0.02em', transition: 'color 0.3s' }}>
                        {ev.title}
                      </h3>
                      <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#6b7280', marginBottom: 28 }}>
                        {ev.description}
                      </p>
                      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                        <a
                          href={ev.rsvp} target="_blank" rel="noopener noreferrer"
                          style={{ display: 'inline-block', fontWeight: 800, fontSize: '0.85rem', borderRadius: 999, padding: '12px 28px', background: ev.isPast ? '#9ca3af' : ev.border, color: '#fff', textDecoration: 'none', transition: 'opacity 0.2s, transform 0.2s', cursor: ev.isPast ? 'default' : 'pointer', pointerEvents: ev.isPast ? 'none' : 'auto' }}
                          onMouseOver={e => { if (!ev.isPast) { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-2px)'; } }}
                          onMouseOut={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
                        >
                          {ev.isPast ? 'Event Ended' : 'RSVP Here'}
                        </a>
                        {ev.flyer && (
                          <button
                            onClick={() => { setLightboxSrc(ev.flyer); setCarouselPaused(true); }}
                            style={{ fontWeight: 800, fontSize: '0.85rem', borderRadius: 999, padding: '12px 28px', cursor: 'pointer', background: 'transparent', border: `2px solid ${ev.border}`, color: ev.border, transition: 'opacity 0.2s, transform 0.2s' }}
                            onMouseOver={e => { e.currentTarget.style.opacity = '0.75'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                            onMouseOut={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
                          >
                            View Flyer
                          </button>
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {events.length > 1 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 32 }}>
                      {events.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => { setActiveIdx(i); setCarouselPaused(true); }}
                          style={{ width: i === activeIdx ? 24 : 8, height: 8, borderRadius: 999, border: 'none', cursor: 'pointer', padding: 0, background: i === activeIdx ? events[i].border : '#d1d5db', transition: 'all 0.3s ease' }}
                        />
                      ))}
                      {carouselPaused && (
                        <button
                          onClick={() => setCarouselPaused(false)}
                          style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9ca3af', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                        >
                          resume
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Right: controlled flyer stack — always shows events[activeIdx] on top */}
                <div style={{ position: 'relative', width: 300, height: 420, flexShrink: 0 }}>
                  {/* peek cards behind — show next events */}
                  {events.length > 1 && [2, 1].map(offset => {
                    const peekIdx = (activeIdx + offset) % events.length;
                    const pe = events[peekIdx];
                    return (
                      <div
                        key={offset}
                        style={{
                          position: 'absolute', inset: 0,
                          borderRadius: 16, overflow: 'hidden',
                          background: pe.flyer ? 'transparent' : `linear-gradient(135deg, ${pe.border}20, ${pe.border}08)`,
                          border: `1px solid ${pe.border}33`,
                          transform: `rotate(${offset * 3}deg) translate(${offset * 10}px, ${offset * -8}px)`,
                          zIndex: offset,
                          boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                        }}
                      >
                        {pe.flyer && <img src={pe.flyer} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.45, filter: 'blur(1px)' }} />}
                      </div>
                    );
                  })}

                  {/* active flyer — always events[activeIdx] */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIdx}
                      initial={{ opacity: 0, scale: 0.93, rotate: -5 }}
                      animate={{ opacity: 1, scale: 1, rotate: -2 }}
                      exit={{ opacity: 0, scale: 0.93, rotate: 3 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        position: 'absolute', inset: 0, zIndex: 10,
                        borderRadius: 16, overflow: 'hidden',
                        border: `1px solid ${ev.border}55`,
                        boxShadow: '0 20px 56px rgba(0,0,0,0.18)',
                        background: ev.flyer ? 'transparent' : `linear-gradient(135deg, ${ev.border}20, ${ev.border}08)`,
                        cursor: ev.flyer ? 'zoom-in' : 'default',
                      }}
                      onClick={() => { if (ev.flyer) { setLightboxSrc(ev.flyer); setCarouselPaused(true); } }}
                    >
                      {ev.flyer
                        ? <img src={ev.flyer} alt={ev.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: ev.isPast ? 'grayscale(40%) brightness(0.85)' : 'none', transition: 'filter 0.4s' }} />
                        : <FlyerPlaceholder color={ev.border} />
                      }
                      {ev.isPast && (
                        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', borderRadius: 16 }}>
                          {/* dim overlay */}
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.28)', borderRadius: 16 }}
                          />
                          {/* full diagonal ribbon — centered on the card, spans corner to corner */}
                          <div style={{
                            position: 'absolute',
                            top: '50%', left: '50%',
                            /* 516px = √(300²+420²), padded to 560px to bleed past corners */
                            width: 560,
                            /* ribbon height */
                            padding: '11px 0',
                            background: 'linear-gradient(90deg, #A62500, #D33A02 30%, #FD652F 60%, #D33A02 80%, #A62500)',
                            color: '#fff',
                            fontSize: '0.72rem', fontWeight: 900,
                            letterSpacing: '0.18em', textTransform: 'uppercase',
                            textAlign: 'center',
                            /* atan(420/300) ≈ 54.5° top-left → bottom-right */
                            transform: 'translate(-50%, -50%) rotate(54.5deg)',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.12) inset',
                            animation: 'ribbonSlide 0.6s cubic-bezier(0.22,1,0.36,1) 0.15s both',
                          }}>
                            ✦ &nbsp; Event Has Passed &nbsp; ✦
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

              </div>
            </div>
          );
        })()}

        <motion.div {...fadeUp} className="text-center">
          <a
            href="https://calendar.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-bold text-sm rounded-full px-6 py-2.5 transition-all duration-200"
            style={{ border: '2px solid #0070C0', color: '#0070C0', textDecoration: 'none' }}
            onMouseOver={e => { e.currentTarget.style.background = '#0070C0'; e.currentTarget.style.color = '#fff'; }}
            onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#0070C0'; }}
          >
            Add SHPE Austin Events to Google Calendar
          </a>
        </motion.div>
      </section>

      {/*
          SECTION 4 — MEMBERSHIP
      ══════════════════════════════════════ */}
      <motion.section {...fadeUp} className="py-28 px-6" style={{ background: 'linear-gradient(135deg, #001F5B 0%, #0a1a3a 100%)' }}>
        <div className="max-w-5xl mx-auto flex flex-wrap gap-12 items-center justify-center">
          <div className="flex-1" style={{ minWidth: '280px', maxWidth: '480px' }}>
            <span className="inline-block px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4" style={{ background: 'rgba(253,101,47,0.18)', color: '#FD652F', border: '1px solid rgba(253,101,47,0.35)' }}>
              Join the Family
            </span>
            <h2 className="font-black leading-tight mb-5" style={{ color: '#fff', fontSize: 'clamp(2rem, 4vw, 2.8rem)' }}>
              Membership
            </h2>
            <p className="leading-relaxed text-lg" style={{ color: '#c8d8e8' }}>
              Are you a recent grad or just moved to Austin? Become a member and learn more about what SHPE Austin has to offer!
            </p>
          </div>

          <div className="relative flex-1 rounded-3xl overflow-hidden p-10 text-center" style={{ minWidth: '260px', maxWidth: '380px', background: 'linear-gradient(135deg, #001F5B 0%, #0a2a6e 100%)', boxShadow: '0 20px 60px rgba(0,31,91,0.25)' }}>
            <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-10" style={{ background: '#0070C0' }} />
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <BookOpen size={28} color="#fff" />
            </div>
            <p className="mb-6 leading-relaxed text-sm" style={{ color: '#c8d8e8' }}>
              Unlock networking, events, scholarships, and professional development opportunities.
            </p>
            <a
              href="#/membership"
              className="inline-block font-bold rounded-full px-6 py-3 transition-all duration-200 hover:opacity-85 hover:-translate-y-0.5"
              style={{ background: '#FD652F', color: '#fff', textDecoration: 'none', fontSize: '0.9rem' }}
            >
              More Information
            </a>
          </div>
        </div>
      </motion.section>

      {/*
          SECTION 5 — BECOME A SPONSOR
      ══════════════════════════════════════ */}
      <motion.section {...fadeUp} className="relative overflow-hidden py-24 px-6" style={{ background: 'linear-gradient(135deg, #001F5B 0%, #0a1a3a 100%)' }}>
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-10" style={{ background: '#0070C0', filter: 'blur(80px)' }} />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full opacity-10" style={{ background: '#FD652F', filter: 'blur(80px)' }} />

        <div className="relative z-10 max-w-6xl mx-auto" style={{ display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center', justifyContent: 'center' }}>

          {/* left — text */}
          <div style={{ flex: '1 1 300px', maxWidth: 480 }}>
            <span style={{ display: 'inline-block', fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '6px 16px', borderRadius: 999, marginBottom: 20, background: 'rgba(114,169,190,0.15)', color: '#72A9BE', border: '1px solid rgba(114,169,190,0.3)' }}>
              Partner With Us
            </span>
            <h2 style={{ fontWeight: 900, color: '#fff', fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 20 }}>
              Invest in the Next Generation of Engineers
            </h2>
            <p style={{ color: '#c8d8e8', fontSize: '1.05rem', lineHeight: 1.75, marginBottom: 32 }}>
              SHPE Austin connects your brand with a community of driven Hispanic engineers and STEM professionals in the heart of Austin. Let's build something together.
            </p>
            <a
              href="mailto:contact@shpeaustin.com"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                fontWeight: 800, fontSize: '0.95rem', borderRadius: 14,
                padding: '14px 28px', background: '#FD652F', color: '#fff',
                textDecoration: 'none', transition: 'opacity 0.2s, transform 0.2s',
                boxShadow: '0 8px 24px rgba(253,101,47,0.35)',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <Briefcase size={16} /> Get the Sponsorship Packet
            </a>
            <p style={{ marginTop: 14, fontSize: '0.82rem', color: 'rgba(255,255,255,0.35)' }}>
              contact@shpeaustin.com
            </p>
          </div>

          {/* right — benefit cards */}
          <div style={{ flex: '1 1 280px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { Icon: Trophy,    title: 'Brand Visibility',   desc: 'Logo placement on event materials, our website, and social media reaching 1,000+ followers.' },
              { Icon: Users,     title: 'Talent Pipeline',    desc: 'Direct access to a pool of Hispanic engineers and STEM professionals across Austin.' },
              { Icon: Star,      title: 'Community Impact',   desc: 'Be part of a mission that empowers underrepresented communities in STEM — and be seen doing it.' },
            ].map(({ Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  display: 'flex', gap: 16, alignItems: 'flex-start',
                  padding: '18px 20px', borderRadius: 14,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(253,101,47,0.15)', border: '1px solid rgba(253,101,47,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={18} color="#FD652F" />
                </div>
                <div>
                  <p style={{ margin: '0 0 4px', fontWeight: 800, fontSize: '0.9rem', color: '#fff' }}>{title}</p>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </motion.section>

      {/*
          SECTION 6 — DONATE
      ══════════════════════════════════════ */}
      <motion.section {...fadeUp} className="relative overflow-hidden py-24 px-6" style={{ background: '#f8fafc' }}>

        <div className="relative z-10 max-w-6xl mx-auto" style={{ display: 'flex', flexWrap: 'wrap', gap: 64, alignItems: 'center', justifyContent: 'center' }}>

          {/* left — impact cards */}
          <div style={{ flex: '1 1 280px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {[
              { Icon: GraduationCap, label: 'Scholarships',      color: '#001F5B', accent: '#0070C0', desc: 'Helping students fund their STEM education.' },
              { Icon: Heart,         label: 'Food Drives',        color: '#D33A02', accent: '#FD652F', desc: 'Giving back through local community drives.' },
              { Icon: Coffee,        label: 'Networking Events',  color: '#0070C0', accent: '#72A9BE', desc: 'Fueling connections over every happy hour.' },
              { Icon: Trophy,        label: 'Awards & Grants',    color: '#FD652F', accent: '#D33A02', desc: 'Recognizing excellence in our community.' },
            ].map(({ Icon, label, color, accent, desc }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                style={{
                  padding: '20px 16px', borderRadius: 16,
                  background: `linear-gradient(135deg, ${color}08, ${accent}05)`,
                  border: `1px solid ${color}18`,
                  display: 'flex', flexDirection: 'column', gap: 10,
                }}
              >
                <div style={{ width: 40, height: 40, borderRadius: 10, background: `${color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={20} color={color} />
                </div>
                <p style={{ margin: 0, fontWeight: 900, fontSize: '0.85rem', color: '#0f172a' }}>{label}</p>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1.5 }}>{desc}</p>
              </motion.div>
            ))}
          </div>

          {/* right — CTA */}
          <div style={{ flex: '1 1 300px', maxWidth: 420 }}>
            <span style={{ display: 'inline-block', fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '6px 16px', borderRadius: 999, marginBottom: 20, background: 'rgba(211,58,2,0.08)', color: '#D33A02', border: '1px solid rgba(211,58,2,0.2)' }}>
              Make an Impact
            </span>
            <h2 style={{ fontWeight: 900, color: '#001F5B', fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 20 }}>
              Every Dollar Fuels the Familia
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.05rem', lineHeight: 1.75, marginBottom: 36 }}>
              Your generosity goes directly into scholarships, community events, food drives, and everything else that keeps SHPE Austin running and growing.
            </p>
            <motion.a
              href="#/donations"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                fontWeight: 900, fontSize: '1rem', borderRadius: 14,
                padding: '16px 32px',
                background: 'linear-gradient(135deg, #FD652F, #D33A02)',
                color: '#fff', textDecoration: 'none',
                boxShadow: '0 8px 28px rgba(253,101,47,0.35)',
              }}
            >
              <Heart size={18} /> Donate Now
            </motion.a>
            <p style={{ marginTop: 16, fontSize: '0.82rem', color: '#94a3b8', fontWeight: 600 }}>
              Thank you for your support — it truly matters. 🙏
            </p>
          </div>

        </div>
      </motion.section>

      {/*
          FOOTER
      ══════════════════════════════════════ */}
      <footer className="py-16 px-6" style={{ background: '#0a0f1e' }}>
        <div className="max-w-5xl mx-auto flex flex-wrap gap-12 justify-between">

          
          <div className="flex-1" style={{ minWidth: '200px', maxWidth: '280px' }}>
            <img src={require('../assets/logos/SHPE_austin_horiz_logo.png')} alt="SHPE Austin" style={{ height: '36px', marginBottom: '1rem' }} />
            <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>
              Empowering the Hispanic community through STEM.
            </p>
          </div>

          
          <div className="flex-1" style={{ minWidth: '180px' }}>
            <h4 className="font-black text-sm tracking-widest uppercase mb-4" style={{ color: '#FD652F' }}>Contact Us</h4>
            <address className="not-italic text-sm leading-relaxed" style={{ color: '#9ca3af' }}>
              <p>P.O. Box #152753</p>
              <p>Austin, TX 78715</p>
              <a href="mailto:contact@shpeaustin.com" className="mt-3 block transition-colors duration-200 hover:text-white" style={{ color: '#9ca3af', textDecoration: 'none' }}>
                contact@shpeaustin.com
              </a>
            </address>
          </div>

          
          <div className="flex-1" style={{ minWidth: '180px' }}>
            <h4 className="font-black text-sm tracking-widest uppercase mb-4" style={{ color: '#FD652F' }}>Follow Us</h4>
            <div className="flex flex-col gap-3">
              {socialLinks.map(({ Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm font-medium transition-all duration-200 group"
                  style={{ color: '#9ca3af', textDecoration: 'none' }}
                  onMouseOver={e => { e.currentTarget.style.color = color; }}
                  onMouseOut={e => { e.currentTarget.style.color = '#9ca3af'; }}
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <Icon size={15} />
                  </span>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-12 pt-6 flex flex-wrap items-center justify-between gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <p className="text-xs" style={{ color: '#4b5563' }}>
            &copy; {new Date().getFullYear()} SHPE Austin Chapter. All rights reserved.
          </p>
          <div className="flex gap-1">
            {['#001F5B', '#0070C0', '#72A9BE', '#D33A02', '#FD652F'].map(c => (
              <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
