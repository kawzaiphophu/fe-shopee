import React from 'react';
import '../css/loading.css'

const Loading: React.FC = () => {
    return (
        <div className="loading-screen d-flex flex-column m-auto p-auto">
            <span className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
                
            </span>
        </div>
    );
}

export default Loading;
