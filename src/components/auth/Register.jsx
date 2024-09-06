import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  let navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      updateProfile(auth.currentUser, { displayName: name });
      navigate("/");
    } catch (err) {
      console.log(err);
      toast(err.code, { type: "error" });
    }
  };

  const handleGoogleSignup = () => {
    // Implement Google Signup logic here
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f8f9fa",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Register</h1>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px", display: "block", fontWeight: "bold" }}>Name</label>
          <input
            type="text"
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              border: "1px solid #ced4da",
              borderRadius: "4px",
            }}
            placeholder="Enter your Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px", display: "block", fontWeight: "bold" }}>Email</label>
          <input
            type="text"
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              border: "1px solid #ced4da",
              borderRadius: "4px",
            }}
            placeholder="Enter your email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px", display: "block", fontWeight: "bold" }}>Password</label>
          <input
            type="password"
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              border: "1px solid #ced4da",
              borderRadius: "4px",
            }}
            placeholder="Enter your password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={handleSignup}
        >
          Register
        </button>
        <button
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={handleGoogleSignup}
        >
          Sign Up with Google
        </button>
        <p
          style={{
            textAlign: "center",
            marginTop: "15px",
          }}
        >
          Already registered?{" "}
          <span
            style={{ color: "#007bff", cursor: "pointer" }}
            onClick={() => navigate("/signin")}
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
