import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface VisitorNameModalProps {
  onSubmit: (name: string) => void;
}

const VisitorNameModal = ({ onSubmit }: VisitorNameModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    // Check if visitor has already provided name in this session
    const hasProvidedName = sessionStorage.getItem('visitor_name');
    if (!hasProvidedName) {
      // Show modal after 3 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      sessionStorage.setItem('visitor_name', name);
      onSubmit(name);
      setIsOpen(false);
    }
  };

  const handleSkip = () => {
    sessionStorage.setItem('visitor_name', 'Anonymous');
    onSubmit('Anonymous');
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
            onClick={handleSkip}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[90%] max-w-md mx-4 sm:mx-0"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-5 sm:p-8 relative border border-gray-200 dark:border-gray-700">
              {/* Close button */}
              <button
                onClick={handleSkip}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <X size={20} />
              </button>

              {/* Content */}
              <div className="text-center mb-5 sm:mb-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gradient-to-r from-indian-saffron to-indian-green rounded-full flex items-center justify-center">
                  <span className="text-2xl sm:text-3xl">👋</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Welcome to My Portfolio!
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  I'd love to know who's visiting. May I have your name?
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name..."
                    className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indian-saffron dark:focus:ring-indian-green transition-all"
                    autoFocus
                  />
                </div>

                <div className="flex gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={handleSkip}
                    className="flex-1 px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                  >
                    Skip
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base rounded-lg bg-gradient-to-r from-indian-saffron to-indian-orange text-white font-medium hover:shadow-lg hover:shadow-orange-500/50 transition-all"
                  >
                    Submit
                  </button>
                </div>
              </form>

              <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 text-center mt-3 sm:mt-4 px-2">
                This helps me understand my visitors better. Your privacy is respected.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default VisitorNameModal;
