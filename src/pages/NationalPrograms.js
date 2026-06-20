import { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, FlaskConical, Heart } from 'lucide-react';

const categories = [
  {
    id: 'professional',
    label: 'Professional Development',
    icon: Briefcase,
    accent: '#001F5B',
    gradient: 'linear-gradient(135deg, #001F5B 0%, #0a2a5e 100%)',
    lightBg: '#f0f4ff',
    description: 'Empowering our members with the skills, connections, and knowledge to excel in their careers.',
    programs: [
      {
        name: 'Monthly Meetings',
        icon: '📅',
        description: 'Regular chapter gatherings to connect members, share updates, celebrate achievements, and keep the SHPE Austin community engaged and informed.',
      },
      {
        name: 'Webinars',
        icon: '💻',
        description: 'Virtual sessions covering industry trends, technical skills, and career topics — brought to you by professionals and thought leaders across STEM fields.',
      },
      {
        name: 'Higher Ed Advancement',
        icon: '🎓',
        description: 'Resources and mentorship for members pursuing advanced degrees, including grad school application support, fellowship guidance, and academic networking.',
      },
      {
        name: 'Corporate Networking',
        icon: '🤝',
        description: 'Events and mixers that connect SHPE Austin members directly with hiring managers, engineers, and executives at leading companies.',
      },
    ],
  },
  {
    id: 'stem',
    label: 'STEM Outreach',
    icon: FlaskConical,
    accent: '#0070C0',
    gradient: 'linear-gradient(135deg, #0070C0 0%, #005a9e 100%)',
    lightBg: '#f0f8ff',
    description: 'Inspiring the next generation of Hispanic engineers and scientists through hands-on community programs.',
    programs: [
      {
        name: 'Noche de Ciencias',
        icon: '🔬',
        description: 'A community science night where families explore STEM through interactive experiments and activities — making science exciting and accessible for all ages.',
      },
      {
        name: 'Un Sabado Gigante in Engineering',
        icon: '⚙️',
        description: 'A Saturday engineering festival for K–12 students featuring hands-on challenges, career panels, and demos to spark curiosity in engineering.',
      },
      {
        name: 'ScholarSHPEs',
        icon: '📚',
        description: 'A scholarship and mentorship program connecting high-achieving Hispanic students with resources, guidance, and financial support for their education.',
      },
      {
        name: 'STEM Robotics Contest',
        icon: '🤖',
        description: 'A robotics competition that challenges students to design, build, and program robots — fostering teamwork, creativity, and engineering problem-solving.',
      },
    ],
  },
  {
    id: 'recruitment',
    label: 'Recruitment & Retention',
    icon: Heart,
    accent: '#D33A02',
    gradient: 'linear-gradient(135deg, #D33A02 0%, #a82d01 100%)',
    lightBg: '#fff4f0',
    description: 'Building a strong, inclusive chapter by welcoming new members and keeping our community thriving.',
    programs: [
      {
        name: 'MentorSHPE Program',
        icon: '🌟',
        description: 'Pairs experienced professionals with early-career members and students for one-on-one mentorship, career guidance, and personal development.',
      },
      {
        name: 'SHPEtinas Network',
        icon: '💜',
        description: 'A dedicated network supporting Latina engineers and scientists — creating space for community, professional development, and leadership growth.',
      },
      {
        name: 'Casino Night Membership Drive',
        icon: '🎲',
        description: 'Our signature membership recruitment event — a fun casino-themed evening that brings the community together and welcomes new members into the SHPE familia.',
      },
    ],
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: 'easeOut' },
};

const stagger = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true },
};

const cardAnim = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' },
};

