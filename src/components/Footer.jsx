import React from 'react';

const Footer = ({ isDark }) => {
  return (
    <footer className={`text-white py-8 transition-colors duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-gray-800'
    }`}>
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className={`transition-colors duration-300 ${
          isDark ? 'text-gray-500' : 'text-gray-400'
        }`}>
          © 2024 Arthur Ritzel. Todos os direitos reservados.
        </p>
        <p className={`text-sm mt-2 transition-colors duration-300 ${
          isDark ? 'text-gray-600' : 'text-gray-500'
        }`}>
          Desenvolvido com React, Vite e muito ☕
        </p>
      </div>
    </footer>
  );
};

export default Footer;