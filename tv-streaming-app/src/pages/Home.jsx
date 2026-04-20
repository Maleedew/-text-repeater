import { useState } from 'react';
import { useApp } from '../context/AppContext';
import ChannelCard from '../components/ChannelCard';
import CountrySelector from '../components/CountrySelector';
import './Home.css';

const Home = () => {
  const { categories, getFilteredChannels, selectedCountry } = useApp();
  const [activeCategory, setActiveCategory] = useState('All');

  const channels = getFilteredChannels(selectedCountry, activeCategory);

  return (
    <div className="home">
      <div className="home-header">
        <div className="home-title-section">
          <h1 className="home-title">Discover Channels</h1>
          <p className="home-subtitle">Watch your favorite TV channels from around the world</p>
        </div>
        <CountrySelector />
      </div>

      <div className="category-filter">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {channels.length > 0 ? (
        <div className="channels-grid">
          {channels.map((channel) => (
            <ChannelCard 
              key={channel.id} 
              channel={channel}
              showCountry={!selectedCountry}
            />
          ))}
        </div>
      ) : (
        <div className="no-results">
          <span className="no-results-icon">📺</span>
          <h3>No channels found</h3>
          <p>Try changing your filters or search query</p>
        </div>
      )}
    </div>
  );
};

export default Home;
