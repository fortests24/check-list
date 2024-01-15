import { useState, useEffect } from "react";
import { nanoid } from "nanoid";


const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("tasks"));
    if (data) {
      setTasks(data);
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === "") return;
    const task = {
      id: nanoid(),
      title: newTask,
      completed: false,
    };
    setTasks([...tasks, task]);
    setNewTask('');
  };

  const toggledTask = (id) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(newTasks);
  };

  return (
    <div >
      <h1>Чек-лист</h1>
      <input
        type="text" 
        value={newTask}
        onChange={(event) => setNewTask(event.target.value)}
      ></input>
      <button onClick={addTask}>Добавить</button>
      <ul>
        {tasks?.map((item) => {
          return (
            <li key={item.id}>
              <input 
                type="checkbox" 
                checked={item.completed}
                onChange={() => toggledTask(item.id)}></input>
              {item.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
