"use client";

import { FC, useState } from "react";
import {
  Alert,
  FormControl,
  FormLabel,
  IconButton,
  InputAdornment,
  Stack,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import Link from "next/link";
import { FormikErrors, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Input, SignUpButton } from "@/ui/FormComponents";

type FormikValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

const Schema = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid email address!")
    .required("You must enter email address!"),
  password: Yup.string()
    .min(10, "Must have at least 10 characters!")
    .required("You must enter a password!"),
  confirmPassword: Yup.string()
    .min(10, "Must have at least 10 characters!")
    .required("You must enter a confirm password!"),
});

const SignupForm: FC = () => {
  const router = useRouter();

  const [error, setError] = useState<null | string>(null);

  const signup = useMutation({
    mutationFn: async (user: FormikValues) => {
      const { email, ...rest } = user;

      const res = await axios.post("/api/auth/register", {
        ...rest,
        login: email,
      });

      if (res.data?.error) {
        throw new Error("User already exists!");
      }
    },
    onSuccess: () => {
      // redirect to login page after successful registration
      router.push("/login");
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const { isPending, mutateAsync } = signup;

  const { values, handleChange, handleSubmit, errors, touched, handleBlur } =
    useFormik<FormikValues>({
      initialValues: {
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: Schema,
      validate: (val) => {
        // custom validation for comparing passwords
        const error: FormikErrors<FormikValues> = {};
        if (val.confirmPassword !== val.password) {
          error.confirmPassword =
            "Confirm passowrd must be the same as password!";
        }
        return error;
      },
      onSubmit: async (val) => {
        await mutateAsync(val);
      },
    });

  const { email, password, confirmPassword } = values;

  return (
    <Stack alignItems="center" paddingTop={8} gap={12}>
      <Stack alignItems="center" gap={0.5} width="70%">
        {error && (
          <Alert severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        )}
        <h1>Sign up</h1>
        <Stack fontSize={10} color="GrayText">
          Enter your details to get started.
        </Stack>
      </Stack>
      <Stack width="70%" gap={1}>
        <FormControl fullWidth sx={{ gap: 1 }}>
          <FormLabel sx={{ fontSize: 12 }}>Email</FormLabel>
          <Input
            placeholder="Enter your email address"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                  >
                    <MailIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
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
          <FormLabel sx={{ fontSize: 12 }}>Create a passsword</FormLabel>
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
        <FormControl fullWidth sx={{ gap: 1 }}>
          <FormLabel sx={{ fontSize: 12 }}>Confirm password</FormLabel>
          <Input
            placeholder="Confirm your password"
            type="password"
            inputProps={{ maxLength: 30 }}
            name="confirmPassword"
            onChange={handleChange}
            onBlur={handleBlur}
            value={confirmPassword}
            error={touched.confirmPassword ? !!errors?.confirmPassword : false}
            helperText={
              touched.confirmPassword ? errors?.confirmPassword ?? " " : " "
            }
            disabled={isPending}
          />
        </FormControl>
        <SignUpButton
          fullWidth
          color="error"
          variant="contained"
          disabled={
            !!Object.keys(errors).length ||
            Object.keys(touched).length < 2 ||
            password !== confirmPassword ||
            isPending
          }
          onClick={() => handleSubmit()}
        >
          Sign up
        </SignUpButton>
        <Stack
          fontSize={10}
          direction="row"
          gap={1}
          justifyContent="center"
          color="GrayText"
        >
          Already have an account? <Link href="/login">Log in</Link>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SignupForm;
