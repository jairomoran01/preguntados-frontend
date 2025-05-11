const API_URL = 'https://preguntados-backend.vercel.app/';

export const api = {
  getQuestions: async (category) => {
    const response = await fetch(`${API_URL}/questions/${category}`);
    if (!response.ok) throw new Error('Error al obtener preguntas');
    return response.json();
  },

  saveGame: async (gameData) => {
    const response = await fetch(`${API_URL}/games`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gameData),
    });
    if (!response.ok) throw new Error('Error al guardar el juego');
    return response.json();
  },

  getLeaderboard: async () => {
    const response = await fetch(`${API_URL}/games/leaderboard`);
    if (!response.ok) throw new Error('Error al obtener la tabla de clasificación');
    return response.json();
  },
};