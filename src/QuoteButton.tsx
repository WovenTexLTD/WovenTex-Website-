import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const QuoteButton = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to="/contact"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5
        bg-yellow-500 text-black font-bold rounded-full shadow-xl
        hover:bg-yellow-400 transition-all duration-300 hover:scale-105
        animate-glow-pulse px-5 py-3.5"
      style={{ boxShadow: '0 4px 32px rgba(255,185,5,0.45)' }}
    >
      <MessageSquare size={18} />
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
            className="text-sm whitespace-nowrap overflow-hidden"
          >
            Request a Quote
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
};

export default QuoteButton;
