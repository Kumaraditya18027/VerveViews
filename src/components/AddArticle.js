import { Timestamp, addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { storage, db, auth } from "../firebaseConfig";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import "./AddArticle.css";

function AddArticle() {
    const [user] = useAuthState(auth);
    const [FormData, setFormData] = useState({
        title: "",
        description: "",
        image: null,
        createdAt: Timestamp.now().toDate()
    });
    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        setFormData({ ...FormData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...FormData, image: e.target.files[0] });
    };

    const handleFileClick = () => {
        document.getElementById('image-upload').click();
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
                    createdBy: user.displayName,
                    userId: user.uid,
                    likes: [],
                    comments: [],
                }).then(() => {
                    toast.success("Article added successfully");
                    setFormData({
                        title: "",
                        description: "",
                        image: null,
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
        <div className="add-article-container">
            {!user ? (
                <div className="login-prompt">
                    <h2><Link to="/signin">Login to Publish Articles</Link></h2>
                    <p>Don't Have an account? <Link to="/register">Sign up</Link></p>
                </div>
            ) : (
                <div className="whole-section">
                    <h2>Create Article</h2>
                    <div className="form-group">
                        <input
                            type="text"
                            name="title"
                            className="form-control title-input"
                            placeholder="Title"
                            value={FormData.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            name="description"
                            className="form-control description-input"
                            placeholder="Description"
                            value={FormData.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group file-upload">
                        <input
                            type="file"
                            id="image-upload"
                            name="image"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={handleImageChange}
                        />
                        <button
                            className="btn btn-secondary add-file-btn"
                            onClick={handleFileClick}
                        >
                            Add File
                        </button>
                        {progress > 0 && (
                            <div className="progress">
                                <div
                                    className="progress-bar progress-bar-striped"
                                    role="progressbar"
                                    style={{ width: `${progress}%` }}
                                >
                                    {`Uploading image ${progress}%`}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="button-group">
                        <button className="btn btn-primary submit-btn" onClick={handlePublish}>Publish</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddArticle;
