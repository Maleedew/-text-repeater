import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './History.css';

const History = () => {
  const { history } = useApp();

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const watched = new Date(timestamp);
    const diffInMinutes = Math.floor((now - watched) / 60000);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${diffInDays}d ago`;
  };

  return (
    <div className="history">
      <div className="history-header">
        <h1 className="history-title">
          <span>🕐</span> Watch History
        </h1>
        <p className="history-subtitle">
          {history.length} {history.length === 1 ? 'channel' : 'channels'} watched
        </p>
      </div>

      {history.length > 0 ? (
        <div className="history-list">
          {history.map((item, index) => (
            <Link 
              key={`${item.id}-${index}`} 
              to={`/channel/${item.id}`}
              className="history-item"
            >
              <div className="history-thumbnail">
                <span className="history-logo">{item.logo}</span>
                <span className={`history-category ${item.category.toLowerCase()}`}>
                  {item.category}
                </span>
              </div>
              <div className="history-info">
                <h3 className="history-name">{item.name}</h3>
                <p className="history-meta">
                  <span>{item.country.toUpperCase()}</span>
                  <span>•</span>
                  <span>{formatTimeAgo(item.watchedAt)}</span>
                </p>
              </div>
              <div className="history-action">
                <span className="play-arrow">▶️</span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="no-history">
          <span className="no-history-icon">🕐</span>
          <h3>No watch history</h3>
          <p>Channels you watch will appear here</p>
        </div>
      )}
    </div>
  );
};

export default History;
