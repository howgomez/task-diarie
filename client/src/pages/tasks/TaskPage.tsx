import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { format } from '@formkit/tempo';
import { RiDeleteBin5Line } from 'react-icons/ri';
import TaskFormModal from '../../components/TaskFormModal';

const TaskPage = () => {
  const { privateTasks } = useSelector((state: RootState) => state.task);
  const { id } = useParams();
  const task = privateTasks.find((task) => task._id === id);

  // Estado para controlar el modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!task) {
    return <p>La tarea no fue encontrada.</p>;
  }

  return (
    <section className='bg-gray-900 flex flex-col items-center h-screen mt-20'>
      <article className='w-[600px] h-[600px] border-2 border-white/50 rounded-md shadow-lg flex flex-col'>
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
          <button 
            // Aquí va tu lógica de eliminación (dispatch y demás)
            className="bg-red-500 px-4 py-1 rounded-md text-white"
          >
            <div className="flex text-1xl items-center gap-2">
              <RiDeleteBin5Line/>
              <span>Delete</span>
            </div>
          </button>
        </div>
        <div className='text-white p-4 text-xs'>
          Created at: {task.createdAt ? format(new Date(task.createdAt), "MMMM D, YYYY h:mm a") : 'Fecha no disponible'}
        </div>
      </article>

      {/* Modal de edición */}
      <TaskFormModal 
        task={task} 
        isOpen={isModalOpen} 
        setIsOpen={setIsModalOpen} 
      />
    </section>
  );
};

export default TaskPage;
