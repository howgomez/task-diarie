import { useSelector } from "react-redux";
import NavPages from "../pages/components/NavPages";
import { RootState } from "../store/store";
import NavBar from "../components/NavBar";

interface LayoutPageProps {
  children: React.ReactNode;
}

export const LayoutPage = ({ children }: LayoutPageProps) => {

  const { status } = useSelector((state: RootState) => state.auth);

  return (
    <div className="bg-gray-900 min-h-screen">
      {
        status === 'notAuthenticated' ? <NavPages /> : <NavBar />
      }

      {children}
    </div>
  )
}