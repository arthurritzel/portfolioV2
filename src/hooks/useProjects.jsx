import { useState, useEffect } from 'react';

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          'https://ykvqsjm9.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type+%3D%3D+%27card%27%5D%7B%0A++titulo%2C%0A++descricao%2C%0A++caracteristicas%2C%0A++%27imagem%27%3A+imagem.asset-%3E+url%2C%0A++botao%0A%7D'
        );
        
        if (!response.ok) {
          throw new Error('Erro ao buscar projetos');
        }
        
        const data = await response.json();
        
        // Transformar dados do Sanity para o formato esperado
        const transformedProjects = data.result.map((project, index) => ({
          id: index + 1,
          title: project.titulo,
          description: project.descricao,
          image: project.imagem,
          technologies: project.caracteristicas,
          github: project.botao.find(btn => btn.titulo === 'Github' || btn.titulo === 'GitHub')?.Link || '#',
          demo: project.botao.find(btn => btn.titulo === 'Site' || btn.titulo === 'Package')?.Link || 
                project.botao.find(btn => btn.titulo === 'Artigo')?.Link || project.botao.find(btn => btn.titulo === 'Video')?.Link || '#'
        }));
        
        setProjects(transformedProjects);
      } catch (err) {
        setError(err.message);
        console.error('Erro ao buscar projetos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, loading, error };
};
