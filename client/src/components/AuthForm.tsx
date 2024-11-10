import { useForm } from "react-hook-form";
import { loginSchema, registerSchema } from "../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Link } from "react-router-dom";

type AuthFormProps = {
  onSubmit: (data: AuthFormInputs) => void;
  isLogin?: boolean;
}

type AuthFormInputs = {
  username: string;
  email: string;
  password: string;
}

const initialValues: AuthFormInputs = {
  username: '',
  email: 'admin@gmail.com',
  password: 'admin123',
}

const AuthForm: React.FC<AuthFormProps> = ( { onSubmit, isLogin = false } ) => {
  const { register, handleSubmit, formState: { errors } } = useForm<AuthFormInputs>({
    resolver: zodResolver ( isLogin ? loginSchema : registerSchema), 
    defaultValues: initialValues,
  });


  const { errorMessage } = useSelector((state: RootState) => state.auth)
  
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4 max-w-sm mx-auto bg-white/70 rounded-md">
      <h1 className="text-center text-3xl font-bold">Tú diario de tareas</h1>
     { errorMessage ? <p  className='text-white font-bold p-4 bg-red-500'>{errorMessage}</p> : null }
      {!isLogin && (
        <div>
          <label className="block mb-2">Username</label>
          <input
            type="text"
            {...register("username")}
            className="p-2 border rounded-md w-full text-white outline-none bg-gray-800 "
            required={!isLogin}
          />
         {errors.username && <p className="text-red-500">{errors.username.message}</p>}
        </div>
        )}
      <div>
        <label className="block mb-2">Email</label>
        <input
          type="email"
          {...register("email")}
          className="p-2 border rounded-md w-full text-white outline-none bg-gray-800"
          required
        />
       {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <label className="block mb-2">Password</label>
        <input
          type="password"
          {...register("password")}
          className="p-2 border rounded-md w-full text-white outline-none bg-gray-800"
          required
        />
       {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>
      <button type="submit" className="p-2 bg-blue-500 text-white rounded-md mt-10">
        {isLogin ? "Login" : "Register"}
      </button>
      {isLogin 
        ? <span className="text-sm">¿No tienes una cuenta? <Link to="/register" className="text-blue-800">Registrate</Link></span> 
        : <span>¿Ya tienes una cuenta? <Link to="/login" className="text-blue-800">Iniciar sesión</Link></span>
      }
    </form>
  );
}

export default AuthForm;