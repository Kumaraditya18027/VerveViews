import React from 'react';
import "./ViewDiary.css"

function ViewDiary({ diary, onClose }) {
    const formatDate=(timestamp)=>{
        if (!timestamp) {
            return 'No date available';
        }
        
        const date = new Date(timestamp.seconds * 1000);
        return date.toDateString();
    }
    return (
        <div className="view-diary-overlay">
            <div className="view-diary-modal">
                <h2>{formatDate(diary.date)}</h2>
                <p>{diary.content}</p>
                {diary.imageURL && <img src={diary.imageURL} alt="Diary" className="view-diary-image" />}
                <button className="btn close-btn" onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default ViewDiary;
