import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export function CreateTodo({checkAuth, added }) {
    const navigate = useNavigate();
    const [title, settitle] = useState("");
    const [description, setdescription] = useState("");

    const [redtitle, setredtitle] = useState("");
    const [btn, setbtn] = useState("");

    if (title === "" && !redtitle) {
        setredtitle(true);
    }

    useEffect(() => {
        let val = setTimeout(() => {
            val_tdata();
        }, 1 * 1000);
        return () => {
            clearTimeout(val);
        };
    }, [title]);

    useEffect(() => {
        if (redtitle && title !== "") {
            setbtn(false);
        } else {
            setbtn(true);
        }
    }, [redtitle, title]);

    const val_tdata = () => {
        fetch("http://localhost:3000/todo-app/typed_todo_data/val_tdata", {
            method: "POST",
            body: JSON.stringify({ title: title }),
            headers: { "Content-type": "application/json" },
        }).then(async (res) => {
            const json = await res.json();
            if (json.message === "valid") {
                setredtitle(true);
            }
            if (json.message === "invalid") {
                if (title !== "") {
                    setredtitle(false);
                }
            }
        });
    };

    const postdata = () => {
        fetch("http://localhost:3000/todo-app/typed_todo_data/todoadd", {
            method: "POST",
            body: JSON.stringify({
                title: title,
                description: description,
            }),
            headers: {
                "Content-type": "application/json",
                authorization: "Bearer " + localStorage.getItem("token"),
            },
        }).then(async (res) => {
            const json = await res.json();
            if (json.msg === "Invalid0") {
                alert("Please, signin again.");
                localStorage.removeItem("token");
                navigate("/");
            } else {
                added();
                setdescription("");
                settitle("");
                alert(json.msg);
            }
        });
    };
    const logout = () => {
        fetch('http://localhost:3000/todo-app/userinfo/logout',{
            method : "POST",
            body :JSON.stringify({flag:0}),
            headers:{"Content-type" : "application/json"}
        })
        .then(async (res)=>{
            const json= await res.json();
            if(json.message==="Invalid"){alert("Refresh, and logout.")}
            if(json.message==="valid")
            {
                checkAuth();
                localStorage.removeItem("token");
                navigate("/");
            }
            
        })
    };
return (
    <div className="bg-stone-300 w-screen h-64 border-2 flex justify-center items-center flex-col gap-5 ">
        <div className="text-4xl font-bold  text-stone-700">TO-DO LIST</div>
        <button onClick={logout} className="absolute top-3 right-3 border-2 rounded border-black  w-40 h-9 text-white bg-red-700"> Log out</button>
            <div className="flex gap-3 w-full">
                <div className="flex justify-end" style={{"width" : "70%"}}>
                    <input className=" border-2 rounded border-slate-400 text-center h-12 text-2xl bg-sky-50 outline-none " style={{"width" : "57%"}} type="text" placeholder="title" onChange={(e) => {settitle(e.target.value)}} value={title}/>
                </div>
                {!redtitle && title != "" ?<p className=" w-1/5 text-red-600 text-bold text-xl">* Min 2char,Max 20char</p> : <></>}
            </div>
            <input className=" border-2 rounded border-slate-400 text-center w-2/5 h-12 text-xl bg-sky-50 outline-none" type="text" placeholder="description" onChange={(e) => {setdescription(e.target.value)}}value={description}/>
            <button disabled={btn} className=" border-2 rounded border-slate-400 text-center w-48 h-8 text-white bg-sky-500 hover:border-2  hover:border-white" onClick={postdata}>ADD TODO</button>
        </div>
    );
}
