import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

const SIGNIN_ERROR_URL = "/error";

export default async function SignInPage(props: {
  searchParams: { callbackUrl: string | undefined };
}) {
  return (
    <div className="p-8 flex flex-col justify-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Log in</h2>
      <form
        className="flex flex-col gap-4"
        action={async (formData) => {
          "use server";
          try {
            const email = formData.get("email");
            const password = formData.get("password");

            const { searchParams } = await props;

            await signIn("credentials", {
              email,
              password,
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
          type="email"
          placeholder="Email"
          name="email"
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
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
}
