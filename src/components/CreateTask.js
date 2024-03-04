import React from 'react'
import './index.css'

function CreateTask({ inputRef, inputValue, handleInputChange, handleAddTask, tasks, handleCompleteTask, handleDeleteTask }) {
    return (
        <div style={{ width: '50%', marginRight: '10px' }}>
                <div>
                    <h1>Create Task</h1>
                    <textarea
                        ref={inputRef}
                        value={inputValue} 
                        onChange={handleInputChange}
                        placeholder="Enter your task"
                        className="create-task-textarea"
                    />

                    <button onClick={handleAddTask} className="create-task-button">Add Task</button>

                    <ul className="task-list">
                        {tasks.map((task, index) => (
                            <li key={index} className="task-item">
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => handleCompleteTask(index)}
                                    className="task-checkbox"
                                />
                                <span className={task.completed ? "task-text completed" : "task-text"}>
                                    {task.text.split('\n').map((line, i) => (
                                        <React.Fragment key={i}>
                                            {line}
                                            <br />
                                        </React.Fragment>
                                    ))}
                                </span>
                                {!task.completed && (
                                    <button onClick={() => handleDeleteTask(index)} className="delete-button">Delete</button>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
        </div>
    )
}

export default CreateTask