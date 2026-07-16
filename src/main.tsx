import { createRoot } from "react-dom/client";
import { SpeedInsights } from "@vercel/speed-insights/react";

import App from "./App";

import "./index.css";

import { CookieConsentProvider } from "@/contexts/CookieConsentContext";

createRoot(document.getElementById("root")!).render(
  <CookieConsentProvider>
    <App />
    <SpeedInsights />
  </CookieConsentProvider>
);