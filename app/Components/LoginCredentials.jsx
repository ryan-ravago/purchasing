"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { signIn } from "next-auth/react";
import GoogleButton from "./GoogleButton";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { PulseLoader } from "react-spinners";
import { useToast } from "@/components/ui/use-toast";

const LoginFormSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export default function LoginCredentials() {
  const router = useRouter();
  const { toast, dismiss } = useToast();
  const [areBtnsClicked, setAreBtnsClicked] = useState(false);
  const [isSignInBtnClicked, setIsSignInBtnClicked] = useState(false);
  // console.log(useToast());
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginFormSchema),
  });

  const onSubmit = async (data) => {
    setIsSignInBtnClicked(true);
    setAreBtnsClicked(true);

    try {
      const result = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      // console.log(result);

      if (result.error) {
        toast({
          variant: "destructive",
          title: "Invalid Credentials",
          description: "Invalid username or password.",
        });
        setIsSignInBtnClicked(false);
        setAreBtnsClicked(false);
        return;
      }
      dismiss();
      router.refresh();
    } catch (err) {
      // console.log(`Sign in error: ${err}`);
      setIsSignInBtnClicked(false);
      setAreBtnsClicked(false);
    }
  };

  const ifErrOutlineIsRed = (field) => {
    if (errors[field]) {
      return `ring-1 ring-red-500`;
    }
    return "";
  };

  return (
    <div className="flex justify-center items-center h-dvh">
      <Card className="w-[340px] md:w-[380px] shadow-lg">
        <CardHeader className="text-center mb-2">
          <CardTitle className="text-4xl tracking-widest font-extrabold text-yellow-400">
            RAVAGO
          </CardTitle>
          {/* <CardDescription>Login with credentials.</CardDescription> */}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-2">
              <div className="flex flex-col">
                <Label htmlFor="name">Username:</Label>
                <Input
                  placeholder="username..."
                  className={`mt-1 ${ifErrOutlineIsRed("username")}`}
                  {...register("username")}
                />
                {errors.username ? (
                  <small className="text-red-500 text-xs mt-1">
                    {errors.username.message}
                  </small>
                ) : (
                  <small className="text-red-500 invisible text-xs mt-1">
                    e
                  </small>
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="framework">Password:</Label>
                <Input
                  type="password"
                  placeholder="password..."
                  className={`mt-1 ${ifErrOutlineIsRed("password")}`}
                  {...register("password")}
                />
                {errors.password ? (
                  <small className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </small>
                ) : (
                  <small className="text-red-500 invisible text-xs mt-1">
                    e
                  </small>
                )}
              </div>
            </div>
            <Button
              className="mt-3 w-full text-yellow-300"
              type="submit"
              disabled={areBtnsClicked}
            >
              {isSignInBtnClicked ? (
                <PulseLoader color="white" className="ms-2" />
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
          <div className="flex w-full items-center gap-2 mt-3 mb-1">
            <hr className="w-full border border-gray-300" />
            <p className="text-sm w-full text-center text-nowrap">
              Or sign in using
            </p>
            <hr className="w-full border border-gray-300" />
          </div>
          <GoogleButton
            areBtnsClicked={areBtnsClicked}
            setAreBtnsClicked={setAreBtnsClicked}
          />
        </CardContent>
      </Card>
    </div>
  );
}
