import { useEffect, useState } from "react";

export default function useFetch (url) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoading(true)

    const fetchData = async () => {
      try {
        const res = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        });

        const response = await res.json();
        setData(response);
        setIsLoading(false);
      } catch (err) {
          setError(err)
          setIsLoading(false)
          console.log(err);
      }
    };

    if (url === '/api/clients/none'){
      return
    }else{
      fetchData()

    }
  }, [url]);

  return {isLoading, data, error }
};
