/**import { useEffect, useState } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url);
        if (!res.ok) {
          setError('failed to fetch');
          alert('failed to fetch');
        }
        const result = await res.json();
        setData(result.data);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, error, loading };
};

export default useFetch;*/import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useFetch = (initialUrl) => {
    const [url, setUrl] = useState(initialUrl);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext)
    useEffect(() => {
      const fetchData = async () => {
        
        setLoading(true);
        try {
          if (!user || user == undefined || user == null) {
            alert("please sign in");
            
          }
          const res = await fetch(url);
          if (!res.ok) {
            setError('failed to fetch');
            //alert('failed to fetch');
          }
          const result = await res.json();
          setData(result.data);
          setLoading(false)
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      };
      fetchData();
    }, [url]);
  
    return { data, error, loading, setUrl };
  };
  
  export default useFetch;