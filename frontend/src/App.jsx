import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/layout/Header";
import AuthModal from "./components/layout/AuthModal";
import Home from "./pages/Home";
import PontoDetalhesPage from "./pages/PontoDetalhesPage";
import AdminPage from "./pages/AdminPage";
import "./styles/index.css";

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header onAuthClick={() => setShowAuthModal(true)} />

          <main>
            <Routes>
              <Route
                path="/"
                element={<Home onAuthClick={() => setShowAuthModal(true)} />}
              />
              <Route
                path="/ponto/:id"
                element={<PontoDetalhesPage onAuthClick={() => setShowAuthModal(true)}/>
                }
              />
              <Route
                path="/admin"
                element={<AdminPage />}
              />
            </Routes>
          </main>

          <AuthModal
            isOpen={showAuthModal}
            onClose={() => setShowAuthModal(false)}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
