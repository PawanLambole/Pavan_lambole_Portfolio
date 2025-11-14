import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ReleaseGallery from '../../components/ReleaseGallery';

const Typing = ({ text }: { text: string }) => (
  <motion.span
    initial={{ width: 0 }}
    animate={{ width: '100%' }}
    transition={{ duration: 2, ease: 'easeInOut' }}
    className="inline-block whitespace-nowrap overflow-hidden border-r-2 border-green-500 pr-1"
  >
    {text}
  </motion.span>
);

const CmdHelper = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl md:text-5xl font-bold">CMD Helper</h1>
          <Link to="/" className="text-indigo-500 hover:underline">← Back to Home</Link>
        </div>

        <div className="rounded-xl bg-black p-6 font-mono text-green-400 shadow-xl border border-green-900/40 mb-6">
          <div className="mb-2">C:\Users\Pawan&gt; <Typing text={"tree /A /F"} /></div>
          <div className="opacity-70">Generating directory structure...</div>
        </div>

        <div className="mb-10">
          <ReleaseGallery owner="PawanLambole" repo="cmd-helper" title="Release Screenshots" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { cmd: 'count-files', desc: 'Count files in subfolders' },
            { cmd: 'list-dirs', desc: 'List directory tree' },
            { cmd: 'bulk-rename', desc: 'Rename files safely' },
          ].map((i, idx)=> (
            <motion.div key={idx} whileHover={{ y: -6 }} className="rounded-xl p-5 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <div className="font-semibold">{i.cmd}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{i.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CmdHelper;
