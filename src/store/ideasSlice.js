import { createSlice } from "@reduxjs/toolkit";

const ideasSlice = createSlice({
  name: "ideas",
  initialState: {
    ideas: [],
  },
  reducers: {
    addIdea: (state, action) => {
      state.ideas.push(action.payload);
    },
    removeIdea: (state, action) => {
      state.ideas = state.ideas.filter((idea) => idea.$id !== action.payload);
    },
  },
});

export const { addIdea, removeIdea } = ideasSlice.actions;
export default ideasSlice.reducer;