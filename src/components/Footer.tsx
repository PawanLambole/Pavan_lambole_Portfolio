import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            &copy; 2025 Pavan Lambole. All Rights Reserved.
          </p>
          <div className="border-t border-gray-300 dark:border-gray-600 pt-4 max-w-2xl mx-auto">
            <p className="text-sm sm:text-base italic text-gray-700 dark:text-gray-300 font-serif">
              "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन"
            </p>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2">
              You have the right to perform your duty, but not to the fruits of your actions.
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              — Bhagavad Gita 2.47
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
