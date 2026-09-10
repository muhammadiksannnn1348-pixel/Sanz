// Entrypoint aplikasi: mount React ke DOM
import React from "react" // Inti React
import ReactDOM from "react-dom/client" // API render modern (createRoot)
import App from "./App.jsx" // Komponen root aplikasi
import "./index.css" // Styling global

// Cari elemen dengan id root di index.html dan render aplikasi React
ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		{/* StrictMode membantu menemukan potensi masalah pada development */}
		<App />
	</React.StrictMode>
)