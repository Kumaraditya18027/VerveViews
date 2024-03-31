import React from "react";
import { Link } from "react-router-dom";
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth} from './../firebaseConfig'
import { signOut } from "firebase/auth";

function Navbar() {
    const [user]=useAuthState(auth);
    return (
        <div className="fixed-top-boorder" style={{ background: "whitesmoke" }}>
            <nav className="navbar">
                <div className="d-flex align-items-center">
                    <img src="logo192.png" width={30} height={30} alt="logo" className="ms-5" />
                    <Link className="nav-link ms-3" to="/">Home</Link>
                </div>
                <div>
                    {
                        user &&(
                            <>
                            <span className="pe-4">Signed in as {user.displayName}</span>
                            <button className="btn btn-primary" onClick={()=>{signOut(auth)}}>Logout</button>
                            </>
                        )
                    }
                </div>
            </nav>
        </div>
    );
}

export default Navbar;

// import React from "react";
// import { Link } from "react-router-dom";

// function Navbar()
// {
//     return(
//      <div className="fixed-top-boorder" style={{background:"whitesmoke"}}>
//         <nav className="navbar">
//             <div>
//                 <img src="logo192.png" width={30} height={30} alt="logo" className="ms-5"/>
//                 <Link className="nav-link" to="/">Home</Link>
//             </div>
//         </nav>
//      </div>
//     )
// }
// export default Navbar;