import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './../firebaseConfig';
import { signOut } from "firebase/auth";
import "./Navbar.css";
import { FaPen, FaBook } from 'react-icons/fa';

function Navbar() {
    const [user] = useAuthState(auth);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const getInitials = (name) => {
        return name ? name.slice(0, 2).toUpperCase() : '';
    };

    const toggleDropdown = () => {
        setDropdownOpen(prev => !prev);
        console.log("DropDown is Clicked");
    };

    const handleSignOut = () => {
        signOut(auth);
    };

    return (
        <div className="navbar-container">
            <nav className="navbar">
                <div className="navbar-left"style={{marginLeft:'37px'}}>
                    <img src="logo.png" width={30} height={30} alt="logo" className="logo" />
                    <Link className="nav-link" to="/">Home</Link>
                </div>
                <div className="navbar-right">
                    {user ? (
                        <>
                            <FaPen className="icon" />
                            <Link className="nav-link" to="/AddArticle">Blogs</Link>
                            <FaBook className="icon ms-3" />
                            <Link className="nav-link" to="/DiaryPage">Diary</Link>
                            <Link className="nav-link" to="/MyBlogs">MyBlogs</Link>
                            <Link className="nav-link" to="/MyDiary">MyDiary</Link>
                            <div className="user-icon ms-3" onClick={toggleDropdown}>
                                {getInitials(user.displayName)}
                            </div>
                            <button className="btn btn-primary ms-3" onClick={handleSignOut}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link className="btn btn-secondary" to="/signin">Login</Link>
                            <Link className="btn btn-primary ms-2" to="/register">Sign Up</Link>
                        </>
                    )}
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
