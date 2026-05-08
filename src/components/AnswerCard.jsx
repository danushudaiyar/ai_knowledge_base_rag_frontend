import PropTypes from 'prop-types';
import { useState } from 'react';

const AnswerCard = ({ answer, sources, query }) => {
  const [copied, setCopied] = useState(false);

  if (!answer) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(answer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="answer-card">
      {query && (
        <div className="answer-query">
          <div className="answer-query-icon-wrapper">
            <span className="answer-query-icon">💭</span>
          </div>
          <p className="answer-query-text">{query}</p>
        </div>
      )}
      
      <div className="answer-content">
        <div className="answer-header">
          <div className="answer-header-left">
            <div className="answer-icon-wrapper">
              <span className="answer-icon">✨</span>
            </div>
            <h3>AI Response</h3>
          </div>
          <button 
            className={`copy-button ${copied ? 'copied' : ''}`}
            onClick={handleCopy}
            title="Copy answer"
          >
            {copied ? (
              <>
                <span className="copy-icon">✓</span>
                <span className="copy-text">Copied!</span>
              </>
            ) : (
              <>
                <span className="copy-icon">📋</span>
                <span className="copy-text">Copy</span>
              </>
            )}
          </button>
        </div>
        <div className="answer-text-wrapper">
          <p className="answer-text">{answer}</p>
        </div>
      </div>

      {sources && sources.length > 0 && (
        <div className="answer-sources">
          <div className="sources-header">
            <div className="sources-header-left">
              <div className="sources-icon-wrapper">
                <span className="sources-icon">📚</span>
              </div>
              <h4>Reference Sources</h4>
            </div>
            <span className="sources-count">{sources.length} {sources.length === 1 ? 'source' : 'sources'}</span>
          </div>
          <div className="sources-list">
            {sources.map((source, index) => (
              <div key={index} className="source-item">
                <div className="source-header">
                  <div className="source-number-wrapper">
                    <span className="source-number">{index + 1}</span>
                  </div>
                  <div className="source-info">
                    <span className="source-title">{source.title || source.filename || `Source ${index + 1}`}</span>
                    <div className="source-meta">
                      {source.page && (
                        <span className="source-page">
                          <span className="meta-icon">📄</span>
                          Page {source.page}
                        </span>
                      )}
                      {source.score && (
                        <span className="source-score">
                          <span className="meta-icon">🎯</span>
                          {(source.score * 100).toFixed(0)}% match
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {source.content && (
                  <div className="source-content-wrapper">
                    <div className="source-content-indicator"></div>
                    <p className="source-content">{source.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

AnswerCard.propTypes = {
  answer: PropTypes.string.isRequired,
  sources: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      filename: PropTypes.string,
      content: PropTypes.string,
      page: PropTypes.number,
      score: PropTypes.number,
    })
  ),
  query: PropTypes.string,
};

export default AnswerCard;
