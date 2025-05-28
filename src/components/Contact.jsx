import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const Contact = ({ isDark }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Mensagem enviada com sucesso!');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className={`py-20 transition-colors duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-white'
    }`}>
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={`text-4xl font-bold text-center mb-12 transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            Entre em Contato
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className={`text-2xl font-semibold mb-6 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-800'
              }`}>
                Vamos Conversar!
              </h3>
              <p className={`text-lg mb-8 transition-colors duration-300 ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Estou sempre aberto a novas oportunidades e projetos interessantes. 
                Entre em contato e vamos discutir como posso ajudar!
              </p>

              <div className="space-y-4">
                <motion.a
                  href={`mailto:${portfolioData.contact.email}`}
                  whileHover={{ scale: 1.02 }}
                  className={`flex items-center space-x-4 p-4 rounded-lg transition-colors duration-300 ${
                    isDark 
                      ? 'bg-gray-800 hover:bg-gray-700' 
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <Mail className={`transition-colors duration-300 ${
                    isDark ? 'text-blue-400' : 'text-blue-600'
                  }`} size={24} />
                  <span className={`transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>{portfolioData.contact.email}</span>
                </motion.a>

                <motion.a
                  href={portfolioData.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  className={`flex items-center space-x-4 p-4 rounded-lg transition-colors duration-300 ${
                    isDark 
                      ? 'bg-gray-800 hover:bg-gray-700' 
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <Linkedin className={`transition-colors duration-300 ${
                    isDark ? 'text-blue-400' : 'text-blue-600'
                  }`} size={24} />
                  <span className={`transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>LinkedIn</span>
                </motion.a>

                <motion.a
                  href={portfolioData.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  className={`flex items-center space-x-4 p-4 rounded-lg transition-colors duration-300 ${
                    isDark 
                      ? 'bg-gray-800 hover:bg-gray-700' 
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <Github className={`transition-colors duration-300 ${
                    isDark ? 'text-blue-400' : 'text-blue-600'
                  }`} size={24} />
                  <span className={`transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>GitHub</span>
                </motion.a>
              </div>
            </div>

            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <label htmlFor="name" className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-colors duration-300 ${
                    isDark 
                      ? 'border-gray-600 bg-gray-800 text-white focus:ring-blue-400' 
                      : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500'
                  }`}
                  placeholder="Seu nome"
                />
              </div>

              <div>
                <label htmlFor="email" className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-colors duration-300 ${
                    isDark 
                      ? 'border-gray-600 bg-gray-800 text-white focus:ring-blue-400' 
                      : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500'
                  }`}
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-colors duration-300 resize-none ${
                    isDark 
                      ? 'border-gray-600 bg-gray-800 text-white focus:ring-blue-400' 
                      : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500'
                  }`}
                  placeholder="Sua mensagem..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full text-white py-3 px-6 rounded-lg font-medium transition-colors duration-300 ${
                  isDark ? 'bg-blue-700 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                Enviar Mensagem
              </motion.button>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;