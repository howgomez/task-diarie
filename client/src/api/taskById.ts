const API_URL = import.meta.env.VITE_API_URL_BACKEND; // ejemplo: http://localhost:3000

async function getTaskById(taskId) {
  try {
    const response = await fetch(`${API_URL}/api/task/${taskId}`, {
      method: 'GET',
      credentials: 'include', // Incluye las cookies en la solicitud
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error('No autorizado o tarea no encontrada');
    }

    const task = await response.json();
    return task;
  } catch (error) {
    console.error('Error obteniendo la tarea:', error);
  }
}