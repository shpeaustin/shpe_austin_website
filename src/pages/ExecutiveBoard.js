import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RadialIntro } from '../components/animate-ui/radial-intro';
import { MemberCard } from '../components/MemberCard';

const board = [
  {
    name: 'Susana Samayoa',
    position: 'President',
    profession: 'Sr. Systems Engineer',
    company: 'BAE Systems Inc.',
    school: 'University of Houston | Cornell University',
    bio: 'Leads the chapter with a passion for empowering Hispanic engineers. Dedicated to growing SHPE Austin and building a strong community bridge between students and industry.',
    photo: null,
    accent: '#001F5B',
    gradient: 'linear-gradient(135deg, #001F5B 0%, #0a2a5e 100%)',
  },
  {
    name: 'Jonathan Franco',
    position: 'Vice President',
    profession: 'Senior Sales Engineer',
    company: 'Eaton',
    school: 'University of South Florida - Tampa',
    bio: 'Supports chapter operations and drives strategic initiatives. Passionate about connecting members with opportunities in STEM and fostering professional growth.',
    photo: null,
    accent: '#0070C0',
    gradient: 'linear-gradient(135deg, #0070C0 0%, #005a9e 100%)',
  },
  {
    name: 'Eugenia Rodriguez',
    position: 'Treasurer',
    profession: 'Project Analyst',
    company: 'Company Name',
    school: 'University of the Incarnate Word',
    bio: 'Manages chapter finances and ensures fiscal transparency. Dedicated to allocating resources where they make the greatest impact for our members.',
    photo: null,
    accent: '#D33A02',
    gradient: 'linear-gradient(135deg, #D33A02 0%, #a82d01 100%)',
  },
  {
    name: 'Marvin Andara',
    position: 'Secretary',
    profession: 'Software Engineer',
    company: 'Company Name',
    school: 'Florida Atlantic University',
    bio: 'Keeps the chapter organized and communication flowing. Ensures all members stay informed and that chapter records are maintained with precision.',
    photo: null,
    accent: '#FD652F',
    gradient: 'linear-gradient(135deg, #FD652F 0%, #d44e20 100%)',
  },
  {
    name: 'Juan Ramirez',
    position: 'Membership Director',
    profession: 'Biomedical Engineer',
    company: 'Company Name',
    school: 'UT Dallas',
    bio: 'Champions membership growth and retention. Works to create a welcoming environment for every new member and ensures no one is left behind.',
    photo: null,
    accent: '#001F5B',
    gradient: 'linear-gradient(135deg, #001F5B 0%, #0a2a5e 100%)',
  },
  {
    name: 'Anamaria Torres',
    position: 'Partnership Director',
    profession: 'Industrial Engineer',
    company: 'Company Name',
    school: 'Texas Tech University',
    bio: 'Builds and maintains relationships with corporate partners and sponsors. Creates pathways between the professional world and our talented members.',
    photo: null,
    accent: '#0070C0',
    gradient: 'linear-gradient(135deg, #0070C0 0%, #005a9e 100%)',
  },
  {
    name: 'Patricia Islas',
    position: 'Marketing Director',
    profession: 'Communications & Media',
    company: 'Company Name',
    school: 'University of Texas at Austin',
    bio: "Manages the chapter's brand, social media, and outreach campaigns. Tells the SHPE Austin story to the world with creativity and purpose.",
    photo: null,
    accent: '#D33A02',
    gradient: 'linear-gradient(135deg, #D33A02 0%, #a82d01 100%)',
  },
  {
    name: 'Noe Melchor',
    position: 'Outreach Director',
    profession: 'Spacecraft Assembly Integration & Test Engineer',
    company: 'Firefly',
    school: 'University of California - San Diego',
    bio: 'Leads K–12 outreach programs to inspire the next generation of Hispanic engineers. Believes that representation starts early.',
    photo: null,
    accent: '#FD652F',
    gradient: 'linear-gradient(135deg, #FD652F 0%, #d44e20 100%)',
  },
  {
    name: 'Luigi Medrano',
    position: 'Professional Development Director',
    profession: 'Software Engineer / Data Scientist',
    company: 'Dell Technologies',
    school: 'The University of Texas at Austin',
    bio: 'Organizes workshops, networking events, and career fairs. Equips members with the tools they need to thrive in the professional world.',
    photo: require('../assets/executive_board/luigi.jpg'),
    accent: '#001F5B',
    gradient: 'linear-gradient(135deg, #001F5B 0%, #0a2a5e 100%)',
  },
  {
    name: 'Luis Ramirez',
    position: 'Chapter Advisor',
    profession: 'Data Engineer',
    company: 'Wells Fargo',
    school: 'CSU Sacramento',
    bio: "Provides mentorship, guidance, and institutional knowledge to the chapter. A champion of SHPE's mission with decades of experience in the field.",
    photo: null,
    accent: '#72A9BE',
    gradient: 'linear-gradient(135deg, #72A9BE 0%, #4e8aa0 100%)',
  },
];


