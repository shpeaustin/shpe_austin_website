import { useState, useCallback } from 'react';
import ShpeHatAnimation from './ShpeHatAnimation';

export default function Home() {
  const [introDone, setIntroDone] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleComplete = useCallback(() => {
    setFadeOut(true);
    setTimeout(() => setIntroDone(true), 800);
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen font-sans">
      {!introDone && (
        <div
          style={{
            transition: 'opacity 0.8s ease',
            opacity: fadeOut ? 0 : 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ShpeHatAnimation onComplete={handleComplete} />
        </div>
      )}
      {introDone && (
        <div style={{ animation: 'fadeIn 0.8s ease forwards' }}>
          <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
          <h1 className="text-4xl font-bold text-blue-700 mb-4">SHPE Austin</h1>
          <p className="text-gray-600 text-lg">Welcome to the SHPE Austin website.</p>
        </div>
      )}
    </main>
  );
}
