"use server";

import { createAuthSession } from "@/lib/auth";
import connectToDb from "@/lib/db";
import { z } from "zod";
import { hash } from "bcrypt";

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

  const client = await connectToDb();

  try {
    await client.connect();
    const db = client.db("brickkeeper");
    const users = db.collection("users");
    const hashedPassword = await hash(password as string, 10);
    const user = await users.findOne({ email });

    if (user) {
      console.log("user exists");
      return;
    }

    const res = await users.insertOne({
      name,
      email,
      password: hashedPassword,
    });

    await createAuthSession(res.insertedId.toString());
  } catch (error) {
    console.log(error);
    return { success: false };
  } finally {
    await client.close();
  }

  return { success: true, errors: [] };
};
