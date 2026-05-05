import PropTypes from 'prop-types';
import '../styles/loader.css';

const Loader = ({ 
  variant = 'spinner', 
  size = 'medium', 
  text = '', 
  fullScreen = false,
  overlay = false 
}) => {
  const renderLoader = () => {
    switch (variant) {
      case 'spinner':
        return (
          <div className={`loader-spinner loader-${size}`}>
            <div className="spinner"></div>
          </div>
        );
      
      case 'dots':
        return (
          <div className={`loader-dots loader-${size}`}>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        );
      
      case 'pulse':
        return (
          <div className={`loader-pulse loader-${size}`}>
            <div className="pulse-ring"></div>
            <div className="pulse-ring"></div>
          </div>
        );
      
      case 'bars':
        return (
          <div className={`loader-bars loader-${size}`}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        );
      
      default:
        return (
          <div className={`loader-spinner loader-${size}`}>
            <div className="spinner"></div>
          </div>
        );
    }
  };

  const content = (
    <div className={`loader-container ${fullScreen ? 'loader-fullscreen' : ''} ${overlay ? 'loader-overlay' : ''}`}>
      <div className="loader-content">
        {renderLoader()}
        {text && <p className="loader-text">{text}</p>}
      </div>
    </div>
  );

  return content;
};

Loader.propTypes = {
  variant: PropTypes.oneOf(['spinner', 'dots', 'pulse', 'bars']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  text: PropTypes.string,
  fullScreen: PropTypes.bool,
  overlay: PropTypes.bool,
};

export default Loader;
