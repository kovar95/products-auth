"use client";

import { useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { setCookie } from "cookies-next";

type Props = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: Props): React.ReactElement {
  const authQuery = useQuery({
    queryKey: ["auth"],
    queryFn: () => axios.get("/api/auth/"),
  });

  const token = authQuery?.data?.data?.token;

  // setting token in cookie on app load
  useEffect(() => {
    if (token) {
      setCookie("token", token);
    }
  }, [token]);

  return <>{children}</>;
}
