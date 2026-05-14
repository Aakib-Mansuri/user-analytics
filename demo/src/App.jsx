import { Routes, Route, NavLink } from 'react-router-dom';
import Home     from './pages/Home';
import About    from './pages/About';
import Products from './pages/Products';

export default function App() {
  return (
    <>
      <nav>
        <span className="brand">ShopDemo</span>
        <NavLink to="/"        end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
        <NavLink to="/about"       className={({ isActive }) => isActive ? 'active' : ''}>About</NavLink>
        <NavLink to="/products"    className={({ isActive }) => isActive ? 'active' : ''}>Products</NavLink>
        <a href="http://localhost:5173" target="_blank" rel="noreferrer" className="dashboard-link">Dashboard ↗</a>
      </nav>

      <Routes>
        <Route path="/"         element={<Home />} />
        <Route path="/about"    element={<About />} />
        <Route path="/products" element={<Products />} />
      </Routes>

      <footer>
        &copy; 2024 ShopDemo &mdash; This is a demo page for analytics tracking.
      </footer>
    </>
  );
}
