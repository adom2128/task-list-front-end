import React, { useState } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';

const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];

const App = () => {
  const [taskData, setTaskData] = useState(TASKS);

  const markComplete = (id) => {
    const tasks = taskData.map(task => {
      if (task.id === id) {
        task.isComplete = !task.isComplete;
      }
      return task;
    });
    setTaskData(tasks);
  };

  const deleteTask = (id) => {
    const tasks = taskData.filter(task => {
      if (task.id !== id) {
        return task;
      }
    });
    // setTaskData(taskData.filter((task) => task.id !== id));
    setTaskData(tasks);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div><TaskList 
          tasks={taskData} 
          onSetComplete={markComplete} 
          onDeleteTask={deleteTask}
        /></div>
      </main>
    </div>
  );
};

export default App;
