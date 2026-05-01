import { useState, useRef } from 'react';
import { uploadFiles, documentAPI } from '../services/api';

const UploadBox = ({ onUpload, onUploadSuccess, onUploadError }) => {
  const [uploadMode, setUploadMode] = useState('file'); // 'file' or 'url'
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [urlInput, setUrlInput] = useState('');
  const [urlList, setUrlList] = useState([]);
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

  const handleAddUrl = () => {
    if (!urlInput.trim()) return;
    
    // Basic URL validation
    try {
      new URL(urlInput);
      setUrlList([...urlList, urlInput.trim()]);
      setUrlInput('');
      setError(null);
    } catch (err) {
      setError('Please enter a valid URL');
    }
  };

  const handleRemoveUrl = (index) => {
    setUrlList(urlList.filter((_, i) => i !== index));
  };

  const handleUrlKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddUrl();
    }
  };

  const handleUploadClick = async () => {
    if (uploadMode === 'file' && selectedFiles.length === 0) return;
    if (uploadMode === 'url' && urlList.length === 0) return;

    setIsUploading(true);
    setError(null);
    setSuccessMessage(null);
    setUploadProgress(0);

    try {
      let results;
      
      if (uploadMode === 'file') {
        // Call custom onUpload if provided
        if (onUpload) {
          await onUpload(selectedFiles);
        }

        // Upload files via API
        results = await uploadFiles(selectedFiles);
      } else {
        // Upload URLs via API
        results = await documentAPI.uploadFromUrl({ urls: urlList });
      }
      
      setUploadProgress(100);
      
      // Success callback
      if (onUploadSuccess) {
        onUploadSuccess(results);
      }

      // Show success message
      const count = uploadMode === 'file' ? selectedFiles.length : urlList.length;
      const type = uploadMode === 'file' ? 'file' : 'URL';
      setSuccessMessage(`Successfully uploaded ${count} ${type}${count > 1 ? 's' : ''}!`);

      // Clear inputs after successful upload
      if (uploadMode === 'file') {
        setSelectedFiles([]);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        setUrlList([]);
      }

      // Auto-hide success message after 5 seconds
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (err) {
      console.error('Upload failed:', err);
      setError(err.message || 'Failed to upload. Please try again.');
      
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
      {/* Upload Mode Tabs */}
      <div className="upload-tabs">
        <button
          className={`upload-tab ${uploadMode === 'file' ? 'active' : ''}`}
          onClick={() => {
            setUploadMode('file');
            setError(null);
          }}
        >
          📁 File Upload
        </button>
        <button
          className={`upload-tab ${uploadMode === 'url' ? 'active' : ''}`}
          onClick={() => {
            setUploadMode('url');
            setError(null);
          }}
        >
          🔗 URL Upload
        </button>
      </div>

      {/* File Upload Mode */}
      {uploadMode === 'file' && (
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
          <p className="upload-subtext">Supported: PDF, DOCX, TXT</p>
          
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.docx,.txt"
            onChange={handleFileSelect}
            className="upload-input"
          />
        </div>
      )}

      {/* URL Upload Mode */}
      {uploadMode === 'url' && (
        <div className="url-upload-section">
          <div className="url-input-wrapper">
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyPress={handleUrlKeyPress}
              placeholder="Enter URL (e.g., https://example.com/document.pdf)"
              className="url-input"
            />
            <button
              type="button"
              onClick={handleAddUrl}
              className="add-url-button"
              disabled={!urlInput.trim()}
            >
              Add URL
            </button>
          </div>
          <p className="url-subtext">Enter URLs to documents you want to process</p>
        </div>
      )}

      {uploadMode === 'file' && selectedFiles.length > 0 && (
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

      {uploadMode === 'url' && urlList.length > 0 && (
        <div className="upload-files-list">
          <h4>Added URLs ({urlList.length})</h4>
          <ul>
            {urlList.map((url, index) => (
              <li key={index}>
                <span className="file-name url-text">{url}</span>
                <button
                  className="remove-url-button"
                  onClick={() => handleRemoveUrl(index)}
                  title="Remove URL"
                >
                  ✕
                </button>
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
        disabled={(uploadMode === 'file' ? selectedFiles.length === 0 : urlList.length === 0) || isUploading}
      >
        {isUploading ? (
          <>
            <span className="loading-spinner">⏳</span>
            Uploading...
          </>
        ) : (
          <>Upload {uploadMode === 'file' 
            ? (selectedFiles.length > 0 ? `(${selectedFiles.length})` : '')
            : (urlList.length > 0 ? `(${urlList.length})` : '')}
          </>
        )}
      </button>
    </div>
  );
};

export default UploadBox;
