import ChannelCard from '../components/ChannelCard';
import { useApp } from '../context/AppContext';
import './Favorites.css';

const Favorites = () => {
  const { favorites } = useApp();

  return (
    <div className="favorites">
      <div className="favorites-header">
        <h1 className="favorites-title">
          <span>⭐</span> My Favorites
        </h1>
        <p className="favorites-subtitle">
          {favorites.length} {favorites.length === 1 ? 'channel' : 'channels'} saved
        </p>
      </div>

      {favorites.length > 0 ? (
        <div className="favorites-grid">
          {favorites.map((channel) => (
            <ChannelCard key={channel.id} channel={channel} />
          ))}
        </div>
      ) : (
        <div className="no-favorites">
          <span className="no-favorites-icon">⭐</span>
          <h3>No favorites yet</h3>
          <p>Start adding channels to your favorites to watch them here</p>
        </div>
      )}
    </div>
  );
};

export default Favorites;
