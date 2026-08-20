"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { LuX } from "react-icons/lu";

export const PasswordResetToast = () => {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShowToast(Boolean(sessionStorage.getItem("passwordResetSuccess")));
  }, []);

  useEffect(() => {
    window.sessionStorage.removeItem("passwordResetSuccess");
    if (showToast) {
      const timeout = setTimeout(() => {
        setShowToast(false);
      }, 5000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [showToast]);
  return (
    <AnimatePresence>
      {showToast && (
        <motion.div
          className="fixed md:right-5 right-3 md:top-20 top-5 rounded-xl z-100 bg-green-950/90 border-green-500 border md:p-3 px-3 py-4 md:text-sm text-xs md:max-w-100 max-w-80 flex md:gap-x-3 gap-x-2 items-start"
          style={{
            boxShadow: "0 0 15px rgba(0,0,0,0.08)",
          }}
          initial={{ translateX: "100%", opacity: 0 }}
          animate={{ translateX: "0", opacity: 1 }}
          exit={{ translateX: "100%", opacity: 0 }}
        >
          <div className="bg-green-500 rounded-full p-1">
            <FaCheck className="text-black text-lg" />
          </div>
          <div>
            <h5 className="font-semibold text-sm">Password Reset</h5>
            <p className="text-white/60 mt-1">
              Your password had been updates. You can now sign in with your new
              password
            </p>
          </div>
          <button className="text-lg" onClick={() => setShowToast(false)}>
            <LuX />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
