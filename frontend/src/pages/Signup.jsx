import { useEffect, useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useNavigate } from "react-router-dom"

export default function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const [redfname,setredfname]=useState(true);
    const [redlname,setredlname]=useState(true);
    const [reduname,setreduname]=useState(true);
    const [redpswd,setredpswd]=useState(true);
    const [redemail,setredemail]=useState(true);

    const [onbtn, setonbtn] = useState('');

    useEffect(()=>{let val1=setTimeout(()=>{ validation("fname");},2*1000); return ()=>{clearTimeout(val1)}},[firstName])
    useEffect(()=>{let val2=setTimeout(()=>{ validation("lname");},2*1000); return ()=>{clearTimeout(val2)}},[lastName])
    useEffect(()=>{let val3=setTimeout(()=>{ validation("uname");},2*1000); return ()=>{clearTimeout(val3)}},[username])
    useEffect(()=>{let val4=setTimeout(()=>{ validation("pswd");},1*1000); return ()=>{clearTimeout(val4)}},[password])
    useEffect(()=>{
        if(redemail===true && redfname===true && redlname===true && reduname===true 
            && redpswd===true && firstName!=="" && lastName!=="" && username!=="" && password!=="" )
            {setonbtn(false)}
            else{setonbtn(true)}
    },[redemail,redfname,redlname,redpswd,reduname,firstName,lastName,username,password])


    if(firstName==='' && !redfname){setredfname(true)}
    if(lastName==='' && !redlname){setredlname(true)}
    if(username==='' && !reduname){setreduname(true)}
    if(username==='' && !redemail){setredemail(true)}
    if(password==='' && !redpswd){setredpswd(true)}

    const signupdata=()=>{
        fetch('http://localhost:3000/todo-app/userinfo/signup',{
            method : "POST",
            body :JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                username: username,
                password: password }),
            headers:{
                "Content-type" : "application/json"}
        })
        .then(async (res)=>{
            const json= await res.json();
            if(json.message==='VALID-DONE'){
                alert("Account created.");
                navigate("/")
            }
        })
    }

    const validation=(value)=>{
        fetch("http://localhost:3000/todo-app/typed_data_validation/" + value,{
            method : "POST",
            body :JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                username: username,
                password: password }),
            headers:{
                "Content-type" : "application/json"}
        })
        .then(async (res)=>{
            const json= await res.json();
            if( json.value==="fname")
            {
                if(json.message==="1" ){setredfname(true)}
                else{if(firstName!==""){setredfname(false);}}
            }
            if( json.value==="lname")
            {
                if(json.message==="1"){ setredlname(true)}
                else{if(lastName!==""){setredlname(false);}}
            }
            if( json.value==="uname")
            {
                if(json.message==="1"){setreduname(true);setredemail(true)}
                if(json.message==="2"){setredemail(false);setreduname(true)}
                if(json.message==="0" && username!==''){setreduname(false)}
            }
            if( json.value==="pswd")
            {
                if(json.message==="1"){ setredpswd(true)}
                else{ if(password!==''){setredpswd(false);}}
            }
            
        })
    }
    return( <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4" >
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />

        <InputBox  type={"text"} onChange={e => {setFirstName(e.target.value);}}  label={"First Name"} value={firstName}/>
        { !redfname && firstName!="" ? <div className="text-sm font-medium text-left py-2 text-red-500">* Min 3char, Max 12char.</div>:<></>}
        <InputBox type={"text"} onChange={e => {setLastName(e.target.value);}}  label={"Last Name"} value={lastName}/>
        { !redlname && lastName!="" ? <div className="text-sm font-medium text-left py-2 text-red-500">* Min 2char, Max 12char.</div>:<></>}
        <InputBox type={"text"} onChange={e => {setUsername(e.target.value);}} label={"Email"} value={username}/>
        { !reduname && username!="" ? <div className="text-sm font-medium text-left py-2 text-red-500">* Enter vaild email.</div>: !redemail && username!="" ? <div className="text-sm font-medium text-left py-2 text-red-500">* Email already taken!.</div>:<></>}
        <InputBox type={"text"} onChange={e => {setPassword(e.target.value);}} label={"Password"} value={password}/>
        { !redpswd && password!="" ?<div className="text-sm font-medium text-left py-2 text-red-500">* Min 1(uppercase, lowercase, number, special char), Min 8char, Max 32char.</div>:<></>}
        <div >
            <Button onClick={signupdata} label={"Sign up"} status={onbtn} />
        </div>
        
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/"} />
        </div>
    </div>
    </div>)
}