import React from 'react';

const Question = ({ question, options, onAnswer, timeLeft, disabled }) => { // Añadir prop 'disabled'
  const progressPercentage = (timeLeft / 30) * 100;

  return (
    <div className="card-base w-full max-w-3xl mx-auto p-6 sm:p-8 dark:bg-opacity-80 light:bg-opacity-95">
      <div className="mb-6">
        <p className="text-sm font-medium dark:text-gray-300 light:text-gray-600 mb-1 text-right">
          Tiempo restante: {timeLeft}s
        </p>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
          <div
            className="h-4 rounded-full transition-all duration-300 ease-linear"
            style={{
              width: `${progressPercentage}%`,
              backgroundColor: progressPercentage > 50 ? 'var(--success-color)' : progressPercentage > 20 ? 'var(--accent-color)' : 'var(--error-color)',
            }}
          ></div>
        </div>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold mb-8 dark:text-white light:text-gray-900 text-center">
        {question}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(index)}
            disabled={disabled} // Usar la prop disabled
            className={`btn w-full p-4 text-base sm:text-lg text-center rounded-lg 
                       dark:bg-opacity-50 light:bg-opacity-70 
                       dark:hover:bg-opacity-70 light:hover:bg-opacity-90
                       border-2 border-transparent hover:border-current
                       transition-all duration-200 ease-in-out 
                       transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--card-background-dark)] dark:focus:ring-[var(--accent-color)] light:focus:ring-[var(--primary-color)]
                       ${disabled ? 'opacity-60 cursor-not-allowed hover:scale-100' : ''}`} // Estilos para deshabilitado
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;