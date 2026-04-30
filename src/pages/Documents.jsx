import FileList from '../components/FileList';
import UploadBox from '../components/UploadBox';

const Documents = () => {
  return (
    <div className="documents-page">
      <div className="documents-header">
        <h1>Documents</h1>
        <p>Manage your uploaded documents</p>
      </div>
      <div className="documents-container">
        <UploadBox />
        <FileList />
      </div>
    </div>
  );
};

export default Documents;
