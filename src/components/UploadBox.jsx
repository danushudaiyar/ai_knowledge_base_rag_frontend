import { useState, useRef } from 'react';
import { uploadFiles } from '../services/api';

const UploadBox = ({ onUpload, onUploadSuccess, onUploadError }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    setError(null);
    setSuccessMessage(null);
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
    setError(null);
    setSuccessMessage(null);
  };

  const handleUploadClick = async () => {
    if (selectedFiles.length === 0) return;

    setIsUploading(true);
    setError(null);
    setSuccessMessage(null);
    setUploadProgress(0);

    try {
      // Call custom onUpload if provided
      if (onUpload) {
        await onUpload(selectedFiles);
      }

      // Upload files via API
      const results = await uploadFiles(selectedFiles);
      
      setUploadProgress(100);
      
      // Success callback
      if (onUploadSuccess) {
        onUploadSuccess(results);
      }

      // Show success message
      const fileCount = selectedFiles.length;
      setSuccessMessage(`Successfully uploaded ${fileCount} file${fileCount > 1 ? 's' : ''}!`);

      // Clear selected files after successful upload
      setSelectedFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      // Auto-hide success message after 5 seconds
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (err) {
      console.error('Upload failed:', err);
      setError(err.message || 'Failed to upload files. Please try again.');
      
      // Error callback
      if (onUploadError) {
        onUploadError(err);
      }
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
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

      {error && (
        <div className="upload-error">
          <span className="error-icon">⚠️</span>
          <span className="error-message">{error}</span>
        </div>
      )}

      {successMessage && (
        <div className="upload-success">
          <span className="success-icon">✅</span>
          <span className="success-message">{successMessage}</span>
        </div>
      )}

      {isUploading && uploadProgress > 0 && (
        <div className="upload-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <span className="progress-text">{uploadProgress}%</span>
        </div>
      )}

      <button
        className="upload-button"
        onClick={handleUploadClick}
        disabled={selectedFiles.length === 0 || isUploading}
      >
        {isUploading ? (
          <>
            <span className="loading-spinner">⏳</span>
            Uploading...
          </>
        ) : (
          <>Upload {selectedFiles.length > 0 ? `(${selectedFiles.length})` : ''}</>
        )}
      </button>
    </div>
  );
};

export default UploadBox;
