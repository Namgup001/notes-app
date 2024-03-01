import React, { useState, useEffect, useRef } from 'react';

function CreateTask() {
    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const [tasks, setTasks] = useState(() => {
        const storedTasks = localStorage.getItem('tasks');
        return storedTasks ? JSON.parse(storedTasks) : [];
    });
    const [deletedTasks, setDeletedTasks] = useState(() => {
        const storedDeletedTasks = localStorage.getItem('deletedTasks');
        return storedDeletedTasks ? JSON.parse(storedDeletedTasks) : [];
    });

    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        localStorage.setItem('deletedTasks', JSON.stringify(deletedTasks));
    }, [deletedTasks]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleAddTask = () => {
        if (inputValue.trim() !== '') {
            setTasks([...tasks, { text: inputValue, completed: false }]);
            setInputValue('');
            inputRef.current.focus();
        }
    };

    const handleCompleteTask = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTasks(updatedTasks);
    };

    const handleDeleteTask = (index) => {
        const deletedTask = tasks.splice(index, 1)[0];
        setDeletedTasks([...deletedTasks, deletedTask]);
        setTasks([...tasks]);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: '50%', marginRight: '10px' }}>
                <div>
                    <h1>Create Task</h1>
                    <textarea
                        ref={inputRef}
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Enter your task"
                        style={{
                            width: '100%',
                            minHeight: '100px',
                            resize: 'none',
                            boxSizing: 'border-box',
                            fontSize: '16px',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                        }}
                    />
                    <button onClick={handleAddTask}>Add Task</button>
                    <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
                        {tasks.map((task, index) => (
                            <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => handleCompleteTask(index)}
                                    style={{ marginRight: '10px' }}
                                />
                                <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                                    {task.text.split('\n').map((line, i) => (
                                        <React.Fragment key={i}>
                                            {line}
                                            <br />
                                        </React.Fragment>
                                    ))}
                                </span>
                                {!task.completed && (
                                    <button onClick={() => handleDeleteTask(index)}>Delete</button>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div style={{ width: '50%', marginLeft: '10px' }}>
                <div>
                    <h1>Deleted Tasks</h1>
                    <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
                        {deletedTasks.map((task, index) => (
                            <li key={index} style={{ marginBottom: '8px' }}>
                                <span>{index + 1}. </span>
                                {task.text.split('\n').map((line, i) => (
                                    <React.Fragment key={i}>
                                        {line}
                                        <br />
                                    </React.Fragment>
                                ))}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default CreateTask;
