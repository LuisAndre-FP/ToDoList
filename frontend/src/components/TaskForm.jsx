import { useState } from "react";
// gerencia o valor dos inputs
// cada tecla digitada atualiza o estado e o React re-renderiza o input com o novo valor.
// É assim que o React controla formulários.

function TaskForm({ onTaskCreated }) {
  // onTaskCreated é uma função passada como prop para o componente TaskForm, que será chamada quando uma nova tarefa for criada.
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // O componente TaskForm é um formulário para criar novas tarefas.
  // Ele usa o hook useState para criar dois estados locais: title e description, que armazenam o título e a descrição da nova tarefa, respectivamente.
  // O estado é atualizado usando as funções setTitle e setDescription, que são chamadas quando o usuário digita nos campos do formulário.

  const handleSubmit = async (e) => {
    e.preventDefault(); // impede o comportamento padrao do form que recarrega a pagina ao ser submetido.
    if (!title.trim()) return; // Evita criar tarefas sem título
    await onTaskCreated(title, description);
    setTitle("");
    setDescription("");
  };
  // O componente TaskForm recebe uma prop onTaskCreated, que é uma função a ser chamada quando uma nova tarefa for criada.
  // O estado local do componente é gerenciado usando useState para armazenar o título e a descrição da nova tarefa.
  // A função handleSubmit é chamada quando o formulário é enviado. Ela previne o comportamento padrão do formulário,
  // verifica se o título não está vazio, chama a função onTaskCreated com os dados da nova tarefa e limpa os campos do formulário.

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-0">
      <input
        type="text"
        placeholder="Título da tarefa"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="bg-gray-800 text-white placeholder-gray-500 border-gray-700 rounded lg px-4 py-3 focus:outline-none focus:border-blue-500 "
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-4 py-3 transition-colors"
      >
        Adicionar tarefa
      </button>
    </form>
  );
}
export default TaskForm;
// O componente TaskForm é um formulário para criar novas tarefas.
