import React, { useState } from "react";

interface UrlInputProps {
  onUrlSubmit: (url: string) => void;
  setError: (error: string | null) => void;
}

const UrlInput: React.FC<UrlInputProps> = ({ onUrlSubmit, setError }) => {
  const [url, setUrl] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const validateUrl = (url: string) => {
    const regex = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,6}(\/[^\s]*)?$/i;
    return regex.test(url);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!url.trim()) {
      setError("Please enter a URL.");
    } else if (!validateUrl(url)) {
      setError("Please enter a valid URL with the format: https://example.com");
    } else {
      setError(null);
      onUrlSubmit(url);
    }
    setUrl("");
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <label
        className="font-title text-neutral-950 text-lg"
        htmlFor="url-input"
      >
        Enter URL to generate mockup of the website.
      </label>
      <div className="flex items-center gap-2">
        <input
          id="url-input"
          type="url"
          value={url}
          onChange={handleInputChange}
          placeholder="https://example.com"
          className="flex-1 px-4 py-2 border border-neutral-300 rounded-md text-neutral-950 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-primary-500 text-primary-50 rounded-md hover:bg-primary-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default UrlInput;
