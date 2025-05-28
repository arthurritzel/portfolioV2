import React from 'react';
import { motion } from 'framer-motion';
import { Code, User, Award, Lightbulb } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const About = ({ isDark }) => {
  return (
    <section className={`py-20 transition-colors duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={`text-4xl font-bold text-center mb-16 transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            Sobre Mim
          </h2>

          {/* Seção Principal - Descrição e Info Cards */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Descrição Principal */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className={`rounded-2xl p-8 transition-colors duration-300 ${
                isDark ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'
              }`}>
                <div className="flex items-center mb-6">
                  <User className={`mr-3 transition-colors duration-300 ${
                    isDark ? 'text-blue-400' : 'text-blue-600'
                  }`} size={28} />
                  <h3 className={`text-2xl font-semibold transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                    Quem sou eu
                  </h3>
                </div>
                <p className={`text-lg leading-relaxed transition-colors duration-300 ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {portfolioData.about.description}
                </p>
              </div>
            </motion.div>

            {/* Cards Informativos */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              {/* Card Idade/Formação */}
              <div className={`rounded-xl p-6 transition-colors duration-300 ${
                isDark 
                  ? 'bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-800/20' 
                  : 'bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200'
              }`}>
                <div className="flex items-center mb-3">
                  <Award className={`mr-2 transition-colors duration-300 ${
                    isDark ? 'text-blue-400' : 'text-blue-600'
                  }`} size={24} />
                  <h4 className={`font-semibold transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                    Formação
                  </h4>
                </div>
                <p className={`text-sm transition-colors duration-300 ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Cursando Engenharia de Software 
                </p>
              </div>

              {/* Card Interesses */}
              <div className={`rounded-xl p-6 transition-colors duration-300 ${
                isDark 
                  ? 'bg-gradient-to-br from-green-900/30 to-teal-900/30 border border-green-800/20' 
                  : 'bg-gradient-to-br from-green-50 to-teal-50 border border-green-200'
              }`}>
                <div className="flex items-center mb-3">
                  <Lightbulb className={`mr-2 transition-colors duration-300 ${
                    isDark ? 'text-green-400' : 'text-green-600'
                  }`} size={24} />
                  <h4 className={`font-semibold transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                    Interesses
                  </h4>
                </div>
                <p className={`text-sm transition-colors duration-300 ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {portfolioData.about.interesses.map((interest, index) => (
                    <span key={index} className="">
                      {interest}<br/>
                    </span>
                    
                  ))}
                </p>
              </div>

              {/* Card Filosofia */}
              <div className={`rounded-xl p-6 transition-colors duration-300 ${
                isDark 
                  ? 'bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-800/20' 
                  : 'bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200'
              }`}>
                <div className="flex items-center mb-3">
                  <Code className={`mr-2 transition-colors duration-300 ${
                    isDark ? 'text-purple-400' : 'text-purple-600'
                  }`} size={24} />
                  <h4 className={`font-semibold transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                    Filosofia
                  </h4>
                </div>
                <p className={`text-sm transition-colors duration-300 ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {portfolioData.about.filosofia}<br />
                </p>
              </div>
            </motion.div>
          </div>

          {/* Seção Habilidades Técnicas */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="text-center mb-8">
              <h3 className={`text-3xl font-semibold mb-4 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-800'
              }`}>
                Habilidades Técnicas
              </h3>
              <p className={`text-lg transition-colors duration-300 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Tecnologias que domino e utilizo em meus projetos
              </p>
            </div>

            {/* Grid de Skills Categorizado */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Frontend */}
              <div className={`rounded-xl p-6 transition-colors duration-300 ${
                isDark ? 'bg-gray-800 border border-gray-700' : 'bg-gray-300 border border-gray-200 shadow-sm'
              }`}>
                <h4 className={`font-semibold mb-4 text-center transition-colors duration-300 ${
                  isDark ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  Frontend
                </h4>
                <div className="space-y-2">
                  {portfolioData.about.skills.front.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className={`px-3 py-2 rounded-lg text-sm text-center transition-colors duration-300 ${
                        isDark 
                          ? 'bg-blue-900/30 text-blue-400' 
                          : 'bg-blue-50 text-blue-700'
                      }`}
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Backend */}
              <div className={`rounded-xl p-6 transition-colors duration-300 ${
                isDark ? 'bg-gray-800 border border-gray-700' : 'bg-gray-300 border border-gray-200 shadow-sm'
              }`}>
                <h4 className={`font-semibold mb-4 text-center transition-colors duration-300 ${
                  isDark ? 'text-green-400' : 'text-green-600'
                }`}>
                  Backend
                </h4>
                <div className="space-y-2">
                  {portfolioData.about.skills.back.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.0 + index * 0.1 }}
                      className={`px-3 py-2 rounded-lg text-sm text-center transition-colors duration-300 ${
                        isDark 
                          ? 'bg-green-900/30 text-green-400' 
                          : 'bg-green-50 text-green-700'
                      }`}
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Database */}
              <div className={`rounded-xl p-6 transition-colors duration-300 ${
                isDark ? 'bg-gray-800 border border-gray-700' : 'bg-gray-300 border border-gray-200 shadow-sm'
              }`}>
                <h4 className={`font-semibold mb-4 text-center transition-colors duration-300 ${
                  isDark ? 'text-purple-400' : 'text-purple-600'
                }`}>
                  Database
                </h4>
                <div className="space-y-2">
                  {portfolioData.about.skills.bancos.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.2 + index * 0.1 }}
                      className={`px-3 py-2 rounded-lg text-sm text-center transition-colors duration-300 ${
                        isDark 
                          ? 'bg-purple-900/30 text-purple-400' 
                          : 'bg-purple-50 text-purple-700'
                      }`}
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* DevOps & Tools */}
              <div className={`rounded-xl p-6 transition-colors duration-300 ${
                isDark ? 'bg-gray-800 border border-gray-700' : 'bg-gray-300 border border-gray-200 shadow-sm'
              }`}>
                <h4 className={`font-semibold mb-4 text-center transition-colors duration-300 ${
                  isDark ? 'text-orange-400' : 'text-orange-600'
                }`}>
                  DevOps & Tools
                </h4>
                <div className="space-y-2">
                  {portfolioData.about.skills.devops.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.4 + index * 0.1 }}
                      className={`px-3 py-2 rounded-lg text-sm text-center transition-colors duration-300 ${
                        isDark 
                          ? 'bg-orange-900/30 text-orange-400' 
                          : 'bg-orange-50 text-orange-700'
                      }`}
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
                
              </div>{/* DevOps & Tools */}
              <div className={`rounded-xl p-6 transition-colors duration-300 ${
                isDark ? 'bg-gray-800 border border-gray-700' : 'bg-gray-300 border border-gray-200 shadow-sm'
              }`}>
                <h4 className={`font-semibold mb-4 text-center transition-colors duration-300 ${
                  isDark ? 'text-red-400' : 'text-red-600'
                }`}>
                  Mobile
                </h4>
                <div className="space-y-2">
                  {portfolioData.about.skills.mobile.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.4 + index * 0.1 }}
                      className={`px-3 py-2 rounded-lg text-sm text-center transition-colors duration-300 ${
                        isDark 
                          ? 'bg-red-900/30 text-red-400' 
                          : 'bg-red-50 text-red-700'
                      }`}
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
                
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;