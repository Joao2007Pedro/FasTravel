import React from "react";
import { getAsset } from "../services/assets";

const Footer = () => (
  <footer className="bg-slate-950 text-slate-300 mt-16">
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 lg:space-y-12 lg:px-8">
      <div className="grid grid-cols-1 gap-8">
        <div className="text-center">
          <div className="flex justify-center">
            <img src={getAsset("logo512.svg")} alt="FasTravel" className="h-8 w-auto opacity-90" />
          </div>

          <p className="mt-4 max-w-md text-slate-400 mx-auto">
            Planeje sua próxima viagem com praticidade: busque voos, compare
            preços e garanta aquela passagem perfeita para o seu destino
            favorito.
          </p>

          <ul className="mt-8 flex gap-6 justify-center">
            <li>
              <a
                href="https://github.com/Joao2007Pedro/FasTravel"
                rel="noreferrer"
                target="_blank"
                className="text-slate-400 transition hover:text-white"
              >
                <span className="sr-only">GitHub</span>

                <svg
                  className="size-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Links decorativos */}
      <div className="max-w-7xl mx-auto px-4">
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500">
          <li>
            <button type="button" className="hover:text-white">
              Termos
            </button>
          </li>
          <li>
            <button type="button" className="hover:text-white">
              Política de privacidade
            </button>
          </li>
          <li>
            <button type="button" className="hover:text-white">
              Acessibilidade
            </button>
          </li>
          <li>
            <button type="button" className="hover:text-white">
              Contato
            </button>
          </li>
        </ul>
      </div>

      <p className="text-xs text-slate-500 border-t border-slate-800 py-4 text-center">
        &copy; 2025. FasTravel. Todos os Direitos Reservados.
      </p>
    </div>
  </footer>
);

export default Footer;
