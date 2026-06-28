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

// ── Grid card: photo top, info bottom ───────────────────────────────────────

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
      className="relative overflow-hidden rounded-2xl focus:outline-none group text-left w-full flex flex-col"
      style={{ background: '#0f1424', border: '1px solid rgba(255,255,255,0.07)' }}
      whileHover="hover"
    >
      {/* photo area — fixed height so all cards align */}
      <div className="relative overflow-hidden flex-shrink-0" style={{ height: 220, background: '#080d1a' }}>
        {member.photo ? (
          <motion.img
            src={member.photo}
            alt={member.name}
            className="absolute inset-0 w-full h-full"
            style={{ objectFit: 'contain', objectPosition: member.photoPosition ?? 'center top' }}
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

        {/* subtle bottom fade into the card body */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{ height: 48, background: 'linear-gradient(to top, #0f1424, transparent)' }}
        />

        {/* accent top bar */}
        <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: member.accent }} />
      </div>

      {/* info area */}
      <div className="flex flex-col gap-1 px-5 py-4 flex-1">
        <p
          className="text-xs font-black uppercase tracking-widest"
          style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' }}
        >
          {member.position}
        </p>
        <p className="font-black text-white leading-tight" style={{ fontSize: '1rem' }}>
          {member.name}
        </p>
        <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>
          {member.profession} · {member.company}
        </p>

        {/* hover CTA */}
        <motion.div
          className="flex items-center gap-1.5 mt-3"
          variants={{ hover: { opacity: 1, x: 0 } }}
          initial={{ opacity: 0, x: -6 }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-xs font-bold" style={{ color: member.accent }}>View Profile</span>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={member.accent} strokeWidth="2.5" strokeLinecap="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.div>
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
            <div className="rounded-3xl overflow-hidden flex flex-col" style={{ background: '#0a0f1e', border: '1px solid rgba(255,255,255,0.08)' }}>

              {/* photo hero */}
              <div className="relative flex-shrink-0" style={{ height: 260 }}>
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full"
                    style={{ objectFit: 'contain', objectPosition: member.photoPosition ?? 'center top', background: '#080d1a' }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center" style={{ background: member.gradient }}>
                    <span className="font-black text-white" style={{ fontSize: 96, opacity: 0.2 }}>{initials(member.name)}</span>
                  </div>
                )}

                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0a0f1e 0%, rgba(10,15,30,0.4) 60%, transparent 100%)' }} />
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

                <div className="absolute bottom-0 left-0 px-7 pb-6">
                  <span
                    className="text-xs font-black uppercase tracking-widest px-2.5 py-1 rounded-md mb-3 inline-block"
                    style={{ background: member.accent + '33', color: member.accent, border: `1px solid ${member.accent}55` }}
                  >
                    {member.position}
                  </span>
                  <h2 className="font-black text-white" style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                    {member.name}
                  </h2>
                  <p className="text-sm mt-1 font-medium" style={{ color: 'rgba(255,255,255,0.55)' }}>{member.profession}</p>
                </div>
              </div>

              {/* details */}
              <div className="px-7 py-6 flex flex-col gap-4 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 260px)' }}>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl px-4 py-3" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'rgba(255,255,255,0.3)' }}>Company</p>
                    <p className="text-sm font-semibold text-white">{member.company}</p>
                  </div>
                  <div className="rounded-xl px-4 py-3" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: 'rgba(255,255,255,0.3)' }}>University</p>
                    <p className="text-sm font-semibold text-white">{member.school}</p>
                  </div>
                </div>

                {(member.funFact || member.whyShpe) && (
                  <div className="flex flex-col gap-3">
                    {member.funFact && (
                      <div className="rounded-xl px-4 py-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                        <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.3)' }}>Fun Fact</p>
                        <p className="text-sm leading-relaxed italic" style={{ color: 'rgba(255,255,255,0.75)' }}>"{member.funFact}"</p>
                      </div>
                    )}
                    {member.whyShpe && (
                      <div className="rounded-xl px-4 py-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                        <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'rgba(255,255,255,0.3)' }}>Why SHPE Austin?</p>
                        <p className="text-sm leading-relaxed italic" style={{ color: 'rgba(255,255,255,0.75)' }}>"{member.whyShpe}"</p>
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
