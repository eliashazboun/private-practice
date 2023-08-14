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
        const res = await fetch("http://localhost:4000/" + url, {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        });


        const response = await res.json();
        console.log(response)
        setData(response);
        setIsLoading(false);
      } catch (err) {
        console.log('Usefetch',err)
          setError(err)
          setIsLoading(false)
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
