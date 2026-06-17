import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Users, HandHeart, BookOpen, Shield } from 'lucide-react';
import ShpeHatAnimation from './ShpeHatAnimation';

const textVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
};

const lineVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const gradientStyle = {
  letterSpacing: '0.2em',
  fontSize: 'clamp(1.5rem, 4vw, 3rem)',
  fontWeight: 700,
  textTransform: 'uppercase',
  background: 'linear-gradient(135deg, #D33A02, #FD652F, #0070C0, #001F5B, #D33A02, #FD652F)',
  backgroundSize: '300% 300%',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  animation: 'gradientShift 4s ease infinite',
};

const fadeUp = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: 'easeOut' },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const valueCards = [
  { label: 'Familia', Icon: Users, color: '#001F5B', accent: '#0070C0', desc: 'Community and belonging at the heart of everything we do.' },
  { label: 'Service', Icon: HandHeart, color: '#0070C0', accent: '#72A9BE', desc: 'Giving back to the community that lifts us up.' },
  { label: 'Education', Icon: BookOpen, color: '#D33A02', accent: '#FD652F', desc: 'Empowering minds through STEM access and development.' },
  { label: 'Resilience', Icon: Shield, color: '#FD652F', accent: '#D33A02', desc: 'Rising above challenges with strength and determination.' },
];

const events = [
  {
    title: 'SHPE Social — FIFA World Cup Watch Party',
    date: 'June 18th · 6:00 PM CT',
    tag: 'Social Event',
    description: 'Join us for the Mexico vs South Korea match! RSVP for address details and updates.',
    border: '#FD652F',
    tagBg: 'rgba(253,101,47,0.1)',
    tagColor: '#FD652F',
    rsvp: '#',
  },
  {
    title: 'Virtual Event with ARM & SHPE Phoenix',
    date: 'June 18th · 6:00 PM CT',
    tag: 'Virtual Event',
    description: 'Join SHPE Phoenix Professional and Unidos@ARM alongside Platinum Sponsor ARM — a semiconductor and software design company growing new facilities in Austin! Zoom link sent via RSVP email.',
    border: '#0070C0',
    tagBg: 'rgba(0,112,192,0.1)',
    tagColor: '#0070C0',
    rsvp: '#',
  },
];

