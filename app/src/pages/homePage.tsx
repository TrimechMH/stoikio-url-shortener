import React from "react";
import { useNavigate } from "react-router-dom";
import ShortenForm from "../components/ShortenForm";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleShorten = (shortUrl: string) => {
    navigate(`/stats/${encodeURIComponent(shortUrl)}`);
  };

  return (
    <div>
      <h1>URL Shortener</h1>
      <ShortenForm onShorten={handleShorten} />
    </div>
  );
};

export default HomePage;
