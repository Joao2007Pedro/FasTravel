
import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  PaperAirplaneIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuth, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600/90 to-blue-600/90 text-white backdrop-blur fixed w-full z-40 top-0 shadow">
      <div className="max-w-7xl mx-auto h-16 px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <PaperAirplaneIcon className="h-6 w-6" />
          <span className="text-xl font-bold">FasTravel</span>
        </Link>

        {/* Ações: apenas hamburguer (mobile) */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white/90 rounded-md md:hidden hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
            aria-controls="navbar-sticky"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Abrir menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* Menu alinhado à direita (desktop) e overlay (mobile) */}
        <div
          className={`items-center justify-end w-full md:w-auto md:flex md:static ${
            isOpen ? "flex" : "hidden"
          } absolute md:relative top-16 left-0 right-0 md:top-auto md:left-auto md:right-auto bg-white text-slate-800 md:bg-transparent md:text-white backdrop-blur md:backdrop-blur-none border-t border-white/20 md:border-0 px-4 md:px-0 py-3 md:py-0`}
          id="navbar-sticky"
        >
          <div className="flex flex-col md:flex-row md:items-center md:gap-6 w-full md:w-auto">
            <ul className="flex flex-col md:flex-row md:mt-0 gap-1 md:gap-6 font-medium md:items-center md:justify-end">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md transition ${
                      isActive
                        ? "text-indigo-600 md:text-white md:underline"
                        : "hover:opacity-90 md:hover:bg-white/10"
                    }`
                  }
                  end
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/flights"
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md transition ${
                      isActive
                        ? "text-indigo-600 md:text-white md:underline"
                        : "hover:opacity-90 md:hover:bg-white/10"
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  Voos
                </NavLink>
              </li>
              {isAuth && (
                <li>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-md transition ${
                        isActive
                          ? "text-indigo-600 md:text-white md:underline"
                          : "hover:opacity-90 md:hover:bg-white/10"
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </NavLink>
                </li>
              )}
            </ul>

            {/* Ações (desktop à direita dos links) */}
            <div className="hidden md:flex items-center gap-2 md:ml-8">
              {!isAuth ? (
                <>
                  <Link
                    to="/login"
                    className="inline-flex text-white/90 hover:text-white hover:bg-white/10 focus:ring-2 focus:outline-none focus:ring-white/40 font-medium rounded-md text-sm px-4 py-2"
                  >
                    <UserCircleIcon className="h-8 w-8" /> Entrar
                  </Link>
                  <Link
                    to="/register"
                    className="inline-flex text-indigo-600 bg-white hover:bg-slate-50 focus:ring-2 focus:outline-none focus:ring-white/40 font-semibold rounded-md text-sm px-4 py-2"
                  >
                    Cadastrar
                  </Link>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="inline-flex text-white bg-red-600 hover:bg-red-700 focus:ring-2 focus:outline-none focus:ring-red-300 font-medium rounded-md text-sm px-4 py-2"
                >
                  Sair
                </button>
              )}
            </div>

            {/* Ações (mobile dentro do menu) */}
            {!isAuth ? (
              <div className="flex md:hidden flex-col gap-2 py-3">
                <Link
                  to="/login"
                  className="w-full text-center text-slate-800 hover:text-slate-900 hover:bg-slate-100 font-medium rounded-md text-sm px-4 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Entrar
                </Link>
                <Link
                  to="/register"
                  className="w-full text-center text-white bg-indigo-600 hover:bg-indigo-700 font-medium rounded-md text-sm px-4 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Cadastrar
                </Link>
              </div>
            ) : (
              <div className="flex md:hidden flex-col gap-2 py-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    logout();
                    navigate("/");
                  }}
                  className="w-full text-center text-white bg-red-600 hover:bg-red-700 font-medium rounded-md text-sm px-4 py-2"
                >
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
