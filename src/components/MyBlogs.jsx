import { onSnapshot, collection, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db, auth } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import DeleteArticle from "./DeleteArticle";
import "./MyBlog.css"
function MyBlogs() {
    const [user] = useAuthState(auth);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        if (user) {
            const blogsRef = collection(db, "Articles");
            const q = query(blogsRef, where("userId", "==", user.uid));
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const blogsList = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setBlogs(blogsList);
            });

            return () => unsubscribe();
        }
    }, [user]);

    return (
        <div className="my-blogs-container">
            {blogs.length === 0 ? (
                <p>No blogs found</p>
            ) : (
                blogs.map((blog) => (
                    <div className="card" key={blog.id}>
                        <img src={blog.imageURL} alt={blog.title} className="card-image" />
                        <div className="card-body">
                            <h3 className="card-title">{blog.title}</h3>
                            <p className="card-description">
                                {blog.description.length > 100
                                    ? blog.description.substring(0, 100) + "..."
                                    : blog.description}
                            </p>
                            <div className="card-footer">
                                <span className="card-date">
                                    {blog.createdAt ? new Date(blog.createdAt.seconds * 1000).toDateString() : "No date available"}
                                </span>
                                <DeleteArticle id={blog.id} imageURL={blog.imageURL} className="delete-btn" />
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default MyBlogs;
