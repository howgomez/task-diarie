import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../types/types";

interface TaskState {
    user: {
        _id: string;
        username: string;
    }
    userTasks: Task[],
    privateTasks: Task[],
    publicTasks: Task[],
    loading: boolean;
    error: string | null;
}


const initialState: TaskState = {
    user: { _id: '', username: '' },
    userTasks: [],
    publicTasks: [],
    privateTasks: [],
    loading: false,
    error: null,
}

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        loadUserTasks: (state, action: PayloadAction<Task[]>) => {
          state.userTasks = action.payload;
        },
        loadPrivateTask: (state, action: PayloadAction<Task[]>) => {
          state.privateTasks = action.payload;
        },

        loadPublicTasks: (state, action: PayloadAction<Task[]>) => {
            state.publicTasks = action.payload;
          },

        createTask: (state, action: PayloadAction<Task>) => { // Especifica el tipo aquí
          if(action.payload.visibility === 'private') {
                state.privateTasks.push(action.payload);
            }
          if(action.payload.visibility === 'public') {
                state.publicTasks.push(action.payload);
            }

        },

        updateTask: (state, action: PayloadAction<Task>) => {
            const updateTask = action.payload;
            state.publicTasks = state.publicTasks.map((task) =>  task._id === updateTask._id ? updateTask : task )
            state.userTasks = state.userTasks.map((task) =>  task._id === updateTask._id ? updateTask : task )
        },

        setTasksLoading: (state, action: PayloadAction<boolean>) => {
          state.loading = action.payload;
        },
        setTasksError: (state, action: PayloadAction<string | null>) => {
          state.error = action.payload;
        },
      },
});

export const { 
  updateTask,
  createTask, 
  setTasksLoading, 
  setTasksError, 
  loadUserTasks,
  loadPrivateTask, 
  loadPublicTasks } = taskSlice.actions;
export default taskSlice;