import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ReleaseGallery from '../../components/ReleaseGallery';

const PhoneMock = () => (
  <div className="w-60 h-120 rounded-[2rem] bg-gray-900 border-8 border-gray-700 relative overflow-hidden shadow-2xl">
    <div className="absolute top-0 left-0 right-0 h-6 bg-black/40" />
    <div className="w-full h-full bg-gradient-to-b from-green-500/10 to-transparent" />
  </div>
);

const HajiFitness = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl md:text-5xl font-bold">HAJI Fitness Point</h1>
          <Link to="/" className="text-indigo-500 hover:underline">← Back to Home</Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center mb-10">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity:1, x:0 }} transition={{ duration: 0.6 }}>
            <p className="text-gray-700 dark:text-gray-300 mb-4">React Native (Expo) app for gym member management, payments, and analytics with Supabase backend.</p>
            <div className="flex gap-3">
              {['Members','Payments','Analytics','WhatsApp Alerts'].map((t,i)=> (
                <motion.span key={i} whileHover={{ scale: 1.1 }} className="px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">{t}</motion.span>
              ))}
            </div>
          </motion.div>
          <motion.div className="flex justify-center" initial={{ opacity:0, x: 40 }} animate={{ opacity:1, x:0 }}>
            <motion.div animate={{ y: [0,-10,0] }} transition={{ repeat: Infinity, duration: 3 }}>
              <PhoneMock />
            </motion.div>
          </motion.div>
        </div>

        <div className="mb-10">
          <ReleaseGallery owner="PawanLambole" repo="haji-fitness-point" title="Release Screenshots" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[1,2,3].map((i)=> (
            <motion.div key={i} whileHover={{ scale: 1.03 }} className="aspect-[9/16] rounded-xl bg-gray-200/40 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500">
              App Screenshot {i}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HajiFitness;
