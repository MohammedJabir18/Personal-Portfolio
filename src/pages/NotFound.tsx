
import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-neobrutalism-dark grid-bg flex items-center justify-center overflow-hidden p-4">
      <div className="neo-card max-w-md w-full p-8 text-center">
        <h1 className="text-8xl font-bold text-gradient mb-6">404</h1>
        <p className="text-xl text-white mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <a 
          href="/" 
          className="neo-button inline-flex items-center justify-center gap-2"
        >
          <Home size={18} />
          <span>Back to Home</span>
        </a>
      </div>
    </div>
  );
};

export default NotFound;
