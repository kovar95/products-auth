"use client";

import { Button, TextField, styled } from "@mui/material";

export const Input = styled(TextField)(() => ({
  "& > .MuiInputBase-root": {
    borderRadius: 50,
    fontSize: 12,
  },
  "& input": {
    padding: "12px",
  },
}));

export const SignUpButton = styled(Button)(() => ({
  borderRadius: 50,
  textTransform: "none",
  fontWeight: 700,
  marginTop: 24,
}));

export const LoginButton = styled(Button)(() => ({
  borderRadius: 50,
  textTransform: "none",
  padding: 12,
  backgroundColor: "#000",
  "&:hover": {
    backgroundColor: "#000000c9 !important",
  },
}));