const initials = (name) =>
  name.split(' ').map((w) => w[0]).join('');

function avatarSrc(member) {
  if (member.photo) return member.photo;
  const ini = initials(member.name);
  const color = member.accent.replace('#', '%23');
  return `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60'><circle cx='30' cy='30' r='30' fill='${color}'/><text x='50%25' y='50%25' dominant-baseline='central' text-anchor='middle' font-family='sans-serif' font-weight='900' font-size='20' fill='white'>${ini}</text></svg>`;
}

// full profile modal — opens when you click someone

function ProfileModal({ member, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {member && (
        <>
          <motion.div
            className="fixed inset-0 z-50"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed z-50 left-1/2 top-1/2"
            style={{ width: 'min(520px, 94vw)' }}
            initial={{ opacity: 0, scale: 0.88, x: '-50%', y: '-50%' }}
            animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
            exit={{ opacity: 0, scale: 0.88, x: '-50%', y: '-50%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl">

              <div className="flex" style={{ background: member.gradient, minHeight: 160 }}>
                {/* subtle texture so the header isn't just a flat gradient */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="modal-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="1.2" fill="white" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#modal-dots)" />
                </svg>

                <div className="relative z-10 flex items-center justify-center px-7 py-6 flex-shrink-0">
                  <div
                    className="rounded-full overflow-hidden flex items-center justify-center shadow-xl"
                    style={{
                      width: 88, height: 88,
                      border: '3px solid rgba(255,255,255,0.4)',
                      background: 'rgba(255,255,255,0.15)',
                    }}
                  >
                    {member.photo
                      ? <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                      : <span className="font-black text-white text-3xl">{initials(member.name)}</span>}
                  </div>
                </div>

                <div className="relative z-10 flex flex-col justify-center py-6 pr-6 min-w-0">
                  <span
                    className="self-start text-xs font-black uppercase tracking-widest px-2.5 py-1 rounded-md mb-2"
                    style={{ background: 'rgba(255,255,255,0.18)', color: 'white', border: '1px solid rgba(255,255,255,0.25)' }}
                  >
                    {member.position}
                  </span>
                  <h2 className="text-2xl font-black text-white leading-tight">{member.name}</h2>
                  <p className="text-sm mt-1 font-medium" style={{ color: 'rgba(255,255,255,0.78)' }}>{member.profession}</p>
                </div>
              </div>

              <div className="bg-white px-7 py-6 flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0070C0" strokeWidth="2" className="flex-shrink-0 mt-0.5">
                      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                    </svg>
                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color: '#94a3b8' }}>Company</p>
                      <p className="text-sm font-semibold" style={{ color: '#001F5B' }}>{member.company}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0070C0" strokeWidth="2" className="flex-shrink-0 mt-0.5">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
                    </svg>
                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color: '#94a3b8' }}>University</p>
                      <p className="text-sm" style={{ color: '#374151' }}>{member.school}</p>
                    </div>
                  </div>
                </div>

                <div style={{ height: 1, background: '#f1f5f9' }} />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#94a3b8' }}>About</p>
                  <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>{member.bio}</p>
                </div>

                <button
                  onClick={onClose}
                  className="w-full py-3 rounded-xl font-bold text-sm transition-opacity hover:opacity-85"
                  style={{ background: member.accent, color: 'white' }}
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// stacked avatars shown before the radial expands

function CollapsedAvatarRow({ members, onExpand }) {
  return (
    <motion.div
      className="flex flex-col items-center gap-3 mt-10"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.35 }}
    >
      <button onClick={onExpand} className="flex items-center focus:outline-none" style={{ gap: 0 }} title="Expand team view">
        {members.map((member, i) => (
          <motion.div
            key={member.position}
            className="rounded-full overflow-hidden flex-shrink-0"
            style={{ width: 48, height: 48, marginLeft: i === 0 ? 0 : '-14px', zIndex: members.length - i, border: '2px solid rgba(255,255,255,0.5)', position: 'relative' }}
            whileHover={{ scale: 1.12, zIndex: 30, y: -3 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <img src={avatarSrc(member)} alt={member.name} draggable={false} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </motion.div>
        ))}
        <motion.div
          className="rounded-full flex items-center justify-center flex-shrink-0"
          style={{ width: 48, height: 48, marginLeft: '-14px', zIndex: 0, background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.35)' }}
          whileHover={{ scale: 1.1, y: -3 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <circle cx="12" cy="12" r="3" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>
        </motion.div>
      </button>
      <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>Click to explore the team</p>
    </motion.div>
  );
}



// quick stats bar between hero and team grid

const stats = [
  { value: '10', label: 'Chapter Leaders' },
  { value: '8', label: 'Universities' },
  { value: '5+', label: 'Companies' },
  { value: '1', label: 'Mission' },
];

function StatsStrip() {
  return (
    <div
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(90deg, #001F5B 0%, #0070C0 50%, #001F5B 100%)' }}
    >
      {/* dot grid so it's not just a flat color block */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />
      <div className="relative max-w-4xl mx-auto px-6 py-10 grid grid-cols-2 gap-6" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="text-center"
          >
            <p className="font-black text-white" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: 1 }}>{s.value}</p>
            <p className="text-xs uppercase tracking-widest mt-1 font-semibold" style={{ color: 'rgba(255,255,255,0.55)' }}>{s.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}


export default function ExecutiveBoard() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [expanded, setExpanded] = useState(false);

  return (
    <main style={{ paddingTop: '60px', background: '#f8fafc', minHeight: '100vh' }}>
      <ProfileModal member={selectedMember} onClose={() => setSelectedMember(null)} />

      <section
        className="relative overflow-hidden text-center"
        style={{ background: 'linear-gradient(135deg, #001F5B 0%, #0a1a3a 100%)', paddingBottom: 72 }}
      >
        <div className="absolute rounded-full pointer-events-none" style={{ width: 500, height: 500, background: '#0070C0', top: '-160px', right: '-160px', filter: 'blur(100px)', opacity: 0.12 }} />
        <div className="absolute rounded-full pointer-events-none" style={{ width: 360, height: 360, background: '#FD652F', bottom: '-80px', left: '-80px', filter: 'blur(80px)', opacity: 0.10 }} />
        <div className="absolute rounded-full pointer-events-none" style={{ width: 200, height: 200, background: '#72A9BE', top: '40%', left: '15%', filter: 'blur(60px)', opacity: 0.08 }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-3xl mx-auto px-6 pt-20"
        >
          <span
            className="inline-block text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-6"
            style={{ background: 'rgba(253,101,47,0.18)', color: '#FD652F', border: '1px solid rgba(253,101,47,0.3)' }}
          >
            2024 – 2025
          </span>

          <h1 className="font-black text-white" style={{ fontSize: 'clamp(2.4rem, 6vw, 4rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
            Executive Board
          </h1>

          <p className="mt-4 text-base leading-relaxed max-w-xl mx-auto" style={{ color: '#93b4cc' }}>
            The dedicated leaders driving SHPE Austin's mission forward — empowering Hispanic engineers and building a thriving professional community in Texas.
          </p>

          <AnimatePresence mode="wait">
            {expanded ? (
              <motion.div
                key="radial"
                className="flex justify-center mt-10"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.35 }}
              >
                <RadialIntro
                  stageSize={340}
                  imageSize={58}
                  onCollapse={() => setExpanded(false)}
                  orbitItems={board.map((member, i) => ({
                    id: i,
                    name: member.name,
                    src: avatarSrc(member),
                    onClick: () => setSelectedMember(member),
                  }))}
                />
              </motion.div>
            ) : (
              <CollapsedAvatarRow key="collapsed" members={board} onExpand={() => setExpanded(true)} />
            )}
          </AnimatePresence>

          {!expanded && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-3 text-xs"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              Click any avatar to view their profile
            </motion.p>
          )}
        </motion.div>
      </section>

      <StatsStrip />

      <section style={{ background: 'white' }} className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#0070C0', letterSpacing: '0.12em' }}>The People</p>
            <h2 className="font-black text-3xl" style={{ color: '#0f172a', letterSpacing: '-0.02em' }}>Meet the Team</h2>
            <p className="text-sm mt-2" style={{ color: '#64748b' }}>Every role matters. Every person drives the mission.</p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-x-10 gap-y-10">
            {board.map((member, i) => (
              <MemberCard key={member.position} member={member} index={i} onSelect={setSelectedMember} />
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="rounded-3xl px-10 py-14 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #001F5B 0%, #0a1a3a 100%)' }}
          >
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full pointer-events-none" style={{ background: '#0070C0', filter: 'blur(60px)', opacity: 0.2 }} />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full pointer-events-none" style={{ background: '#FD652F', filter: 'blur(50px)', opacity: 0.15 }} />
            <p className="relative z-10 text-xs font-black uppercase tracking-widest mb-4" style={{ color: '#FD652F' }}>Get Involved</p>
            <h3 className="relative z-10 font-black text-white mb-3" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', letterSpacing: '-0.02em' }}>
              Ready to join us?
            </h3>
            <p className="relative z-10 text-sm leading-relaxed mb-8" style={{ color: '#93b4cc' }}>
              Become a member of SHPE Austin and connect with engineers, professionals, and leaders who share your drive.
            </p>
            <a
              href="/membership"
              className="relative z-10 inline-block font-black text-sm px-8 py-3.5 rounded-full transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(90deg,#D33A02,#FD652F)', color: 'white' }}
            >
              Become a Member →
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
