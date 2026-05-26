import { useState, useEffect } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "./services/api";
import TaskForm from "./components/TaskForm";
import TaskCard from "./components/TaskCard";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  const handleCreate = async (title, description) => {
    const newTask = await createTask({ title, description });
    setTasks([newTask, ...tasks]);
  };

  const handleUpdate = async (id, data) => {
    const updated = await updateTask(id, data);
    setTasks(tasks.map((task) => (task.id === id ? updated : task)));
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Minhas tarefas</h1>
        <TaskForm onTaskCreated={handleCreate} />
        <div className="flex flex-col gap-3">
          {tasks.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Nenhuma tarefa ainda.
            </p>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
