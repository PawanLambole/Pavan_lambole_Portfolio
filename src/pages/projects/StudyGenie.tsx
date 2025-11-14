import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const FlipCard = ({ title }: { title: string }) => (
  <motion.div className="w-56 h-36 perspective">
    <motion.div
      className="relative w-full h-full rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md"
      whileHover={{ rotateY: 180 }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="absolute inset-0 flex items-center justify-center backface-hidden">{title}</div>
      <div className="absolute inset-0 flex items-center justify-center backface-hidden rotate-y-180 text-indigo-500">AI Hint →</div>
    </motion.div>
  </motion.div>
);

const StudyGenie = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl md:text-5xl font-bold">StudyGenie</h1>
          <Link to="/" className="text-indigo-500 hover:underline">← Back to Home</Link>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity:0, x:-30 }} animate={{ opacity:1, x:0 }}>
            <p className="text-gray-700 dark:text-gray-300 mb-4">AI-powered toolkit: flashcards, quizzes, and an AI tutor. Built with Vite, React, TypeScript.</p>
            <div className="flex gap-4 flex-wrap">
              {['Flashcards','Quizzes','AI Tutor','Progress'].map((t,i)=> (
                <span key={i} className="px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">{t}</span>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }} className="flex gap-6 flex-wrap">
            {['Biology','Chemistry','Physics','Math'].map((c)=> (
              <FlipCard key={c} title={c} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StudyGenie;
