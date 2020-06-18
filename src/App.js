import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories')
      .then(response => {
        console.log(response);

        setRepositories(response.data);
      });
  }, []);

  async function handleAddRepository() {
    const {status, data} = await api.post('/repositories', {
      "title": "Portfolio Project",
      "url": "https://github.com/FelipeRC/bootcamp-gostack12-challenge3-portfolio-web",
      "techs": ["ReactJS"]
    });
    
    if (status && status === 201) {
      setRepositories([...repositories, data]);
    }
  }

  async function handleRemoveRepository(id) {
    if(id){
      const {status} = await api.delete(`/repositories/${id}`);

      if(status && status === 204){
        setRepositories(repositories.filter(repository => repository.id !== id));
      }
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return (
            <li key={repository.id}>
              {repository.title}

              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
          </button>
            </li>
          )
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
