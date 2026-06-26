import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { MemberCard, ExpandedProfile } from '../components/MemberCard';

const board = [
  {
    name: 'Susana Samayoa',
    position: 'President',
    profession: 'Senior Systems Engineer',
    company: 'BAE Systems, Inc.',
    school: 'Cornell University | University of Houston',
    funFact: "I'm an avid hiker and a car enthusiast who loves off-roading in my Bronco.",
    whyShpe: 'I am extremely passionate in supporting my fellow STEM Hispanic Familia. I hope to assist all aspiring engineers become strong leaders while also advancing community outreach initiatives.',
    photo: require('../assets/executive_board/susana_samayoa.jpg'),
    accent: '#001F5B',
    gradient: 'linear-gradient(135deg, #001F5B 0%, #0a2a5e 100%)',
  },
  {
    name: 'Jonathan Franco',
    position: 'Vice President',
    profession: 'Senior Sales Engineer',
    company: 'Eaton',
    school: 'University of South Florida',
    funFact: 'During my 2nd year with my company I was selected to complete an international assignment in the Philippines.',
    whyShpe: 'I wanted to find passionate and goal-oriented individuals like myself that I could call mi familia!',
    photo: require('../assets/executive_board/jonathan_franco.jpg'),
    photoPosition: 'center 10%',
    accent: '#0070C0',
    gradient: 'linear-gradient(135deg, #0070C0 0%, #005a9e 100%)',
  },
  {
    name: 'Eugenia Rodriguez',
    position: 'Treasurer',
    profession: 'Project Coordinator/ Field Engineer',
    company: 'SB Energy',
    school: 'University of the Incarnate Word',
    funFact: 'I have a four year old pet Sulcata Tortoise named Conchita, I hope to pass him off as a family heirloom one day.',
    whyShpe: 'I joined SHPE to help strengthen the Hispanic engineering community by creating opportunities for professionals to connect, grow, and give back through networking and community engagement.',
    photo: require('../assets/executive_board/eugenia_rodriguez.jpeg'),
    photoPosition: 'center 50%',
    accent: '#D33A02',
    gradient: 'linear-gradient(135deg, #D33A02 0%, #a82d01 100%)',
  },
  {
    name: 'Marvin Andara',
    position: 'Secretary',
    profession: 'Software Engineer',
    company: 'Metrostar LLC',
    school: 'Florida Atlantic University',
    funFact: 'I aspire to one day have a cute donkey as a pet and name him Waffles.',
    whyShpe: 'I missed out on SHPE when I was in college so I gave the professional chapter a chance. I\'m happy I did because this is a solid group of people.',
    photo: require('../assets/executive_board/marvin_andara.png'),
    accent: '#FD652F',
    gradient: 'linear-gradient(135deg, #FD652F 0%, #d44e20 100%)',
  },
  {
    name: 'Juan Ramirez',
    position: 'Membership Director',
    profession: 'Manufacturing Engineer',
    company: 'Saronic',
    school: 'University of Houston',
    funFact: 'Currently working on getting my pilot license.',
    whyShpe: 'Joined SHPE back in school and wanted to continue being a member even as a professional.',
    photo: require('../assets/executive_board/juan_ramirez.jpeg'),
    photoPosition: 'center 20%',
    accent: '#001F5B',
    gradient: 'linear-gradient(135deg, #001F5B 0%, #0a2a5e 100%)',
  },
  {
    name: 'Anamaria Torres',
    position: 'Partnership Director',
    profession: 'Senior Transportation Engineer',
    company: 'Stantec',
    school: 'Louisiana Tech University, Northwestern University',
    funFact: "If there's music playing, I'm probably dancing to it! I started taking classes when I was 3 and am back at it again.",
    whyShpe: "I joined SHPE Austin for the people! I've gotten to know so many amazing individuals within SHPE and found a community where it is so easy to be myself.",
    photo: require('../assets/executive_board/anamaria_torres.jpg'),
    accent: '#0070C0',
    gradient: 'linear-gradient(135deg, #0070C0 0%, #005a9e 100%)',
  },
  {
    name: 'Patricia Islas-Torres',
    position: 'Marketing Director',
    profession: 'Graduate Engineer',
    company: 'LJA Engineering',
    school: 'San Jose State University',
    funFact: 'I have lived in 4 of the largest cities (by population) in the US!',
    whyShpe: 'Although I am not physically located in Austin anymore, I found myself going back a lot to visit the community I built while living there. I am excited to help the chapter where I can!',
    photo: require('../assets/executive_board/patricia_islas.jpg'),
    photoPosition: 'center 20%',
    accent: '#D33A02',
    gradient: 'linear-gradient(135deg, #D33A02 0%, #a82d01 100%)',
  },
  {
    name: 'Noe Melchor',
    position: 'Outreach Director',
    profession: 'Spacecraft Assembly Integration & Test Engineer',
    company: 'Firefly',
    school: 'University of California - San Diego',
    funFact: null,
    whyShpe: null,
    photo: require('../assets/executive_board/noe_melchor.png'),
    accent: '#FD652F',
    gradient: 'linear-gradient(135deg, #FD652F 0%, #d44e20 100%)',
  },
  {
    name: 'Luigi Medrano',
    position: 'Professional Development Director',
    profession: 'Software Engineer / Data Scientist',
    company: 'Dell Technologies',
    school: 'The University of Texas at Austin',
    funFact: 'I gew up in a 4,000 person agricultural town in West, Texas, about as far from Silicon Valley as you can get, and somehow ended up in STEM.',
    whyShpe: 'I joined SHPE in College and it was a great experience. I also did lots of mentoring so joining the professional chapter was a way to connect with mi familia again and pay it forward.',
    photo: require('../assets/executive_board/luigi_medrano.jpg'),
    accent: '#001F5B',
    gradient: 'linear-gradient(135deg, #001F5B 0%, #0a2a5e 100%)',
  },
  {
    name: 'Luis Ramirez',
    position: 'Chapter Advisor',
    profession: 'Data Engineer',
    company: 'Wells Fargo',
    school: 'CSU Sacramento',
    funFact: null,
    whyShpe: null,
    photo: require('../assets/executive_board/luis_ramirez.png'),
    accent: '#72A9BE',
    gradient: 'linear-gradient(135deg, #72A9BE 0%, #4e8aa0 100%)',
  },
];





