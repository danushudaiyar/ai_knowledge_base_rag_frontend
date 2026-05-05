import PropTypes from 'prop-types';
import '../styles/skeleton.css';

const SkeletonLoader = ({ variant = 'text', count = 1, height, width, className = '' }) => {
  const renderSkeleton = () => {
    const style = {};
    if (height) style.height = typeof height === 'number' ? `${height}px` : height;
    if (width) style.width = typeof width === 'number' ? `${width}px` : width;

    switch (variant) {
      case 'text':
        return <div className={`skeleton skeleton-text ${className}`} style={style}></div>;
      
      case 'title':
        return <div className={`skeleton skeleton-title ${className}`} style={style}></div>;
      
      case 'circle':
        return <div className={`skeleton skeleton-circle ${className}`} style={style}></div>;
      
      case 'rect':
        return <div className={`skeleton skeleton-rect ${className}`} style={style}></div>;
      
      case 'card':
        return (
          <div className={`skeleton-card ${className}`}>
            <div className="skeleton skeleton-title" style={{ width: '60%' }}></div>
            <div className="skeleton skeleton-text" style={{ width: '80%' }}></div>
            <div className="skeleton skeleton-text" style={{ width: '70%' }}></div>
            <div className="skeleton skeleton-text" style={{ width: '90%' }}></div>
          </div>
        );
      
      case 'file-item':
        return (
          <div className={`skeleton-file-item ${className}`}>
            <div className="skeleton skeleton-circle" style={{ width: '40px', height: '40px' }}></div>
            <div className="skeleton-file-details">
              <div className="skeleton skeleton-text" style={{ width: '200px' }}></div>
              <div className="skeleton skeleton-text" style={{ width: '120px', height: '12px' }}></div>
            </div>
            <div className="skeleton skeleton-rect" style={{ width: '80px', height: '32px' }}></div>
          </div>
        );
      
      case 'answer-card':
        return (
          <div className={`skeleton-answer-card ${className}`}>
            <div className="skeleton skeleton-title" style={{ width: '70%', marginBottom: '1rem' }}></div>
            <div className="skeleton skeleton-text" style={{ width: '100%' }}></div>
            <div className="skeleton skeleton-text" style={{ width: '95%' }}></div>
            <div className="skeleton skeleton-text" style={{ width: '85%' }}></div>
            <div style={{ marginTop: '1.5rem' }}>
              <div className="skeleton skeleton-text" style={{ width: '40%', height: '16px' }}></div>
              <div className="skeleton skeleton-rect" style={{ width: '100%', height: '80px', marginTop: '0.75rem' }}></div>
            </div>
          </div>
        );
      
      default:
        return <div className={`skeleton ${className}`} style={style}></div>;
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>
          {renderSkeleton()}
        </div>
      ))}
    </>
  );
};

SkeletonLoader.propTypes = {
  variant: PropTypes.oneOf(['text', 'title', 'circle', 'rect', 'card', 'file-item', 'answer-card']),
  count: PropTypes.number,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};

export default SkeletonLoader;
