import { useState } from 'react';
import AnswerCard from './AnswerCard';

const QueryInput = ({ onSubmit, placeholder = 'Ask a question about your documents...' }) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (query.trim() && onSubmit) {
      setIsLoading(true);
      setError(null);
      const currentQuery = query.trim();
      
      try {
        const result = await onSubmit(currentQuery);
        setResponse({
          answer: result.answer || result.data?.answer,
          sources: result.sources || result.data?.sources || [],
          query: currentQuery,
        });
        setQuery(''); // Clear input after successful submission
      } catch (error) {
        console.error('Query submission error:', error);
        setError(error.response?.data?.message || error.message || 'Failed to get answer');
        setResponse(null);
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

      {error && (
        <div className="query-error">
          <span className="error-icon">⚠️</span>
          <span className="error-message">{error}</span>
        </div>
      )}

      {response && (
        <AnswerCard 
          answer={response.answer}
          sources={response.sources}
          query={response.query}
        />
      )}
    </div>
  );
};

export default QueryInput;
