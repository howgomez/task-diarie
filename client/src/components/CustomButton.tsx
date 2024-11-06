import { ButtonHTMLAttributes, ReactNode } from 'react';

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  popovertarget?: string; // Agrega popovertarget como opcional
  children: ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({ popovertarget, children, ...props }) => (
  <button {...props} popovertarget={popovertarget as any}>
    {children}
  </button>
);

export default CustomButton;
