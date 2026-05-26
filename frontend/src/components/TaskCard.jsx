import { useState } from "react";

function TaskCard({ task, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false); // controla se o cartão está em modo de edição ou não.
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  // As props onUpdate e onDelete funcionam igual ao onTaskCreated
  // o card não fala com a API diretamente, ele delega para o pai.

  const handleToggle = () => {
    // o checkbox chama a função handleToggle quando é clicado,
    //  que inverte o valor de completed da tarefa e chama a função onUpdate para atualizar a tarefa no backend.
    onUpdate(task.id, {
      title: task.title,
      description: task.description,
      completed: !task.completed,
    });
  };

  const handleSave = () => {
    onUpdate(task.id, { title, description, completed: task.completed });
    setIsEditing(false);
  };

  return (
    <div
      className={`bg-gray-800 border rounded-lg p-4 flex flex-col gap-3 ${task.completed ? "border-green-700 opacity-70" : "border-gray-700"}`}
    >
      {isEditing ? (
        <div className="flex flex-col gap-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded px-3 py-1 text-sm transition-colors"
            >
              Salvar
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-600 hover:bg-gray-500 text-white rounded px-3 py-1 text-sm transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={handleToggle}
              className="mt-1 w-4 h-4 accent-green-500 cursor-pointer"
            />
            <div>
              <p
                className={`text-white font-medium ${task.completed ? "line-through text-gray-400" : ""}`}
              >
                {task.title}
              </p>
              {task.description && (
                <p className="text-gray-400 text-sm mt-1">{task.description}</p>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-gray-400 hover:text-blue-400 text-sm transition-colors"
            >
              Editar
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="text-gray-400 hover:text-red-400 text-sm transition-colors"
            >
              Deletar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default TaskCard;
// O componente TaskCard é responsável por exibir as informações de uma tarefa e permitir que o usuário edite ou delete a tarefa.
// Ele recebe a tarefa como prop, bem como as funções onUpdate e onDelete para atualizar ou deletar a tarefa, respectivamente.
// O estado local do componente é usado para controlar se o cartão está em modo de edição ou não, e para armazenar os valores dos campos de edição.