import { useState } from 'react';

const QueryInput = ({ onSubmit, placeholder = 'Ask a question about your documents...' }) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (query.trim() && onSubmit) {
      setIsLoading(true);
      try {
        await onSubmit(query.trim());
        setQuery(''); // Clear input after successful submission
      } catch (error) {
        console.error('Query submission error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="query-input-container">
      <form onSubmit={handleSubmit} className="query-form">
        <div className="query-input-wrapper">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="query-input"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="query-submit-button"
            disabled={!query.trim() || isLoading}
          >
            {isLoading ? (
              <span className="loading-spinner">⏳</span>
            ) : (
              <span className="submit-icon">🔍</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default QueryInput;
