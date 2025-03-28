import { useState } from "react";

export function useFetchPosts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  async function fetchPosts(threadId) {
    try {
      const response = await fetch(
        `http://localhost:5000/posts?thread_id=${threadId}`
      );
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError(err.message || "Failed to load posts");
    }
  }

  return { posts, error, fetchPosts };
}
