import { useState, useEffect } from "react";

export function useFetchThreads() {
  const [threads, setThreads] = useState([]);
  const [error, setError] = useState(null);

  async function fetchThreads() {
    try {
      const response = await fetch("http://localhost:5000/threads");
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

      const data = await response.json();
      setThreads(data);
    } catch (err) {
      setError(err.message || "Failed to load threads");
    }
  }

  useEffect(() => {
    fetchThreads();
  }, []);

  return { threads, error, fetchThreads };
}
