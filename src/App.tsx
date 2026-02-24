import { useState, useEffect } from 'react';

function App() {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const fullText = 'Hello, World';

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsComplete(true);
      }
    }, 150);

    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden flex flex-col">
      {/* Scan lines overlay */}
      <div className="fixed inset-0 pointer-events-none z-10 opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
        }}
      />

      {/* Ambient glow orbs */}
      <div className="fixed top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-20 blur-[120px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(74, 222, 128, 0.4) 0%, transparent 70%)',
          animation: 'pulse 8s ease-in-out infinite',
        }}
      />
      <div className="fixed bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-15 blur-[100px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, transparent 70%)',
          animation: 'pulse 10s ease-in-out infinite reverse',
        }}
      />

      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-emerald-400/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 relative z-20">
        {/* Terminal window frame */}
        <div className="relative max-w-[90vw]">
          {/* Decorative brackets */}
          <span className="absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 text-emerald-500/30 text-4xl md:text-6xl font-light select-none"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            {'{'}
          </span>
          <span className="absolute -right-4 md:-right-8 top-1/2 -translate-y-1/2 text-emerald-500/30 text-4xl md:text-6xl font-light select-none"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            {'}'}
          </span>

          {/* Main greeting */}
          <h1
            className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-light tracking-tight text-center"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: '#e8f5e9',
              textShadow: isComplete
                ? '0 0 60px rgba(74, 222, 128, 0.5), 0 0 120px rgba(74, 222, 128, 0.3)'
                : '0 0 40px rgba(74, 222, 128, 0.3)',
              transition: 'text-shadow 0.5s ease-out',
            }}
          >
            {displayedText}
            <span
              className={`inline-block w-[3px] md:w-[4px] h-[0.8em] ml-1 md:ml-2 align-middle bg-amber-400 ${showCursor ? 'opacity-100' : 'opacity-0'}`}
              style={{
                boxShadow: '0 0 20px rgba(251, 191, 36, 0.8)',
                transition: 'opacity 0.1s',
              }}
            />
          </h1>

          {/* Subtitle appears after typing */}
          <p
            className={`mt-6 md:mt-8 text-center text-emerald-400/60 text-xs md:text-sm tracking-[0.3em] uppercase transition-all duration-1000 ${isComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            The first words of every journey
          </p>
        </div>

        {/* Decorative line */}
        <div
          className={`mt-12 md:mt-16 h-px w-24 md:w-32 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent transition-all duration-1000 delay-300 ${isComplete ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}
        />

        {/* Binary decoration */}
        <div
          className={`mt-6 md:mt-8 text-[10px] md:text-xs text-emerald-900/40 tracking-widest transition-all duration-1000 delay-500 ${isComplete ? 'opacity-100' : 'opacity-0'}`}
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          01001000 01100101 01101100 01101100 01101111
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-20 pb-6 pt-4 text-center">
        <p
          className="text-[10px] md:text-xs text-emerald-700/40 tracking-wide"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          Requested by @ahmadekoekkoek · Built by @clonkbot
        </p>
      </footer>

      {/* CSS Keyframes */}
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.1); opacity: 0.15; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          25% { transform: translateY(-20px) translateX(10px); opacity: 0.5; }
          50% { transform: translateY(-10px) translateX(-10px); opacity: 0.3; }
          75% { transform: translateY(-30px) translateX(5px); opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}

export default App;
