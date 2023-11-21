import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Common/Card";

const Series = () => {
  const [series, setSeries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = "0470cddcab19c9a9aae64557c6405662";
        const apiUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&sort_by=popularity.desc`;

        const response = await axios.get(apiUrl);
        setSeries(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>TV Series</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          series.map((serie) => (
            <Card key={serie.id} results={serie} isLoading={isLoading} />
          ))
        )}
      </div>
    </div>
  );
};

export default Series;
