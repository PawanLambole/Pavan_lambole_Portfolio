import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReleaseGallery from '../../components/ReleaseGallery';

const Codebidder = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl md:text-5xl font-bold">Codebidder Platform</h1>
          <Link to="/" className="text-indigo-500 hover:underline">← Back to Home</Link>
        </div>

        {/* Animated hero with flowing lines */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-orange-200/30 to-green-200/30 dark:from-orange-500/10 dark:to-green-500/10 p-6 md:p-10 mb-10"
        >
          <div className="absolute inset-0 opacity-40 pointer-events-none">
            <svg className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FF9933" />
                  <stop offset="100%" stopColor="#138808" />
                </linearGradient>
              </defs>
              {[...Array(12)].map((_, i) => (
                <motion.path
                  key={i}
                  d={`M0 ${20 + i * 40} C 25 ${10 + i * 40}, 75 ${30 + i * 40}, 100 ${20 + i * 40}`}
                  stroke="url(#grad)"
                  strokeWidth="2"
                  fill="transparent"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2 + i * 0.2, repeat: Infinity, repeatType: 'reverse' }}
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </svg>
          </div>

          <div className="relative z-10">
            <p className="max-w-3xl text-sm md:text-base text-gray-700 dark:text-gray-300">
              A comprehensive client-developer bidding platform: requirement uploads, quotation management, admin panel, authentication, notifications, and tracking.
            </p>
            <div className="mt-4 flex gap-4">
              <a href="https://github.com/PawanLambole/codebidder" target="_blank" className="inline-flex items-center gap-2 text-indigo-500 hover:underline">
                <Github size={18}/> Code
              </a>
              <span className="inline-flex items-center gap-2 text-gray-500">
                <ExternalLink size={18}/> Demo (on request)
              </span>
            </div>
          </div>
        </motion.div>

        {/* Release images (from GitHub Releases) */}
        <div className="mb-10">
          <ReleaseGallery owner="PawanLambole" repo="codebidder" title="Release Screenshots" />
        </div>

        {/* Feature grid with animated cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: 'Bidding Workflow', desc: 'Post requirements, receive quotations, select winners.', color: 'from-orange-400 to-orange-600' },
            { title: 'Admin Panel', desc: 'Manage users, projects, and roles securely.', color: 'from-indigo-400 to-indigo-600' },
            { title: 'Notifications', desc: 'Status updates and reminders across roles.', color: 'from-green-400 to-green-600' },
          ].map((f, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6, rotate: [-1,1,0] }}
              transition={{ type: 'spring', stiffness: 250 }}
              className={`rounded-xl p-5 bg-white/70 dark:bg-gray-800/70 backdrop-blur border border-gray-200/50 dark:border-gray-700/50`}
            >
              <div className={`h-1.5 mb-4 rounded-full bg-gradient-to-r ${f.color}`} />
              <h3 className="font-semibold text-lg mb-1">{f.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Codebidder;
