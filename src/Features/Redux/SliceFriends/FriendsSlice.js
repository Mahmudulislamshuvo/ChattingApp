import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Users: localStorage.getItem("Users")
    ? JSON.parse(localStorage.getItem("Users"))
    : {},
};

export const FriendsSlice = createSlice({
  name: "friend",
  initialState,
  reducers: {
    friendAction: (state, action) => {
      state.Users = action.payload;
      localStorage.setItem("Users", JSON.stringify(state.Users));
    },
  },
});

export const { friendAction } = FriendsSlice.actions;
export default FriendsSlice.reducer;
