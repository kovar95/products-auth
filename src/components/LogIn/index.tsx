import { FC } from "react";
import { Stack } from "@mui/material";
import Image from "next/image";
import LoginForm from "./LoginForm";
import login from "@/assets/images/login.png";

const SingUp: FC = () => {
  return (
    <Stack height="100vh" direction="row">
      <Stack
        width="50%"
        alignItems="center"
        justifyContent="center"
        bgcolor="red"
      >
        <Stack width="60%" height="60%" position="relative">
          <Image src={login.src} alt="login" unoptimized fill priority />
        </Stack>
      </Stack>
      <Stack width="50%">
        <LoginForm />
      </Stack>
    </Stack>
  );
};

export default SingUp;
