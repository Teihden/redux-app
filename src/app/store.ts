import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import apiSlice from "@/features/api/apiSlice";
import authSlice from "@/features/auth/authSlice";
import postsSlice from "@/features/posts/postsSlice";
import usersSlice from "@/features/users/usersSlice";
import notificationsSlice from "@/features/notifications/notificationsSlice";
import { listenerMiddleware } from "@/app/listenerMiddleware";

export const store = configureStore({
  reducer: {
    [authSlice.reducerPath]: authSlice.reducer,
    [postsSlice.reducerPath]: postsSlice.reducer,
    [usersSlice.reducerPath]: usersSlice.reducer,
    [notificationsSlice.reducerPath]: notificationsSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .prepend(listenerMiddleware.middleware)
    .concat(apiSlice.middleware),
});

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk = ThunkAction<void, RootState, unknown, Action>