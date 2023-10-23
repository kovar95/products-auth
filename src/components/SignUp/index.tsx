import { FC } from "react";
import { Stack } from "@mui/material";
import Image from "next/image";
import SignupForm from "./SignupForm";
import signup from "@/assets/images/signup.png";

const SingUp: FC = () => {
  return (
    <Stack height="100vh" direction="row">
      <Stack width="50%" alignItems="center" justifyContent="center">
        <Stack width="60%" height="60%" position="relative">
          <Image src={signup.src} alt="signup" unoptimized priority fill />
        </Stack>
      </Stack>
      <Stack width="50%">
        <SignupForm />
      </Stack>
    </Stack>
  );
};

export default SingUp;
