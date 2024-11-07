// import { RootState, useAppDispatch } from "../store/store";
// import { useSelector } from "react-redux"
// import { logoutUser } from "../store/auth/thunks";
// import { useEffect, useState } from "react";
// import ImageContainer from "../components/ImageContainer";
// import { CiLogout } from "react-icons/ci";
// import TaskFormModal from "../components/TaskFormModal";
// import { fetchPublicTasks, startDeleteTask } from "../store/tasks/thunks";
// import { Task } from "../store/types/types";



// export const Dashboard = () => {
//   const { username, uid } = useSelector((state: RootState) => state.auth);
//   const { publicTasks } = useSelector((state: RootState) => state.task);
//   const [selectedTask, setSelectedTask] = useState<Task | null>(null);

//   const onEditTask = (task: Task) => {
//     setSelectedTask(task);
    
//   }

//   const dispatch = useAppDispatch();

  


//   useEffect(() => {
//    if(uid) {
//     dispatch(fetchPublicTasks());
//    }
//   },[uid, dispatch]);




//   const onLogout = () => {
//     dispatch( logoutUser());
//   }

//   return (
//     <div className="relative">
//       <nav>
//         <ul className="sticky top-0 flex justify-around items-center bg-gray-600 p-4">
//           <li><h2>Dashboard</h2></li> 
//           <div className="buttons flex items-center gap-4">
//             <span>Hello, {username}</span>
//             <button onClick={onLogout} className="bg-gray-400 rounded-full text-xl text-black p-3"><CiLogout/></button>
//           </div>
//         </ul>
//       </nav>
//       <div>
//         <div className="flex items-center p-4 gap-4">
//         <input 
//         type="text"
//         placeholder="Search tasks" 
//         className=" rounded-md text-md text-black outline-none px-2"
//         />
//         <TaskFormModal task={selectedTask} />
//         </div>
//         <h1 className="text-left text-xl text-gray-400 p-4">Public tasks for the users</h1>
//         <div className="flex flex-wrap gap-4 justify-center">
//           {publicTasks.map((task, index) => (
//             <div key={index} className="bg-gray-800 rounded-xl overflow-hidden flex flex-col w-[350px]">
//               <ImageContainer src={task.image} />
//               <div className="text-left p-2 text-[#bebfc2]">
//                 <h3 className="text-xl font-semibold">{task.title}</h3>
//                 <p className="mt-1 text-gray-600">{task.description}</p>
//               {task.user.username}
//               {
//                   uid === task.user._id && (
//                     <div className="flex gap-2">
//                       <button 
//                       onClick={() => dispatch(startDeleteTask(task?._id))} 
//                       className="bg-red-500 p-2">
//                         Delete
//                       </button>
//                       <button 
//                       onClick={ () => onEditTask(task)} 
//                       className="bg-blue-500 p-2">
//                         Update
//                       </button>
//                     </div>
//                   )
//                 }
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>    
//     </div>
//   )
// }



import { RootState, useAppDispatch } from "../store/store";
import { useSelector } from "react-redux"
import { useEffect, useState } from "react";
import ImageContainer from "../components/ImageContainer";
import TaskFormModal from "../components/TaskFormModal";
import { fetchPublicTasks, startDeleteTask } from "../store/tasks/thunks";
import { Task } from "../store/types/types";
import NavBar from "../components/NavBar";

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


  return (
    <div className="relative">
        <NavBar/>
      <div>
        <div className="flex flex-col items-center p-4 gap-4">
          <input 
            type="text"
            placeholder="Search tasks" 
            className="rounded-md text-md text-black outline-none p-2 w-full sm:w-1/2"
          />
          <button 
          className="w-full sm:w-1/2 bg-blue-500 text-white p-2 rounded-md"
          onClick={onCreateTask}>Crear Nueva Tarea</button>
        </div>
        <TaskFormModal task={selectedTask} isOpen={isOpen} setIsOpen={setIsOpen} />
        <h1 className="text-left text-xl text-gray-400 p-4">Public tasks for the users</h1>
        <div className="flex flex-wrap gap-4 justify-center">
          {publicTasks.map((task, index) => (
            <div key={index} className=" rounded-xl overflow-hidden flex flex-col w-[350px] h-[350px]">
              <ImageContainer src={task.image}>
              <div className="text-left p-2 text-white flex flex-col gap-2">
                <h3 className="text-xl font-semibold">{task.title}</h3>
                <p className="mt-1 text-white/50">{task.description}</p>
                {task.user.username}
                {uid === task.user._id && (
                  <div className="flex gap-2s">
                    <button 
                      onClick={() => dispatch(startDeleteTask(task._id))} 
                      className="bg-red-500 p-2">
                      Delete
                    </button>
                    <button 
                      onClick={() => onEditTask(task)} 
                      className="bg-blue-500 p-2">
                      Update
                    </button>
                  </div>
                )}
              </div>

              </ImageContainer>
             
            </div>
          ))}
        </div>
      </div>    
    </div>
  );
};

