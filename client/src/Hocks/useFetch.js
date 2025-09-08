import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useFetch = (initialUrl) => {
  const [url, setUrl] = useState(initialUrl);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (!user) {
          console.warn("⚠️ Please sign in to access protected routes");
        }

        const res = await fetch(url, {
          method: "GET",
          credentials: "include", // 👈 Important: send cookies/JWT
        });

        if (!res.ok) {
          setError('failed to fetch');
          return;
        }

        const result = await res.json();
        setData(result.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [url, user]);

  return { data, error, loading, setUrl };
};

export default useFetch;
