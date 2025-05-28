import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Loader2 } from 'lucide-react';
import { useProjects } from '../hooks/useProjects';

const Projects = ({ isDark }) => {
  const { projects, loading, error } = useProjects();

  if (loading) {
    return (
      <section className={`py-20 transition-colors duration-300 ${
        isDark ? 'bg-gray-800' : 'bg-gray-50'
      }`}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className={`text-4xl font-bold text-center mb-12 transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            Meus Projetos
          </h2>
          <div className="flex justify-center items-center py-20">
            <div className="flex items-center space-x-3">
              <Loader2 className={`animate-spin ${isDark ? 'text-blue-400' : 'text-blue-600'}`} size={24} />
              <span className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Carregando projetos...
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={`py-20 transition-colors duration-300 ${
        isDark ? 'bg-gray-800' : 'bg-gray-50'
      }`}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className={`text-4xl font-bold text-center mb-12 transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            Meus Projetos
          </h2>
          <div className="text-center py-20">
            <p className={`text-lg ${isDark ? 'text-red-400' : 'text-red-600'}`}>
              Erro ao carregar projetos: {error}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-20 transition-colors duration-300 ${
      isDark ? 'bg-gray-800' : 'bg-gray-50'
    }`}>
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={`text-4xl font-bold text-center mb-12 transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            Meus Projetos
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -10 }}
                className={`rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ${
                  isDark 
                    ? 'bg-gray-900 shadow-gray-900/20 hover:shadow-gray-900/40' 
                    : 'bg-white shadow-gray-200/50 hover:shadow-gray-300/50'
                }`}
              >
                <div className="relative overflow-hidden w-[100%] flex justify-center items-center mt-4">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-48 h-48 object-cover"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/400x250?text=${encodeURIComponent(project.title)}`;
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300" />
                </div>

                <div className="p-6">
                  <h3 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                    {project.title}
                  </h3>
                  
                  <p className={`mb-4 transition-colors duration-300 ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className={`px-3 py-1 text-sm rounded-full transition-colors duration-300 ${
                          isDark 
                            ? 'bg-blue-900/30 text-blue-400' 
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex space-x-4">
                    {project.github !== '#' && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center space-x-2 px-4 py-2 text-white rounded-lg transition-colors duration-300 ${
                          isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-800 hover:bg-gray-700'
                        }`}
                      >
                        <Github size={18} />
                        <span>Código</span>
                      </motion.a>
                    )}
                    
                    {project.demo !== '#' && (
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center space-x-2 px-4 py-2 text-white rounded-lg transition-colors duration-300 ${
                          isDark ? 'bg-blue-700 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                      >
                        <ExternalLink size={18} />
                        <span>Ver Mais</span>
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;