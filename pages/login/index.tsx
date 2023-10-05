import { Button } from "@/src/components/button";
import { Input } from "@/src/components/input";
import useMutation from "@/src/library/client/useMutation";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface LoginForm {
  phone: string;
  password: string;
  kind: string;
}
export default function LoginPage(): JSX.Element {
  const router = useRouter();
  const [login, { loading, data, error }] = useMutation("/api/user/verify");
  const { handleSubmit, register } = useForm<LoginForm>();
  const onValid = (data: LoginForm) => {
    data.kind = "login";
    console.log("login form data : ", data);
    login(data);
  };
  useEffect(() => {
    if (data?.ok) router.push("/");
  }, [data, router]);

  return (
    <div className="w-full max-w-[600px] h-screen m-auto pt-56 px-3">
      <div className="flex flex-col">
        <h1 className="text-center font-extrabold text-5xl mb-8">PAVE</h1>
        <p className="text-center font-bold text-2xl mb-6">Log In</p>
        <form onSubmit={handleSubmit(onValid)}>
          <Input register={register("phone")} type="text" placeholder="phone" />
          <Input
            register={register("password")}
            type="password"
            placeholder="password"
          />
          <Button type="submit">{loading ? "Loading..." : "Login"}</Button>
        </form>
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
