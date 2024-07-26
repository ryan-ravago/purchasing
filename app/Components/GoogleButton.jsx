"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { PulseLoader } from "react-spinners";
import { Button } from "@/components/ui/button";

export default function GoogleButton({ areBtnsClicked, setAreBtnsClicked }) {
  const [isSigningInWithGoogle, setIsSigningInWithGoogle] = useState(false);

  return (
    <Button
      variant="outline"
      className="w-full mt-2"
      disabled={(isSigningInWithGoogle || areBtnsClicked) && true}
      onClick={() => {
        setIsSigningInWithGoogle(true);
        setAreBtnsClicked(true);
        signIn("google");
      }}
    >
      <Image
        src="/google-logo.png"
        alt="Google logo"
        width={30}
        height={30}
        className="me-1"
      />
      {isSigningInWithGoogle ? (
        <PulseLoader color="#424242" className="ms-2" />
      ) : (
        "Google"
      )}
    </Button>
  );
}
