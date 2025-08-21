import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <div className="flex items-center gap-2">
        <Image src={"/logo.png"} width={40} height={40} alt="logo" />
        <span className="text-xl font-bold text-blue-600">BrickKeeper</span>
      </div>

      <Link href={"/auth"}>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
          Login
        </button>
      </Link>
    </nav>
  );
};

export default Navbar;
