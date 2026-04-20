import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const { favorites, history } = useApp();

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/countries', label: 'Countries', icon: '🌍' },
    { path: '/favorites', label: 'Favorites', icon: '⭐', count: favorites.length },
    { path: '/history', label: 'History', icon: '🕐', count: history.length },
    { path: '/categories', label: 'Categories', icon: '📁' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="logo">
          <span className="logo-icon">📺</span>
          <span className="logo-text">StreamTV</span>
        </h1>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
              {item.count > 0 && (
                <span className="nav-badge">{item.count}</span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">👤</div>
          <div className="user-details">
            <span className="user-name">Guest User</span>
            <span className="user-status">Online</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
