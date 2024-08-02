import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const userLogin = createAsyncThunk(
  "login/user",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const req = await fetch(`${import.meta.env.VITE_API}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await req.json();
      console.log("data", data);
      if (data.success) {
        toast.success(data.message);
        return data.response;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      const errMsg =
        error instanceof Error
          ? error.message
          : "Something went wrong while login !";
      toast.error(errMsg);
      return rejectWithValue(errMsg);
    }
  }
);
export const userRegister = createAsyncThunk(
  "register/user",
  async (
    {
      name,
      email,
      password,
    }: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const req = await fetch(`${import.meta.env.VITE_API}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await req.json();
      if (data.success) {
        toast.success(data.message);
        return data.response;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      const errMsg =
        error instanceof Error
          ? error.message
          : "Something went wrong while registring !";
      toast.error(errMsg);
      return rejectWithValue(errMsg);
    }
  }
);
