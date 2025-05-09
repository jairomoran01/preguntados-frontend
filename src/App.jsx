import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import Home from './pages/Home';
import Game from './pages/Game';
import Leaderboard from './pages/Leaderboard';
import './App.css';

function App() {
  return (
    <GameProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex justify-between h-16">
                <div className="flex space-x-4 items-center">
                  <Link to="/" className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">
                    Inicio
                  </Link>
                  <Link to="/leaderboard" className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">
                    Clasificación
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/game" element={<Game />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
          </main>
        </div>
      </Router>
    </GameProvider>
  );
}

export default App;