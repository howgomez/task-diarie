import { AppDispatch, RootState } from "../store"
import { Task } from "../types/types";
import { createTask, loadPrivateTask, loadPublicTasks, loadUserTasks, setTasksError, setTasksLoading, updateTask } from "./taskSlice";


const API_URL = import.meta.env.VITE_API_URL; //example http://localhost:3000/api/auth


export const fetchUserTasks = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(setTasksLoading(true));  

    try {
      const response = await fetch(`${API_URL}api/task`, {
        method: "GET",
        credentials: "include"
      })
      if(!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Ocurrió un error al obtener las tareas");
      }
      
      const data: Task[] = await response.json();

      const publicTasks = data.filter((task) => task.visibility === "public");
      const privateTasks = data.filter((task) => task.visibility === "private");
      console.log("Tareas obtenidas: ", data);

      dispatch(loadUserTasks(data)); // Guarda en userTasks
      dispatch(loadPublicTasks(publicTasks));
      dispatch(loadPrivateTask(privateTasks));
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
      const response = await fetch(`${API_URL}api/task/public`, {
        method: "GET",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Ocurrió un error al obtener las tareas públicas");
      }

      const data: Task[] = await response.json();

      dispatch(loadPublicTasks(data)); // Guarda las tareas ordenadas
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      dispatch(setTasksError(errorMessage));
    } finally {
      dispatch(setTasksLoading(false));
    }
  };
};

export const fetchPrivateTasks = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(setTasksLoading(true));
    try {
      const response = await fetch(`${API_URL}api/task/private`, {
        method: "GET",
        credentials: "include",
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Ocurrió un error al obtener las tareas privadas");
      }
  
      const data: Task[] = await response.json();
      console.log("Tareas obtenidas: ", data);
  
      dispatch(loadPrivateTask(data)); // Guarda en userTasks
      dispatch(setTasksLoading(false));
  
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      dispatch(setTasksError(errorMessage));
    }
  }
}


export const startCreateTask = ( taskData: FormData ) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setTasksLoading(true));
  
    try {
      const response = await fetch(`${API_URL}api/task`, {
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

export const startDeleteTask = (tasIk: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setTasksLoading(true));
  
    try {
      const response = await fetch(`${API_URL}api/task/${tasIk}`, {
        method: "DELETE",
        credentials: "include",
      });
  
      if(!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Ocurrió un error al eliminar la tarea");
      }

      dispatch(fetchPublicTasks());
      dispatch(fetchUserTasks());

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      dispatch(setTasksError(errorMessage));
    }
  }
}

export const startUpdateTask = (taskId: string, formData: FormData) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setTasksLoading(true));
    console.log(formData);
    console.log(getState);
    try {
      const response = await fetch(`${API_URL}api/task/${taskId}`, {
        method: "PUT",
        credentials: "include",
        body: formData,  // Pasamos formData directamente, sin JSON.stringify
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Ocurrió un error al actualizar la tarea");
      }

      const data: Task = await response.json();
      console.log("Tarea actualizada con éxito: ", data);

      dispatch(updateTask(data));
      dispatch(fetchPublicTasks());
      dispatch(fetchUserTasks());

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error";
      console.log(errorMessage);
      dispatch(setTasksError(errorMessage));
    }
  }
}
