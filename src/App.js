import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories')
      .then(res => {
        setRepositories(res.data)
      })
  }, [])


  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Desafio ReactJS ${Date.now()}`,
      url: "https://github.com/arthurpc03",
      techs: ["ReactJS, NodeJS"]
    })

    const repository = response.data
    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    const repositoriesIndex = repositories.findIndex(repository=> repository.id === id)

    repositories.splice(repositoriesIndex, 1)

    setRepositories([...repositories])

    await api.delete(`repositories/${id}`)
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(repository => (<li key={repository.id}>{repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
          </li> ))
          }

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
