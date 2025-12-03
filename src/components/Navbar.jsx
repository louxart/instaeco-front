// src/components/Navbar.jsx
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  const active = "text-green-700 font-semibold";
  const base = "text-gray-700 hover:text-green-700";

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🌿</span>
          <span className="font-bold text-lg">InstaEco</span>
        </Link>

        {!user ? (
          <div className="flex items-center gap-4">
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? active : base)}
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) => (isActive ? active : base)}
            >
              Register
            </NavLink>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? active : base)}
            >
              Feed
            </NavLink>
            <button
              onClick={logout}
              className="text-sm text-gray-500 hover:text-red-500"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
