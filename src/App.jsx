import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Ruleta3D from "./components/Ruleta3D";
import Cube from "./components/Cube";

function Home() {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex flex-col items-center justify-center gap-8">
      <h1 className="text-6xl font-bold text-white mb-8">🎮 Bienvenido</h1>
      <Link
        to="/ruleta"
        className="px-8 py-4 bg-white text-purple-600 font-bold text-xl rounded-lg hover:bg-gray-100 shadow-lg transform hover:scale-105 transition-transform"
      >
        Ir a la Ruleta 3D →
      </Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ruleta" element={<Ruleta3D />} />
        <Route path="/cube" element={<Cube />} />
      </Routes>
    </Router>
  );
}

export default App;
 