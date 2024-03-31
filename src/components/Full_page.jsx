import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import LikeArticle from "./LikeArticle";

function Full_page()
{
   const {id} =useParams();
   const [article,setArticles]=useState(null);
   const[user]=useAuthState(auth);
   //Bhai useEffect ka do argument ek callback function,ek dependency array, yaad rakhan
   useEffect(()=>{
    const docRef=doc(db,"Articles",id);
    onSnapshot(docRef,(snapshot)=>{
      setArticles({...snapshot.data(),id:snapshot.id});
    })
   })


    return(
        <div className="conatiner border bg-light" style ={{marginTop:70,position:"relative"}}>
         {
            article && (   
            <div className="row">
                <div className="col-3">
                <img 
                    src={article.imageURL} alt={article.title}
                    style={{width:'100%',padding:10}}
                    />
                
                </div>
                <div className="col-9 mt-3">
                    
                        <h2>{article.title}</h2>
                        <h5>Author :{article.createdBy}</h5>
                        <div>Posted On:{article.createdAt.toDate().toDateString()}</div>
                        <hr/>
                        <h4>{article.description}</h4>
                        <div style={{ display: 'flex', alignItems: 'center', position: 'absolute', bottom: 2, right: 5 }}>
                            {user && <LikeArticle id={id} likes={article.likes} />}
                            {/* <p style={{ marginLeft: 5 ,marginTop:11}}>{article.likes.length}</p> */}
                        </div>
                        <div>
                        </div>
                </div>
            </div>
            )}
    </div>
       
    )
}

export default  Full_page;