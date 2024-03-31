import { onSnapshot } from "firebase/firestore";
import { collection,orderBy,query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {auth, db} from "../firebaseConfig";
import DeleteArticle from "./DeleteArticle";
import { useAuthState } from "react-firebase-hooks/auth";
import LikeArticle from "./LikeArticle";
import { Link } from "react-router-dom";
function Article()
{
    const [user]=useAuthState(auth);
    const [articles,setArticles]=useState([])
    useEffect(()=>{
        const articleRef=collection(db,"Articles");
        const q=query(articleRef,orderBy("createdAt","desc"));
        onSnapshot(q,(snapshot)=>{
            const articles=snapshot.docs.map((doc)=>({
             id:doc.id,
             ...doc.data(),
            }));
            setArticles(articles);
            console.log(articles);
        })

    },[]);
    function logCreatedDate(createdDate) {
        if (createdDate) {
            console.log(createdDate.toDate().toString());
        } else {
            console.log("Created date is not available");
        }
    }

    return(
        <div className="container border bg-light" style={{marginTop:70}}>
            { (articles.length===0) ? (<p>No Article found</p>)
            :(articles.map((articles) => (
                <div className="border mt-3 p-3 bg-light" key={articles.id}>
                    <div className="row">
                        <div className="col-3">
                            <Link to={`/Full_page/${articles.id}`}>
                            <img src={articles.imageURL}  alt='title' style={{height:180,width:180}}></img>
                            </Link>
                        </div>
                        <div className="col-9 ps-3">
                            <div className="row">
                                <div className="col-6">
                                    {
                                      articles.createdBy && (<span className="badge bg-primary">{articles.createdBy}</span>)
                                    }
                                </div>
                                <div className="col-5 d-flex flex-row-reverse">
                                    {
                                        user && user.uid===articles.userId && (<DeleteArticle id={articles.id} imageURL={articles.imageURL}></DeleteArticle>
                                        )
                                    }
                                </div>
                            </div>
                            <h2>{articles.title}</h2>
                            {/* {logCreatedDate(createdAt)} */}
                            {/* <p>{createdAt.toDate().toString()}</p> */}
                            <p>{articles.createdAt ? new Date(articles.createdAt.seconds * 1000).toDateString() : "No date available"}</p>
                            <h4>{articles.description}</h4>
                            <div>
                                {user && <LikeArticle id={articles.id} likes={articles.likes}></LikeArticle>}
                            </div>
                         </div>
                    </div>
                </div>
            )))}
          
        </div>
    );
}

export default Article;