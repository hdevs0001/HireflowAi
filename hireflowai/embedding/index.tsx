import { createRoot } from "react-dom/client";
import App from "./App";

const host = document.getElementById("hireflow-widget");

if (!host) throw new Error("Host not found");

const shadow = host.attachShadow({
  mode: "open",
});

const mount = document.createElement("div");

shadow.appendChild(mount);

createRoot(mount).render(<App />);
