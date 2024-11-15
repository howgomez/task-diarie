import { useEffect, useRef, useState } from "react";

interface DropdownProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Dropdown = ({ isOpen, onClose, children }: DropdownProps) => {
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div ref={dropdownRef} className="absolute right-0 mt-20 w-56 bg-white shadow-lg rounded-md p-4 text-black z-50">
            {children}
        </div>
    );
};

interface DropdownButtonProps {
    icon: React.ReactNode;
    dropdownContent: React.ReactNode;
}

const DropdownButtons = ({ icon, dropdownContent }: DropdownButtonProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);
    const closeDropdown = () => setIsOpen(false);

    return (
        <div className="relative flex items-center">
            <button onClick={toggleDropdown} className="text-3xl">
                {icon}
            </button>
            <Dropdown isOpen={isOpen} onClose={closeDropdown}>
                {dropdownContent}
            </Dropdown>
        </div>
    );
};

export default DropdownButtons;