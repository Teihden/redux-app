import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./app/store";
import { worker } from "./api/server";
import "./primitiveui.css";
import "./index.css";
import { apiSliceWithUsers } from "@/features/users/usersSlice";

async function start() {
  await worker.start({ onUnhandledRequest: "bypass" });

  store.dispatch(apiSliceWithUsers.endpoints.getUsers.initiate())

  const root = createRoot(document.getElementById("root")!);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App/>
      </Provider>
    </React.StrictMode>,
  );
}

await start();
