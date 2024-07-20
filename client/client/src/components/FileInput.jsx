import React from 'react';
import './FileInputStyles.css'; // Import your CSS styles

const FileInput = ({ onChange }) => {
    return (
        <div className="file-input-container">
            <label className="file-input-label">
                <input
                    type="file"
                    className="file-input"
                    onChange={onChange}
                    multiple
                />
                <span className="custom-file-button">Choose Files</span>
            </label>
        </div>
    );
};

export default FileInput;