import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import irs2024 from '../assets/irs_forms/2024-SHPE-Austin-990-N.pdf';
import irs2023 from '../assets/irs_forms/2023-SHPE-Austin-990-N-3.pdf';

function useCountUp(target, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const startTime = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * target));
          if (progress < 1) requestAnimationFrame(tick);
          else setCount(target);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return [count, ref];
}

function StatCard({ value, label, color }) {
  const isNumeric = /^\d+$/.test(value.replace(/[+$,]/g, ''));
  const numericPart = parseInt(value.replace(/[^0-9]/g, ''), 10);
  const prefix = value.startsWith('$') ? '$' : '';
  const suffix = value.endsWith('+') ? '+' : '';
  const [count, ref] = useCountUp(isNumeric ? numericPart : 0);

  return (
    <div ref={ref} className="rounded-2xl p-6 text-center" style={{ background: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
      <p className="font-black mb-1" style={{ color: color || '#D33A02', fontSize: '2rem' }}>
        {isNumeric ? `${prefix}${count.toLocaleString()}${suffix}` : value}
      </p>
      <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#6b7280' }}>{label}</p>
    </div>
  );
}

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: 'easeOut' },
};

const nationalTimeline = [
  { year: '1974', label: 'Founded', desc: 'Founded in Los Angeles, CA by city engineers with a vision to empower the Hispanic community through STEM.' },
  { year: '1975', label: 'First Chapters', desc: 'Two inaugural student chapters established, launching the national network.' },
  { year: '1980s', label: 'National Growth', desc: 'SHPE expanded across the country with professional and student chapters in every region.' },
  { year: 'Today', label: 'Global Reach', desc: 'A strong, independent network of chapters spanning the nation and reaching beyond the United States.' },
];

const austinTimeline = [
  { year: '1982', label: 'SHPE Austin Founded', desc: 'Established to bring networking and professional development to Hispanic engineers in Austin.' },
  { year: '1994', label: 'Scholarship Program', desc: 'Launched our annual scholarship program, awarding at least $3,000 per year to local STEM students.' },
  { year: '2000s', label: 'STEM Outreach', desc: 'Expanded to support students as young as elementary school through STEM enrichment projects.' },
  { year: '2026', label: '44+ Years Strong', desc: 'Continuing to grow our professional membership, host networking events, and develop quality STEM leaders.' },
];

const stats = [
  { value: '44+', label: 'Years of Impact' },
  { value: '1994', label: 'Scholarship Since' },
  { value: '$3K+', label: 'Awarded Annually' },
  { value: 'K–12', label: 'Outreach Reach' },
];

const irsDocuments = [
  { label: '990-N Public IRS Form — 2024', href: irs2024 },
  { label: '990-N Public IRS Form — 2023', href: irs2023 },
];

