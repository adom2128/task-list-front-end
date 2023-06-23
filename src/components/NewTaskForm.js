import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

const NewTaskForm = ({ onHandleSubmit }) => {

    const [newTaskName, setNewTaskName] = useState('');

    const handleTaskNameChange = (event) => {
        setNewTaskName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const newTask = {
            title: newTaskName,
            description: ''
        };

        onHandleSubmit(newTask);
        setNewTaskName('');
    };

    return (
        <form className="new-task-form" onSubmit={handleSubmit}>
            <label htmlFor="newTaskName">New Task:</label>
            <input type="text" id="newTaskName" name="newTaskName" onChange={handleTaskNameChange} value={newTaskName}/>
            <input type="submit" value="add task" />
        </form>
    );
};

NewTaskForm.propTypes = {
    onHandleSubmit: PropTypes.func.isRequired,
};

export default NewTaskForm;