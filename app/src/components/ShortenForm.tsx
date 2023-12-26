import React, { useState, FC } from "react";
import axios from "axios";

interface ShortenFormProps {
  onShorten: (shortUrl: string) => void;
}

const ShortenForm: FC<ShortenFormProps> = ({ onShorten }) => {
  const [originalUrl, setOriginalUrl] = useState<string>("");
  const apiBaseUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const handleShorten = async () => {
    try {
      const response = await axios.post(
        `${apiBaseUrl}`,
        { originalUrl },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      onShorten(response.data.shortUrl);
    } catch (error) {
      console.error("Error shortening URL:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
      />
      <button onClick={handleShorten}>Shorten</button>
    </div>
  );
};

export default ShortenForm;
