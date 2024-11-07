import React, { useState, useRef, useEffect } from 'react';
import { CiImageOn } from "react-icons/ci";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { useAppDispatch } from '../store/store';
import { startCreateTask, startUpdateTask } from '../store/tasks/thunks';
import { Task } from '../store/types/types';

interface TaskFormModalProps {
  task: Task | null;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const TaskFormModal: React.FC<TaskFormModalProps> = ({ task, isOpen, setIsOpen }) => {
  const [title, setTitle] = useState(task ? task.title : "");
  const [description, setDescription] = useState(task ? task.description : "");
  const [image, setImage] = useState<File | null>(null);
  const [isVisible, setIsVisible] = useState(task ? task.visibility === 'private' : false);
  const dispatch = useAppDispatch();
  
  const modalBackgroundRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setIsVisible(task.visibility === 'private');
    } else {
      setTitle("");
      setDescription("");
      setImage(null);
      setIsVisible(false);
    }
  }, [task]);

  const handleCloseModal = (event: React.MouseEvent) => {
    if (modalBackgroundRef.current && modalBackgroundRef.current === event.target) {
      setIsOpen(false);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (image) { formData.append('image', image); }
    formData.append('visibility', isVisible ? 'private' : 'public');
    // formData.append("transformation", "c_fill,h_300,w_300");

    if (task) {
      dispatch(startUpdateTask(task._id, formData)); // Si hay una tarea, es edición
    } else {
      dispatch(startCreateTask(formData)); // Si no hay tarea, es creación
    }
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="modal-background" onClick={handleCloseModal} ref={modalBackgroundRef}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSubmit} className='text-black flex flex-col gap-4'>
              <h2>{task ? "Editar Tarea" : "Crear Nueva Tarea"}</h2>
              <input 
                type="text" 
                name="title" 
                className='text-md text-black outline-none px-2 border-b-2'
                placeholder='Titulo de la tarea'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <input 
                type="text" 
                name="description" 
                className='text-md text-black outline-none px-2 border-b-2'
                placeholder='Descripción de la tarea'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <div className='flex items-center gap-2 pl-2'>
                <input 
                  type='file' 
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />

                <button 
                  type='button'
                  onClick={handleClick}
                  className='text-2xl'
                >
                  <CiImageOn />
                </button>

                <button
                  className='text-2xl'
                  type='button'
                  onClick={() => setIsVisible(!isVisible)}
                >
                  {isVisible ? <MdOutlineVisibilityOff /> : <MdOutlineVisibility />}
                </button>
                <p>Visibilidad: {isVisible ? "Privada" : "Pública"}</p>
              </div>
              <button type="submit">{task ? "Actualizar Tarea" : "Crear Tarea"}</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskFormModal;
