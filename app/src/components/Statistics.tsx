import React from "react";

export type ShortenUrlProps = {
  shortUrl: string;
  originalUrl: string;
  count: number;
};

type StatisticsProps = {
  shortenUrl: ShortenUrlProps;
};

const Statistics: React.FC<StatisticsProps> = ({ shortenUrl }) => {
  const apiBaseUrl = import.meta.env.VITE_REACT_APP_API_URL;

  return (
    <div>
      <h2>Statistics</h2>
      <p>
        Shortened URL: {apiBaseUrl}/{shortenUrl.shortUrl}
      </p>
      <p>Original URL: {shortenUrl.originalUrl}</p>
      <p>Clicks: {shortenUrl.count}</p>
    </div>
  );
};

export default Statistics;
