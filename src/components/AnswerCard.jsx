import PropTypes from 'prop-types';

const AnswerCard = ({ answer, sources, query }) => {
  if (!answer) return null;

  return (
    <div className="answer-card">
      {query && (
        <div className="answer-query">
          <span className="answer-query-icon">❓</span>
          <p className="answer-query-text">{query}</p>
        </div>
      )}
      
      <div className="answer-content">
        <div className="answer-header">
          <span className="answer-icon">💡</span>
          <h3>Answer</h3>
        </div>
        <p className="answer-text">{answer}</p>
      </div>

      {sources && sources.length > 0 && (
        <div className="answer-sources">
          <div className="sources-header">
            <span className="sources-icon">📚</span>
            <h4>Sources</h4>
          </div>
          <div className="sources-list">
            {sources.map((source, index) => (
              <div key={index} className="source-item">
                <div className="source-header">
                  <span className="source-number">{index + 1}</span>
                  <span className="source-title">{source.title || source.filename || `Source ${index + 1}`}</span>
                </div>
                {source.content && (
                  <p className="source-content">{source.content}</p>
                )}
                {source.page && (
                  <span className="source-page">Page {source.page}</span>
                )}
                {source.score && (
                  <span className="source-score">Relevance: {(source.score * 100).toFixed(1)}%</span>
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
