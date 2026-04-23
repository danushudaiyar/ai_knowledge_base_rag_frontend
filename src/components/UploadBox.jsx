import { useState, useRef } from 'react';

const UploadBox = ({ onUpload }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles(files);
  };

  const handleUploadClick = () => {
    if (selectedFiles.length > 0 && onUpload) {
      onUpload(selectedFiles);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="upload-box">
      <div
        className={`upload-dropzone ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="upload-icon">📁</div>
        <p className="upload-text">
          Drag & drop files here or{' '}
          <span className="upload-browse" onClick={handleBrowseClick}>
            browse
          </span>
        </p>
        <p className="upload-subtext">Supported: PDF, DOCX, TXT, URLs</p>
        
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.docx,.txt"
          onChange={handleFileSelect}
          className="upload-input"
        />
      </div>

      {selectedFiles.length > 0 && (
        <div className="upload-files-list">
          <h4>Selected Files ({selectedFiles.length})</h4>
          <ul>
            {selectedFiles.map((file, index) => (
              <li key={index}>
                <span className="file-name">{file.name}</span>
                <span className="file-size">
                  {(file.size / 1024).toFixed(2)} KB
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        className="upload-button"
        onClick={handleUploadClick}
        disabled={selectedFiles.length === 0}
      >
        Upload {selectedFiles.length > 0 ? `(${selectedFiles.length})` : ''}
      </button>
    </div>
  );
};

export default UploadBox;
