// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./i18n";
import "@radix-ui/themes/styles.css";
import "./index.css";
import { Theme } from "@radix-ui/themes";
import { Provider } from "jotai";
import { Toaster } from "./components/ui/toaster.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider>
    {/* <StrictMode> */}
    <Theme appearance="dark" accentColor="amber">
      <App />
      <Toaster />
    </Theme>
    {/* </StrictMode> */}
  </Provider>
);
