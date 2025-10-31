import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Todos = () => {
    const [data, setData] = useState([])

    const BASE_URL = 'http://localhost:3000/todos'

    const getTodos = async () => {
        const res = await axios.get(BASE_URL);
        setData(res.data);
        console.log(res.data)
    }

    useEffect(()=>{
        // getTodos();
        axios.get(BASE_URL)
        .then((res)=> {setData(res.data);
            console.log(res.data)})
    
    },[])


    return (
        <div>
            {
                data.map((res) => {
                <ul>
                        <li>{res}</li>
                </ul>
                    })
            }
        </div>
    )
}

export default Todos
