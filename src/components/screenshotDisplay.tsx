import React, { useRef } from "react";
import laptopMockup from "../assets/download.png";

interface ImgProps {
  img: string;
}

const ScreenshotDisplay: React.FC<ImgProps> = ({ img }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!containerRef.current) return;

    const { toPng } = await import("html-to-image"); 
    try {
      const dataUrl = await toPng(containerRef.current, { pixelRatio: 2 });
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "mockup.png";
      link.click();
    } catch (error) {
      console.error("Failed to download image:", error);
    }
  };

  return (
    <div>
      <div ref={containerRef} className="laptop-mockup relative">
        <img
          src={laptopMockup}
          alt="Laptop Mockup"
          className="laptop-frame w-full"
        />
        <img
          src={img}
          alt="Screenshot"
          className="screenshot-image absolute"
        />
      </div>
      <button
        onClick={handleDownload}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Download Mockup
      </button>
    </div>
  );
};

export default ScreenshotDisplay;
