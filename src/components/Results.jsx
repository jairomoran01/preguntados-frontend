import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';

const Results = ({ score, totalQuestions }) => {
  const navigate = useNavigate();
  const { playerName, selectedCategory, resetGame } = useGame();

  const handlePlayAgain = () => {
    resetGame();
    navigate('/');
  };

  const handleViewLeaderboard = () => {
    navigate('/leaderboard');
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">¡Juego terminado!</h2>
        <p className="text-xl mb-2">Jugador: {playerName}</p>
        <p className="text-xl mb-2">Categoría: {selectedCategory}</p>
        <p className="text-2xl font-bold mb-4">
          Puntuación: {score} de {totalQuestions}
        </p>
        
        <div className="space-y-4">
          <button
            onClick={handlePlayAgain}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Jugar de nuevo
          </button>
          
          <button
            onClick={handleViewLeaderboard}
            className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Ver tabla de clasificación
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;