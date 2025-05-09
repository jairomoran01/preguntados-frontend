import React from 'react';
import GameBoard from '../components/GameBoard';

const Home = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="game-title mb-12">
          ¡Bienvenido a Preguntados!
        </h1>
        <GameBoard />
      </div>
    </div>
  );
};

export default Home;