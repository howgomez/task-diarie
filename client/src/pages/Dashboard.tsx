import { RootState, useAppDispatch } from "../store/store";
import { useSelector } from "react-redux"
import { logoutUser } from "../store/auth/thunks";
import { useEffect } from "react";
import ImageContainer from "../components/ImageContainer";
import { CiLogout } from "react-icons/ci";
import TaskFormModal from "../components/TaskFormModal";
import { fetchPublicTasks } from "../store/tasks/thunks";



export const Dashboard = () => {
  const { username, uid } = useSelector((state: RootState) => state.auth);
  const { publicTasks } = useSelector((state: RootState) => state.task);
  const dispatch = useAppDispatch();

  


  useEffect(() => {
   if(uid) {
    dispatch(fetchPublicTasks());
   }
  },[uid, dispatch]);

  const onLogout = () => {
    dispatch( logoutUser());
  }

  return (
    <div className="relative">
      <nav>
        <ul className="sticky top-0 flex justify-around items-center bg-gray-600 p-4">
          <li><h2>Dashboard</h2></li> 
          <div className="buttons flex items-center gap-4">
            <span>Hello, {username}</span>
            <button onClick={onLogout} className="bg-gray-400 rounded-full text-xl text-black p-3"><CiLogout/></button>
          </div>
        </ul>
      </nav>
      <div>
        <div className="flex items-center p-4 gap-4">
        <input 
        type="text"
        placeholder="Search tasks" 
        className=" rounded-md text-md text-black outline-none px-2"
        />
        <TaskFormModal />
        </div>
        <h1 className="text-left text-xl text-gray-400 p-4">Public tasks for the users</h1>
        <div className="flex flex-wrap gap-4 justify-center">
          {publicTasks.map((task, index) => (
            <div key={index} className="bg-gray-800 rounded-xl overflow-hidden flex flex-col w-[350px]">
              <ImageContainer src={task.image} />
              <div className="text-left p-2 text-[#bebfc2]">
                <h3 className="text-xl font-semibold">{task.title}</h3>
                <p className="mt-1 text-gray-600">{task.description}</p>
              {task.user.username}
              {
                  uid === task.user._id && (
                    <div className="flex gap-2">
                      <button className="bg-red-500 p-2">Delete</button>
                      <button className="bg-blue-500 p-2">Update</button>
                    </div>
                  )
                }
              </div>
            </div>
          ))}
        </div>
      </div>    
    </div>
  )
}
