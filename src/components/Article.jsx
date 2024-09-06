import { onSnapshot } from "firebase/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import DeleteArticle from "./DeleteArticle";
import { useAuthState } from "react-firebase-hooks/auth";
import LikeArticle from "./LikeArticle";
import { Link } from "react-router-dom";
import "./Article.css";

function Article() {
    const [user] = useAuthState(auth);
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const articleRef = collection(db, "Articles");
        const q = query(articleRef, orderBy("createdAt", "desc"));
        onSnapshot(q, (snapshot) => {
            const articles = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setArticles(articles);
        });
    }, []);

    return (
        <div className="article-grid" style={{marginTop:'70px'}}>
            {articles.length === 0 ? (
                <p>No Article found</p>
            ) : (
                articles.map((article) => (
                    <div className="article-card" key={article.id}>
                        <Link to={`/Full_page/${article.id}`}>
                            <img src={article.imageURL} alt="title" className="article-image" />
                        </Link>
                        <div className="article-content">
                            <div className="article-header">
                                {article.createdBy && (
                                    <span className="badge bg-primary">{article.createdBy}</span>
                                )}
                                {user && user.uid === article.userId && (
                                    <DeleteArticle id={article.id} imageURL={article.imageURL} />
                                )}
                            </div>
                            <h3 className="article-title">{article.title}</h3>
                            <p className="article-date">
                                {article.createdAt ? new Date(article.createdAt.seconds * 1000).toDateString() : "No date available"}
                            </p>
                            <p className="article-description">
                                {article.description.length > 100 ? `${article.description.substring(0, 100)}...` : article.description}
                            </p>
                        </div>
                        <div className="article-footer">
                            {user && <LikeArticle id={article.id} likes={article.likes} />}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default Article;
