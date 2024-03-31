// import { Timestamp, addDoc, collection } from "firebase/firestore";
// import React, { useState } from "react";
// import { storage,db } from "../firebaseConfig";
// import {ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
// import { toast } from "react-toastify";

// function AddArticle()
// {
//     const [FormData,setFormData]=useState({
//         title:"",
//         description:"",
//         image:"",
//         createdAt:Timestamp.now().toDate()
//     });
//     const[progress,setProgress]=useState(0);
//     const handleChange=(e)=>{
//      setFormData({...FormData,[e.target.name]:[e.target.value]})
//     };
//     const handleImageChange=(e)=>{
//         setFormData({...FormData, image: e.target.files[0]})
//     };
//     const handlePublish =() =>{
//         if(!FormData.title || !FormData.description || !FormData.image){
//             alert("Please fill all the vlaues")
//             return;
//         }
//         const storageRef =ref(
//             storage,`/images/${Date.now()}${FormData.image.name}`
//         );

//         const uploadImage=uploadBytesResumable(storageRef,FormData.image);
//         uploadImage.on("state_changed",(snapshot)=>{
//             const progressPercent=Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);
//             setProgress(progressPercent);
//         },(err)=>{
//             console.log(err)
//         },()=>{
//             setFormData({
//                 title:"",
//                 description:"",
//                 image:"",
//             });
//         });
//         getDownloadURL(uploadImage.snapshot.ref).then((url) =>{
//            const articleRef=collection(db,"Articles");
//            addDoc(articleRef,
//            {
//             title: FormData.title,
//             description: FormData.description,
//             imageURL:url,
//             createdAt:Timestamp.now.toDate(),

//            }).then(()=>{
//             toast("Article Added successfully",{type:"success"});
//             setProgress(0);
//            })
//            .catch(()=>{
//             toast("Error in adding article",{type:"error"})
//            });
//            });
//         };

//     return(
//         <div className="border p-3 mt-3 bg-light" style={{position:"fixed"}}>
//             <h2>Create Aricle</h2>
//             <div className="form-group">
//             <label htmlFor="">Title</label>
//             <input type='text' name='title' className="form-control" value={FormData.title} onChange={(e)=>handleChange(e)}/>
//             </div>
//             <label htmlFor="">Description</label>
//             <textarea name="description" className="from-control" value={FormData.description} onChange={(e)=>handleChange(e)}/>
//             <label hmtlfor="">Image</label>
//             <input type='file' name='image' accept="image/*" className="form-control" onChange={(e)=>handleImageChange(e)}/>
//             {progress===0?null:(           
//                 <div className="progress">
//                 <div className="progress-bar progress-bar-stripped mt-2" style={{width:`${progress}%`}}>
//                     {`uploading image ${progress}` }
//                 </div>
//             </div>)}
//             <button className="form-control" onClick={handlePublish}>Publish</button>
//         </div>
//     )
// }

// export default AddArticle;


import { Timestamp, addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { storage, db,auth } from "../firebaseConfig";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";

function AddArticle() {
    const[user]=useAuthState(auth);
    const [FormData, setFormData] = useState({
        title: "",
        description: "",
        image: "",
        createdAt: Timestamp.now().toDate()
    });
    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        setFormData({ ...FormData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...FormData, image: e.target.files[0] });
    };

    const handlePublish = () => {
        if (!FormData.title || !FormData.description || !FormData.image) {
            alert("Please fill all the values");
            return;
        }

        const storageRef = ref(storage, `/images/${Date.now()}${FormData.image.name}`);
        const uploadImage = uploadBytesResumable(storageRef, FormData.image);

        uploadImage.on("state_changed", (snapshot) => {
            const progressPercent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgress(progressPercent);
        }, (error) => {
            console.error("Error uploading image:", error);
            toast.error("Error uploading image");
        }, () => {
            // Upload complete
            getDownloadURL(uploadImage.snapshot.ref).then((url) => {
                const articleRef = collection(db, "Articles");
                addDoc(articleRef, {
                    title: FormData.title,
                    description: FormData.description,
                    imageURL: url,
                    createdAt: Timestamp.now(),
                    createdBy:user.displayName,
                    userId:user.uid,
                    likes:[],
                    comments:[],
                }).then(() => {
                    toast.success("Article added successfully");
                    setFormData({
                        title: "",
                        description: "",
                        image: "",
                    });
                    setProgress(0);
                }).catch((error) => {
                    console.error("Error adding article:", error);
                    toast.error("Error adding article");
                });
            }).catch((error) => {
                console.error("Error getting download URL:", error);
                toast.error("Error getting download URL");
            });
        });
    };

    return (
        <div className="border p-3 mt-3 bg-light" style={{ position: "fixed" }}>
            {
                !user ?
                <>
                <h2>
                <Link to="/signin">Login to Publish Articles</Link>
                </h2>
                Don't Have an account? <Link to="/register">signup</Link>
                </>:
                <>
                <h2>Create Article</h2>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" name="title" className="form-control" value={FormData.title} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea name="description" className="form-control" value={FormData.description} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="image">Image</label>
                <input type="file" name="image" accept="image/*" className="form-control" onChange={handleImageChange} />
            </div>
            {progress > 0 && (
                <div className="progress">
                    <div className="progress-bar progress-bar-striped" role="progressbar" style={{ width: `${progress}%` }}>
                        {`Uploading image ${progress}%`}
                    </div>
                </div>
            )}
            <button className="btn btn-primary mt-2" onClick={handlePublish}>Publish</button>
            </>

            }

        </div>
    );
}

export default AddArticle;
