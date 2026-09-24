import { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Lightbulb, ArrowDown } from 'lucide-react';

// shared building blocks for the guide slides — keeps the slide data readable
// instead of a few hundred lines of inline styles per page

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] } },
};

/** the "here's the one thing to remember" box */
export function Callout({ accent = '#0070C0', label = 'Key takeaway', children }) {
  return (
    <motion.div
      variants={item}
      style={{
        display: 'flex', gap: 14, alignItems: 'flex-start',
        padding: '18px 20px', borderRadius: 16,
        background: `${accent}0d`, border: `1px solid ${accent}2e`,
        borderLeft: `4px solid ${accent}`,
      }}
    >
      <div style={{
        flexShrink: 0, width: 32, height: 32, borderRadius: 10,
        background: `${accent}1f`, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Lightbulb size={16} color={accent} strokeWidth={2.2} />
      </div>
      <div>
        <p style={{
          margin: '0 0 4px', fontSize: '0.68rem', fontWeight: 900,
          letterSpacing: '0.1em', textTransform: 'uppercase', color: accent,
        }}>
          {label}
        </p>
        <p style={{ margin: 0, fontSize: '0.92rem', lineHeight: 1.6, color: '#334155', fontWeight: 500 }}>
          {children}
        </p>
      </div>
    </motion.div>
  );
}

/** checkmark bullet list — the workhorse of most slides */
export function TipList({ items: tips, accent = '#0070C0' }) {
  return (
    <motion.ul
      variants={stagger}
      style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}
    >
      {tips.map((tip, i) => (
        <motion.li key={i} variants={item} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <span style={{
            flexShrink: 0, marginTop: 2, width: 20, height: 20, borderRadius: '50%',
            background: `${accent}18`, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Check size={12} color={accent} strokeWidth={3} />
          </span>
          <span style={{ fontSize: '0.94rem', lineHeight: 1.62, color: '#334155' }}>
            {tip}
          </span>
        </motion.li>
      ))}
    </motion.ul>
  );
}

/** two-column do / don't cards */
export function DoDont({ dos = [], donts = [], doLabel = 'Do this', dontLabel = 'Not this' }) {
  const columns = [
    { label: doLabel, entries: dos, color: '#15803d', bg: '#f0fdf4', border: '#bbf7d0', Icon: Check },
    { label: dontLabel, entries: donts, color: '#b91c1c', bg: '#fef2f2', border: '#fecaca', Icon: X },
  ];

  return (
    <motion.div
      variants={stagger}
      style={{ display: 'grid', gap: 14, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}
    >
      {columns.map(({ label, entries, color, bg, border, Icon }) => (
        <motion.div
          key={label}
          variants={item}
          style={{ padding: '18px 20px', borderRadius: 16, background: bg, border: `1px solid ${border}` }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <Icon size={15} color={color} strokeWidth={3} />
            <span style={{
              fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.09em',
              textTransform: 'uppercase', color,
            }}>
              {label}
            </span>
          </div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {entries.map((entry, i) => (
              <li key={i} style={{ fontSize: '0.88rem', lineHeight: 1.55, color: '#334155' }}>
                {entry}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </motion.div>
  );
}

/** weak version on top, strong version underneath — used for bullets and full STAR answers */
export function BeforeAfter({ pairs = [], beforeLabel = 'Before', afterLabel = 'After' }) {
  return (
    <motion.div
      variants={stagger}
      style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
    >
      {pairs.map((pair, i) => (
        <motion.div key={i} variants={item} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          <div style={{
            padding: '14px 18px', borderRadius: '14px 14px 4px 4px',
            background: '#fef2f2', border: '1px solid #fecaca',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 6 }}>
              <X size={12} color="#b91c1c" strokeWidth={3} />
              <span style={{
                fontSize: '0.64rem', fontWeight: 900, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: '#b91c1c',
              }}>
                {beforeLabel}
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '0.88rem', lineHeight: 1.55, color: '#7f1d1d' }}>
              {pair.before}
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', margin: '-9px 0', position: 'relative', zIndex: 1 }}>
            <div style={{
              width: 26, height: 26, borderRadius: '50%', background: 'white',
              border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
            }}>
              <ArrowDown size={13} color="#94a3b8" strokeWidth={2.5} />
            </div>
          </div>

          <div style={{
            padding: '14px 18px', borderRadius: '4px 4px 14px 14px',
            background: '#f0fdf4', border: '1px solid #bbf7d0',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 6 }}>
              <Check size={12} color="#15803d" strokeWidth={3} />
              <span style={{
                fontSize: '0.64rem', fontWeight: 900, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: '#15803d',
              }}>
                {afterLabel}
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '0.88rem', lineHeight: 1.55, color: '#14532d', fontWeight: 500 }}>
              {pair.after}
            </p>
            {pair.why && (
              <p style={{ margin: '8px 0 0', fontSize: '0.78rem', lineHeight: 1.5, color: '#4d7c5a', fontStyle: 'italic' }}>
                {pair.why}
              </p>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

/** pill tags, optionally grouped under a heading */
export function Chips({ groups = [], accent = '#0070C0' }) {
  return (
    <motion.div variants={stagger} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {groups.map((group) => (
        <motion.div key={group.label} variants={item}>
          <p style={{
            margin: '0 0 8px', fontSize: '0.68rem', fontWeight: 900,
            letterSpacing: '0.09em', textTransform: 'uppercase', color: '#94a3b8',
          }}>
            {group.label}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {group.tags.map((tag) => (
              <span key={tag} style={{
                padding: '5px 12px', borderRadius: 999, fontSize: '0.8rem', fontWeight: 600,
                background: `${accent}0f`, color: accent, border: `1px solid ${accent}26`,
              }}>
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

const STAR_STEPS = [
  { letter: 'S', name: 'Situation', weight: 1, blurb: 'One or two sentences of context. Where were you, what was going on?' },
  { letter: 'T', name: 'Task', weight: 1, blurb: 'What were you specifically responsible for? Not the team — you.' },
  { letter: 'A', name: 'Action', weight: 2.6, blurb: 'What you actually did, step by step. This is most of your answer — spend the time here.' },
  { letter: 'R', name: 'Result', weight: 1.2, blurb: 'How it turned out, with a number if you have one, plus what you took away from it.' },
];

/** S -> T -> A -> R strip, with Action visually weighted so it's obvious where the time goes */
export function StarDiagram({ accent = '#0070C0' }) {
  return (
    <motion.div variants={stagger} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <motion.div variants={item} style={{ display: 'flex', gap: 6, height: 8 }}>
        {STAR_STEPS.map((step, i) => (
          <div
            key={step.letter}
            style={{
              flex: step.weight, borderRadius: 999,
              background: i === 2 ? accent : `${accent}33`,
            }}
          />
        ))}
      </motion.div>

      {STAR_STEPS.map((step, i) => (
        <motion.div
          key={step.letter}
          variants={item}
          style={{
            display: 'flex', gap: 14, alignItems: 'flex-start',
            padding: '14px 16px', borderRadius: 14,
            background: i === 2 ? `${accent}0f` : 'white',
            border: `1px solid ${i === 2 ? `${accent}33` : '#e2e8f0'}`,
          }}
        >
          <div style={{
            flexShrink: 0, width: 36, height: 36, borderRadius: 11,
            background: i === 2 ? accent : `${accent}14`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 900, fontSize: '1.05rem',
            color: i === 2 ? 'white' : accent,
          }}>
            {step.letter}
          </div>
          <div>
            <p style={{ margin: '0 0 3px', fontWeight: 900, fontSize: '0.92rem', color: '#0f172a' }}>
              {step.name}
              {i === 2 && (
                <span style={{
                  marginLeft: 8, padding: '2px 8px', borderRadius: 999, fontSize: '0.62rem',
                  fontWeight: 900, letterSpacing: '0.07em', textTransform: 'uppercase',
                  background: `${accent}1f`, color: accent,
                }}>
                  Spend the most time here
                </span>
              )}
            </p>
            <p style={{ margin: 0, fontSize: '0.86rem', lineHeight: 1.55, color: '#64748b' }}>
              {step.blurb}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

/** numbered formula strip — e.g. the resume bullet recipe */
export function Formula({ parts = [], accent = '#D33A02' }) {
  return (
    <motion.div
      variants={stagger}
      style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'stretch' }}
    >
      {parts.map((part, i) => (
        <motion.div
          key={part.label}
          variants={item}
          style={{
            flex: '1 1 150px', padding: '16px 18px', borderRadius: 16,
            background: 'white', border: `1px solid ${accent}26`,
            boxShadow: '0 2px 10px rgba(0,0,0,0.04)', position: 'relative',
          }}
        >
          <span style={{
            fontSize: '1.5rem', fontWeight: 900, lineHeight: 1,
            color: `${accent}24`, letterSpacing: '-0.04em',
          }}>
            {String(i + 1).padStart(2, '0')}
          </span>
          <p style={{ margin: '8px 0 4px', fontWeight: 900, fontSize: '0.88rem', color: accent }}>
            {part.label}
          </p>
          <p style={{ margin: 0, fontSize: '0.82rem', lineHeight: 1.5, color: '#64748b' }}>
            {part.detail}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}

/** hover-tilt card with a cursor-following spotlight (lifted from the Membership step cards) */
export function TiltCard({ accent = '#0070C0', style: styleOverrides, children, ...rest }) {
  const cardRef = useRef(null);
  const spotRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    const spot = spotRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    card.style.transform = `perspective(900px) rotateX(${((y - cy) / cy) * -5}deg) rotateY(${((x - cx) / cx) * 5}deg) scale(1.02)`;
    if (spot) { spot.style.left = `${x}px`; spot.style.top = `${y}px`; spot.style.opacity = '1'; }
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    const spot = spotRef.current;
    if (card) card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
    if (spot) spot.style.opacity = '0';
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative', overflow: 'hidden', borderRadius: 22,
        background: 'white', border: `1px solid ${accent}20`,
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        transition: 'transform 0.15s ease, box-shadow 0.3s ease',
        willChange: 'transform',
        ...styleOverrides,
      }}
      {...rest}
    >
      <div ref={spotRef} style={{
        position: 'absolute', width: 220, height: 220, borderRadius: '50%',
        background: `radial-gradient(circle, ${accent}16 0%, transparent 70%)`,
        transform: 'translate(-50%, -50%)', pointerEvents: 'none',
        opacity: 0, transition: 'opacity 0.2s', zIndex: 0,
      }} />
      <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>
        {children}
      </div>
    </div>
  );
}

export { stagger as slideStagger, item as slideItem };
