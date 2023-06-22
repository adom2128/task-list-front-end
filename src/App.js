import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList.js';
import './App.css';
import NewTaskForm from './components/NewTaskForm.js';

const baseUrl = 'http://127.0.0.1:5000';

const getAllTasks = () => {
  return axios
    .get(`${baseUrl}/tasks`)
    .then((response) => response.data.map(convertFromApi))
    .catch((error) => console.log(error));
};

const convertFromApi = (apiCat) => {
  const { description, id, is_complete: isComplete, title } = apiCat;
  return {description, id, isComplete, title};
};

const App = () => {

  const [taskData, setTaskData] = useState([]);

  const fetchTasks = () => {
    getAllTasks().then((tasks) => {
      setTaskData(tasks);
    });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const markCompleteApi = (id, isCurrentlyComplete) => {
    const endpoint = isCurrentlyComplete ? 'mark_incomplete' : 'mark_complete';

    return axios
      .patch(`${baseUrl}/tasks/${id}/${endpoint}`)
      .then((response) => response.data.map(convertFromApi))
      .catch((error) => console.log(error));
  };

  const markComplete = (id) => {
    const tasks = taskData.map(task => {
      if (task.id === id) {
        const completionState = task.isComplete;
        task.isComplete = !task.isComplete;
        markCompleteApi(id, completionState);
      }
      return task;
    });
    setTaskData(tasks);
  };

  const deleteTaskApi = (id) => {
    return axios
      .delete(`${baseUrl}/tasks/${id}`)
      .then((response) => response.data.map(convertFromApi))
      .catch((error) => console.log(error));
  };

  const deleteTask = (id) => {
    const tasks = taskData.filter(task => {
      if (task.id !== id) {
        return task;
      }
    });

    setTaskData(tasks);
    deleteTaskApi(id);
  };


  const handleSubmit = (newTask) => {
    axios
      .post(`${baseUrl}/tasks`, newTask)
      .then((response) => {
        setTaskData((prev) => [convertFromApi(response.data), ...prev]);
      })
      .catch((error) => console.log(error));
  };


  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <TaskList 
            tasks={taskData} 
            onSetComplete={markComplete} 
            onDeleteTask={deleteTask}
          />
          <NewTaskForm 
            onHandleSubmit={handleSubmit}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
