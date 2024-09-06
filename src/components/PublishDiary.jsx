import React, { useState } from 'react';
import { db, storage } from '../firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';
import "./PublishDiary.css";


function PublishDiary({ diary, onClose }) {
    const [user] = useAuthState(auth);
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const handlePublish = async () => {
        if (!title || !diary.content) {
            toast.error("Please fill all the values.");
            return;
        }

        setLoading(true);
        let imageURL = '';

        try {
            if (image) {
                const storageRef = ref(storage, `articleImages/${user.uid}/${Date.now()}_${image.name}`);
                const uploadTask = uploadBytesResumable(storageRef, image);

                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        const progressPercent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                        setProgress(progressPercent);
                    },
                    (error) => {
                        console.error("Image upload failed:", error);
                        toast.error("Image upload failed.");
                        setLoading(false);
                    },
                    async () => {
                        imageURL = await getDownloadURL(uploadTask.snapshot.ref);
                        await addDoc(collection(db, 'Articles'), {
                            title: title,
                            description: diary.content,
                            imageURL: imageURL,
                            createdAt: Timestamp.now(),
                            createdBy: user.displayName,
                            userId: user.uid,
                            likes: [],
                            comments: [],
                        });
                        toast.success("Diary published successfully!");
                        setLoading(false);
                        onClose();
                    }
                );
            } else {
                await addDoc(collection(db, 'Articles'), {
                    title: title,
                    description: diary.content,
                    imageURL: '',
                    createdAt: Timestamp.now(),
                    createdBy: user.displayName,
                    userId: user.uid,
                    likes: [],
                    comments: [],
                });
                toast.success("Diary published successfully!");
                setLoading(false);
                onClose();
            }
        } catch (error) {
            console.error("Error publishing diary:", error);
            toast.error("Error publishing diary.");
            setLoading(false);
        }
    };

    return (
        <div className="publish-diary-overlay">
            <ToastContainer/>
            <div className="publish-diary-modal">
                <h2>Publish Diary as Article</h2>
                <input
                    type="text"
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                />
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
                <button className="btn publish-btn" onClick={handlePublish} disabled={loading}>
                    {loading ? 'Publishing...' : 'Publish'}
                </button>
                <button className="btn close-btn" onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default PublishDiary;
