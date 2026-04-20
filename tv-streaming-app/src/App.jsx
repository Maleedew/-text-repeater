import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import ChannelPage from './pages/ChannelPage';
import Favorites from './pages/Favorites';
import History from './pages/History';
import Categories from './pages/Categories';
import { useNavigate } from 'react-router-dom';
import './App.css';

const Countries = () => {
  const navigate = useNavigate();
  const { countries, setSelectedCountry } = useApp();
  
  return (
    <div className="countries">
      <h1>Select Country</h1>
      <div className="countries-grid">
        {countries.map(country => (
          <button 
            key={country.id}
            className="country-card"
            onClick={() => {
              setSelectedCountry(country.id);
              navigate('/');
            }}
          >
            <span className="country-flag">{country.flag}</span>
            <span>{country.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

function AppContent() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/history" element={<History />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/channel/:id" element={<ChannelPage />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
