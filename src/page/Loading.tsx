import React from 'react';
import '../css/loading.css'

const Loading: React.FC = () => {
    return (
        <div className="loading-screen d-flex flex-column m-auto p-auto">
            <output className="spinner-border text-warning">
                <span className="visually-hidden">Loading...</span>
            </output>
        </div>
    );
}

export default Loading;
