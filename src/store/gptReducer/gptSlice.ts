import { createSlice } from "@reduxjs/toolkit";
import { askForAnswer, askForQuestion } from "./gptApi";

export interface IinitialState {
  sentance: string;
  ans: string[] | null;
  sentanceGenerationStatus: "idle" | "pending" | "success" | "rejected";
  answerGenerationStatus: "idle" | "pending" | "success" | "rejected";
}

const initialState: IinitialState = {
  sentance: "",
  ans: null,
  sentanceGenerationStatus: "idle",
  answerGenerationStatus: "idle",
};

const gptSlice = createSlice({
  name: "gpt",
  initialState,
  reducers: {
    setAnsForNext: (state) => {
      state.ans = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(askForQuestion.fulfilled, (state, action) => {
        state.sentanceGenerationStatus = "success";
        state.sentance = action.payload;
      })
      .addCase(askForQuestion.rejected, (state) => {
        state.sentanceGenerationStatus = "rejected";
      })
      .addCase(askForQuestion.pending, (state) => {
        state.sentanceGenerationStatus = "pending";
      })
      .addCase(askForAnswer.fulfilled, (state, action) => {
        state.answerGenerationStatus = "success";
        state.ans = action.payload;
      })
      .addCase(askForAnswer.rejected, (state) => {
        state.answerGenerationStatus = "rejected";
      })
      .addCase(askForAnswer.pending, (state) => {
        state.answerGenerationStatus = "pending";
      });
  },
});

export default gptSlice.reducer;
export const { setAnsForNext } = gptSlice.actions;