const socialLinks = [
  { Icon: FaFacebookF, href: 'https://facebook.com', label: 'Facebook', color: '#1877F2' },
  { Icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter', color: '#1DA1F2' },
  { Icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram', color: '#E1306C' },
  { Icon: FaLinkedinIn, href: 'https://linkedin.com', label: 'LinkedIn', color: '#0A66C2' },
];

export default function Home() {
  const alreadyPlayed = sessionStorage.getItem('introPlayed');
  const [stage, setStage] = useState(alreadyPlayed ? 'done' : 'video');
  const [fadeOut, setFadeOut] = useState(false);
  const [hatDone, setHatDone] = useState(!!alreadyPlayed);
  const videoRef = useRef(null);

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
        .intro-video { object-fit: cover; }
        .hat-margin  { margin-top: -80px; }
        @media (max-width: 640px) {
          .intro-video { object-fit: contain; }
          .hat-margin  { margin-top: -20px; }
        }
      `}</style>

      {/* ── INTRO: VIDEO ── */}
      {stage === 'video' && (
        <div style={{ transition: 'opacity 0.6s ease', opacity: fadeOut ? 0 : 1, width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <video ref={videoRef} src={require('../assets/shpe_animated_video.mp4')} autoPlay muted playsInline onEnded={handleVideoEnd} className="intro-video" style={{ width: '100%', height: '100%' }} />
        </div>
      )}

      {/* ── INTRO: HAT ANIMATION ── */}
      {(stage === 'hat' || stage === 'done') && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', gap: 0 }}>
          <AnimatePresence>
            {hatDone && (
              <motion.div variants={textVariants} initial="hidden" animate="visible" style={{ textAlign: 'center' }}>
                <motion.p variants={lineVariants} style={gradientStyle}>Bienvenido a</motion.p>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="hat-margin">
            <ShpeHatAnimation onComplete={handleHatComplete} speed={stage === 'done' ? 999 : 1.4} />
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          SECTION 1 — OUR MISSION
      ══════════════════════════════════════ */}
      <motion.section {...fadeUp} className="relative overflow-hidden py-28 px-6 text-center" style={{ background: 'linear-gradient(135deg, #001F5B 0%, #0a1a3a 100%)' }}>
        {/* Decorative blobs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-10" style={{ background: '#0070C0', filter: 'blur(80px)' }} />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full opacity-10" style={{ background: '#FD652F', filter: 'blur(80px)' }} />

        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-6" style={{ background: 'rgba(253,101,47,0.15)', color: '#FD652F', border: '1px solid rgba(253,101,47,0.3)' }}>
            Who We Are
          </span>
          <h2 className="font-black leading-tight mb-6" style={{ color: '#fff', fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
            Our Mission
          </h2>
          <div className="mx-auto mb-8 rounded-full" style={{ width: '80px', height: '4px', background: 'linear-gradient(90deg, #FD652F, #0070C0)' }} />
          <p className="leading-relaxed mb-10" style={{ color: '#c8d8e8', fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}>
            SHPE changes lives by empowering the Hispanic community to realize its fullest potential and to impact the world through STEM awareness, access, support, and development.
          </p>
          <a href="/#/about" className="inline-block font-bold rounded-full px-8 py-3 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5" style={{ background: '#FD652F', color: '#fff', fontSize: '1rem', textDecoration: 'none' }}>
            Learn More
          </a>
        </div>
      </motion.section>

      {/* ══════════════════════════════════════
          SECTION 2 — SHPE VALUES
      ══════════════════════════════════════ */}
      <section className="py-28 px-6" style={{ background: '#f0f4f8' }}>
        <motion.div {...fadeUp} className="text-center max-w-xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4" style={{ background: 'rgba(0,112,192,0.1)', color: '#0070C0', border: '1px solid rgba(0,112,192,0.2)' }}>
            What Drives Us
          </span>
          <h2 className="font-black" style={{ color: '#001F5B', fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            SHPE Values
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {valueCards.map(({ label, Icon, color, accent, desc }) => (
            <motion.div
              key={label}
              variants={cardVariant}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative overflow-hidden rounded-2xl p-8 flex flex-col items-center text-center group cursor-default"
              style={{ background: '#fff', boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}
            >
              {/* Colored top bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl" style={{ background: `linear-gradient(90deg, ${color}, ${accent})` }} />

              {/* Icon circle */}
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl mb-5 mt-2 transition-transform duration-300 group-hover:scale-110" style={{ background: `linear-gradient(135deg, ${color}, ${accent})` }}>
                <Icon size={28} color="#fff" strokeWidth={1.8} />
              </div>

              <h3 className="font-black text-xl mb-3" style={{ color }}>{label}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>{desc}</p>

              {/* Subtle background glow on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 0%, ${color}08 0%, transparent 70%)` }} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 3 — UPCOMING EVENTS
      ══════════════════════════════════════ */}
      <section className="py-28 px-6" style={{ background: '#fff' }}>
        <motion.div {...fadeUp} className="text-center max-w-xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4" style={{ background: 'rgba(211,58,2,0.08)', color: '#D33A02', border: '1px solid rgba(211,58,2,0.2)' }}>
            What's Coming Up
          </span>
          <h2 className="font-black" style={{ color: '#001F5B', fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            Upcoming Events
          </h2>
        </motion.div>

        <div className="flex flex-wrap gap-6 max-w-5xl mx-auto justify-center mb-10">
          {events.map((ev, i) => (
            <motion.div
              key={ev.title}
              initial={{ opacity: 0, x: i === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="flex-1 rounded-2xl overflow-hidden"
              style={{ minWidth: '280px', maxWidth: '460px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', borderTop: `4px solid ${ev.border}`, background: '#fff' }}
            >
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: ev.tagBg, color: ev.tagColor }}>{ev.tag}</span>
                  <span className="text-xs font-semibold" style={{ color: '#9ca3af' }}>{ev.date}</span>
                </div>
                <h3 className="font-black text-lg leading-snug mb-3" style={{ color: '#001F5B' }}>{ev.title}</h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: '#6b7280' }}>{ev.description}</p>
                <a
                  href={ev.rsvp}
                  className="inline-block font-bold text-sm rounded-full px-6 py-2.5 transition-all duration-200 hover:opacity-85 hover:-translate-y-0.5"
                  style={{ background: ev.border, color: '#fff', textDecoration: 'none' }}
                >
                  RSVP Here
                </a>
              </div>
            </motion.div>
          ))}
        </div>

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

      {/* ══════════════════════════════════════
          SECTION 4 — MEMBERSHIP
      ══════════════════════════════════════ */}
      <motion.section {...fadeUp} className="py-28 px-6" style={{ background: '#f0f4f8' }}>
        <div className="max-w-5xl mx-auto flex flex-wrap gap-12 items-center justify-center">
          <div className="flex-1" style={{ minWidth: '280px', maxWidth: '480px' }}>
            <span className="inline-block px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4" style={{ background: 'rgba(253,101,47,0.1)', color: '#FD652F', border: '1px solid rgba(253,101,47,0.2)' }}>
              Join the Family
            </span>
            <h2 className="font-black leading-tight mb-5" style={{ color: '#001F5B', fontSize: 'clamp(2rem, 4vw, 2.8rem)' }}>
              Membership
            </h2>
            <p className="leading-relaxed text-lg" style={{ color: '#374151' }}>
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
              href="/#/membership"
              className="inline-block font-bold rounded-full px-6 py-3 transition-all duration-200 hover:opacity-85 hover:-translate-y-0.5"
              style={{ background: '#FD652F', color: '#fff', textDecoration: 'none', fontSize: '0.9rem' }}
            >
              More Information
            </a>
          </div>
        </div>
      </motion.section>

      {/* ══════════════════════════════════════
          SECTION 5 — BECOME A SPONSOR
      ══════════════════════════════════════ */}
      <motion.section {...fadeUp} className="relative overflow-hidden py-28 px-6 text-center" style={{ background: 'linear-gradient(135deg, #001F5B 0%, #0a1a3a 100%)' }}>
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10" style={{ background: '#0070C0', filter: 'blur(60px)' }} />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-10" style={{ background: '#FD652F', filter: 'blur(60px)' }} />

        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="inline-block px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-6" style={{ background: 'rgba(114,169,190,0.15)', color: '#72A9BE', border: '1px solid rgba(114,169,190,0.3)' }}>
            Partner With Us
          </span>
          <h2 className="font-black leading-tight mb-6" style={{ color: '#fff', fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            Become a Sponsor!
          </h2>
          <div className="mx-auto mb-8 rounded-full" style={{ width: '80px', height: '4px', background: 'linear-gradient(90deg, #FD652F, #0070C0)' }} />
          <p className="leading-relaxed mb-4" style={{ color: '#c8d8e8', fontSize: '1.05rem' }}>
            SHPE Austin is always looking for new companies to help in the professional development and advancement of engineers in the City of Austin.
          </p>
          <p className="mb-10" style={{ color: '#c8d8e8', fontSize: '1rem' }}>
            Interested? Contact us for a Corporate Solicitation Packet.
          </p>
          <a
            href="mailto:contact@shpeaustin.com"
            className="inline-block font-bold rounded-full px-8 py-3 transition-all duration-200 hover:opacity-85 hover:-translate-y-0.5"
            style={{ background: '#FD652F', color: '#fff', textDecoration: 'none', fontSize: '1rem' }}
          >
            contact@shpeaustin.com
          </a>
        </div>
      </motion.section>

      {/* ══════════════════════════════════════
          SECTION 6 — DONATE
      ══════════════════════════════════════ */}
      <motion.section {...fadeUp} className="relative overflow-hidden py-28 px-6 text-center" style={{ background: 'linear-gradient(135deg, #FD652F 0%, #D33A02 100%)' }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="inline-block px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-6" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)' }}>
            Make an Impact
          </span>
          <h2 className="font-black leading-tight mb-6" style={{ color: '#fff', fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
            Donate!
          </h2>
          <p className="leading-relaxed mb-10" style={{ color: 'rgba(255,255,255,0.9)', fontSize: 'clamp(1rem, 2vw, 1.15rem)' }}>
            Your generosity helps us achieve our goals of giving back to the community — from scholarships to students, to donations to food banks, and so much more.
          </p>
          <a
            href="#donate"
            className="inline-block font-black rounded-full px-10 py-4 transition-all duration-200 hover:-translate-y-1"
            style={{ background: '#fff', color: '#D33A02', textDecoration: 'none', fontSize: '1.1rem', boxShadow: '0 8px 30px rgba(0,0,0,0.2)' }}
            onMouseOver={e => e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.3)'}
            onMouseOut={e => e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.2)'}
          >
            Donate Now
          </a>
          <p className="mt-6 text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Thank you for your support!
          </p>
        </div>
      </motion.section>

      {/* ══════════════════════════════════════
          FOOTER
      ══════════════════════════════════════ */}
      <footer className="py-16 px-6" style={{ background: '#0a0f1e' }}>
        <div className="max-w-5xl mx-auto flex flex-wrap gap-12 justify-between">

          {/* Logo / Brand */}
          <div className="flex-1" style={{ minWidth: '200px', maxWidth: '280px' }}>
            <img src={require('../assets/logos/SHPE_austin_horiz_logo.png')} alt="SHPE Austin" style={{ height: '36px', marginBottom: '1rem' }} />
            <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>
              Empowering the Hispanic community through STEM.
            </p>
          </div>

          {/* Contact */}
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

          {/* Follow Us */}
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
