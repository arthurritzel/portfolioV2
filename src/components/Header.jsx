import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Briefcase, Phone, Menu, X, Moon, Sun } from 'lucide-react';
import fotoLogo from '../assets/AR-BLACK.png';

const Header = ({ activeSection, scrollToSection, isMobileMenuOpen, setIsMobileMenuOpen, isDark, toggleTheme }) => {
  const navItems = [
    { id: 'home', label: 'Início', icon: User },
    { id: 'about', label: 'Sobre', icon: User },
    { id: 'projects', label: 'Projetos', icon: Briefcase },
    { id: 'contact', label: 'Contato', icon: Phone }
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full backdrop-blur-md border-b z-50 transition-all duration-300 ${
        isDark 
          ? 'bg-gray-900/90 border-gray-700' 
          : 'bg-white/90 border-gray-200'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`text-xl font-bold transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}
          >
            <div className='flex felx-row'>
                <img src={fotoLogo} alt="Logo" className="h-8 w-auto mr-5 rounded-full" />
                Arthur Ritzel
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-300 ${
                  activeSection === item.id
                    ? isDark 
                      ? 'bg-blue-900/50 text-blue-400' 
                      : 'bg-blue-100 text-blue-600'
                    : isDark
                      ? 'text-gray-300 hover:text-blue-400'
                      : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </motion.button>
            ))}
            
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2 rounded-lg transition-colors duration-300 ${
                isDark 
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
          </nav>

          {/* Mobile Menu Button and Theme Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2 rounded-lg transition-colors duration-300 ${
                isDark 
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors duration-300 ${
                isDark 
                  ? 'hover:bg-gray-800 text-gray-300' 
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 space-y-2"
            >
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    scrollToSection(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-left transition-colors duration-300 ${
                    activeSection === item.id
                      ? isDark 
                        ? 'bg-blue-900/50 text-blue-400' 
                        : 'bg-blue-100 text-blue-600'
                      : isDark
                        ? 'text-gray-300 hover:text-blue-400'
                        : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </motion.button>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;