import { AppDispatch } from "../store"
import { Task } from "../types/types";
import { createTask, loadPublicTasks, loadUserTasks, setTasksError, setTasksLoading } from "./taskSlice";


export const fetchUserTasks = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(setTasksLoading(true));  

    try {
      const response = await fetch("http://localhost:3000/api/task", {
        method: "GET",
        credentials: "include"
      })
      if(!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Ocurrió un error al obtener las tareas");
      }
      const data: Task[] = await response.json();
      console.log("Tareas obtenidas: ", data);

      dispatch(loadUserTasks(data)); // Guarda en userTasks
      dispatch(setTasksLoading(false));

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      dispatch(setTasksError(errorMessage));
    }

  }
}

export const fetchPublicTasks = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(setTasksLoading(true));
    try {
      const response = await fetch("http://localhost:3000/api/task/public", {
        method: "GET",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Ocurrió un error al obtener las tareas públicas");
      }

      const data: Task[] = await response.json();
      const sortedData = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      dispatch(loadPublicTasks(sortedData)); // Guarda las tareas ordenadas
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      dispatch(setTasksError(errorMessage));
    } finally {
      dispatch(setTasksLoading(false));
    }
  };
};


export const startCreateTask = ( taskData: FormData ) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setTasksLoading(true));
  
    try {
      const response = await fetch("http://localhost:3000/api/task", {
        method: "POST",
        credentials: "include",
        body: taskData,
      });

      if(!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Ocurrió un error al crear la tarea");
      }

      const data: Task = await response.json();
      console.log("Tarea creada con éxito: ", data);

      dispatch(createTask(data));
      dispatch(fetchPublicTasks())

    } catch (error) {      
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
    dispatch(setTasksError(errorMessage));
    } finally {
      dispatch(setTasksLoading(false));
    }
  }
}

