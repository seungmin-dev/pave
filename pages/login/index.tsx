import { Input } from "@/src/components/input";
import Link from "next/link";

export default function LoginPage(): JSX.Element {
  return (
    <div className="w-full max-w-[600px] h-screen m-auto ">
      <div className="flex flex-col gap-4 mt-56">
        <h1 className="text-center font-extrabold text-5xl mb-8">PAVE</h1>
        <p className="text-center font-bold text-2xl mb-6">Log In</p>
        <Input type="text" placeholder="name" />
        <Input type="password" placeholder="password" />
        <input
          className="w-100 px-4 py-2 bg-black text-white text-center rounded-xl cursor-pointer hover:bg-slate-900"
          type="text"
          value="Login"
        />
        <span className="text-center">
          Doesn&apos;t have an account yet?{" "}
          <Link
            href="/sign-in"
            className="underline hover:italic cursor-pointer"
          >
            Sign in
          </Link>
        </span>
      </div>
    </div>
  );
}
