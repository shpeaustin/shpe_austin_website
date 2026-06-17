import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ShpeHatAnimation from './ShpeHatAnimation';

const textVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
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

export default function Home() {
  const alreadyPlayed = sessionStorage.getItem('introPlayed');
  const [stage, setStage] = useState(alreadyPlayed ? 'done' : 'video');
  const [fadeOut, setFadeOut] = useState(false);
  const [hatDone, setHatDone] = useState(!!alreadyPlayed);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.5;
    }
  }, []);

  const handleVideoEnd = useCallback(() => {
    setFadeOut(true);
    setTimeout(() => {
      setFadeOut(false);
      setStage('hat');
    }, 600);
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
      `}</style>

      {stage === 'video' && (
        <div
          style={{
            transition: 'opacity 0.6s ease',
            opacity: fadeOut ? 0 : 1,
            width: '100%',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <video
            ref={videoRef}
            src={require('../assets/shpe_animated_video.mp4')}
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      )}

      {(stage === 'hat' || stage === 'done') && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            gap: 0,
          }}
        >
          <AnimatePresence>
            {hatDone && (
              <motion.div
                variants={textVariants}
                initial="hidden"
                animate="visible"
                style={{ textAlign: 'center' }}
              >
                <motion.p variants={lineVariants} style={gradientStyle}>
                  Bienvenido a
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          <div style={{ marginTop: '-80px' }}>
            <ShpeHatAnimation onComplete={handleHatComplete} speed={stage === 'done' ? 999 : 1.4} />
          </div>
        </div>
      )}
    </main>
  );
}
