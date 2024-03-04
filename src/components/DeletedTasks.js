import React from 'react'

function DeletedTasks({ deletedTasks }) {
  return (
            <div style={{ width: '50%', marginLeft: '10px' }}>
                    <h1>Deleted Tasks</h1>
                    <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
                        {deletedTasks.map((task, index) => (
                            <li key={index} style={{ marginBottom: '8px' }}>
                                <span>{index + 1}. </span>
                                {task.text.split('\n').map((line, i) => (
                                    <>
                                        {line}
                                        <br />
                                    </>
                                ))} 
                            </li>
                        ))}
                    </ul>
            </div>
       
    )
}

export default DeletedTasks