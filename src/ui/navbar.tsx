import { auth, signIn, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const FormButton: FC<{ login?: true }> = ({ login = false }) => (
  <form
    action={async () => {
      "use server";
      login ? await signIn() : await signOut();
    }}
  >
    <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
      {login ? "Sign in" : "Sign out"}
    </button>
  </form>
);

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <Link href={"/"}>
        <div className="flex items-center gap-2">
          <Image src={"/logo.png"} width={40} height={40} alt="logo" />
          <span className="text-xl font-bold text-blue-600">BrickKeeper</span>
        </div>
      </Link>
      {session?.user ? <FormButton /> : <FormButton login={true} />}
    </nav>
  );
};

export default Navbar;
