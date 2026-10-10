"use client";

import Link from "next/link";
import Image from "next/image"; // 1. Import Next.js Image
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import SignOutButton from "./ui/sign-out-btn";
import { useSession } from "@/lib/auth/auth-client";
import { User } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const { data: session } = useSession();

   useEffect(() => {
      if (session?.user) {
        setName(session.user.name || "");
        if (session.user.image) {
          setAvatarUrl(session.user.image);
        }
      }
    }, [session]);

 const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between max-w-7xl">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-primary"
        >
          {/* 2. Render using the Image component */}
          <Image
            src="/hero-images/logo.png"
            alt="Jobright Logo"
            width={28}
            height={28}
            className="h-7 w-7 object-contain"
          />
          Jobright
        </Link>

        {/* Auth Navigation */}
        <div className="flex items-center gap-4">
          {session?.user ? (
            <>
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-black"
                >
                  Dashboard
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-full outline-none hover:opacity-85 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                  <Avatar className="h-8 w-8">
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt={name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <AvatarFallback className="bg-primary text-white">
                        {initials}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {session.user.name || "User"}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {session.user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                  </DropdownMenuGroup>

                  <div className="my-1 h-px bg-slate-200 dark:bg-neutral-800" />

                  {/* Added Link to Profile */}
                  <DropdownMenuItem>
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <User className="h-4 w-4" />
                      <span>Profile Settings</span>
                    </Link>
                  </DropdownMenuItem>

                  <div className="my-1 h-px bg-slate-200 dark:bg-neutral-800" />

                  <SignOutButton />
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/sign-in">
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-black"
                >
                  Log In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="bg-primary hover:bg-primary/90">
                  Start for free
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
