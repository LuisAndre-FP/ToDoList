const API_URL = "http://localhost:3000/api/tasks";

// export na frente de cada função para que possam ser importadas e usadas em outros arquivos do projeto,
// como componentes React.

// fetch é a função nativa do JavaScript para fazer requisições HTTP.
// Cada função aqui corresponde a uma rota da API

// json.stringify é usado para converter um objeto JavaScript em uma string JSON,
// que é o formato esperado pelo backend.

export const getTasks = async () => {
  const response = await fetch(API_URL);
  return response.json();
};
// A função getTasks faz uma requisição GET para a URL da API e retorna a resposta em formato JSON,
// que é o formato esperado pelo frontend.

export const createTask = async (task) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return response.json();
};
// A função createTask faz uma requisição POST para a URL da API,
// enviando os dados da nova tarefa no corpo da requisição.
// O backend espera receber um objeto JSON com as propriedades title e description,
// que são convertidas em string JSON usando JSON.stringify.

export const updateTask = async (id, data) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};
// A função updateTask faz uma requisição PUT para a URL da API, incluindo o ID da tarefa a ser atualizada.
// O corpo da requisição contém os dados atualizados da tarefa, que são convertidos em string JSON usando JSON.stringify.

export const deleteTask = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};
// A função deleteTask faz uma requisição DELETE para a URL da API, incluindo o ID da tarefa a ser deletada.
