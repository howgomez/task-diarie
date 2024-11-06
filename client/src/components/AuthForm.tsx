import { useForm } from "react-hook-form";
import { loginSchema, registerSchema } from "../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

type AuthFormProps = {
  onSubmit: (data: AuthFormInputs) => void;
  isLogin?: boolean;
}

type AuthFormInputs = {
  username: string;
  email: string;
  password: string;
}

const AuthForm: React.FC<AuthFormProps> = ( { onSubmit, isLogin = false } ) => {
  const { register, handleSubmit, formState: { errors } } = useForm<AuthFormInputs>({
    resolver: zodResolver ( isLogin ? loginSchema : registerSchema),
  });


  const { errorMessage } = useSelector((state: RootState) => state.auth)
  
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4 max-w-sm mx-auto">
     { errorMessage ? <p  className='text-white font-bold p-4 bg-red-500'>{errorMessage}</p> : null }
      {!isLogin && (
        <div>
          <label className="block mb-2">Username</label>
          <input
            type="text"
            {...register("username")}
            className="p-2 border rounded-md w-full text-black"
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
          className="p-2 border rounded-md w-full text-black"
          required
        />
       {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <label className="block mb-2">Password</label>
        <input
          type="password"
          {...register("password")}
          className="p-2 border rounded-md w-full text-black"
          required
        />
       {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>
      <button type="submit" className="p-2 bg-blue-500 text-white rounded-md">
        {isLogin ? "Login" : "Register"}
      </button>
    </form>
  );
}

export default AuthForm;