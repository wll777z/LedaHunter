import { createRoot } from "react-dom/client";
import App from "./App";
import "./app.css";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found in the document");
}

const root = createRoot(rootElement);
root.render(<App />);
