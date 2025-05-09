import React, { createContext, useContext, useState, useCallback } from 'react'; // Importa useCallback
import { api } from '../services/api';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [gameState, setGameState] = useState('idle'); // idle, playing, finished
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [playerName, setPlayerName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showFeedback, setShowFeedback] = useState(false); // Nuevo estado para mostrar feedback
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(null); // Nuevo estado para saber si la última respuesta fue correcta

  const startGame = useCallback(async (category, name) => {
    setPlayerName(name);
    setSelectedCategory(category);
    setScore(0);
    setQuestions([]); // Resetea las preguntas
    setCurrentQuestion(null); // Resetea la pregunta actual
    setGameState('playing');
    setShowFeedback(false); // Asegurarse que el feedback no esté activo al iniciar
    try {
      const fetchedQuestions = await api.getQuestions(category);
      if (fetchedQuestions && fetchedQuestions.length > 0) {
        setQuestions(fetchedQuestions); // Deberían ser 5 preguntas del backend
        setCurrentQuestion(fetchedQuestions[0]);
      } else {
        console.error('No se obtuvieron preguntas o el array está vacío.');
        setGameState('finished'); // Termina el juego si no hay preguntas
      }
    } catch (error) {
      console.error('Error al iniciar el juego:', error);
      setGameState('finished'); // Termina el juego en caso de error
    }
  }, []); // Los setters de useState son estables, api.getQuestions se asume estable

  // endGame debe ser definida antes de answerQuestion si se usa como dependencia
  const endGame = useCallback(async () => {
    setGameState('finished');
    setShowFeedback(false); // Asegurarse que el feedback se oculte al terminar
    try {
      await api.saveGame({
        playerName,
        category: selectedCategory,
        score
      });
    } catch (error) {
      console.error('Error al guardar el juego:', error);
    }
  }, [playerName, selectedCategory, score]); // Dependencias de endGame

  const answerQuestion = useCallback((answerIndex) => {
    if (!currentQuestion || showFeedback) return; // No hacer nada si se está mostrando feedback

    const isCorrect = currentQuestion.correctAnswer === answerIndex;
    setLastAnswerCorrect(isCorrect);
    if (isCorrect) setScore(prevScore => prevScore + 1);
    
    setShowFeedback(true); // Mostrar feedback

    setTimeout(() => {
      setShowFeedback(false);
      setLastAnswerCorrect(null);

      // Usar _id si las preguntas lo tienen (de MongoDB), sino el texto de la pregunta como fallback.
      // Es importante que la comparación sea robusta.
      const currentQuestionId = currentQuestion._id || currentQuestion.question;
      const currentQuestionIndexInArray = questions.findIndex(q => (q._id || q.question) === currentQuestionId);
      
      if (currentQuestionIndexInArray === -1) {
          console.error("Pregunta actual no encontrada en el array de preguntas. Terminando juego.");
          endGame();
          return;
      }

      const nextQuestionIndex = currentQuestionIndexInArray + 1;
      if (nextQuestionIndex < questions.length) {
        setCurrentQuestion(questions[nextQuestionIndex]);
      } else {
        endGame();
      }
    }, 2000); // Esperar 2 segundos antes de continuar
  }, [currentQuestion, questions, endGame, showFeedback]);

  const resetGame = useCallback(() => {
    setGameState('idle');
    setQuestions([]);
    setCurrentQuestion(null);
    setScore(0);
    setPlayerName('');
    setSelectedCategory('');
  }, []);

  return (
    <GameContext.Provider value={{
      gameState,
      currentQuestion,
      questions,
      score,
      playerName,
      selectedCategory,
      startGame,
      answerQuestion,
      endGame,
      resetGame,
      showFeedback, // Exponer nuevo estado
      lastAnswerCorrect // Exponer nuevo estado
    }}>
      {children}
    </GameContext.Provider>
  );
};