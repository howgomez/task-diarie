import { RootState, useAppDispatch } from '../store/store';
import { useSelector } from 'react-redux';
import { logoutUser } from '../store/auth/thunks';
import { RiMenuLine } from "react-icons/ri";
import { useEffect } from 'react';
import { FaFolder } from "react-icons/fa";
import { fetchUserTasks } from '../store/tasks/thunks';
import DropdownButtons from './DropDownButtons';
import TaskDropDown from './TaskDropDown';
const NavBar = () => {
    const { username, uid } = useSelector((state: RootState) => state.auth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (uid) {
            dispatch(fetchUserTasks());
        }
    }, [uid, dispatch]);

    const onLogout = () => {
        dispatch(logoutUser());
    };

    return (
        <nav className="bg-blue-500 text-[#ffffffeb] p-4">
            <ul className="flex justify-between items-center">
                <li className="font-bold text-xl">Diario Online</li>
                <div className="relative flex items-center">
                    <div className='flex gap-4'>
                        {/* Dropdown de tareas privadas */}
                        <DropdownButtons
                            icon={<FaFolder />}
                            dropdownContent={<TaskDropDown />} />

                        {/* Dropdown de menú de usuario */}
                        <DropdownButtons
                            icon={<RiMenuLine />}
                            dropdownContent={
                                <div className="flex flex-col gap-2">
                                    <span className="font-bold hidden sm:block ml-4 border-b-2 border-blue-500 pb-2">Hello, {username}</span>
                                    <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100 rounded">Crear nueva tarea</a>
                                    <a href="#" onClick={onLogout} className="block px-4 py-2 text-sm hover:bg-gray-100 rounded">Cerrar sesión</a>
                                </div>
                            }
                        />
                    </div>


                </div>
            </ul>
        </nav>
    );
};

export default NavBar;