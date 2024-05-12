import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@cloudscape-design/global-styles/index.css";
import { Mode, applyMode } from "@cloudscape-design/global-styles";

applyMode(Mode.Dark);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
