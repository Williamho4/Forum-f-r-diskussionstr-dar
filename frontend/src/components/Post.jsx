import "./Post.css";
import { useFetchPosts } from "../hooks/fetchPosts";
import { useState } from "react";
import { useParams } from "react-router-dom";

function Post({ content, created_at, post_id }) {
  const { fetchPosts } = useFetchPosts();
  const [error, setError] = useState();
  const { id } = useParams();

  async function deletePost() {
    const postID = Number(post_id);

    try {
      const response = await fetch(
        `http://localhost:5000/posts/${postID}/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

      fetchPosts(id);
      setError(null);
    } catch (err) {
      setError("Failed to delete post");
    }
  }

  return (
    <div className="post">
      <div className="post-container">
        <div className="post-container-content">
          <p className="post-text">{content}</p>
          <p className="post-date">{created_at}</p>
        </div>
        <button onClick={() => deletePost()}>Delete post</button>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}

export default Post;
