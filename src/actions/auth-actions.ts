"use server";

import { z } from "zod";

const initialState = {
  success: false,
  errors: [] as { field: string; message: string }[],
};

type RegisterState = typeof initialState;

const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(6).max(20),
  name: z.string().min(3).max(30),
});

type RegisterForm = z.infer<typeof registerSchema>;

export const signup = async (prevState: RegisterState, formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");
  const name = formData.get("name");

  const result = registerSchema.safeParse({
    email,
    password,
    name,
  });

  if (!result.success) {
    return {
      success: false,
      errors: result.error.issues.map((issue) => ({
        field: String(issue.path[0]),
        message: issue.message,
      })),
    };
  }

  return { success: true, errors: [] };
};
