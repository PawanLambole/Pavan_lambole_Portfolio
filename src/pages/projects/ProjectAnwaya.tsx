import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Landmark = ({ x, y }: { x:number; y:number }) => (
  <circle cx={x} cy={y} r={3} fill="#FF9933" />
);

const ProjectAnwaya = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl md:text-5xl font-bold">Project Anwaya</h1>
          <Link to="/" className="text-indigo-500 hover:underline">← Back to Home</Link>
        </div>

        <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} className="rounded-2xl bg-gray-100 dark:bg-gray-800 p-6 mb-8">
          <p className="text-gray-700 dark:text-gray-300">Indian Sign Language to Marathi translation using MediaPipe + LSTM. Real-time gesture detection and translation pipeline.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div className="relative bg-black rounded-xl aspect-video overflow-hidden">
            <svg viewBox="0 0 640 360" className="w-full h-full">
              {[...Array(21)].map((_,i)=> (
                <Landmark key={i} x={80 + (i%7)*60} y={80 + Math.floor(i/7)*60} />
              ))}
              <motion.rect x={400} y={60} width={200} height={40} rx={8} fill="#138808" animate={{ opacity: [0.3,1,0.3] }} transition={{ repeat: Infinity, duration: 2 }} />
              <text x={410} y={85} fill="white" fontSize="16">Predicted: नमस्कार</text>
            </svg>
          </motion.div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Pipeline</h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
              <li>• Hand landmarks via MediaPipe</li>
              <li>• Sequence windowing and normalization</li>
              <li>• LSTM classification</li>
              <li>• Marathi translation mapping</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectAnwaya;