// stacked avatars shown before the radial expands




// quick stats bar between hero and team grid

const stats = [
  { value: 10, suffix: '', label: 'Chapter Leaders' },
  { value: 11, suffix: '', label: 'Universities' },
  { value: 10, suffix: '', label: 'Companies' },
  { value: 1,  suffix: '', label: 'Mission' },
];

function CountUp({ to, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 20 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, mv, to]);

  useEffect(() => {
    return spring.on('change', (v) => setDisplay(Math.round(v)));
  }, [spring]);

  return (
    <span ref={ref} className="font-black text-white tabular-nums" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: 1 }}>
      {display}{suffix}
    </span>
  );
}

function StatsStrip() {
  return (
    <div
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(90deg, #001F5B 0%, #0070C0 50%, #001F5B 100%)' }}
    >
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />
      <div className="relative max-w-4xl mx-auto px-6 py-10 grid grid-cols-2 gap-6" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.5 }}
            className="text-center"
          >
            <CountUp to={s.value} suffix={s.suffix} />
            <p className="text-xs uppercase tracking-widest mt-1 font-semibold" style={{ color: 'rgba(255,255,255,0.55)' }}>{s.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}


export default function ExecutiveBoard() {
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <main style={{ paddingTop: '60px', background: '#080d1a', minHeight: '100vh' }}>
      <ExpandedProfile member={selectedMember} onClose={() => setSelectedMember(null)} />

      <section
        className="relative overflow-hidden text-center"
        style={{ background: 'linear-gradient(135deg, #001F5B 0%, #0a1a3a 100%)', paddingBottom: 72 }}
      >
        <div className="absolute rounded-full pointer-events-none" style={{ width: 500, height: 500, background: '#0070C0', top: '-160px', right: '-160px', filter: 'blur(100px)', opacity: 0.12 }} />
        <div className="absolute rounded-full pointer-events-none" style={{ width: 360, height: 360, background: '#FD652F', bottom: '-80px', left: '-80px', filter: 'blur(80px)', opacity: 0.10 }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-3xl mx-auto px-6 pt-20 pb-4"
        >
          <span
            className="inline-block text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-6"
            style={{ background: 'rgba(253,101,47,0.18)', color: '#FD652F', border: '1px solid rgba(253,101,47,0.3)' }}
          >
            2026-2027
          </span>
          <h1 className="font-black text-white" style={{ fontSize: 'clamp(2.4rem, 6vw, 4rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
            Executive Board
          </h1>
          <p className="mt-4 text-base leading-relaxed max-w-xl mx-auto" style={{ color: '#93b4cc' }}>
            The dedicated leaders driving SHPE Austin's mission forward — empowering Hispanic engineers and building a thriving professional community in Texas.
          </p>
        </motion.div>
      </section>

      <StatsStrip />

      <section style={{ background: '#080d1a' }} className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-14"
          >
            <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#0070C0', letterSpacing: '0.12em' }}>The People</p>
            <h2 className="font-black text-white" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}>Meet the Team</h2>
            <p className="text-sm mt-2" style={{ color: 'rgba(255,255,255,0.4)' }}>Every role matters. Every person drives the mission.</p>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: 16,
            }}
          >
            {board.map((member, i) => (
              <div key={member.position} id={`member-card-${i}`}>
                <MemberCard member={member} index={i} onSelect={setSelectedMember} />
              </div>
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
              href="#/membership"
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
