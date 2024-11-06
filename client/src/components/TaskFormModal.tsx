import React, { useState, useRef } from 'react';
import { CiImageOn } from "react-icons/ci";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { useAppDispatch } from '../store/store';
import { startCreateTask } from '../store/tasks/thunks';

const TaskFormModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  
  const dispatch = useAppDispatch();

  const handleButtonClick = () => {
    setIsOpen(true);
  };

  const handleCloseModal = (event: React.MouseEvent) => {
    if (modalRef.current && modalRef.current === event.target) {
      setIsOpen(false);
    }
  };

  const onFileInputChange = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0]);
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (image) { formData.append('image', image) }
    formData.append('visibility', isVisible ? 'private' : 'public');
    formData.append("transformation", "c_fill,h_300,w_300"); // Crop de 300x300 px

    dispatch(startCreateTask (formData));
    setIsOpen(false);
  }


  return (
    <div>
      <button 
        className="btn-open-modal"
        onClick={handleButtonClick}
      >
        Crear Nueva Tarea
      </button>

      {isOpen && (
        <div 
          className="modal-background" 
          onClick={handleCloseModal}
          ref={modalRef}
        >
          <div className="modal-content">
            <form onSubmit={handleSubmit} className='text-black flex flex-col gap-4'>
              <h2>Crear Nueva Tarea</h2>
                <input 
                type="text" 
                name="title" 
                className=' text-md text-black outline-none px-2 border-b-2'
                placeholder='Titulo de la tarea'
                onChange={(e) => setTitle(e.target.value)}
                />

                <input 
                type="text" 
                name="description" 
                className=' text-md text-black outline-none px-2 border-b-2'
                placeholder='Descripción de la tarea'
                onChange={(e) => setDescription(e.target.value)}
                />
             <div className='flex items-center gap-2 pl-2'>
                <input 
                  type='file' 
                  style={{ display: 'none' }}
                  ref={onFileInputChange}
                  onChange={handleFileChange}
                  />
                
                <button 
                  type='button'
                  onClick={() => onFileInputChange.current?.click()}
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
                <p>Visibilidad: {isVisible ? "Private" : "Public"}</p>

              </div>
              <button type="submit">Crear Tarea</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskFormModal;
