import { useState, useEffect } from 'react';
import { documentAPI } from '../services/api';
import Loader from './Loader';

const FileList = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await documentAPI.getAll();
      setFiles(response.data.documents || response.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch documents');
      console.error('Error fetching files:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this document?')) {
      return;
    }

    try {
      setDeletingId(id);
      await documentAPI.delete(id);
      setFiles(files.filter(file => file.id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete document');
      console.error('Error deleting file:', err);
    } finally {
      setDeletingId(null);
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return 'N/A';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  if (loading) {
    return (
      <div className="file-list-loading">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="file-list-error">
        <p className="error-message">{error}</p>
        <button onClick={fetchFiles} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <div className="file-list-empty">
        <p>No documents uploaded yet</p>
      </div>
    );
  }

  return (
    <div className="file-list">
      <div className="file-list-header">
        <h2>Uploaded Documents ({files.length})</h2>
        <button onClick={fetchFiles} className="refresh-button">
          Refresh
        </button>
      </div>
      
      <div className="file-list-table">
        <table>
          <thead>
            <tr>
              <th>File Name</th>
              <th>Size</th>
              <th>Uploaded</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file.id}>
                <td className="file-name">
                  <span className="file-icon">📄</span>
                  {file.name || file.filename || 'Unnamed Document'}
                </td>
                <td>{formatFileSize(file.size || file.file_size)}</td>
                <td>{formatDate(file.created_at || file.uploaded_at)}</td>
                <td>
                  <span className={`status-badge ${file.status || 'processed'}`}>
                    {file.status || 'Processed'}
                  </span>
                </td>
                <td className="actions">
                  <button
                    onClick={() => handleDelete(file.id)}
                    disabled={deletingId === file.id}
                    className="delete-button"
                  >
                    {deletingId === file.id ? 'Deleting...' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FileList;
