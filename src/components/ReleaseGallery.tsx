import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchLatestReleaseImages, ReleaseImage } from '../utils/github';

interface ReleaseGalleryProps {
  owner: string;
  repo: string;
  title?: string;
}

const ReleaseGallery = ({ owner, repo, title }: ReleaseGalleryProps) => {
  const [images, setImages] = useState<ReleaseImage[] | null>(null);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const imgs = await fetchLatestReleaseImages(owner, repo);
        if (mounted) setImages(imgs);
      } catch (e) {
        if (mounted) setError('Failed to fetch release assets.');
      }
    })();
    return () => { mounted = false; };
  }, [owner, repo]);

  if (error) {
    return <div className="text-sm text-red-500">{error}</div>;
  }

  if (images === null) {
    return <div className="text-gray-500 dark:text-gray-400 text-sm">Loading release media…</div>;
  }

  if (images.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 dark:border-gray-700 p-6 text-gray-600 dark:text-gray-400 text-sm">
        No release images found for <span className="font-semibold">{owner}/{repo}</span>. Add screenshots to the latest GitHub Release to populate this section.
      </div>
    );
  }

  return (
    <div>
      {title && <h3 className="text-xl font-semibold mb-3">{title}</h3>}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img, idx) => (
          <motion.button
            key={img.url}
            onClick={() => setOpenIdx(idx)}
            whileHover={{ scale: 1.03 }}
            className="aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
          >
            <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {openIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setOpenIdx(null)}
          >
            <motion.img
              key={images[openIdx].url}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={images[openIdx].url}
              alt={images[openIdx].name}
              className="max-w-[90vw] max-height-[80vh] rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReleaseGallery;
