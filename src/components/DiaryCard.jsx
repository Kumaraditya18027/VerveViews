import React from 'react';
import { FaEye, FaPen, FaTrashAlt } from 'react-icons/fa';
import './DiaryCard.css'; // Ensure you import the CSS file

function DiaryCard({ diary, onView, onDelete, onPublish }) {
    const formatDate = (timestamp) => {
        // Check if timestamp exists
        if (!timestamp) {
            return 'No date available';
        }
        
        // Handle Firestore timestamp format
        const date = new Date(timestamp.seconds * 1000);
        return date.toDateString();
    };

    return (
        <div className="diary-card-container">
            <div className="diary-card">
                <div className="diary-icon">📖</div>
                <div className="diary-date">{formatDate(diary.date)}</div>
                <div className="diary-actions">
                    <button className="btn view-btn" onClick={onView} style={{backgroundColor:"Cyan"}}><FaEye /> View</button>
                    <button className="btn publish-btn" onClick={onPublish}><FaPen /> Publish</button>
                    <button className="btn delete-btn" onClick={onDelete}style={{backgroundColor:"red"}}><FaTrashAlt /> Delete</button>
                </div>
            </div>
        </div>
    );
}

export default DiaryCard;
