
import React from 'react';
import { CoinIcon, ChestIcon } from './icons/Icons';


const NavLink: React.FC<{ children: React.ReactNode; hasDropdown?: boolean }> = ({ children, hasDropdown }) => (
  <a href="#" className="flex items-center gap-1 text-sm text-gray-300 hover:text-white transition-colors">
    {children}
    {hasDropdown && (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    )}
  </a>
);

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between bg-[#1A2532] p-3 rounded-xl border border-gray-700/50">
      <div className="flex items-center gap-8">
        <h1 className="text-2xl font-bold">
          <span className="text-[#C0FD5C]">SYMBIOTIC PLINKO GAME</span>
          
        </h1>
      </div>
    </header>
  );
};

export default Header;
