const Dashboard = () => {
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
          {/* Upload functionality will be added here */}
        </div>
      </section>

      {/* Query Section */}
      <section className="query-section">
        <h2>Quick Query</h2>
        <div className="query-content">
          {/* Query functionality will be added here */}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
