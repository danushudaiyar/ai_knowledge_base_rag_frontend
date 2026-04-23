import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h1>AI Knowledge Base</h1>
        </div>
        <div className="navbar-links">
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            end
          >
            Dashboard
          </NavLink>
          <NavLink 
            to="/chat" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            Chat
          </NavLink>
          <NavLink 
            to="/documents" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            Documents
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
