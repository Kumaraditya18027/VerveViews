import React, { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from '../firebaseConfig';
import DiaryCard from './DiaryCard';
import ViewDiary from './ViewDiary';
import PublishDiary from './PublishDiary';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./MyDiary.css"
import { FaTrashAlt } from 'react-icons/fa';

function MyDiary() {
    const [user] = useAuthState(auth);
    const [diaries, setDiaries] = useState([]);
    const [selectedDiary, setSelectedDiary] = useState(null);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [isPublishOpen, setIsPublishOpen] = useState(false);

    useEffect(() => {
        if (user) {
            const diariesRef = collection(db, 'Diaries');
            const q = query(diariesRef, where('userId', '==', user.uid));
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const diariesList = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setDiaries(diariesList);
            });

            return () => unsubscribe();
        }
    }, [user]);

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'Diaries', id));
            toast.success('Diary deleted successfully');
        } catch (error) {
            toast.error('Error in deleting Diary');
            console.error('Error deleting diary:', error);
        }
    };

    return (
        <div className="my-diary-container">
            <ToastContainer/>
            {diaries.map(diary => (
                <DiaryCard
                    key={diary.id}
                    diary={diary}
                    onView={() => { setSelectedDiary(diary); setIsViewOpen(true); }}
                    onDelete={() => handleDelete(diary.id)}
                    onPublish={() => { setSelectedDiary(diary); setIsPublishOpen(true); }}
                />
            ))}
            {isViewOpen && <ViewDiary diary={selectedDiary} onClose={() => setIsViewOpen(false)} />}
            {isPublishOpen && <PublishDiary diary={selectedDiary} onClose={() => setIsPublishOpen(false)} />}
        </div>
    );
}

export default MyDiary;
