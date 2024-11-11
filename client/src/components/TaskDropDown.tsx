import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Link } from 'react-router-dom';
const TaskDropDown = () => {

    const { privateTasks } = useSelector((state: RootState) => state.task);

    return (
    <div className="absolute right-0 top-[-40px] w-64 h-auto bg-white shadow-lg rounded-md p-4 text-black z-50 flex flex-col gap-2 ">
        <span>Tareas privadas</span>
    {
        privateTasks.length > 0 ? (
            privateTasks.map((task) => (
                <Link to={`/dashboard/task/${task._id}`} key={task._id} className="border-b flex gap-2 bg-blue-500 shadow-lg rounded-md">
                    <img src={task.image} alt={task.title} className="w-[50px] rounded-md h-[50px] object-cover" />
                    <div className='p-2 text-white'>
                    <h3 className="font-bold text-sm">
                    {task.title.length > 10 ? `${task.title.substring(0, 10)}...` : task.title}
                    </h3>
                    <p className="text-xs text-white/50">
                    {task.description.length > 10 ? `${task.description.substring(0, 10)}...` : task.description}
                    </p>
                    </div>
                </Link>
            ))
        ) : (
            <p className="text-sm text-gray-500 h-[250px] ">No hay tareas privadas</p>
        )
    }
</div>
  )
}

export default TaskDropDown