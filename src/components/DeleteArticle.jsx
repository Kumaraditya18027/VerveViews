import { deleteDoc,doc } from "firebase/firestore";
import React from "react";
import { storage,db} from "../firebaseConfig";
import {toast } from 'react-toastify'
import { deleteObject,ref } from "firebase/storage";


function DeleteArticle({id,imageURL}){

    const handleDelete=async()=>{
      if(window.confirm("Are you sure to delete this article")){
         try{
            await deleteDoc(doc(db,"Articles",id))
            toast("Article Deleted  successfully",{type:"success"});
            const storageRef=ref(storage,imageURL)
            await deleteObject(storageRef);
         }
         catch(err)
         {
            toast("Error deleting Aritcle",{type:"error"})
            console.log(err);
         }
      }
      
    }
    return(
        <div>
           <i className="fa fa-times" onClick={handleDelete} 
           style={{
            cursor:"pointer",
           }}/>
        </div>
    )
}

export default DeleteArticle;