export default function NationalPrograms() {
  const [active, setActive] = useState('professional');
  const current = categories.find((c) => c.id === active);

  return (
    <main style={{ paddingTop: '60px', background: '#f8fafc', minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden py-24 px-6 text-center"
        style={{ background: 'linear-gradient(135deg, #001F5B 0%, #0a1a3a 100%)' }}
      >
        <div className="absolute rounded-full opacity-10 pointer-events-none" style={{ width: 500, height: 500, background: '#0070C0', top: '-150px', right: '-100px', filter: 'blur(100px)' }} />
        <div className="absolute rounded-full opacity-10 pointer-events-none" style={{ width: 350, height: 350, background: '#FD652F', bottom: '-80px', left: '-80px', filter: 'blur(80px)' }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <span
            className="inline-block text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-6"
            style={{ background: 'rgba(253,101,47,0.2)', color: '#FD652F', border: '1px solid rgba(253,101,47,0.3)' }}
          >
            SHPE Austin
          </span>
          <h1 className="font-black text-white mb-5" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', lineHeight: 1.1 }}>
            National Programs
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: '#c8d8e8' }}>
            SHPE Austin brings national programs to life locally — from K–12 outreach to corporate networking, our initiatives are built to open doors and build community.
          </p>

          {/* stat strip */}
          <div className="flex flex-wrap justify-center gap-10 mt-12">
            {[
              { value: '3', label: 'Program Categories' },
              { value: '11', label: 'Active Programs' },
              { value: 'K–12', label: 'Outreach Reach' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-black text-white" style={{ fontSize: '2rem' }}>{s.value}</p>
                <p className="text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.5)' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── CATEGORY TABS ── */}
      <div className="sticky top-[60px] z-20 bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-6 flex overflow-x-auto" style={{ gap: 0 }}>
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = active === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className="flex items-center gap-2 px-6 py-4 text-sm font-bold whitespace-nowrap transition-all border-b-2 focus:outline-none"
                style={{
                  color: isActive ? cat.accent : '#6b7280',
                  borderBottomColor: isActive ? cat.accent : 'transparent',
                  background: 'transparent',
                }}
              >
                <Icon size={16} />
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── ACTIVE CATEGORY ── */}
      <section className="max-w-5xl mx-auto px-6 py-16">

        {/* category header */}
        <motion.div key={active + '-header'} {...fadeUp} className="mb-12 flex flex-col sm:flex-row sm:items-center gap-6">
          <div
            className="flex items-center justify-center rounded-2xl shrink-0"
            style={{ width: 72, height: 72, background: current.gradient }}
          >
            {(() => { const Icon = current.icon; return <Icon size={32} color="white" />; })()}
          </div>
          <div>
            <h2 className="text-3xl font-black mb-1" style={{ color: current.accent }}>{current.label}</h2>
            <p className="text-base leading-relaxed" style={{ color: '#6b7280' }}>{current.description}</p>
          </div>
        </motion.div>

        {/* program cards */}
        <motion.div
          key={active + '-cards'}
          {...stagger}
          className="grid gap-6"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}
        >
          {current.programs.map((prog) => (
            <motion.div
              key={prog.name}
              {...cardAnim}
              whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.10)' }}
              className="rounded-2xl p-7 flex flex-col gap-4 cursor-default"
              style={{ background: 'white', border: `1px solid ${current.accent}18`, boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="flex items-center justify-center rounded-xl text-2xl shrink-0"
                  style={{ width: 52, height: 52, background: current.lightBg }}
                >
                  {prog.icon}
                </div>
                <h3 className="font-black text-lg leading-tight" style={{ color: '#111827' }}>{prog.name}</h3>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>{prog.description}</p>
              <div className="mt-auto pt-2">
                <div className="h-1 rounded-full w-12" style={{ background: current.gradient }} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── ALL PROGRAMS OVERVIEW ── */}
      <motion.section
        {...fadeUp}
        className="py-20 px-6"
        style={{ background: 'linear-gradient(135deg, #001F5B 0%, #0a1a3a 100%)' }}
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-white text-center mb-12">All Programs at a Glance</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => { setActive(cat.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="rounded-2xl p-6 text-left transition-transform hover:scale-105 focus:outline-none"
                  style={{ background: cat.gradient }}
                >
                  <Icon size={28} color="rgba(255,255,255,0.9)" />
                  <h3 className="font-black text-white text-lg mt-4 mb-2">{cat.label}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    {cat.programs.length} programs
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {cat.programs.map((p) => (
                      <span key={p.name} className="text-xs px-2 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.15)', color: 'white' }}>
                        {p.name}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </motion.section>

    </main>
  );
}
