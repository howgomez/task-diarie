import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../store/store';
import { useSelector } from 'react-redux';
import { format } from '@formkit/tempo';
import { RiDeleteBin5Line } from 'react-icons/ri';
import TaskFormModal from '../../components/TaskFormModal';
import { startDeleteTask } from '../../store/tasks/thunks';
import 'animate.css';

const TaskPage = () => {
  const { privateTasks } = useSelector((state: RootState) => state.task);
  const { id } = useParams();
  const task = privateTasks.find((task) => task._id === id);
  const dispatch = useAppDispatch();
  // Estado para controlar el modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  if (!task) return navigate('/dashboard');
  
  
  const onDeleteTask = async ()  => {
    try {
      await dispatch(startDeleteTask(task._id));
      navigate('/dashboard');

    } catch (error) {
      console.log(error);
    }

  }
  

  return (
    <section className='bg-gray-900 flex flex-col-reverse xl:grid xl:grid-cols-2 h-full mt-20 p-4 animate__animated animate__fadeInLeft'>
      
      {/* Modal de edición */}
      <TaskFormModal 
        task={task} 
        isOpen={isModalOpen} 
        setIsOpen={setIsModalOpen} 
      />
      <article className=''>
        <h1 className='text-xl text-white py-4'>Tareas privadas</h1>
        <div className='grid grid-cols-2 xl:flex  xl:flex-wrap  gap-2'>
          {privateTasks.map((task) => (
            <Link to={`/dashboard/task/${task._id}`} key={task._id} className="border-b flex gap-2 bg-blue-500 shadow-lg rounded-md">
              <img src={task.image} alt={task.title} className=" sm:w-[100px] rounded-md w-full h-[100px] object-cover" />
              <div className='p-2 text-white'>
                <h3 className="font-bold text-sm">
                  {task.title.length > 10 ? `${task.title.substring(0, 10)}...` : task.title}
                </h3>
                <p className="text-xs text-white/50">
                  {task.description.length > 10 ? `${task.description.substring(0, 10)}...` : task.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </article>
      <article className='w-full h-auto  md:w-[600px] md:h-[600px] border-2 border-white/50 rounded-md shadow-lg flex flex-col m-auto '>
        {task.image && <img src={task.image} alt={task.title || 'Task Image'} className='w-full h-full object-cover' />}
        <div className='text-left p-4'>
          <h1 className='text-white text-3xl font-bold'>{task.title}</h1>
          <p className='text-white text-md'>{task.description}</p>
        </div>
        <div className='flex gap-2 p-4'>
          {/* Botón para abrir el modal de actualización */}
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="bg-blue-500 px-4 py-1 rounded-md text-white"
          >
            Update
          </button>

          {/* Botón para eliminar la tarea */}
      
            <button onClick={onDeleteTask} className="flex text-1xl items-center gap-2 bg-red-500 px-4 py-1 rounded-md text-white">
              <RiDeleteBin5Line/>
              <span>Delete</span>
            </button>
        </div>
        <div className='text-white p-4 text-xs'>
          Created at: {task.createdAt ? format(new Date(task.createdAt), "MMMM D, YYYY h:mm a") : 'Fecha no disponible'}
        </div>
      </article>

    </section>
  );
};

export default TaskPage;
