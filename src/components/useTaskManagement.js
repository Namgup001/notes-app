import { useState, useEffect, useRef, useMemo } from 'react';

function useTaskManagement() {
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const tasks = useMemo(() => {
        const storedTasks = localStorage.getItem('tasks');
        return storedTasks ? JSON.parse(storedTasks) : [];
    }, []);

    const deletedTasks = useMemo(() => {
        const storedDeletedTasks = localStorage.getItem('deletedTasks');
        return storedDeletedTasks ? JSON.parse(storedDeletedTasks) : [];
    }, []);

    const [inputValue, setInputValue] = useState('');

    const [tasksState, setTasksState] = useState(tasks);
    const [deletedTasksState, setDeletedTasksState] = useState(deletedTasks);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasksState));
    }, [tasksState]);

    useEffect(() => {
        localStorage.setItem('deletedTasks', JSON.stringify(deletedTasksState));
    }, [deletedTasksState]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleAddTask = () => {
        if (inputValue.trim() !== '') {
            setTasksState([...tasksState, { text: inputValue, completed: false }]);
            setInputValue('');
            inputRef.current.focus();
        }
    };

    const handleCompleteTask = (index) => {
        const updatedTasks = [...tasksState];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTasksState(updatedTasks);
    };

    const handleDeleteTask = (index) => {
        const deletedTask = tasksState.splice(index, 1)[0];
        setDeletedTasksState([...deletedTasksState, deletedTask]);
        setTasksState([...tasksState]);
    };

    return {
        inputRef,
        inputValue,
        tasks: tasksState,
        deletedTasks: deletedTasksState,
        handleInputChange,
        handleAddTask,
        handleCompleteTask,
        handleDeleteTask,
    };
}

export default useTaskManagement;
