import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './CountrySelector.css';

const CountrySelector = () => {
  const navigate = useNavigate();
  const { countries, selectedCountry, setSelectedCountry } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const currentCountry = countries.find(c => c.id === selectedCountry);

  const handleSelectCountry = (countryId) => {
    setSelectedCountry(countryId);
    setIsOpen(false);
    if (countryId) {
      navigate('/');
    }
  };

  return (
    <div className="country-selector">
      <button 
        className="country-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="selected-flag">
          {currentCountry ? currentCountry.flag : '🌍'}
        </span>
        <span className="selected-name">
          {currentCountry ? currentCountry.name : 'All Countries'}
        </span>
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div className="country-dropdown">
          <div className="dropdown-header">
            <span>Select Country</span>
            <button 
              className="clear-filter"
              onClick={() => handleSelectCountry(null)}
            >
              Show All
            </button>
          </div>
          <div className="dropdown-list">
            {countries.map((country) => (
              <button
                key={country.id}
                className={`dropdown-item ${selectedCountry === country.id ? 'active' : ''}`}
                onClick={() => handleSelectCountry(country.id)}
              >
                <span className="item-flag">{country.flag}</span>
                <span className="item-name">{country.name}</span>
                {selectedCountry === country.id && (
                  <span className="check-mark">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountrySelector;
