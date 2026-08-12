// import { createRoot } from "react-dom/client";
// import App from "./App";

// const host = document.getElementById("hireflow-widget");

// if (!host) throw new Error("Host not found");

// const shadow = host.attachShadow({
//   mode: "open",
// });

// const mount = document.createElement("div");

// shadow.appendChild(mount);

// createRoot(mount).render(<App />);
import { createRoot } from "react-dom/client";
import App from "./App";

const host = document.getElementById("hireflow-widget");

if (!host) {
  throw new Error("HireflowAI: Host not found");
}

const script = document.currentScript as HTMLScriptElement | null;

const widgetId = script?.dataset.widgetId;

if (!widgetId) {
  throw new Error("HireflowAI: Widget ID missing");
}

const shadow = host.attachShadow({
  mode: "open",
});

const mount = document.createElement("div");

shadow.appendChild(mount);

createRoot(mount).render(
  <App widgetId={widgetId} />
);