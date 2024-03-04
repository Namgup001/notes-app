import React from 'react';
import CreateTask from './CreateTask';
import DeletedTasks from './DeletedTasks';
import useTaskManagement from './useTaskManagement';

function Home() {
    const {
        tasks,
        inputRef,
        inputValue,
        deletedTasks,
        handleAddTask,
        handleDeleteTask,
        handleInputChange,
        handleCompleteTask,
    } = useTaskManagement();

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>

           <CreateTask 
                inputRef={inputRef} 
                inputValue={inputValue} 
                handleInputChange={handleInputChange} 
                handleAddTask={handleAddTask} 
                tasks={tasks} 
                handleCompleteTask={handleCompleteTask} 
                handleDeleteTask={handleDeleteTask} 
           />

           <DeletedTasks 
                deletedTasks = {deletedTasks} 
            />

        </div>
    );
}

export default Home;