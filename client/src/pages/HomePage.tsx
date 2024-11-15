import { Link } from 'react-router-dom';


export const HomePage = () => {
  return (
    <main className="text-white"><section className="sm:grid flex flex-col sm:grid-cols-2 gap-4 p-4 mt-0 sm:mt-20">
        <article className='flex flex-col justify-center gap-4 p-4 bg-black/50 rounded-3xl contenedor-page'>
        <h1 className="text-[#ffffffeb] text-4xl font-bold">Bienvenido a <span className="text-blue-500">Diario Online</span></h1>
        <p className="text-lg">Aquí podrás crear y gestionar tus tareas diarias. Ademas podras publicarlas para que otros usuarios puedan verlas.
        <span className="text-blue-500">  Diario Online</span> busca ser una herramienta útil para gestionar tus tareas diarias y mantener un registro de tus actividades.
        Empieza ahora guardando tus tareas y compartiendolas, <Link to={'/register'} className="text-blue-500">Empezar ahora</Link>
        </p>
        </article>
        <div className=' bg-black/50 rounded-3xl flex'>
          <img src="../assets/phonepage.png" alt="Screenshot-2023-05-11-at-14-02-01" className='rounded-3xl' />
        </div>
      </section>
    </main>
  )
}
