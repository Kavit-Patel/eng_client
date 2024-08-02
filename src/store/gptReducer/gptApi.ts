import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const que =
  "generate simple hindi sentance like (1)maine next week ke liye prepare nahi kiya (2) Rohit ne khana kha liya hai (3)Anu market nahi gai hai (4) Bachche park me khel rahe he . dont give full explaination of anything . just generate one.";
export const askForQuestion = createAsyncThunk(
  "generate/que",
  async (id: number, { rejectWithValue }) => {
    try {
      const req = await fetch(
        `${import.meta.env.VITE_API}/api/askForQuestion/:${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question: que }),
        }
      );
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
          : " Something went wrong while generating question !";
      toast.error(errMsg);
      return rejectWithValue(errMsg);
    }
  }
);
export const askForAnswer = createAsyncThunk(
  "generate/ans",
  async (
    {
      id,
      tenses,
      sentance,
    }: { id: number; tenses: string[]; sentance: string },
    { rejectWithValue }
  ) => {
    const fullSentance = `${sentance} Convert this hindi sentance to english and dont repeate question sentance  (1) ${tenses[0]} (2) ${tenses[1]} (3)${tenses[2]} (4) ${tenses[3]}(5) ${tenses[4]}(6) ${tenses[5]} (7) ${tenses[6]} (8) ${tenses[7]}.  And remember just give answer as in the formate of 1,2,3... as per suggested. Dont give any kind of extra information just the plain answers`;
    try {
      const req = await fetch(
        `${import.meta.env.VITE_API}/api/askForAnswer/:${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question: fullSentance }),
        }
      );
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
          : " Something went wrong while generating question !";
      toast.error(errMsg);
      return rejectWithValue(errMsg);
    }
  }
);
