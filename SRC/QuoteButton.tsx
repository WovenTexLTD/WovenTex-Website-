import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';

const QuoteButton = () => {
  return (
    <Link
      to="/contact"
      className="fixed bottom-6 right-6 bg-yellow-500 text-black p-4 rounded-full shadow-lg hover:bg-yellow-400 transition-all duration-300 hover:scale-110 z-40 group"
    >
      <div className="flex items-center space-x-2">
        <MessageSquare size={20} />
        <span className="hidden group-hover:block text-sm font-medium whitespace-nowrap">
          Request a Quote
        </span>
      </div>
    </Link>
  );
};

export default QuoteButton;