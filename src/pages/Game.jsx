import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import Question from '../components/Question';
import Results from '../components/Results';

const Game = () => {
  const navigate = useNavigate();
  const { gameState, currentQuestion, score, answerQuestion, questions, showFeedback, lastAnswerCorrect } = useGame(); // Obtener nuevos estados
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (gameState !== 'playing') {
      if (gameState === 'idle' || !gameState) {
        // No navegar
      } else if (gameState !== 'finished') {
        navigate('/');
      }
      return; 
    }

    // Si se está mostrando feedback, pausar el temporizador (no iniciar uno nuevo y el anterior se limpió)
    if (showFeedback) {
      return;
    }

    if (!currentQuestion) {
      return;
    }

    setTimeLeft(30); 

    const timerId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 1) {
          clearInterval(timerId);
          // answerQuestion ya tiene una guarda para no ejecutarse si showFeedback es true
          answerQuestion(-1); 
          return 0; 
        }
        return prevTimeLeft - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [gameState, currentQuestion, navigate, answerQuestion, showFeedback]); // Añadir showFeedback a las dependencias

  if (gameState === 'finished') {
    return <Results score={score} totalQuestions={questions.length} />;
  }

  return (
    <div className="container mx-auto px-4 py-8 relative"> {/* Añadido relative para el posicionamiento del feedback */}
      {showFeedback && currentQuestion && (
        <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            // onClick={() => { /* Opcional: permitir cerrar el feedback al hacer clic fuera */ }}
        >
          <div className={`p-8 rounded-lg text-white text-3xl font-bold ${lastAnswerCorrect ? 'bg-green-600' : 'bg-red-600'}`}>
            {lastAnswerCorrect ? '¡Correcto!' : '¡Incorrecto!'}
            {/* Opcional: Mostrar la respuesta correcta si fue incorrecta y la pregunta tiene opciones */}
            {/* {!lastAnswerCorrect && currentQuestion.options && currentQuestion.correctAnswer >= 0 && currentQuestion.options[currentQuestion.correctAnswer] && (
              <p className="text-xl mt-2 font-normal">Respuesta: {currentQuestion.options[currentQuestion.correctAnswer]}</p>
            )} */}
          </div>
        </div>
      )}
      
      {/* El componente Question se renderiza siempre si hay currentQuestion, 
          pero se deshabilita mediante la prop 'disabled' */}
      {currentQuestion && (
        <Question
          question={currentQuestion.question}
          options={currentQuestion.options}
          onAnswer={answerQuestion}
          timeLeft={timeLeft}
          disabled={showFeedback} // Pasar showFeedback para deshabilitar botones
        />
      )}
    </div>
  );
};

export default Game;