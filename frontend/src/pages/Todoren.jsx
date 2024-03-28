import React from 'react'
import { useNavigate } from "react-router-dom"

export default function Todoren({todo,added}) {
    const navigate = useNavigate();

    const updateid = (id) => {
        fetch("http://localhost:3000/todo-app/typed_todo_data/todoupdate", {
            method: "PUT",
            body: JSON.stringify({ id: id }),
            headers: { 
                "Content-type": "application/json",
                authorization: "Bearer " + localStorage.getItem("token")
            },
        }).then(async (res) => {
            const json = await res.json();
            if(json.msg==="Invalid0")
            {
                alert("Please, signin again.");
                localStorage.removeItem("token");
                navigate("/");
            }
            else
            {
                added();
                alert(json.msg);
            }
            
        });
        };
    
    const deleteid = (id) => {
            fetch("http://localhost:3000/todo-app/typed_todo_data/tododelete", {
                method: "DELETE",
                body: JSON.stringify({ id: id }),
                headers: { 
                    "Content-type": "application/json",
                    authorization: "Bearer " + localStorage.getItem("token")
                },
            }).then(async (res) => {
                const json = await res.json();
                if(json.msg==="Invalid0")
                {
                    alert("Please, signin again.");
                    localStorage.removeItem("token");
                    navigate("/");
                }
                else
                {
                    added();
                    alert(json.msg);
                }
                
            });
            };
return (
    <div className='w-full flex flex-col justify-center items-center'>
        {todo?.map((t) => {
        return (
        <div className=' w-2/3 h-48 my-2 rounded text-white bg-stone-800 flex hover:shadow-2xl '>

            <div className='w-2/3 flex flex-col '>
                <div className=' pt-5 pl-9 flex '>
                    <p className=' font-bold text-2xl'>TITLE :</p>
                    <p className=' pl-4 text-2xl  '>{t.title}</p>
                </div>

                <div className=' pt-3 pl-9 flex flex-col '>
                    <h1 className='font-bold text-xl'>DESCRIPTION :</h1>
                    <p className='h-24 pt-1 pl-3 break-words text-justify overflow-y-auto'>{t.description}</p>
                </div>
            </div>

            <div className='w-1/3 h-full flex flex-col justify-center items-center gap-8'>
            {t.completed!==true?<button onClick={() => {updateid(t._id);}}  className="text-black border-2 rounded border-slate-800  w-32 h-7 bg-green-300 hover:border-2  hover:border-white ">
                {t.completed == true ? "Completed" : "Done"}</button> :
            <></>
            }
            <button onClick={() => {deleteid(t._id);}} className="text-black border-2 rounded border-slate-800  w-32 h-7 bg-red-300 hover:border-2  hover:border-white">Delete</button>
            </div>
        </div>
        );
    })}
    </div>)
}
