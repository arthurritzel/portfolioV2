# Portfolio Arthur Ritzel - React + Vite

Este é o portfólio pessoal do Arthur Ritzel, desenvolvido com React e Vite. O projeto apresenta uma interface moderna, responsiva e com animações suaves.

## 🚀 Tecnologias Utilizadas

- **React 18** - Biblioteca JavaScript para construção de interfaces
- **Vite** - Build tool rápida e moderna
- **Framer Motion** - Biblioteca para animações
- **Tailwind CSS** - Framework CSS utilitário
- **Lucide React** - Ícones SVG
- **GitHub Pages** - Deploy e hospedagem

## ✨ Funcionalidades

- ✅ Design responsivo e moderno
- ✅ Animações suaves com Framer Motion
- ✅ Navegação suave entre seções
- ✅ Formulário de contato funcional
- ✅ Menu mobile com animações
- ✅ SEO otimizado
- ✅ Performance otimizada
- ✅ Deploy automatizado com GitHub Actions

## 📁 Estrutura do Projeto

```
portfolio/
├── public/
│   └── vite.svg
├── src/
│   ├── App.jsx          # Componente principal
│   ├── main.jsx         # Ponto de entrada
│   └── index.css        # Estilos globais
├── .github/
│   └── workflows/
│       └── deploy.yml   # CI/CD
├── index.html           # Template HTML
├── package.json         # Dependências
├── vite.config.js       # Configuração do Vite
└── README.md
```

## 🛠️ Como Executar Localmente

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/arthurritzel/portifolio.git
cd portifolio
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

4. Abra o navegador em `http://localhost:3000`

## 📦 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a build de produção
- `npm run preview` - Visualiza a build de produção
- `npm run lint` - Executa o linter

## 🚀 Deploy

O projeto está configurado para deploy automático no GitHub Pages usando GitHub Actions. A cada push na branch `main`, o site é automaticamente construído e implantado.

### Deploy Manual

1. Construa o projeto:
```bash
npm run build
```

2. A pasta `dist` conterá os arquivos para produção

## 🎨 Customização

### Alterando Dados Pessoais

Edite o objeto `portfolioData` em `src/App.jsx`:

```javascript
const portfolioData = {
  hero: {
    name: "Seu Nome",
    title: "Seu Título",
    description: "Sua descrição",
    avatar: "url-da-sua-foto"
  },
  // ... outros dados
};
```

### Adicionando Novos Projetos

Adicione novos projetos no array `projects`:

```javascript
{
  id: 4,
  title: "Nome do Projeto",
  description: "Descrição do projeto",
  image: "url-da-imagem",
  technologies: ["React", "Node.js"],
  github: "link-github",
  demo: "link-demo"
}
```

### Customizando Cores

As cores principais podem ser alteradas no arquivo `tailwind.config.js` ou diretamente nas classes CSS.

## 📱 Responsividade

O portfólio é totalmente responsivo e otimizado para:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large Desktop (1280px+)

## 🔧 Integração com Sanity (Opcional)

Para integrar com o Sanity CMS:

1. Instale o cliente do Sanity:
```bash
npm install @sanity/client
```

2. Configure o cliente:
```javascript
import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'seu-project-id',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-01-01',
})
```

3. Substitua os dados estáticos por chamadas à API do Sanity

## 🐛 Problemas Conhecidos

- Formulário de contato precisa de backend para funcionar completamente
- Imagens são placeholders e devem ser substituídas por imagens reais

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📧 Contato

Arthur Ritzel - arthur@example.com

Link do Projeto: [https://github.com/arthurritzel/portifolio](https://github.com/arthurritzel/portifolio)

---

⭐ Se este projeto te ajudou, considera dar uma estrela no repositório!