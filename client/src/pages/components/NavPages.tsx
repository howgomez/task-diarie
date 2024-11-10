import { Link } from 'react-router-dom';
const NavPages = () => {
  return (
    <nav className="flex justify-around sm:justify-between items-center sm:p-4 bg-black/40 text-white p-4">
    <Link to={'/'} className='text-sm sm:text-xl'>Diario Online</Link>
    <div className="flex gap-2 text-sm sm:gap-8">
       <Link to={"/login"} className="text-blue-500">Ingresar</Link>
       <Link to="/register" className="text-green-400">Registrarse</Link>
       <a href="">información</a>
    </div>
 </nav>
  )
}

export default NavPages