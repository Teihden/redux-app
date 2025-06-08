import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import authSlice from "@/features/auth/authSlice";
import postsSlice from "@/features/posts/postsSlice";
import usersSlice from "@/features/users/usersSlice";

export const store = configureStore({
  reducer: {
    [authSlice.reducerPath]: authSlice.reducer,
    [postsSlice.reducerPath]: postsSlice.reducer,
    [usersSlice.reducerPath]: usersSlice.reducer,
  },
});

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk = ThunkAction<void, RootState, unknown, Action>