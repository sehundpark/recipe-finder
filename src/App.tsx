import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavBar } from "./pages/NavBar";
import { Footer } from "./pages/Footer";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { RecipesPage } from "./pages/RecipesPage";
import { ThemeProvider } from "./components/ThemeContext";
import { ScrollToTop } from "./components/ScollToTop";
import "./App.css";

const AppContent = () => {
  return (
    <>
      <NavBar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/recipes" element={<RecipesPage />} />
      </Routes>
      <Footer />
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
