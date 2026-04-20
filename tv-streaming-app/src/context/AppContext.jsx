import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Load from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('tv-favorites');
    const savedHistory = localStorage.getItem('tv-history');
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  // Save to localStorage when changed
  useEffect(() => {
    localStorage.setItem('tv-favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('tv-history', JSON.stringify(history));
  }, [history]);

  const toggleFavorite = (channel) => {
    setFavorites(prev => {
      const exists = prev.find(fav => fav.id === channel.id);
      if (exists) {
        return prev.filter(fav => fav.id !== channel.id);
      }
      return [...prev, channel];
    });
  };

  const addToHistory = (channel) => {
    setHistory(prev => {
      const filtered = prev.filter(item => item.id !== channel.id);
      return [{ ...channel, watchedAt: new Date().toISOString() }, ...filtered].slice(0, 50);
    });
  };

  const isFavorite = (channelId) => {
    return favorites.some(fav => fav.id === channelId);
  };

  const countries = [
    { id: 'us', name: 'United States', flag: '🇺🇸' },
    { id: 'uk', name: 'United Kingdom', flag: '🇬🇧' },
    { id: 'ca', name: 'Canada', flag: '🇨🇦' },
    { id: 'au', name: 'Australia', flag: '🇦🇺' },
    { id: 'de', name: 'Germany', flag: '🇩🇪' },
    { id: 'fr', name: 'France', flag: '🇫🇷' },
    { id: 'es', name: 'Spain', flag: '🇪🇸' },
    { id: 'it', name: 'Italy', flag: '🇮🇹' },
    { id: 'jp', name: 'Japan', flag: '🇯🇵' },
    { id: 'kr', name: 'South Korea', flag: '🇰🇷' },
    { id: 'in', name: 'India', flag: '🇮🇳' },
    { id: 'br', name: 'Brazil', flag: '🇧🇷' },
  ];

  const channels = [
    { id: 1, name: 'News 24', country: 'us', category: 'News', logo: '📰', streamUrl: '#' },
    { id: 2, name: 'Sports HD', country: 'us', category: 'Sports', logo: '⚽', streamUrl: '#' },
    { id: 3, name: 'Movies Plus', country: 'us', category: 'Movies', logo: '🎬', streamUrl: '#' },
    { id: 4, name: 'Kids TV', country: 'us', category: 'Kids', logo: '🎈', streamUrl: '#' },
    { id: 5, name: 'BBC One', country: 'uk', category: 'General', logo: '📺', streamUrl: '#' },
    { id: 6, name: 'Sky Sports', country: 'uk', category: 'Sports', logo: '🏆', streamUrl: '#' },
    { id: 7, name: 'ITV', country: 'uk', category: 'General', logo: '📡', streamUrl: '#' },
    { id: 8, name: 'CBC News', country: 'ca', category: 'News', logo: '🍁', streamUrl: '#' },
    { id: 9, name: 'TSN', country: 'ca', category: 'Sports', logo: '🏒', streamUrl: '#' },
    { id: 10, name: 'ABC Australia', country: 'au', category: 'General', logo: '🦘', streamUrl: '#' },
    { id: 11, name: 'ARD', country: 'de', category: 'General', logo: '🇩🇪', streamUrl: '#' },
    { id: 12, name: 'TF1', country: 'fr', category: 'General', logo: '🇫🇷', streamUrl: '#' },
    { id: 13, name: 'La 1', country: 'es', category: 'General', logo: '🇪🇸', streamUrl: '#' },
    { id: 14, name: 'RAI 1', country: 'it', category: 'General', logo: '🇮🇹', streamUrl: '#' },
    { id: 15, name: 'NHK', country: 'jp', category: 'General', logo: '🇯🇵', streamUrl: '#' },
    { id: 16, name: 'KBS', country: 'kr', category: 'General', logo: '🇰🇷', streamUrl: '#' },
    { id: 17, name: 'Zee TV', country: 'in', category: 'Entertainment', logo: '🇮🇳', streamUrl: '#' },
    { id: 18, name: 'Globo', country: 'br', category: 'General', logo: '🇧🇷', streamUrl: '#' },
  ];

  const categories = ['All', 'News', 'Sports', 'Movies', 'Kids', 'General', 'Entertainment'];

  const getChannelsByCountry = (countryId) => {
    return channels.filter(ch => ch.country === countryId);
  };

  const getFilteredChannels = (countryId, category) => {
    let filtered = countryId ? channels.filter(ch => ch.country === countryId) : channels;
    if (category && category !== 'All') {
      filtered = filtered.filter(ch => ch.category === category);
    }
    if (searchQuery) {
      filtered = filtered.filter(ch => 
        ch.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return filtered;
  };

  const value = {
    selectedCountry,
    setSelectedCountry,
    favorites,
    history,
    searchQuery,
    setSearchQuery,
    toggleFavorite,
    addToHistory,
    isFavorite,
    countries,
    channels,
    categories,
    getChannelsByCountry,
    getFilteredChannels,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
