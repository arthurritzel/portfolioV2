import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import fotoArthur from '../assets/fotoArthur.png';

const Hero = ({ isDark }) => {
  return (
    <section className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
        : 'bg-gradient-to-br from-blue-50 to-indigo-100'
    }`}>
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <img
              src={fotoArthur}
              alt={portfolioData.hero.name}
              className={`w-64 h-64 rounded-full mx-auto mb-6 shadow-xl border-4 transition-colors duration-300 ${
                isDark ? 'border-gray-700' : 'border-white'
              }`}
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`text-5xl md:text-6xl font-bold mb-4 transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}
          >
            {portfolioData.hero.name}
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`text-2xl md:text-3xl mb-6 transition-colors duration-300 ${
              isDark ? 'text-blue-400' : 'text-blue-600'
            }`}
          >
            {portfolioData.hero.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className={`text-lg max-w-2xl mx-auto mb-8 transition-colors duration-300 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            {portfolioData.hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center space-x-6"
          >
            <motion.a
              href={portfolioData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`p-3 text-white rounded-full transition-colors duration-300 ${
                isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              <Github size={24} />
            </motion.a>
            <motion.a
              href={portfolioData.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`p-3 text-white rounded-full transition-colors duration-300 ${
                isDark ? 'bg-blue-700 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              <Linkedin size={24} />
            </motion.a>
            <motion.a
              href={`mailto:${portfolioData.contact.email}`}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`p-3 text-white rounded-full transition-colors duration-300 ${
                isDark ? 'bg-green-700 hover:bg-green-600' : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              <Mail size={24} />
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
            className="mt-12"
          >
            <ChevronDown size={32} className={`mx-auto transition-colors duration-300 ${
              isDark ? 'text-gray-500' : 'text-gray-400'
            }`} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;