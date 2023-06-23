import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList.js';
import './App.css';
import NewTaskForm from './components/NewTaskForm.js';

const baseUrl = 'http://127.0.0.1:5000';

const convertFromApi = (apiCat) => {
  const { description, id, is_complete: isComplete, title } = apiCat;
  return {description, id, isComplete, title};
};

  // API Calls
  const getAllTasks = () => {
    return axios
      .get(`${baseUrl}/tasks`)
      .then((response) => response.data.map(convertFromApi))
      .catch((error) => console.log(error));
  };
  
  const getOneTask = (id) => {
    return axios
    .get(`${baseUrl}/tasks/${id}`)
    .then((response) => {
      return convertFromApi(response.data.task);
    })
    .catch((error) => console.log(error));
  };

  const updateCompletionApi = (id, isCurrentlyComplete) => {
    const endpoint = isCurrentlyComplete ? 'mark_incomplete' : 'mark_complete';
  
    return axios
      .patch(`${baseUrl}/tasks/${id}/${endpoint}`)
      .then((response) => convertFromApi(response.data.task))
      .catch((error) => console.log(error));
  };

  const deleteTaskApi = (id) => {
    return axios
      .delete(`${baseUrl}/tasks/${id}`)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
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


  const updateCompletion = (id) => {
    getOneTask(id).then((response) => {
      return updateCompletionApi(id, response.isComplete);
    })
    .then((response) => {
      setTaskData((prev) => {
        return prev.map((task) => {
          if (id === task.id) {
            return response;
          } else {
          return task; 
          }
        })
      })
    });
  };

  const deleteTask = (id) => {
    deleteTaskApi(id);

    setTaskData((prev) => {
      return prev.filter((task) => {
        if (task.id !== id) {
          return task;
        }
      })
    })
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
            onUpdateCompletion={updateCompletion} 
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
