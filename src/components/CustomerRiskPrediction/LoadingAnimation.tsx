import { motion, AnimatePresence } from "framer-motion";

const LoadingAnimation = ({ loading, message = "AI is analyzing risk..." }) => {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}>
          {/* AI Pulsing Dots Animation */}
          <motion.div className="flex space-x-2">
            <motion.div
              className="w-4 h-4 bg-blue-500 rounded-full"
              animate={{ y: [-5, 5, -5] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="w-4 h-4 bg-blue-400 rounded-full"
              animate={{ y: [5, -5, 5] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2,
              }}
            />
            <motion.div
              className="w-4 h-4 bg-blue-300 rounded-full"
              animate={{ y: [-5, 5, -5] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.4,
              }}
            />
          </motion.div>

          <p className="mt-4 text-white text-lg font-semibold">{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingAnimation;
