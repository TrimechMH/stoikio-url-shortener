import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Statistics, { ShortenUrlProps } from "../components/Statistics";

const StatsPage: React.FC = () => {
  const { shortUrl } = useParams<{ shortUrl: string }>();
  const [shortenUrl, setShortenUrl] = useState<ShortenUrlProps | null>(null);
  const apiBaseUrl = import.meta.env.VITE_REACT_APP_API_URL;

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get<ShortenUrlProps>(
          `${apiBaseUrl}/${shortUrl}/statistics`
        );
        setShortenUrl(response.data);
      } catch (error) {
        console.error("Error fetching statistics", error);
      }
    };

    fetchStats();
  }, [shortUrl]);

  return (
    <div>
      {shortenUrl ? <Statistics shortenUrl={shortenUrl} /> : <p>Loading...</p>}
    </div>
  );
};

export default StatsPage;
