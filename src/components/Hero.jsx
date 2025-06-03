import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import fotoArthur from '../assets/fotoArthur.png';
// Componente de Grid Tecnológico Animado
const TechGrid = ({ isDark }) => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      {/* Grid de pontos */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }, (_, row) =>
          Array.from({ length: 12 }, (_, col) => (
            <motion.div
              key={`${row}-${col}`}
              className={`absolute w-1 h-1 rounded-full ${
                isDark ? 'bg-blue-400' : 'bg-blue-600'
              }`}
              style={{
                left: `${(col + 1) * 8.33}%`,
                top: `${(row + 1) * 12.5}%`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: (row + col) * 0.2,
                ease: "easeInOut"
              }}
            />
          ))
        )}
      </div>

      {/* Linhas conectoras animadas */}
      <svg className="absolute inset-0 w-full h-full">
        {/* Linhas horizontais */}
        {Array.from({ length: 4 }, (_, i) => (
          <motion.line
            key={`h-${i}`}
            x1="10%"
            y1={`${20 + i * 20}%`}
            x2="90%"
            y2={`${20 + i * 20}%`}
            stroke={isDark ? '#60a5fa' : '#2563eb'}
            strokeWidth="0.5"
            opacity="0.4"
            pathLength="0"
            animate={{
              pathLength: [0, 1, 0],
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Linhas verticais */}
        {Array.from({ length: 5 }, (_, i) => (
          <motion.line
            key={`v-${i}`}
            x1={`${20 + i * 15}%`}
            y1="15%"
            x2={`${20 + i * 15}%`}
            y2="85%"
            stroke={isDark ? '#60a5fa' : '#2563eb'}
            strokeWidth="0.5"
            opacity="0.4"
            pathLength="0"
            animate={{
              pathLength: [0, 1, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </svg>
    </div>
  );
};

// Componente de Código Flutuante
const FloatingCode = ({ isDark }) => {
  const codeSnippets = [
    "const", "function", "=>", "{}", "[]", "()", "&&", "||", "===", 
    "async", "await", "return", "import", "export", "class", "var",
    "let", "const", "if", "else", "for", "while", "switch", "case",
  ];

  return (
    <div className="absolute inset-0 overflow-hidden opacity-15">
      {codeSnippets.map((code, index) => (
        <motion.div
          key={index}
          className={`absolute text-xs md:text-sm font-mono ${
            isDark ? 'text-blue-300' : 'text-blue-700'
          }`}
          style={{
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 80 + 10}%`,
          }}
          animate={{
            y: [-20, -40, -20],
            opacity: [0.5, 2, 1],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: index * 0.5,
            ease: "easeInOut"
          }}
        >
          {code}
        </motion.div>
      ))}
    </div>
  );
};

// Componente de Partículas Binárias
const BinaryRain = ({ isDark }) => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-8">
      {Array.from({ length: 12 }, (_, index) => (
        <motion.div
          key={index}
          className={`absolute text-xs font-mono ${
            isDark ? 'text-green-400' : 'text-green-600'
          }`}
          style={{
            left: `${index * 8.33}%`,
            top: '-5%',
          }}
          animate={{
            y: ['0vh', '105vh'],
          }}
          transition={{
            duration: 12 + Math.random() * 6,
            repeat: Infinity,
            delay: index * 0.8,
            ease: "linear"
          }}
        >
          {Array.from({ length: 15 }, () => Math.round(Math.random())).join('')}
        </motion.div>
      ))}
    </div>
  );
};

// Componente de Partículas Flutuantes
const FloatingParticles = ({ isDark }) => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      {Array.from({ length: 20 }, (_, index) => (
        <motion.div
          key={index}
          className={`absolute w-2 h-2 rounded-full ${
            isDark ? 'bg-cyan-400' : 'bg-cyan-600'
          }`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            opacity: [1, 2, 1],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: index * 0.3,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// Hook para efeito de digitação
const useTypewriter = (text, speed = 100, delay = 0) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!text) return;

    const timer = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsComplete(true);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, speed, delay]);

  return { displayText, isComplete };
};

// Componente de texto com cursor
const TypewriterText = ({ 
  text, 
  speed = 100, 
  delay = 0, 
  className = '', 
  showCursor = true,
  onComplete = () => {}
}) => {
  const { displayText, isComplete } = useTypewriter(text, speed, delay);

  useEffect(() => {
    if (isComplete) {
      onComplete();
    }
  }, [isComplete, onComplete]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && !isComplete && (
        <motion.span
          className="inline-block w-0.5 h-[1em] bg-current ml-1"
          animate={{ opacity: [1, 0] }}
          transition={{ 
            duration: 0.8, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
        />
      )}
      {showCursor && isComplete && (
        <motion.span
          className="inline-block w-0.5 h-[1em] bg-current ml-1"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        />
      )}
    </span>
  );
};

const Hero = ({ isDark = false }) => {
  const [nameComplete, setNameComplete] = useState(false);
  const [titleComplete, setTitleComplete] = useState(false);

  return (
    <section className={`min-h-screen flex items-center justify-center relative transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
        : 'bg-gradient-to-br from-blue-50 to-indigo-100'
    }`}>
      
      {/* Animações de fundo tecnológicas */ }
      <TechGrid isDark={isDark} />
      <FloatingCode isDark={isDark} />
      {/*<BinaryRain isDark={isDark} /> */}
      <FloatingParticles isDark={isDark} />

      <div className="max-w-6xl mx-auto px-4 py-20 relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
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

          {/* Nome com efeito de digitação */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={`text-5xl md:text-6xl font-bold mb-4 min-h-[4rem] flex items-center justify-center transition-colors duration-300 backdrop-blur-sm ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}
          >
            <TypewriterText
              text={portfolioData.hero.name}
              speed={50}
              delay={800}
              onComplete={() => setNameComplete(true)}
            />
          </motion.h1>

          {/* Título com efeito de digitação */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: nameComplete ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className={`text-2xl md:text-3xl mb-6 min-h-[3rem] flex items-center justify-center transition-colors duration-300 backdrop-blur-sm ${
              isDark ? 'text-blue-400' : 'text-blue-600'
            }`}
          >
            <TypewriterText
              text={nameComplete ? portfolioData.hero.title : ''}
              speed={50}
              delay={300}
              onComplete={() => setTitleComplete(true)}
            />
          </motion.h2>

          {/* Descrição aparece após título */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: titleComplete ? 1 : 0, 
              y: titleComplete ? 0 : 20 
            }}
            transition={{ delay: titleComplete ? 0.5 : 0, duration: 0.6 }}
            className={`text-lg max-w-2xl mx-auto mb-8 transition-colors duration-300 backdrop-blur-sm ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            {portfolioData.hero.description}
          </motion.p>

          {/* Botões sociais aparecem por último */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: titleComplete ? 1 : 0, 
              y: titleComplete ? 0 : 20 
            }}
            transition={{ delay: titleComplete ? 1 : 0, duration: 0.6 }}
            className="flex justify-center space-x-6 mb-8"
          >
            <motion.a
              href={portfolioData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`p-3 text-white rounded-full transition-colors duration-300 backdrop-blur-sm ${
                isDark ? 'bg-gray-700/80 hover:bg-gray-600/80' : 'bg-gray-800/80 hover:bg-gray-700/80'
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
              className={`p-3 text-white rounded-full transition-colors duration-300 backdrop-blur-sm ${
                isDark ? 'bg-blue-700/80 hover:bg-blue-600/80' : 'bg-blue-600/80 hover:bg-blue-700/80'
              }`}
            >
              <Linkedin size={24} />
            </motion.a>
            <motion.a
              href={`mailto:${portfolioData.contact.email}`}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`p-3 text-white rounded-full transition-colors duration-300 backdrop-blur-sm ${
                isDark ? 'bg-green-700/80 hover:bg-green-600/80' : 'bg-green-600/80 hover:bg-green-700/80'
              }`}
            >
              <Mail size={24} />
            </motion.a>
          </motion.div>

          {/* Seta para baixo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: titleComplete ? 1 : 0
            }}
            transition={{ 
              delay: titleComplete ? 2 : 0,
              repeat: titleComplete ? Infinity : 0,
              repeatType: "reverse", 
              duration: 1.5 
            }}
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