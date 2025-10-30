import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';
import bgMusic from '../assets/JD Intro Theme _ Master Mash-up _ Thalapathy.mp3';

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.15; // Low volume (15%)
      audioRef.current.loop = true;
    }

    // Try to autoplay on any user interaction or load
    const startMusic = async () => {
      if (audioRef.current && !isPlaying) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
          // Remove listeners after first play
          window.removeEventListener('load', startMusic);
          document.removeEventListener('click', startMusic);
          document.removeEventListener('scroll', startMusic);
          document.removeEventListener('touchstart', startMusic);
          document.removeEventListener('keydown', startMusic);
        } catch (err) {
          console.log('Music play attempted');
        }
      }
    };

    // Add multiple event listeners to catch first interaction or load
    window.addEventListener('load', startMusic);
    document.addEventListener('click', startMusic);
    document.addEventListener('scroll', startMusic);
    document.addEventListener('touchstart', startMusic);
    document.addEventListener('keydown', startMusic);

    // Try immediate autoplay on component mount (works in some browsers)
    const immediatePlay = setTimeout(async () => {
      try {
        await audioRef.current?.play();
        setIsPlaying(true);
      } catch (err) {
        // Will play on load or first user interaction
      }
    }, 500);

    return () => {
      clearTimeout(immediatePlay);
      window.removeEventListener('load', startMusic);
      document.removeEventListener('click', startMusic);
      document.removeEventListener('scroll', startMusic);
      document.removeEventListener('touchstart', startMusic);
      document.removeEventListener('keydown', startMusic);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => {
          console.log('Audio play failed:', err);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={bgMusic} />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
        className="fixed bottom-6 right-6 z-50 flex gap-2"
      >
        {isPlaying && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={toggleMute}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-indian-saffron to-indian-orange text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </motion.button>
        )}
        
        <motion.button
          onClick={togglePlay}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`w-12 h-12 rounded-full ${
            isPlaying 
              ? 'bg-gradient-to-r from-indian-green to-green-600' 
              : 'bg-gradient-to-r from-indian-saffron to-indian-orange'
          } text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center`}
          title={isPlaying ? 'Pause Music' : 'Play Music'}
        >
          {isPlaying ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </motion.button>
      </motion.div>
    </>
  );
};

export default BackgroundMusic;
