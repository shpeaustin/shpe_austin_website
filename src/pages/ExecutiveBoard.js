import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar } from '../components/base/avatar/avatar';
import { RadialIntro } from '../components/animate-ui/radial-intro';

const board = [
  {
    name: 'Susana Samayoa',
    position: 'President',
    profession: 'Software Engineer',
    company: 'Company Name',
    school: 'University of Texas at Austin',
    bio: 'Leads the chapter with a passion for empowering Hispanic engineers. Dedicated to growing SHPE Austin and building a strong community bridge between students and industry.',
    photo: null,
    accent: '#001F5B',
    gradient: 'linear-gradient(135deg, #001F5B 0%, #0a2a5e 100%)',
  },
  {
    name: 'Jonathan Franco',
    position: 'Vice President',
    profession: 'Electrical Engineer',
    company: 'Company Name',
    school: 'Texas A&M University',
    bio: 'Supports chapter operations and drives strategic initiatives. Passionate about connecting members with opportunities in STEM and fostering professional growth.',
    photo: null,
    accent: '#0070C0',
    gradient: 'linear-gradient(135deg, #0070C0 0%, #005a9e 100%)',
  },
  {
    name: 'Eugenia Rodriguez',
    position: 'Treasurer',
    profession: 'Finance & Computer Science',
    company: 'Company Name',
    school: 'UT San Antonio',
    bio: 'Manages chapter finances and ensures fiscal transparency. Dedicated to allocating resources where they make the greatest impact for our members.',
    photo: null,
    accent: '#D33A02',
    gradient: 'linear-gradient(135deg, #D33A02 0%, #a82d01 100%)',
  },
  {
    name: 'Marvin Andara',
    position: 'Secretary',
    profession: 'Mechanical Engineer',
    company: 'Company Name',
    school: 'University of Texas at Austin',
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
    bio: 'Manages the chapter\'s brand, social media, and outreach campaigns. Tells the SHPE Austin story to the world with creativity and purpose.',
    photo: null,
    accent: '#D33A02',
    gradient: 'linear-gradient(135deg, #D33A02 0%, #a82d01 100%)',
  },
  {
    name: 'Noe Melchor',
    position: 'Outreach Director',
    profession: 'Civil Engineer',
    company: 'Company Name',
    school: 'UT El Paso',
    bio: 'Leads K–12 outreach programs to inspire the next generation of Hispanic engineers. Believes that representation starts early.',
    photo: null,
    accent: '#FD652F',
    gradient: 'linear-gradient(135deg, #FD652F 0%, #d44e20 100%)',
  },
  {
    name: 'Luigi Medrano',
    position: 'Professional Development Director',
    profession: 'Software Engineer/Data Scientist',
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
    profession: 'Senior Engineering Leader',
    company: 'Company Name',
    school: 'University of Texas at Austin',
    bio: 'Provides mentorship, guidance, and institutional knowledge to the chapter. A champion of SHPE\'s mission with decades of experience in the field.',
    photo: null,
    accent: '#72A9BE',
    gradient: 'linear-gradient(135deg, #72A9BE 0%, #4e8aa0 100%)',
  },
];

