import { useState,useEffect } from "react";
import Todoren from "./Todoren";

export function DisplayTodo({todo,added}) {

// const todo=useRecoilValue(displayval); 
const [cmp,setcmp]=useState([]);
const [incmp,setincmp]=useState([]);

useEffect(() => {

    setcmp(todo.reverse().filter(t => t.completed));
    setincmp(todo.filter(t => !t.completed));

    }, [todo]); 

return (
    <div className=" flex h-full  ">

        <div className="bg-rose-50 w-1/2  overflow-y-auto">
            <div className=" bg-stone-800 text-white text-2xl h-12 w-full font-bold pt-2 text-stone-700 text-center sticky top-0">TO-DO PENDING</div>
            <Todoren todo={incmp} added={added}/>
        </div>

        <div className="bg-sky-50 w-1/2  overflow-y-auto">
            <div className="bg-stone-800 text-white text-2xl h-12 w-full font-bold pt-2 text-stone-700 text-center sticky top-0 ">TO-DO COMPLETED</div>
            <Todoren todo={cmp} added={added}/>
        </div>

        

    </div>
    );
}
