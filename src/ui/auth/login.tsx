import { FC } from "react";

const Login: FC = () => {
  return (
    <div className="p-8 flex flex-col justify-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Log in</h2>
      <form className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Hasło"
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Log in
        </button>
      </form>
    </div>
  );
};
export default Login;
