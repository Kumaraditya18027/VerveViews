import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
function Login()
{
    let navigate=useNavigate();
    const [email,setEmail] = useState("");
    const[password,setPassword]=useState("");
    const handleLogin=async()=>{
        try{
           await signInWithEmailAndPassword(auth,email,password)
            navigate("/");
        }
        catch(err){
           console.log(err);
           toast(err.code,{type:"error"});
        }
       }
    return(
        <div className="border p-3 bg-light mx-auto">
          <h1>Login</h1>
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
        <button  className="btn btn-primary" onClick={handleLogin}>LogIn</button>

        </div>
    )

}

export default Login;