import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DestinosPage from "./pages/DestinosPage";
import PacotesPage from "./pages/PacotesPage";
import ContatoPage from "./pages/ContatoPage";
import SobrePage from "./pages/SobrePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/destinos" element={<DestinosPage />} />
        <Route path="/pacotes" element={<PacotesPage />} />
        <Route path="/contato" element={<ContatoPage />} />
        <Route path="/sobre" element={<SobrePage />} />
      </Routes>
      <Footer />
    </Router>
  );
}
  
export default App;
