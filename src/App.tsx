import "./App.css";
import UrlInput from "./components/urlInput";
import ScreenshotDisplay from "./components/screenshotDisplay";
import ErrorComponent from "./components/error";
import { useState } from "react";

function App() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleUrlSubmit = async (url: string) => {
    const API_BASE = "https://api.apiflash.com/v1/urltoimage";

    const ACCESS_KEY = import.meta.env.VITE_API_KEY || "";

    setImageSrc(null);
    setError(null);
    setLoading(true);

    const params = new URLSearchParams({
      access_key: ACCESS_KEY,
      url: url,
      format: "jpeg",
      width: "1920",
      height: "1080",
      response_type: "image",
    });
    

    try {
      const response = await fetch(`${API_BASE}?${params.toString()}`);
      if (response.ok) {
        const blob = await response.blob();
        setImageSrc(URL.createObjectURL(blob));
      } else {
        console.error("Failed to fetch screenshot:", response.statusText);
        setError("Failed to fetch screenshot. Please try again.");
      }
    } catch (err) {
      console.error("Error fetching screenshot:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container flex flex-col justify-start items-center h-full w-full py-8">
      <h1 className="text-4xl font-bold mb-8">Mockup Generator</h1>
      <div className="w-[400px] bg-white shadow rounded-lg p-6 flex flex-col gap-4">
        <UrlInput onUrlSubmit={handleUrlSubmit} setError={setError} />
      </div>
      {error && <ErrorComponent err={error} />}
      {loading && <p>Loading this takes some time...</p>}
      {imageSrc && <ScreenshotDisplay img={imageSrc} />}
    </div>
  );
}

export default App;
