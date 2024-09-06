import React, { useState } from 'react';
import { db, storage, auth } from '../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './DiaryPage.css';

function DiaryPage() {
    const [user] = useAuthState(auth);
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);   
    const [loading, setLoading] = useState(false);

    const handleSaveDiary = async () => {
        setLoading(true);
        let imageURL = '';

        // Upload image if selected
        if (image) {
            const storageRef = ref(storage, `diaryImages/${user.uid}/${image.name}`);
            const uploadTask = uploadBytesResumable(storageRef, image);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    // Handle progress (optional)
                },
                (error) => {
                    console.error("Image upload failed:", error);
                    toast.error("Failed to upload image. Please try again.");
                    setLoading(false);
                },
                async () => {
                    imageURL = await getDownloadURL(uploadTask.snapshot.ref);
                    saveDiaryToFirestore(imageURL);
                }
            );
        } else {
            saveDiaryToFirestore(imageURL);
        }
    };

    const saveDiaryToFirestore = async (imageURL) => {
        try {
            await addDoc(collection(db, 'Diaries'), {
                userId: user.uid,
                date: new Date(),
                content: content,
                imageURL: imageURL,
            });
            toast.success("Diary saved successfully!");
            setContent('');
            setImage(null);
        } catch (error) {
            console.error("Error saving diary:", error);
            toast.error("Failed to save diary. Please try again.");
        }
        setLoading(false);
    };

    return (
        <div className="diary-container">
            <ToastContainer />
            <div className="diary-header">
                {new Date().toDateString()}
            </div>
            <textarea
                className="diary-content"
                placeholder="Write your diary here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <div className="diary-actions">
                <input
                    type="file"
                    id="imageUpload"
                    style={{ display: 'none' }}
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <label htmlFor="imageUpload" className="image-upload-btn">
                    Add Image
                </label>
                <button onClick={handleSaveDiary} className="save-btn" disabled={loading}>
                    {loading ? "Saving..." : "Save"}
                </button>
            </div>
        </div>
    );
}

export default DiaryPage;
