import { Button } from "@/src/components/button";
import { Input } from "@/src/components/input";
import useMutation from "@/src/library/client/useMutation";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface SignForm {
  name: string;
  phone: string;
  password: string;
}
interface TokenForm {
  token: string;
  kind: string;
}
export default function SignInPage(): JSX.Element {
  const router = useRouter();
  const [enter, { loading, data: enterData, error }] =
    useMutation("/api/user/signin");
  const [
    verify,
    { loading: tokenLoading, data: tokenData, error: tokenError },
  ] = useMutation("/api/user/verify");

  const { handleSubmit, register, reset } = useForm<SignForm>();
  const { handleSubmit: tokenHandleSubmit, register: tokenRegister } =
    useForm<TokenForm>();

  const onValid = (data: SignForm) => {
    enter(data);
    reset();
  };
  const onValidToken = (data: TokenForm) => {
    data.kind = "signin";
    verify(data);
  };

  useEffect(() => {
    if (tokenData?.ok) router.push("/");
  }, [tokenData, router]);

  return (
    <div className="w-full max-w-[600px] h-screen m-auto pt-56 px-3">
      <div className="flex flex-col">
        <h1 className="text-center font-extrabold text-5xl mb-8">PAVE</h1>
        <p className="text-center font-bold text-2xl mb-6">Sign In</p>
        {!enterData ? (
          <form onSubmit={handleSubmit(onValid)}>
            <Input
              register={register("name")}
              type="text"
              placeholder="name"
              required
            />
            <div>
              <Input
                register={register("phone")}
                type="text"
                placeholder="phone number"
                required
              />
              <button></button>
            </div>
            <Input
              register={register("password")}
              type="password"
              placeholder="password"
              required
            />
            <Button type="submit">{loading ? "Loading..." : "Register"}</Button>
          </form>
        ) : (
          <form onSubmit={tokenHandleSubmit(onValidToken)}>
            <Input
              register={tokenRegister("token")}
              type="text"
              placeholder="token"
              required
            />
            <Button type="submit">
              {tokenLoading ? "Verifying..." : "Verify"}
            </Button>
          </form>
        )}
        <span className="text-center">
          Already have an account?{" "}
          <Link href="/login" className="underline hover:italic cursor-pointer">
            Login
          </Link>
        </span>
      </div>
    </div>
  );
}
