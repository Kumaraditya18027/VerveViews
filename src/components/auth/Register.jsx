import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register()
{
    const [email,setEmail] = useState("");
    const[password,setPassword]=useState("");
    const[name,setName]=useState("");
    let navigate=useNavigate();
    const handleSignup=async()=>{
     try{
        await createUserWithEmailAndPassword(auth,email,password)
     updateProfile(auth.currentUser,{displayName:name})
     navigate("/");
     }
     catch(err){
        console.log(err);
        toast(err.code,{type:"error"});
     }
    }
   return (
    <div className="border p-3 bg-light" style={{marginTop:70}}>
        <h1>Register</h1>
        <div className="form-group" style={{marginBottom:"10px"}}>
            <label style={{paddingRight:30,display:"block",marginBottom:7}}>Name</label>
            <input type="text" className="form control" placeholder="Enter your Name" style={{display:"inline-block", style:"720px"}} onChange={(e)=>{
            setName(e.target.value)
            }}></input>
        </div>
        <div className="form-group" style={{marginBottom:"10px"}}>
            <label style={{paddingRight:30,display:"block",marginBottom:7}}>Email</label>
            <input type="text" className="form control" placeholder="Enter your email" onChange={(e)=>{
                setEmail(e.target.value)
            }}></input>
        </div>
        <div className="form-group"style={{marginBottom:"10px"}}>
            <label style={{paddingRight:30,display:"block",marginBottom:7}}>Password</label>
            <input type="password" className="form control" placeholder="Enter your password" onChange={(e)=>{
                setPassword(e.target.value)
            }}></input>
        </div>
        <br></br>
        <button  className="btn btn-primary" onClick={handleSignup}>Register</button>
    </div>
   )
}
export default Register;