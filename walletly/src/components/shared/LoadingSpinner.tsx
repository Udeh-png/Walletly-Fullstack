import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

export const LoadingSpinner = ({ isLoading }: { isLoading: boolean }) => {
  useEffect(() => {
    if (isLoading) {
      document.body.classList.add("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isLoading]);
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.15,
          }}
          className="fixed inset-0 w-full h-full bg-black/50 flex items-center justify-center z-10"
        >
          <span className="loader" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
