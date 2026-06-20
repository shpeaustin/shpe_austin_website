import { motion } from 'framer-motion';

export type Member = {
  name: string;
  position: string;
  profession: string;
  company: string;
  school: string;
  bio: string;
  photo: string | null;
  accent: string;
  gradient: string;
};

interface Props {
  member: Member;
  index: number;
  onSelect: (member: Member) => void;
}

function initials(name: string) {
  return name.split(' ').map((w) => w[0]).join('');
}

export function MemberCard({ member, index, onSelect }: Props) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      onClick={() => onSelect(member)}
      className="flex flex-col items-center gap-3 focus:outline-none group"
    >
      {/* circle avatar */}
      <div
        className="rounded-full overflow-hidden flex items-center justify-center shadow-md transition-shadow duration-300 group-hover:shadow-xl"
        style={{
          width: 96,
          height: 96,
          background: member.photo ? 'white' : member.gradient,
          border: '3px solid white',
          outline: `2px solid ${member.accent}30`,
        }}
      >
        {member.photo ? (
          <img
            src={member.photo}
            alt={member.name}
            className="w-full h-full object-cover"
            draggable={false}
          />
        ) : (
          <span className="font-black text-white text-2xl">
            {initials(member.name)}
          </span>
        )}
      </div>

      {/* name + position */}
      <div className="text-center">
        <p className="text-sm font-bold leading-tight" style={{ color: '#0f172a' }}>
          {member.name}
        </p>
        <p className="text-xs mt-0.5" style={{ color: member.accent }}>
          {member.position}
        </p>
      </div>
    </motion.button>
  );
}
