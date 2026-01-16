import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import transitionVideo from '@/assets/login-transition.mp4';

interface LoginTransitionProps {
  show: boolean;
  onComplete?: () => void;
}

const LoginTransition = ({ show, onComplete }: LoginTransitionProps) => {
  const navigate = useNavigate();
  const [videoEnded, setVideoEnded] = useState(false);

  useEffect(() => {
    if (videoEnded) {
      const timer = setTimeout(() => {
        onComplete?.();
        navigate('/dashboard');
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [videoEnded, navigate, onComplete]);

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
        >
          <video
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            className="w-full h-full object-cover"
            style={{ 
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden'
            }}
          >
            <source src={transitionVideo} type="video/mp4" />
          </video>
          
          {/* Fade out overlay when video ends */}
          <AnimatePresence>
            {videoEnded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-black"
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginTransition;
