"use client";

import { FC, useState } from "react";
import { Alert, FormControl, FormLabel, Stack } from "@mui/material";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signIn } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Input, LoginButton } from "@/ui/FormComponents";

type FormikValues = {
  email: string;
  password: string;
};

const Schema = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid email address!")
    .required("You must enter email address!"),
  password: Yup.string()
    .min(10, "Must have at least 10 characters!")
    .required("You must enter a password!"),
});

const LoginForm: FC = () => {
  const router = useRouter();

  const [error, setError] = useState<null | string>(null);

  const login = useMutation({
    mutationFn: async (user: FormikValues) => {
      const res = await signIn("credentials", {
        ...user,
        redirect: false,
      });

      if (!res?.ok) {
        throw new Error("Invalid credentials!");
      }
    },
    onSuccess: () => {
      //redirect to home page after successful login
      router.push("/");
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const { isPending, mutateAsync } = login;

  const { values, handleChange, handleSubmit, errors, touched, handleBlur } =
    useFormik<FormikValues>({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: Schema,
      onSubmit: async (val) => {
        await mutateAsync(val);
      },
    });

  const { email, password } = values;

  return (
    <Stack alignItems="center" justifyContent="center" height="100%" gap={3}>
      <Stack textAlign="left" width="50%" gap={2}>
        {error && <Alert severity="error">{error}</Alert>}
        <h2>Log in</h2>
      </Stack>
      <Stack width="50%" gap={1}>
        <FormControl fullWidth sx={{ gap: 1 }}>
          <FormLabel sx={{ fontSize: 12 }}>Email address</FormLabel>
          <Input
            placeholder="Enter your email"
            inputProps={{ maxLength: 50 }}
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={email}
            error={touched.email ? !!errors?.email : false}
            helperText={touched.email ? errors?.email ?? " " : " "}
            disabled={isPending}
          />
        </FormControl>
        <FormControl fullWidth sx={{ gap: 1 }}>
          <FormLabel sx={{ fontSize: 12 }}>Passsword</FormLabel>
          <Input
            placeholder="Enter a strong password"
            type="password"
            inputProps={{ maxLength: 30 }}
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={password}
            error={touched.password ? !!errors?.password : false}
            helperText={touched.password ? errors?.password ?? " " : " "}
            disabled={isPending}
          />
        </FormControl>
        <LoginButton
          fullWidth
          color="error"
          variant="contained"
          disabled={
            !!Object.keys(errors).length ||
            !Object.keys(touched).length ||
            isPending
          }
          onClick={() => handleSubmit()}
        >
          Log in
        </LoginButton>
        <Stack
          fontSize={10}
          direction="row"
          gap={1}
          justifyContent="center"
          color="GrayText"
        >
          Don&apos;t have an account? <Link href="/signup">Register</Link>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default LoginForm;
