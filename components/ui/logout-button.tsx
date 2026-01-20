"use client";
import { signOut } from "next-auth/react";
import { Button } from "./button";

export default function LogoutButton() {
  return (
    <Button
      variant="destructive"
      onClick={() => {
        signOut();
      }}
    >
      Logout
    </Button>
  );
}
