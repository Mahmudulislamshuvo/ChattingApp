import { configureStore } from "@reduxjs/toolkit";
import FriendsActions from "../SliceFriends/FriendsSlice";

export const store = configureStore({
  reducer: {
    FriendsActions: FriendsActions,
  },
});
