import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

const SIGNIN_ERROR_URL = "/error";

export default async function RegisterForm(props: {
  searchParams: { callbackUrl: string | undefined };
}) {
  return (
    <div className="p-8 flex flex-col justify-center bg-gray-50">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Register</h2>
      <form
        className="flex flex-col gap-4"
        action={async (formData) => {
          "use server";
          try {
            const { searchParams } = await props;

            const email = formData.get("email");
            const password = formData.get("password");
            const name = formData.get("name");
            await signIn("credentials", {
              email,
              password,
              name,
              redirect: true,
              redirectTo: searchParams?.callbackUrl ?? "",
            });
          } catch (error) {
            if (error instanceof AuthError) {
              return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
            }
            throw error;
          }
        }}
      >
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          name="name"
          type="text"
          placeholder="Your name"
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Register now
        </button>
      </form>
    </div>
  );
}
