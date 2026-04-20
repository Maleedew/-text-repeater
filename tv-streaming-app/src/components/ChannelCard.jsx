import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './ChannelCard.css';

const ChannelCard = ({ channel, showCountry = false }) => {
  const { toggleFavorite, isFavorite, addToHistory } = useApp();
  const favorite = isFavorite(channel.id);

  const handleWatch = () => {
    addToHistory(channel);
  };

  return (
    <div className="channel-card">
      <Link to={`/channel/${channel.id}`} className="channel-link" onClick={handleWatch}>
        <div className="channel-thumbnail">
          <span className="channel-logo">{channel.logo}</span>
          <div className="channel-overlay">
            <span className="play-icon">▶️</span>
          </div>
          <span className={`category-badge ${channel.category.toLowerCase()}`}>
            {channel.category}
          </span>
        </div>

        <div className="channel-info">
          <h3 className="channel-name">{channel.name}</h3>
          {showCountry && (
            <p className="channel-country">
              {channel.country.toUpperCase()}
            </p>
          )}
          <p className="channel-category">{channel.category}</p>
        </div>
      </Link>

      <button 
        className={`favorite-btn ${favorite ? 'active' : ''}`}
        onClick={() => toggleFavorite(channel)}
      >
        {favorite ? '⭐' : '☆'}
      </button>
    </div>
  );
};

export default ChannelCard;
