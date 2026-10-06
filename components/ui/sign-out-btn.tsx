"use client";

import { signOut } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { DropdownMenuItem } from "./dropdown-menu";

export default function SignOutButton() {
  const router = useRouter();

  return (
    <DropdownMenuItem
      onClick={async () => {
        const result = await signOut();
        if (result.data) {
          router.push("/sign-in");
        } else {
          alert("Error signing out");
        }
      }}
    >
      Log Out
    </DropdownMenuItem>
  );
}
