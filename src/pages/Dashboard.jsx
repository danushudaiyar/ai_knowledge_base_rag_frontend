import UploadBox from '../components/UploadBox';
import QueryInput from '../components/QueryInput';

const Dashboard = () => {
  const handleUpload = (files) => {
    console.log('Uploading files:', files);
    // This will be called before API upload
  };

  const handleUploadSuccess = (results) => {
    console.log('Upload successful:', results);
    // Handle successful upload (e.g., refresh document list, show notification)
  };

  const handleUploadError = (error) => {
    console.error('Upload failed:', error);
    // Handle upload error (e.g., show error notification)
  };

  const handleQuery = (question) => {
    console.log('Submitting query:', question);
    // TODO: Implement query logic with API
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Manage your knowledge base and ask questions</p>
      </div>

      {/* Upload Section */}
      <section className="upload-section">
        <h2>Upload Documents</h2>
        <div className="upload-content">
          <UploadBox 
            onUpload={handleUpload}
            onUploadSuccess={handleUploadSuccess}
            onUploadError={handleUploadError}
          />
        </div>
      </section>

      {/* Query Section */}
      <section className="query-section">
        <h2>Quick Query</h2>
        <div className="query-content">
          <QueryInput onSubmit={handleQuery} />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
