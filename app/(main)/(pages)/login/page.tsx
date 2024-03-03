"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import useInitDB from "@/hooks/use-init-db";

import { Button } from "@/components/ui/button";

const LoginPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const router = useRouter();

  const userLogin = async () => {
    const { account } = useInitDB();

    const response = account.createEmailSession("yuvi@gmail.com", "00000000");

    response
      .then((res) => {
        console.log({
          ...res,
          ok: true,
        });

        setIsLoggedIn(true);

        console.log("logged in");

        router.push("/");
      })
      .catch((err) =>
        console.log({
          ...err,
          ok: false,
        })
      );
  };

  const createUser = async () => {
    try {
      const res = await fetch("/api/create-user", {
        method: "POST",
      });

      const data = await res.json();
      console.log(data);

      userLogin();
    } catch (error) {
      console.log(error);
    }
  };

  const userLogout = async () => {
    const { account } = useInitDB();

    const response = account.deleteSessions();

    response.then((res) => {
      setIsLoggedIn(false);
      console.log("logged out.", res);
      router.push("/login");
    });
  };

  return (
    <div className="flex justify-center items-center h-screen gap-4">
      <Button onClick={createUser}>Create User</Button>
      <Button onClick={userLogin}>Login</Button>
      <Button onClick={userLogout}>Logout</Button>

      {isLoggedIn ? <div>loggedin</div> : null}
    </div>
  );
};

export default LoginPage;
