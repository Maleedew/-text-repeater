import { useState } from 'react';
import { useApp } from '../context/AppContext';
import ChannelCard from '../components/ChannelCard';
import './Categories.css';

const Categories = () => {
  const { categories, channels } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredChannels = selectedCategory === 'All' 
    ? channels 
    : channels.filter(ch => ch.category === selectedCategory);

  const categoryStats = categories.map(cat => ({
    name: cat,
    count: cat === 'All' ? channels.length : channels.filter(ch => ch.category === cat).length
  }));

  return (
    <div className="categories">
      <div className="categories-header">
        <h1 className="categories-title">
          <span>📁</span> Browse by Category
        </h1>
        <p className="categories-subtitle">Find channels by content type</p>
      </div>

      <div className="category-cards">
        {categoryStats.map((cat) => (
          <button
            key={cat.name}
            className={`category-stat-card ${selectedCategory === cat.name ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.name)}
          >
            <span className="stat-icon">{getCategoryIcon(cat.name)}</span>
            <div className="stat-info">
              <h3>{cat.name}</h3>
              <p>{cat.count} channels</p>
            </div>
          </button>
        ))}
      </div>

      <div className="category-results">
        <h2 className="results-title">
          {selectedCategory === 'All' ? 'All Channels' : `${selectedCategory} Channels`}
          <span className="results-count">({filteredChannels.length})</span>
        </h2>
        
        {filteredChannels.length > 0 ? (
          <div className="results-grid">
            {filteredChannels.map((channel) => (
              <ChannelCard key={channel.id} channel={channel} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <span className="no-results-icon">📺</span>
            <h3>No channels in this category</h3>
          </div>
        )}
      </div>
    </div>
  );
};

const getCategoryIcon = (category) => {
  const icons = {
    All: '🌐',
    News: '📰',
    Sports: '⚽',
    Movies: '🎬',
    Kids: '🎈',
    General: '📺',
    Entertainment: '🎭'
  };
  return icons[category] || '📺';
};

export default Categories;