export default function About() {
  const [activeTab, setActiveTab] = useState('about');

  return (
    <main className="font-sans" style={{ paddingTop: '80px' }}>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden py-24 px-6 text-center" style={{ background: 'linear-gradient(135deg, #001F5B 0%, #0a1a3a 100%)' }}>
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-10" style={{ background: '#0070C0', filter: 'blur(80px)' }} />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full opacity-10" style={{ background: '#FD652F', filter: 'blur(80px)' }} />
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-5" style={{ background: 'rgba(253,101,47,0.15)', color: '#FD652F', border: '1px solid rgba(253,101,47,0.3)' }}>
            Our Story
          </span>
          <h1 className="font-black leading-tight mb-4" style={{ color: '#fff', fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
            About SHPE Austin
          </h1>
          <div className="mx-auto rounded-full" style={{ width: '80px', height: '4px', background: 'linear-gradient(90deg, #FD652F, #0070C0)' }} />
        </div>
      </section>

      {/* ── TABS ── */}
      <div className="sticky top-0 z-30 flex justify-center px-4 py-3" style={{ background: '#fff', borderBottom: '1px solid #e5e7eb' }}>
        {['about', 'documents'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-8 py-2 font-bold text-sm rounded-full mx-2 transition-all duration-200"
            style={{
              background: activeTab === tab ? '#001F5B' : 'transparent',
              color: activeTab === tab ? '#fff' : '#6b7280',
              border: activeTab === tab ? 'none' : '1px solid #e5e7eb',
            }}
          >
            {tab === 'about' ? 'About' : 'Documents'}
          </button>
        ))}
      </div>

      {activeTab === 'about' && (
        <>
          {/* ── STATS ── */}
          <motion.section {...fadeUp} className="py-16 px-6" style={{ background: '#f0f4f8' }}>
            <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {stats.map(({ value, label }, i) => (
                <StatCard key={label} value={value} label={label} color={i % 2 === 0 ? '#D33A02' : '#0070C0'} />
              ))}
            </div>
          </motion.section>

          {/* ── NATIONAL HISTORY ── */}
          <motion.section {...fadeUp} className="py-20 px-6" style={{ background: '#fff' }}>
            <div className="max-w-4xl mx-auto">
              <span className="inline-block px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4" style={{ background: 'rgba(0,112,192,0.08)', color: '#0070C0', border: '1px solid rgba(0,112,192,0.2)' }}>
                Nationwide
              </span>
              <h2 className="font-black mb-4" style={{ color: '#001F5B', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}>
                SHPE National History
              </h2>
              <p className="leading-relaxed mb-12" style={{ color: '#4b5563', fontSize: '1.05rem', maxWidth: '680px' }}>
                The Society of Hispanic Professional Engineers (SHPE) was founded in Los Angeles, California, in 1974 by a group of engineers employed by the city of Los Angeles. Their objective was to form a national organization of professional engineers to serve as role models in the Hispanic community — with networking as the key foundation.
              </p>

              {/* Timeline */}
              <div className="relative pl-8" style={{ borderLeft: '3px solid #e5e7eb' }}>
                {nationalTimeline.map(({ year, label, desc }, i) => (
                  <motion.div
                    key={year}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="relative mb-10 last:mb-0"
                  >
                    {/* Dot */}
                    <div className="absolute -left-10 top-1 w-4 h-4 rounded-full border-4 border-white" style={{ background: i % 2 === 0 ? '#0070C0' : '#FD652F', boxShadow: '0 0 0 3px ' + (i % 2 === 0 ? '#0070C0' : '#FD652F') + '33' }} />
                    <span className="inline-block text-xs font-black tracking-widest uppercase px-3 py-1 rounded-full mb-2" style={{ background: i % 2 === 0 ? 'rgba(0,112,192,0.08)' : 'rgba(253,101,47,0.08)', color: i % 2 === 0 ? '#0070C0' : '#FD652F' }}>
                      {year}
                    </span>
                    <h4 className="font-black text-base mb-1" style={{ color: '#001F5B' }}>{label}</h4>
                    <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>{desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* ── AUSTIN HISTORY ── */}
          <motion.section {...fadeUp} className="py-20 px-6" style={{ background: '#f0f4f8' }}>
            <div className="max-w-4xl mx-auto">
              <span className="inline-block px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4" style={{ background: 'rgba(211,58,2,0.08)', color: '#D33A02', border: '1px solid rgba(211,58,2,0.2)' }}>
                Local Chapter
              </span>
              <h2 className="font-black mb-4" style={{ color: '#001F5B', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}>
                SHPE Austin History
              </h2>
              <p className="leading-relaxed mb-4" style={{ color: '#4b5563', fontSize: '1.05rem', maxWidth: '680px' }}>
                Founded in 1982, over the past 38 years, SHPE Austin has expanded its initial efforts of providing networking and professional development opportunities to include support for the local Hispanic community in obtaining STEM degrees.
              </p>
              <p className="leading-relaxed mb-12" style={{ color: '#4b5563', fontSize: '1.05rem', maxWidth: '680px' }}>
                Whether we present on soft skills or field-specific topics, SHPE Austin prides itself on developing quality professionals in the workforce — while hosting networking events that create a welcoming environment for all who share our vision.
              </p>

              {/* Timeline */}
              <div className="relative pl-8" style={{ borderLeft: '3px solid #e5e7eb' }}>
                {austinTimeline.map(({ year, label, desc }, i) => (
                  <motion.div
                    key={year}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="relative mb-10 last:mb-0"
                  >
                    <div className="absolute -left-10 top-1 w-4 h-4 rounded-full border-4 border-white" style={{ background: i % 2 === 0 ? '#D33A02' : '#001F5B', boxShadow: '0 0 0 3px ' + (i % 2 === 0 ? '#D33A02' : '#001F5B') + '33' }} />
                    <span className="inline-block text-xs font-black tracking-widest uppercase px-3 py-1 rounded-full mb-2" style={{ background: i % 2 === 0 ? 'rgba(211,58,2,0.08)' : 'rgba(0,31,91,0.08)', color: i % 2 === 0 ? '#D33A02' : '#001F5B' }}>
                      {year}
                    </span>
                    <h4 className="font-black text-base mb-1" style={{ color: '#001F5B' }}>{label}</h4>
                    <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>{desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* ── MISSION & VISION ── */}
          <motion.section {...fadeUp} className="py-24 px-6" style={{ background: 'linear-gradient(135deg, #001F5B 0%, #0a1a3a 100%)' }}>
            <div className="max-w-5xl mx-auto flex flex-wrap gap-8">

              {/* Mission */}
              <div className="flex-1 rounded-2xl p-10" style={{ minWidth: '260px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-1 h-10 rounded-full" style={{ background: 'linear-gradient(180deg, #FD652F, #D33A02)' }} />
                  <h3 className="font-black text-2xl" style={{ color: '#fff' }}>Mission</h3>
                </div>
                <p className="leading-relaxed italic" style={{ color: '#c8d8e8', fontSize: '1.05rem' }}>
                  "SHPE changes lives by empowering the Hispanic community to realize its fullest potential and to impact the world through STEM awareness, access, support, and development."
                </p>
              </div>

              {/* Vision */}
              <div className="flex-1 rounded-2xl p-10" style={{ minWidth: '260px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-1 h-10 rounded-full" style={{ background: 'linear-gradient(180deg, #0070C0, #72A9BE)' }} />
                  <h3 className="font-black text-2xl" style={{ color: '#fff' }}>Vision</h3>
                </div>
                <p className="leading-relaxed italic" style={{ color: '#c8d8e8', fontSize: '1.05rem' }}>
                  "SHPE's vision is a world where Hispanics are highly valued and influential as the leading innovators, scientists, mathematicians, and engineers."
                </p>
              </div>

            </div>
          </motion.section>
        </>
      )}

      {activeTab === 'documents' && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="py-20 px-6"
          style={{ background: '#f0f4f8', minHeight: '60vh' }}
        >
          <div className="max-w-2xl mx-auto">
            <span className="inline-block px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4" style={{ background: 'rgba(0,31,91,0.08)', color: '#001F5B', border: '1px solid rgba(0,31,91,0.15)' }}>
              Public Records
            </span>
            <h2 className="font-black mb-2" style={{ color: '#001F5B', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)' }}>
              Documents
            </h2>
            <p className="text-sm mb-10" style={{ color: '#6b7280' }}>
              990 Public IRS Forms are available below for transparency and public record.
            </p>

            <div className="flex flex-col gap-4">
              {irsDocuments.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-2xl px-6 py-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md group"
                  style={{ background: '#fff', textDecoration: 'none', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0" style={{ background: 'rgba(211,58,2,0.08)' }}>
                    <FileText size={20} color="#D33A02" />
                  </div>
                  <span className="font-semibold text-sm" style={{ color: '#001F5B' }}>{label}</span>
                  <span className="ml-auto text-xs font-bold" style={{ color: '#D33A02' }}>View PDF</span>
                </a>
              ))}
            </div>
          </div>
        </motion.section>
      )}
    </main>
  );
}
