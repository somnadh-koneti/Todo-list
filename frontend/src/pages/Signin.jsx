import { useEffect, useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useNavigate } from "react-router-dom"

export default function Signin({checkAuth}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [onbtn, setonbtn] = useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        if( username!=="" && password!=="" )
            {setonbtn(false)}
            else{setonbtn(true)}
    },[username,password])

    const logindata=()=>{
        fetch('http://localhost:3000/todo-app/userinfo/signin',{
            method : "POST",
            body :JSON.stringify({
                username: username,
                password: password,
                flag:1}),
            headers:{
                "Content-type" : "application/json"}
        })
        .then(async (res)=>{
            const json= await res.json();
            if(json.message==='VALID-DONE'){
                checkAuth();
                localStorage.setItem("token", json.token)
                navigate("/dashboard")
            }
            else{
                alert(json.message);
                
            }
        })
    }

    return <div className="bg-slate-300 h-screen flex  justify-center items-center ">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
            <Heading label={"Sign in"} />
            <SubHeading label={"Enter your credentials to access your account"} />
            <InputBox type={"text"} onChange={e => {setUsername(e.target.value);}} label={"Email"} value={username} />
            <InputBox type={"password"} onChange={e => {setPassword(e.target.value)}} label={"Password"} value={password}/>
            <div >
            <Button onClick={logindata} label={"Sign in"} status={onbtn} />
            </div>
            <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
            </div>
        </div>
}