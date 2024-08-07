import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const askForQuestion = createAsyncThunk(
  "generate/que",
  async (id: number, { rejectWithValue }) => {
    const queType: { [key: number]: string[] } = {
      1: [
        "Mai ne next week ke liye prepare nahi kiya",
        "Rohit ne khana kha liya hai",
        "Anu market nahi gai hai",
        "Bachche park me khel rahe he",
        "Lalit bed main so raha he",
        "Rohan bas me school nahi jayega",
        "Bacche road mein daudte hai.",
        "Surbhi park me walk kar rhi hai",
        "Rohan bike mein office gaya hai",
      ],
      2: [
        "Mere dwara mail send nahi ki gayi hai",
        "Students apne results ko le ke nervous nahi ho rahe hai",
        "Karan result se satisfied nahi hoga",
        "Plan implement nahi kiya jayega",
        "Social Media ke dwara news spread ki gayi hai",
        "Bachche new activity ke liye motivated hai",
        "Students ke dwara rules follow kiye jaa rahe the",
        "Police Officers new case se frustrate nahi ho rahe the",
        "Monika ke dwara issue address nahi kiya gaya",
        "Ye message parso sabhi employees ko bheja jayega",
      ],
    };
    const catKey = Math.floor(Math.random() * 2 + 1);
    const sentanceIdx = Math.floor(Math.random() * 10 + 1);

    const que = `I am studying english grammar specially english tenses. I want you to generate simple hindi sentance like  ${queType[catKey][sentanceIdx]} . don't give full explaination of anything . just generate one.`;

    console.log(catKey, sentanceIdx);
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

export const saveTest = createAsyncThunk(
  "save/test",
  async (
    {
      id,
      question,
      ans,
      audio,
    }: { id: number; question: string; ans: string[]; audio: string },
    { rejectWithValue }
  ) => {
    try {
      const req = await fetch(
        `${import.meta.env.VITE_API}/api/saveTest/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question, ans, audio }),
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
          : " Something went wrong while saving test !";
      return rejectWithValue(errMsg);
    }
  }
);
