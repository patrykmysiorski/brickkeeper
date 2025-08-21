"use client";

import { signup } from "@/actions/auth-actions";
import { FC } from "react";
import { useActionState } from "react";

const initialState = {
  success: false,
  errors: [] as { field: string; message: string }[],
};

const Register: FC = () => {
  const [formState, formAction] = useActionState(signup, initialState);

  const getError = (field: string) =>
    formState?.errors?.find((err) => err.field === field)?.message;

  return (
    <div className="p-8 flex flex-col justify-center bg-gray-50">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Register</h2>
      <form
        className="flex flex-col gap-4"
        id="register-form"
        action={formAction}
      >
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        {getError("email") && (
          <p className="text-sm text-red-600 mt-1">{getError("email")}</p>
        )}
        <input
          name="name"
          type="text"
          placeholder="Your name"
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        {getError("name") && (
          <p className="text-sm text-red-600 mt-1">{getError("name")}</p>
        )}
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        {getError("password") && (
          <p className="text-sm text-red-600 mt-1">{getError("password")}</p>
        )}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Register now
        </button>
      </form>
    </div>
  );
};
export default Register;
