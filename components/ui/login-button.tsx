"use client";
import { signIn } from "next-auth/react";
import { Button } from "./button";

export default function LoginButton() {
  return (
    <Button
      variant="default"
      onClick={() => {
        signIn();
      }}
    >
      Sign in
    </Button>
  );
}