const initials = (name) =>
  name
    .split(' ')
    .map((w) => w[0])
    .join('');

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

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
          {/* backdrop */}
          <motion.div
            className="fixed inset-0 z-50"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* card */}
          <motion.div
            className="fixed z-50 left-1/2 top-1/2"
            style={{ width: 'min(420px, 92vw)' }}
            initial={{ opacity: 0, scale: 0.85, x: '-50%', y: '-50%' }}
            animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
            exit={{ opacity: 0, scale: 0.85, x: '-50%', y: '-50%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          >
            {/* colored header */}
            <div className="relative rounded-t-2xl overflow-hidden pt-10 pb-8 flex flex-col items-center gap-3" style={{ background: member.gradient }}>
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10" style={{ background: 'white', transform: 'translate(30%, -30%)' }} />
              <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full opacity-10" style={{ background: 'white', transform: 'translate(-30%, 40%)' }} />

              <Avatar
                size="2xl"
                src={member.photo}
                initials={initials(member.name)}
                border
                className="ring-4 ring-white/40 shadow-2xl"
              />

              <div className="text-center relative z-10 px-6">
                <span className="inline-block text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
                  {member.position}
                </span>
                <h2 className="text-2xl font-black text-white">{member.name}</h2>
                <p className="text-sm text-white opacity-80 mt-0.5">{member.profession}</p>
              </div>
            </div>

            {/* body */}
            <div className="bg-white rounded-b-2xl px-7 py-6 flex flex-col gap-4">
              <div className="flex items-center gap-3 pb-4" style={{ borderBottom: '1px solid #f0f0f0' }}>
                <div className="flex items-center gap-2 flex-1">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0070C0" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                  <span className="text-sm font-semibold" style={{ color: '#001F5B' }}>{member.company}</span>
                </div>
                <div className="flex items-center gap-2 flex-1">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0070C0" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                  <span className="text-sm" style={{ color: '#6b7280' }}>{member.school}</span>
                </div>
              </div>

              <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>{member.bio}</p>

              <button
                onClick={onClose}
                className="mt-2 w-full py-2.5 rounded-xl font-bold text-sm transition-opacity hover:opacity-80"
                style={{ background: member.accent, color: 'white' }}
              >
                Close
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function avatarSrc(member) {
  if (member.photo) return member.photo;
  const ini = initials(member.name);
  const color = member.accent.replace('#', '%23');
  return `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60'><circle cx='30' cy='30' r='30' fill='${color}'/><text x='50%25' y='50%25' dominant-baseline='central' text-anchor='middle' font-family='sans-serif' font-weight='900' font-size='20' fill='white'>${ini}</text></svg>`;
}

function BoardCard({ member, index }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      className="relative cursor-pointer"
      style={{ perspective: '1000px', height: '380px' }}
      onClick={() => setFlipped((f) => !f)}
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* inner wrapper */}
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s cubic-bezier(0.4,0.2,0.2,1)',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* ── FRONT ── */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden flex flex-col"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          {/* top colored band */}
          <div className="relative flex items-center justify-center pt-10 pb-6" style={{ background: member.gradient }}>
            {/* decorative circle */}
            <div
              className="absolute top-3 right-3 rounded-full opacity-20"
              style={{ width: 80, height: 80, background: 'rgba(255,255,255,0.3)' }}
            />
            <div
              className="absolute bottom-0 left-0 rounded-full opacity-10"
              style={{ width: 120, height: 120, background: 'rgba(255,255,255,0.3)', transform: 'translate(-30%, 40%)' }}
            />

            {/* photo / initials */}
            <div
              className="relative rounded-full flex items-center justify-center overflow-hidden shadow-xl"
              style={{ width: 100, height: 100, border: '4px solid rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.15)' }}
            >
              {member.photo ? (
                <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
              ) : (
                <span className="font-black text-white" style={{ fontSize: '2rem' }}>{initials(member.name)}</span>
              )}
            </div>
          </div>

          {/* bottom info */}
          <div className="flex-1 flex flex-col items-center justify-center px-5 py-5 bg-white text-center gap-1">
            <span
              className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-1"
              style={{ background: member.accent + '18', color: member.accent }}
            >
              {member.position}
            </span>
            <h3 className="text-xl font-black" style={{ color: '#001F5B' }}>{member.name}</h3>
            <p className="text-sm font-semibold" style={{ color: '#0070C0' }}>{member.profession}</p>
            <div className="flex items-center gap-1 mt-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <p className="text-xs" style={{ color: '#6b7280' }}>{member.company}</p>
            </div>

            <div className="mt-4 flex items-center gap-1 text-xs font-semibold" style={{ color: member.accent }}>
              <span>Tap for bio</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          className="absolute inset-0 rounded-2xl flex flex-col justify-center px-7 py-8"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: member.gradient,
          }}
        >
          <div
            className="absolute top-3 right-3 rounded-full opacity-10"
            style={{ width: 100, height: 100, background: 'white' }}
          />
          <div
            className="absolute bottom-3 left-3 rounded-full opacity-10"
            style={{ width: 140, height: 140, background: 'white', transform: 'translate(-30%, 30%)' }}
          />

          <span className="text-xs font-black uppercase tracking-widest text-white opacity-70 mb-2">{member.position}</span>
          <h3 className="text-2xl font-black text-white mb-3" style={{ lineHeight: 1.2 }}>{member.name}</h3>

          <div className="flex items-center gap-2 mb-4">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
            <span className="text-xs text-white opacity-70">{member.school}</span>
          </div>

          <p className="text-sm leading-relaxed text-white opacity-90">{member.bio}</p>

          <div className="mt-6 flex items-center gap-2">
            <div className="h-px flex-1 bg-white opacity-30" />
            <span className="text-xs text-white opacity-60">Tap to flip back</span>
            <div className="h-px flex-1 bg-white opacity-30" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CollapsedAvatarRow({ members, onExpand }) {
  return (
    <motion.div
      className="flex flex-col items-center gap-3 mt-10"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.35 }}
    >
      <button
        onClick={onExpand}
        className="flex items-center focus:outline-none group"
        style={{ gap: 0 }}
        title="Expand team view"
      >
        {members.map((member, i) => (
          <motion.div
            key={member.position}
            className="rounded-full overflow-hidden flex-shrink-0"
            style={{
              width: 48,
              height: 48,
              marginLeft: i === 0 ? 0 : '-14px',
              zIndex: members.length - i,
              border: '2px solid rgba(255,255,255,0.5)',
              position: 'relative',
            }}
            whileHover={{ scale: 1.12, zIndex: 30, y: -3 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <img
              src={avatarSrc(member)}
              alt={member.name}
              draggable={false}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </motion.div>
        ))}
        <motion.div
          className="rounded-full flex items-center justify-center flex-shrink-0 font-bold text-white text-xs"
          style={{
            width: 48,
            height: 48,
            marginLeft: '-14px',
            zIndex: 0,
            background: 'rgba(255,255,255,0.15)',
            border: '2px solid rgba(255,255,255,0.35)',
          }}
          whileHover={{ scale: 1.1, y: -3 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>
        </motion.div>
      </button>
      <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
        Click to expand team view
      </p>
    </motion.div>
  );
}

export default function ExecutiveBoard() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [expanded, setExpanded] = useState(false);

  return (
    <main style={{ paddingTop: '60px', background: '#f8fafc', minHeight: '100vh' }}>
      <ProfileModal member={selectedMember} onClose={() => setSelectedMember(null)} />

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden py-20 px-6 text-center"
        style={{ background: 'linear-gradient(135deg, #001F5B 0%, #0a1a3a 100%)' }}
      >
        {/* decorative blobs */}
        <div
          className="absolute rounded-full opacity-10 pointer-events-none"
          style={{ width: 400, height: 400, background: '#0070C0', top: '-100px', right: '-100px', filter: 'blur(80px)' }}
        />
        <div
          className="absolute rounded-full opacity-10 pointer-events-none"
          style={{ width: 300, height: 300, background: '#FD652F', bottom: '-60px', left: '-60px', filter: 'blur(60px)' }}
        />

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
            Meet the Team
          </span>
          <h1 className="font-black text-white mb-4" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', lineHeight: 1.1 }}>
            Executive Board
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: '#c8d8e8' }}>
            The dedicated leaders driving SHPE Austin's mission forward — empowering Hispanic engineers and building a thriving community in the heart of Texas.
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
              <CollapsedAvatarRow
                key="collapsed"
                members={board}
                onExpand={() => setExpanded(true)}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ── CARDS GRID ── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <motion.div
          className="grid gap-8"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {board.map((member, i) => (
            <BoardCard key={member.position} member={member} index={i} />
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center text-sm mt-12"
          style={{ color: '#9ca3af' }}
        >
          Tap any card to learn more about each board member.
        </motion.p>
      </section>
    </main>
  );
}
