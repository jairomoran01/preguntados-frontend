import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import CategoryCard from './CategoryCard';

const GameBoard = () => {
  const navigate = useNavigate();
  const { startGame } = useGame();
  const categories = [
    { name: 'Geografia', icon: '🌎' },
    { name: 'Historia', icon: '📚' },
    { name: 'Deportes', icon: '⚽' },
    { name: 'Ciencia', icon: '🔬' },
    { name: 'Entretenimiento', icon: '🎬' }
  ];

  const handleCategorySelect = (category) => {
    const playerName = prompt('Ingresa tu nombre:');
    if (playerName) {
      startGame(category, playerName);
      navigate('/game');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Preguntados</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <CategoryCard
            key={category.name}
            category={category.name}
            icon={category.icon}
            onSelect={handleCategorySelect}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;