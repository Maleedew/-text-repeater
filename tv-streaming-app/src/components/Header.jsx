import { useApp } from '../context/AppContext';
import './Header.css';

const Header = ({ showSearch = true }) => {
  const { searchQuery, setSearchQuery, selectedCountry, countries } = useApp();

  const currentCountry = countries.find(c => c.id === selectedCountry);

  return (
    <header className="header">
      <div className="header-left">
        <h2 className="page-title">
          {currentCountry && (
            <span className="country-flag">{currentCountry.flag}</span>
          )}
          <span>TV Channels</span>
        </h2>
      </div>

      {showSearch && (
        <div className="header-center">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search channels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button 
                className="search-clear"
                onClick={() => setSearchQuery('')}
              >
                ✕
              </button>
            )}
          </div>
        </div>
      )}

      <div className="header-right">
        <button className="header-btn">
          <span>🔔</span>
          <span className="notification-dot"></span>
        </button>
        <button className="header-btn">
          <span>⚙️</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
