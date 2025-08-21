import { FC } from "react";
import Login from "./login";
import Register from "./register";

const Form: FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        <Login />
        <Register />
      </div>
    </div>
  );
};
export default Form;
