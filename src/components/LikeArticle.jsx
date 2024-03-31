import React from "react";
import { auth, db } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

function LikeArticle({id,likes})
{
    const [user]=useAuthState(auth)
    const likesRef=doc(db,'Articles',id);
    const handleLike=()=>{
        if(likes?.includes(user.uid)){
            updateDoc(likesRef,{
                likes:arrayRemove(user.uid),
            }).then(()=>{
                console.log("Unliked ho Gaya, maja aa gaya");
            }).catch((err)=>{
                console.log(err);
            })
        }
        else{
            updateDoc(likesRef,{
                likes:arrayUnion(user.uid)
            }).then(()=>{
                console.log("Liked Successfully,Ho gaya");
            }).catch((err)=>{
                console.log(err);
            });
             
        }

    }
   return(
    <div style={{ display: "flex", alignItems: "center" }}>
  <i
    className={`fa fa-heart${!likes?.includes(user.uid) ? "-o" : ""} fa-lg`}
    style={{
      cursor: "pointer",
      color: likes?.includes(user.uid) ? "red" : null,
      marginRight: "5px", 
    }}
    onClick={handleLike}
  />
  <p style={{ margin: "0" }}>{likes.length}</p>
</div>

   )
}
export default LikeArticle;
