import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    alert(`You have logged in : ${data.email}, ${data.password}`);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Welcome back, login!</h2>
      <form className="flex flex-col items-center space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" name="email" 
            required 
            className="border border-gray-300 p-2 w-full rounded-md" />
        </div>
        <div className="w-full">
          <label htmlFor="password">Password</label>
          <input 
            type="password"
            {...register("password",
              {required: true}, 
              {minLength: { 
                value: 6, 
                message: "Password should atleast be 6 characters"}},
              {minLength: {
                value: 12, 
                message: "Password should have atmost 15 characters"}}
            )}
            id="password" name="password" 
            className="border border-gray-300 p-2 w-full rounded-md" />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">Login</button>

        <p>
          Don't have an accout? <Link to={"/signup"} className="text-blue-500">Sign Up</Link>
        </p>
      </form>
    </div>
  )
}

export default Login