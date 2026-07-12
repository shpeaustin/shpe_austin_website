import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

export type Member = {
  name: string;
  position: string;
  profession: string;
  company: string;
  school: string;
  funFact: string | null;
  whyShpe: string | null;
  photo: string | null;
  photoPosition?: string;
  accent: string;
  gradient: string;
};

function initials(name: string) {
  return name.split(' ').map((w) => w[0]).join('');
}

// ── Grid card ────────────────────────────────────────────────────────────────
// Photo: 220px cover, face centered. Info tab: fixed 118px so all cards align.

interface CardProps {
  member: Member;
  index: number;
  onSelect: (member: Member) => void;
}

export function MemberCard({ member, index, onSelect }: CardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onSelect(member)}
      className="relative overflow-hidden rounded-2xl focus:outline-none group text-left w-full"
      style={{
        background: '#ffffff',
        border: '1px solid #e5e7eb',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        // Fixed total height = photo(220) + info(148) so every card is identical
        height: 368,
        display: 'flex',
        flexDirection: 'column',
      }}
      whileHover="hover"
    >
      {/* photo — cover fill, face kept in view via objectPosition */}
      <div className="relative overflow-hidden flex-shrink-0" style={{ height: 220 }}>
        {member.photo ? (
          <motion.img
            src={member.photo}
            alt={member.name}
            className="absolute inset-0 w-full h-full"
            style={{ objectFit: 'cover', objectPosition: member.photoPosition ?? 'center top' }}
            variants={{ hover: { scale: 1.05 } }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            draggable={false}
          />
        ) : (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: member.gradient }}
            variants={{ hover: { scale: 1.04 } }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="font-black text-white select-none" style={{ fontSize: 72, opacity: 0.2 }}>
              {initials(member.name)}
            </span>
          </motion.div>
        )}

        {/* fade into white tab */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{ height: 52, background: 'linear-gradient(to top, #ffffff, transparent)' }}
        />
        <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: member.accent }} />
      </div>

      {/* white info tab — fixed height so all cards align perfectly */}
      <div
        style={{
          position: 'relative',
          height: 148,
          flexShrink: 0,
          background: '#ffffff',
          padding: '12px 20px 12px 20px',
          overflow: 'hidden',
        }}
      >
        {/* position — single line */}
        <p
          style={{
            fontSize: '0.65rem',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: member.accent,
            marginBottom: 3,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {member.position}
        </p>

        {/* name — single line */}
        <p
          style={{
            fontSize: '0.97rem',
            fontWeight: 900,
            color: '#0f172a',
            lineHeight: 1.25,
            marginBottom: 4,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {member.name}
        </p>

        {/* profession — up to 2 lines so long titles show fully */}
        <p
          style={{
            fontSize: '0.72rem',
            color: '#374151',
            lineHeight: 1.4,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            marginBottom: 2,
          } as React.CSSProperties}
        >
          {member.profession}
        </p>

        {/* company — single line */}
        <p
          style={{
            fontSize: '0.7rem',
            color: '#6b7280',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {member.company}
        </p>

        {/* hover CTA */}
        <motion.div
          style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}
          variants={{ hover: { opacity: 1, x: 0 } }}
          initial={{ opacity: 0, x: -6 }}
          transition={{ duration: 0.2 }}
        >
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: member.accent }}>View Profile</span>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={member.accent} strokeWidth="2.5" strokeLinecap="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.div>

        {/* SHPE Austin logo — bottom-right, original colors on white, enlarged */}
        <img
          src={require('../assets/logos/SHPE_austin_horiz_logo.png')}
          alt="SHPE Austin"
          style={{
            position: 'absolute',
            bottom: 10,
            right: 12,
            width: 88,
            opacity: 0.85,
            pointerEvents: 'none',
          }}
          draggable={false}
        />
      </div>
    </motion.button>
  );
}

// ── Expanded profile overlay ─────────────────────────────────────────────────

interface ExpandedProps {
  member: Member | null;
  onClose: () => void;
}

export function ExpandedProfile({ member, onClose }: ExpandedProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {member && (
        <>
          <motion.div
            className="fixed inset-0 z-50"
            style={{ background: 'rgba(0,5,20,0.75)', backdropFilter: 'blur(8px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed z-50 left-1/2 top-1/2"
            style={{ width: 'min(680px, 95vw)', maxHeight: '90vh', overflow: 'hidden' }}
            initial={{ opacity: 0, scale: 0.92, x: '-50%', y: '-46%' }}
            animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
            exit={{ opacity: 0, scale: 0.92, x: '-50%', y: '-46%' }}
            transition={{ type: 'spring', stiffness: 340, damping: 30 }}
          >
            <div className="rounded-3xl overflow-hidden flex flex-col" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>

              {/* photo — contain so the full photo shows, dark letterbox background */}
              <div
                className="relative flex-shrink-0"
                style={{ height: 300, background: '#080d1a' }}
              >
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full"
                    style={{
                      objectFit: 'contain',
                      objectPosition: member.photoPosition ?? 'center top',
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center" style={{ background: member.gradient }}>
                    <span className="font-black text-white" style={{ fontSize: 96, opacity: 0.2 }}>{initials(member.name)}</span>
                  </div>
                )}

                {/* bottom fade into white strip */}
                <div
                  className="absolute bottom-0 left-0 right-0 pointer-events-none"
                  style={{ height: 60, background: 'linear-gradient(to top, #ffffff, transparent)' }}
                />
                <div className="absolute top-0 left-0 right-0 h-1" style={{ background: member.accent }} />

                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 flex items-center justify-center rounded-full focus:outline-none"
                  style={{ width: 36, height: 36, background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(6px)', color: 'white' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* white name / position strip — below photo, never on the face */}
              <div
                className="flex items-center justify-between gap-4 bg-white"
                style={{ padding: '18px 28px 16px' }}
              >
                <div style={{ minWidth: 0 }}>
                  <span
                    style={{
                      display: 'inline-block',
                      fontSize: '0.65rem',
                      fontWeight: 900,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      padding: '3px 10px',
                      borderRadius: 6,
                      marginBottom: 8,
                      background: member.accent + '22',
                      color: member.accent,
                      border: `1px solid ${member.accent}44`,
                    }}
                  >
                    {member.position}
                  </span>
                  <h2
                    style={{
                      fontWeight: 900,
                      fontSize: 'clamp(1.3rem, 3.5vw, 1.75rem)',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.1,
                      color: '#0f172a',
                      marginBottom: 4,
                    }}
                  >
                    {member.name}
                  </h2>
                  <p style={{ fontSize: '0.85rem', fontWeight: 500, color: '#6b7280' }}>
                    {member.profession}
                  </p>
                </div>

                {/* SHPE logo — original colors on white background */}
                <img
                  src={require('../assets/logos/SHPE_austin_horiz_logo.png')}
                  alt="SHPE Austin"
                  style={{ width: 180, flexShrink: 0, opacity: 0.9 }}
                  draggable={false}
                />
              </div>

              {/* dark details */}
              <div
                className="flex flex-col gap-4 overflow-y-auto"
                style={{
                  background: '#0a0f1e',
                  padding: '20px 28px 24px',
                  maxHeight: 'calc(90vh - 300px - 96px)',
                }}
              >
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl px-4 py-3" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)' }}>
                    <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>Company</p>
                    <p className="text-sm font-semibold text-white">{member.company}</p>
                  </div>
                  <div className="rounded-xl px-4 py-3" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)' }}>
                    <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>University</p>
                    <p className="text-sm font-semibold text-white">{member.school}</p>
                  </div>
                </div>

                {(member.funFact || member.whyShpe) && (
                  <div className="flex flex-col gap-3">
                    {member.funFact && (
                      <div className="rounded-xl px-4 py-4" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)' }}>
                        <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>Fun Fact</p>
                        <p className="text-sm leading-relaxed italic" style={{ color: 'rgba(255,255,255,0.8)' }}>"{member.funFact}"</p>
                      </div>
                    )}
                    {member.whyShpe && (
                      <div className="rounded-xl px-4 py-4" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)' }}>
                        <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>Why SHPE Austin?</p>
                        <p className="text-sm leading-relaxed italic" style={{ color: 'rgba(255,255,255,0.8)' }}>"{member.whyShpe}"</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
