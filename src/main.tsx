import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import { ThemeProvider } from "./components/providers/theme-provider.tsx";
import "./index.css";
import { store } from "./redux/store.ts";
import router from "./routes/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={store}>
        <RouterProvider router={router} />
        <Toaster position="top-right" reverseOrder={false} />
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
