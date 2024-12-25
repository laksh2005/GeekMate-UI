import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-base-200 border-t border-base-300">
      <div className="max-w-7xl mx-auto py-6 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 border-b border-base-300">
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold">Navigation</h3>
            <Link to="/" className="link link-hover text-base-content/70 hover:text-primary transition-colors text-sm">Home</Link>
            <Link to="/network" className="link link-hover text-base-content/70 hover:text-primary transition-colors text-sm">Network</Link>
            <Link to="/connections" className="link link-hover text-base-content/70 hover:text-primary transition-colors text-sm">Connections</Link>
            <Link to="/profile" className="link link-hover text-base-content/70 hover:text-primary transition-colors text-sm">Profile</Link>
          </div>
          
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold">Support</h3>
            <ui className="link link-hover text-base-content/70 hover:text-primary transition-colors text-sm">FAQs</ui>
            <ui className="link link-hover text-base-content/70 hover:text-primary transition-colors text-sm">Contact Us</ui>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold">Connect with Me</h3>
            <div className="flex gap-x-4">
              <a 
                href="https://github.com/laksh2005" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-circle btn-xs btn-ghost hover:bg-primary/20"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" className="fill-current opacity-50 hover:opacity-100">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/je.suis.laksh/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-circle btn-xs btn-ghost hover:bg-primary/20"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" className="fill-current opacity-50 hover:opacity-100">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/in/laksh-nijhawan-576888280/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-circle btn-xs btn-ghost hover:bg-primary/20"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" className="fill-current opacity-50 hover:opacity-100">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">
              <span className="text-primary">Geek</span>Mate
            </span>
          </div>

          <div className="text-base-content/70 text-xs text-center md:text-right">
            <p>© {new Date().getFullYear()} GeekMate. Created by Laksh Nijhawan</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;