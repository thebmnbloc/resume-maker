import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Signup = () => {
  const {register, handleSubmit, formState: { errors }} = useForm();

  const onSubmit = (data) => {
    alert(`You have signed up: username: ${data.username}, ${data.email}, ${data.password} `);
  }
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center space-y-4">
        <div className="w-full">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" required className="border border-gray-300 p-2 w-full rounded-md" />
        </div>
        <div className="w-full">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required className="border border-gray-300 p-2 w-full rounded-md" />
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
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">Sign Up</button>

        <p>
          Already have an accout? <Link to={"/login"} className="text-blue-500">login</Link>
        </p>
      </form>
    </div>
  )
}

export default Signup