import { RootState, useAppDispatch } from '../store/store';
import { useSelector } from 'react-redux';
import { logoutUser } from '../store/auth/thunks';
import { RiMenuLine } from "react-icons/ri";
import { useState, useRef, useEffect } from 'react';

const NavBar = () => {
    const { username } = useSelector((state: RootState) => state.auth);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const dispatch = useAppDispatch();

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const onLogout = () => {
        dispatch(logoutUser());
        setIsOpen(false); // Cierra el menú después de cerrar sesión
    };

    // Cierra el menú al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="bg-[#A8D5BA] text-[#6F4F40] p-4">
            <ul className="flex justify-between items-center">
                <li className=" font-bold text-xl">Dashboard</li>
                <div className="relative flex items-center">
                    <span className="font-bold mr-4 hidden sm:block">Hello, {username}</span>
                    <button onClick={toggleDropdown} className="text-3xl">
                        <RiMenuLine/>
                      </button>

                    {isOpen && (
                        <div 
                            ref={dropdownRef} 
                            className="absolute right-0 mt-20 w-56 bg-white shadow-lg rounded-md p-4 text-black z-50"
                        >                            
                            <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100 rounded">Editar perfil</a>
                            <a href="#" onClick={onLogout} className="block px-4 py-2 text-sm hover:bg-gray-100 rounded">Cerrar sesión</a>
                        </div>
                    )}
                </div>
            </ul>

        </nav>
    );
};

export default NavBar;
