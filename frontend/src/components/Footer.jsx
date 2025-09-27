import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-gray-50 border-t mt-8">
    <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between">
      <div className="text-sm text-gray-600">&copy; {new Date().getFullYear()} FasTravel. Todos os direitos reservados.</div>
      <div className="flex space-x-4 mt-3 md:mt-0">
        <Link to="/privacy" className="text-sm text-gray-600 hover:text-blue-600">Política de Privacidade</Link>
        <Link to="/terms" className="text-sm text-gray-600 hover:text-blue-600">Termos</Link>
      </div>
    </div>
  </footer>
);

export default Footer;
