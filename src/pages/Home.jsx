import React from 'react'
import { addATask, getTasks, deleteTasks } from '../firebase/firebase.config'
import { useState, useEffect } from 'react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';


const Home = () => {

    const [name, setName] = useState('')
    const [time, setTime] = useState('')
    const [allTasks, setAllTasks] = useState([])

    const handleSubmit = async (e) => {
        console.log('hs ran')
        e.preventDefault()
        try {
            await addATask(name, time)
            setName('')
            setTime('')
            console.log('done!')
        }
        catch (e) {
            console.log(e);
        }
    }


    useEffect(() => {
        const fetchTasks = async() => {
            const tasks = await getTasks()
            setAllTasks(tasks)
        }
        fetchTasks()
    }, [])

    return (
        <div className='flex flex-row'>
            <form className='flex flex-col m-5 w-1/5' onSubmit={handleSubmit}>
                <label htmlFor='task'>Task</label>
                <input name='task' type='text' className='border border-gray-500 p-1 rounded' placeholder='enter your task...' value={name} onChange={(e) => setName(e.target.value)} required/>
                <label htmlFor='time'>Time Taken (in mins)</label>
                <input name='time' type='text' className='border border-gray-500 p-1 rounded' placeholder='time...' value={time} onChange={(e) => setTime(e.target.value)} required/>
                <button type='submit' className='border bg-blue-400 hover:bg-blue-300 my-2 w-1/2 p-1'> New Task +</button>
            </form>
            <div className='w-2/3'>
                <ul>
                    {allTasks && allTasks.map((t, index) => (
                        <>
                            <li className='task' key={index}>
                                <span>{t.name}</span>
                                <span><AccessTimeIcon/>{t.time}</span>
                                <button className='hover:bg-gray-700 rounded-full p-2' onClick={() => deleteTasks(t.id)}><DeleteOutlineIcon/></button>
                            </li>
                        </>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Home
