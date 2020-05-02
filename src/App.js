import React from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = React.useState([]);

  React.useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const data = {
      "url": "https://github.com/carlosstenzel/Rocketseat",
      "title": "Gostack da rocket com react",
      "techs": ["node", "react"]
    };

    const response = await api.post("repositories", data);
    const respo = response.data;
    setRepositories([...repositories, respo]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter(respo => respo.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((respo) => (
          <li key={respo.id}>
            {respo.title}

            <button onClick={() => handleRemoveRepository(respo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
