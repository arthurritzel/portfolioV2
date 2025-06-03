import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Code, User, Award, Lightbulb, MessageCircle, Send, Bot } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const About = ({ isDark }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'oracle',
      text: '👋 Olá! Eu sou o aRitzel.IA. Faça qualquer pergunta sobre habilidades, experiências, projetos ou como entrar em contato. Estou aqui para ajudar!',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const API_BASE = 'https://oraculo-gemini-8zon.vercel.app';

  // Add custom styles for markdown content
  useEffect(() => {
    const styleId = 'oracle-markdown-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        .oracle-message .markdown-content h1,
        .oracle-message .markdown-content h2,
        .oracle-message .markdown-content h3 {
          color: inherit;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }
        
        .oracle-message .markdown-content h1 { font-size: 1.25rem; }
        .oracle-message .markdown-content h2 { font-size: 1.15rem; }
        .oracle-message .markdown-content h3 { font-size: 1.1rem; }
        
        .oracle-message .markdown-content p {
          margin-bottom: 0.75rem;
          line-height: 1.6;
        }
        
        .oracle-message .markdown-content ul,
        .oracle-message .markdown-content ol {
          margin: 0.75rem 0;
          padding-left: 1.5rem;
        }
        
        .oracle-message .markdown-content li {
          margin-bottom: 0.25rem;
          line-height: 1.5;
        }
        
        .oracle-message .markdown-content code {
          font-family: 'Courier New', monospace;
          font-size: 0.85em;
          padding: 0.2em 0.4em;
          border-radius: 4px;
          background: rgba(0, 0, 0, 0.3);
        }
        
        .oracle-message .markdown-content pre {
          margin: 0.75rem 0;
          padding: 0.75rem;
          border-radius: 8px;
          background: rgba(0, 0, 0, 0.3);
          overflow-x: auto;
        }
        
        .oracle-message .markdown-content pre code {
          background: none;
          padding: 0;
          font-size: 0.9em;
        }
        
        .oracle-message .markdown-content blockquote {
          margin: 0.75rem 0;
          padding-left: 1rem;
          border-left: 3px solid rgba(59, 130, 246, 0.5);
          font-style: italic;
          opacity: 0.9;
        }
        
        .oracle-message .markdown-content a {
          color: #60a5fa;
          text-decoration: underline;
          transition: color 0.2s;
        }
        
        .oracle-message .markdown-content a:hover {
          color: #93c5fd;
        }
        
        .oracle-message .markdown-content hr {
          margin: 1rem 0;
          border: none;
          border-top: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        /* Dark mode adjustments */
        .dark .oracle-message .markdown-content code {
          background: rgba(0, 0, 0, 0.4);
        }
        
        .dark .oracle-message .markdown-content pre {
          background: rgba(0, 0, 0, 0.4);
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // Quick questions
  const quickQuestions = [
    { text: 'Quais são suas principais habilidades técnicas?', icon: '🛠️' },
    { text: 'Me conte sobre sua experiência profissional', icon: '💼' },
    { text: 'Quais projetos você já desenvolveu?', icon: '🚀' },
    { text: 'Como posso entrar em contato com você?', icon: '📞' },
    { text: 'Você está disponível para freelances?', icon: '💰' },
    { text: 'Qual é sua stack de desenvolvimento favorita?', icon: '⚡' }
  ];

  // Check API connection
  const checkConnection = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/health`);
      const data = await response.json();
      setIsConnected(data.status === 'ok');
    } catch (error) {
      setIsConnected(false);
    }
  };

  // Enhanced markdown parser with better formatting
  const parseMarkdown = (text) => {
    if (!text) return '';
    
    // First, split into lines for better processing
    const lines = text.split('\n');
    let html = '';
    let inList = false;
    let listType = '';
    
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      
      // Handle headers
      if (line.startsWith('### ')) {
        if (inList) { html += `</${listType}>`, inList = false; }
        html += `<h3 class="text-lg font-bold mb-2 mt-4">${line.substring(4)}</h3>`;
      } else if (line.startsWith('## ')) {
        if (inList) { html += `</${listType}>`, inList = false; }
        html += `<h2 class="text-xl font-bold mb-3 mt-4">${line.substring(3)}</h2>`;
      } else if (line.startsWith('# ')) {
        if (inList) { html += `</${listType}>`, inList = false; }
        html += `<h1 class="text-2xl font-bold mb-3 mt-4">${line.substring(2)}</h1>`;
      }
      // Handle unordered lists
      else if (line.match(/^[\s]*[\*\-]\s+/)) {
        if (!inList || listType !== 'ul') {
          if (inList) html += `</${listType}>`;
          html += '<ul class="mb-3 space-y-1">';
          inList = true;
          listType = 'ul';
        }
        const content = line.replace(/^[\s]*[\*\-]\s+/, '');
        html += `<li class="ml-4 flex items-start"><span class="mr-2 mt-1">•</span><span>${content}</span></li>`;
      }
      // Handle ordered lists
      else if (line.match(/^[\s]*\d+\.\s+/)) {
        if (!inList || listType !== 'ol') {
          if (inList) html += `</${listType}>`;
          html += '<ol class="mb-3 space-y-1 counter-reset list-decimal ml-4">';
          inList = true;
          listType = 'ol';
        }
        const content = line.replace(/^[\s]*\d+\.\s+/, '');
        html += `<li class="ml-4 list-decimal">${content}</li>`;
      }
      // Handle blockquotes
      else if (line.startsWith('> ')) {
        if (inList) { html += `</${listType}>`, inList = false; }
        html += `<blockquote class="border-l-4 border-blue-400 pl-4 italic my-2 opacity-90">${line.substring(2)}</blockquote>`;
      }
      // Handle horizontal rules
      else if (line.trim() === '---') {
        if (inList) { html += `</${listType}>`, inList = false; }
        html += '<hr class="border-t border-white/30 my-4" />';
      }
      // Handle empty lines
      else if (line.trim() === '') {
        if (inList) { html += `</${listType}>`, inList = false; }
        if (i < lines.length - 1 && lines[i + 1].trim() !== '') {
          html += '<br/>';
        }
      }
      // Handle regular paragraphs
      else if (line.trim() !== '') {
        if (inList) { html += `</${listType}>`, inList = false; }
        html += `<p class="mb-2">${line}</p>`;
      }
    }
    
    // Close any open lists
    if (inList) {
      html += `</${listType}>`;
    }
    
    // Apply inline formatting
    html = html
      // Code blocks (must come before inline code)
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-black/30 p-3 rounded-lg my-3 overflow-x-auto"><code class="text-sm font-mono">$1</code></pre>')
      
      // Inline code
      .replace(/`([^`]+)`/g, '<code class="bg-black/30 px-2 py-1 rounded text-sm font-mono">$1</code>')
      
      // Bold and Italic
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-300 underline hover:text-blue-200 transition-colors">$1</a>');

    return <div 
      className="markdown-content text-sm leading-relaxed"
      dangerouslySetInnerHTML={{ __html: html }} 
    />;
  };

  // Send message to API
  const sendMessage = async (messageText = null) => {
    const text = messageText || inputMessage.trim();
    if (!text || isLoading) return;

    if (!isConnected) {
      addMessage('❌ API não está conectada. Verifique se o servidor está rodando.', 'error');
      return;
    }

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      text,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/oracle/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question: text })
      });

      const data = await response.json();

      if (data.success) {
        const oracleMessage = {
          id: Date.now() + 1,
          type: 'oracle',
          text: data.data.answer,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, oracleMessage]);
      } else {
        addMessage(`❌ Erro: ${data.error}`, 'error');
      }
    } catch (error) {
      addMessage(`❌ Erro de conexão: ${error.message}`, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Add system message
  const addMessage = (text, type) => {
    const message = {
      id: Date.now(),
      type,
      text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
  };

  // Scroll to bottom of chat only
  const scrollToBottom = () => {
    const messagesContainer = document.getElementById('messages-container');
    if (messagesContainer) {
      messagesContainer.scrollTo({
        top: messagesContainer.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    checkConnection();
    const interval = setInterval(checkConnection, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Use timeout to ensure DOM is updated before scrolling
    setTimeout(() => {
      scrollToBottom();
    }, 100);
  }, [messages]);

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

          {/* Seção do Chat Oracle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <h3 className={`text-3xl font-semibold mb-4 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-800'
              }`}>
                <MessageCircle className="inline-block mr-3 mb-1" size={32} />
                Converse com o aRitzel.IA
              </h3>
              <p className={`text-lg transition-colors duration-300 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Faça perguntas sobre minhas habilidades, experiências e projetos
              </p>
            </div>

            <div className={`rounded-2xl border transition-colors duration-300 ${
              isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } shadow-xl overflow-hidden`}>
              
              {/* Chat Header */}
              <div className={`p-6 border-b transition-colors duration-300 ${
                isDark ? 'border-gray-700 bg-gray-900/50' : 'border-gray-200 bg-gray-50'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-full ${
                      isDark ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gradient-to-r from-blue-500 to-purple-500'
                    }`}>
                      <Bot className="text-white" size={24} />
                    </div>
                    <div>
                      <h4 className={`font-semibold text-lg ${
                        isDark ? 'text-white' : 'text-gray-800'
                      }`}>
                        aRitzel.IA
                      </h4>
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${
                          isConnected ? 'bg-green-400' : 'bg-red-400'
                        }`} />
                        <span className={`text-sm ${
                          isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {isConnected ? 'API Online' : 'API Offline'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Questions */}
              <div className={`p-6 border-b ${
                isDark ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <h5 className={`text-sm font-medium mb-3 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  💡 Perguntas Sugeridas:
                </h5>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((question, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => sendMessage(question.text)}
                      disabled={isLoading}
                      className={`text-sm px-4 py-2 rounded-full transition-all duration-200 ${
                        isDark 
                          ? 'bg-gray-700 hover:bg-gray-600 text-gray-300 disabled:opacity-50' 
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700 disabled:opacity-50'
                      } disabled:cursor-not-allowed hover:shadow-md`}
                    >
                      {question.icon} {question.text}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Messages Area */}
              <div 
                className={`h-96 overflow-y-auto p-6 space-y-4 scroll-smooth ${
                  isDark ? 'bg-gray-900/30' : 'bg-gray-50/50'
                }`}
                id="messages-container"
              >
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-4 rounded-2xl ${
                        message.type === 'user'
                          ? isDark 
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                            : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                          : message.type === 'error'
                          ? 'bg-red-500 text-white'
                          : isDark
                          ? 'bg-gray-700 text-gray-100 border border-gray-600'
                          : 'bg-white text-gray-800 border border-gray-200 shadow-sm'
                      }`}
                    >
                      {message.type === 'oracle' ? (
                        <div className="oracle-message">
                          {parseMarkdown(message.text)}
                        </div>
                      ) : (
                        <div className="text-sm leading-relaxed">
                          {message.text}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className={`p-4 rounded-2xl ${
                      isDark ? 'bg-gray-700 border border-gray-600' : 'bg-white border border-gray-200'
                    }`}>
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full animate-bounce ${
                          isDark ? 'bg-gray-400' : 'bg-gray-600'
                        }`} />
                        <div className={`w-2 h-2 rounded-full animate-bounce delay-75 ${
                          isDark ? 'bg-gray-400' : 'bg-gray-600'
                        }`} />
                        <div className={`w-2 h-2 rounded-full animate-bounce delay-150 ${
                          isDark ? 'bg-gray-400' : 'bg-gray-600'
                        }`} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className={`p-6 border-t ${
                isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
              }`}>
                <div className="flex items-center space-x-4">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    placeholder="Digite sua pergunta sobre o portfólio..."
                    disabled={isLoading}
                    className={`flex-1 p-4 rounded-xl border transition-all duration-200 ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                        : 'bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-500 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50`}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => sendMessage()}
                    disabled={!inputMessage.trim() || isLoading}
                    className={`p-4 rounded-xl transition-all duration-200 ${
                      isDark 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:from-gray-600 disabled:to-gray-600' 
                        : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-gray-300 disabled:to-gray-300'
                    } text-white disabled:cursor-not-allowed disabled:opacity-50 shadow-lg hover:shadow-xl`}
                  >
                    <Send size={20} />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Seção Habilidades Técnicas */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
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
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
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
                      transition={{ delay: 1.0 + index * 0.1 }}
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
                      transition={{ delay: 1.2 + index * 0.1 }}
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
                      transition={{ delay: 1.4 + index * 0.1 }}
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
                      transition={{ delay: 1.6 + index * 0.1 }}
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
              </div>

              {/* Mobile */}
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
                      transition={{ delay: 1.8 + index * 0.1 }}
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