import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Todos = () => {
    const [data, setData] = useState([])
    const [task, setTask] = useState('')

    const BASE_URL = 'http://localhost:3000/todos'

    const getTodos = async () => {
        const res = await axios.get(BASE_URL);
        setData(res.data);
        console.log(res.data)
    }

    const addTask = () => {
        axios.post(BASE_URL, { task, completed: false })
            .then(() => {
                setTask('');
                getTodos();
            }
            )
    }

    const toggleComplete = (id, currentStatus) =>{
        axios.patch(`${BASE_URL}/${id}`,{
            completed: !currentStatus
        })
        .then(() => getTodos())
    }

    useEffect(() => {
        getTodos();
        // axios.get(BASE_URL)
        //     .then((res) => {
        //         setData(res.data);
        //         console.log(res.data)
        //     })
    }, [])

    const liStyle = {
        display: "flex",
        alignItems: "center",
        padding: "8px 12px",
        gap: "10px",
    }


    let btn = {
        width: "55px",
        height: "25px",
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h1>todos</h1>
            <div>

                <input type="text" name="task" placeholder='Enter Your Task.....'
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
                <button onClick={addTask}>Add</button>

            </div>
            <ul>
                {
                    data.map(e => (
                        <li style={liStyle} key={e.id}>
                            <input type="checkbox" name="completed"
                            checked={e.completed}
                            onChange={() => toggleComplete(e.id, e.completed)}
                            />
                            <h4 
                                style={{textDecoration: e.completed ? "line-through" : "none"}}
                            >{e.task}</h4>
                            <button style={btn}>Edit</button>
                            <button style={btn}>Delete</button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Todos
