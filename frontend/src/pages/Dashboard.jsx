import React from 'react'
import { useEffect, useState } from 'react'
import { CreateTodo } from './CreateTodo';
import { DisplayTodo } from './DisplayTodos';

export default function Dashboard({checkAuth}) {

    const [todo, setTodo] = useState([]);

    const added = async () =>{
        const res = await fetch("http://localhost:3000/todo-app/typed_todo_data/todoget");
        const json = await res.json();
        setTodo(json.data)
    }

    useEffect(() => {added();},[])

    
    return (
        <div className='flex flex-col h-screen'>
        <div className='sticky top-0 z-10'><CreateTodo added={added} checkAuth={checkAuth} /></div>
        <div className='flex-1 overflow-y-auto'><DisplayTodo todo={todo} added={added} /></div>
        </div>
    )}