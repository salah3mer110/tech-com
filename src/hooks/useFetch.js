import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(url);

        if (!response.ok) throw new Error("Failed to Fetch response");

        const data = await response.json();
        if (!data) throw new Error("Failed to Fetch data1");
        if (isMounted) setData(data);
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { isLoading, error, data };
};

export default useFetch;
