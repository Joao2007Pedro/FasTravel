import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuth(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth(false);
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-500";

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-blue-600">FasTravel</Link>

          {/* Desktop links */}
          <nav className="hidden md:flex space-x-6">
            <NavLink to="/" className={linkClass}>Home</NavLink>
            <NavLink to="/flights" className={linkClass}>Voos</NavLink>
            {auth && <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>}
          </nav>

          {/* Desktop auth */}
          <div className="hidden md:flex items-center space-x-3">
            {!auth ? (
              <>
                <Link to="/login" className="px-3 py-1 border rounded hover:bg-gray-100">Entrar</Link>
                <Link to="/register" className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Cadastrar</Link>
              </>
            ) : (
              <>
                <button onClick={() => navigate("/dashboard")} className="px-3 py-1 border rounded">Minha Conta</button>
                <button onClick={handleLogout} className="px-3 py-1 bg-red-500 text-white rounded">Sair</button>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded hover:bg-gray-100"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            {open ? (
              // X icon
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden py-2 space-y-1">
            <NavLink to="/" className={linkClass} onClick={() => setOpen(false)}>Home</NavLink>
            <NavLink to="/flights" className={linkClass} onClick={() => setOpen(false)}>Voos</NavLink>

            {!auth ? (
              <>
                <Link to="/login" onClick={() => setOpen(false)} className="block py-2">Entrar</Link>
                <Link to="/register" onClick={() => setOpen(false)} className="block py-2">Cadastrar</Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" onClick={() => setOpen(false)} className="block py-2">Minha Conta</Link>
                <button
                  onClick={() => { handleLogout(); setOpen(false); }}
                  className="block w-full text-left py-2"
                >
                  Sair
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
