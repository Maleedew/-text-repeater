import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Header from '../components/Header';
import './ChannelPage.css';

const ChannelPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { channels, toggleFavorite, isFavorite, addToHistory } = useApp();

  const channel = channels.find(ch => ch.id === parseInt(id));
  const favorite = channel ? isFavorite(channel.id) : false;

  if (!channel) {
    return (
      <div className="channel-page">
        <Header showSearch={false} />
        <div className="channel-not-found">
          <span className="not-found-icon">📺</span>
          <h2>Channel Not Found</h2>
          <button onClick={() => navigate('/')} className="back-btn">
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleWatch = () => {
    addToHistory(channel);
  };

  return (
    <div className="channel-page">
      <Header showSearch={false} />
      <div className="channel-content">
        <div className="video-player">
          <div className="player-placeholder">
            <span className="player-logo">{channel.logo}</span>
            <h2>{channel.name}</h2>
            <p>Stream would play here</p>
            <div className="player-controls">
              <button className="control-btn">▶️ Play</button>
              <button className="control-btn">🔊 Volume</button>
              <button className="control-btn">⛶ Fullscreen</button>
            </div>
          </div>
        </div>

        <div className="channel-details">
          <div className="details-header">
            <div className="details-title">
              <span className="details-logo">{channel.logo}</span>
              <div>
                <h1>{channel.name}</h1>
                <p className="details-category">{channel.category}</p>
              </div>
            </div>
            <button 
              className={`favorite-button ${favorite ? 'active' : ''}`}
              onClick={() => toggleFavorite(channel)}
            >
              {favorite ? '⭐ Favorited' : '☆ Add to Favorites'}
            </button>
          </div>

          <div className="details-info">
            <div className="info-card">
              <span className="info-icon">🌍</span>
              <div>
                <h4>Country</h4>
                <p>{channel.country.toUpperCase()}</p>
              </div>
            </div>
            <div className="info-card">
              <span className="info-icon">📁</span>
              <div>
                <h4>Category</h4>
                <p>{channel.category}</p>
              </div>
            </div>
            <div className="info-card">
              <span className="info-icon">📡</span>
              <div>
                <h4>Status</h4>
                <p className="status-live">● Live</p>
              </div>
            </div>
          </div>

          <div className="related-actions">
            <button className="action-btn primary" onClick={handleWatch}>
              ▶️ Start Watching
            </button>
            <button className="action-btn secondary" onClick={() => navigate('/')}>
              ← Back to Channels
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelPage;
