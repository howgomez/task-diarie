import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { RootState, useAppDispatch } from "../store/store";
import { fetchPublicTasks, startDeleteTask } from "../store/tasks/thunks";
import { Task } from "../store/types/types";
import ImageContainer from "../components/ImageContainer";
import TaskFormModal from "../components/TaskFormModal";

export const Dashboard = () => {

  const { uid } = useSelector((state: RootState) => state.auth);
  const { publicTasks } = useSelector((state: RootState) => state.task);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const onEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsOpen(true); // Abrir modal para editar
  };

  const onCreateTask = () => {
    setSelectedTask(null); // No hay tarea seleccionada para crear una nueva
    setIsOpen(true);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
   if(uid) {
    dispatch(fetchPublicTasks());
   }
  }, [uid, dispatch]);

  const handleTaskDelete = (taskId: string )   => {
    setTimeout(() => dispatch(startDeleteTask(taskId)), 500);
  };
  return (
    <div>
      <div>
        <div className="flex flex-col items-center mt-10 gap-4 w-full sm:w-[60%] m-auto p-4">
          <input 
            type="text"
            placeholder="Search tasks" 
            className="rounded-md text-md text-black outline-none p-2 w-full sm:w-[350px] bg-gray-800"
          />
          <button 
          className="w-full sm:w-[350px] bg-blue-500 text-white p-2 rounded-md"
          onClick={onCreateTask}>Crear Nueva Tarea</button>
        </div>
        <TaskFormModal task={selectedTask} isOpen={isOpen} setIsOpen={setIsOpen} />
        <main className="w-full sm:w-[60%] m-auto ">
        <h1 className="text-left text-md sm:text-xl text-gray-400 p-4">Public tasks for the users</h1>
        <div className="flex flex-col gap-4 justify-center ">
          {publicTasks.map((task, index) => (
            <div key={index} className='p-4'>
              <ImageContainer src={task.image}>
              <div className="text-left p-2 text-white">
                <div className="w-full sm:w-[500px]">
                <h4 className="text-gray-200 flex items-center gap-2 py-2 font-bold"><FaUserAlt/> <span>@{task.user.username}</span></h4>
                <h3 className="text-2xl font-semibold">{task.title}</h3>
                <p className="text-white/50">{task.description}</p>
                </div>
                {uid === task.user._id && (
                  <div className="flex gap-2 sm:absolute  sm:right-0 sm:top-0 mt-4 mr-4 ">
                    <button 
                      onClick={ () => handleTaskDelete(task._id) }
                      className="bg-black/80 px-4 py-1 rounded-md">
                      <div className="flex text-1xl items-center gap-2 text-[#F4212E]">
                        <RiDeleteBin5Line/>
                        <span>Delete</span>
                      </div>
                    </button>
                    <button 
                      onClick={() => onEditTask(task)} 
                      className="bg-black/40 px-4 py-1 rounded-md">
                      <div className="flex text-1xl items-center gap-2 text-[#FFF200]">
                        <FiEdit2/>
                        <span className="text-[#FFF200]">Update</span>
                      </div>
                    </button>
                  </div>
                )}
              </div>

              </ImageContainer>
             
            </div>
          ))}
        </div>
        </main>
      </div>    
    </div>
  );
};
