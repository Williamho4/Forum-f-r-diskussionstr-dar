import "./Post.css";
import { useFetchPosts } from "../hooks/fetchPosts";
import { useState } from "react";
import { useParams } from "react-router-dom";

function Post({ content, created_at, post_id }) {
  const { fetchPosts } = useFetchPosts();
  const [error, setError] = useState();
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [postText, setPost] = useState(content);

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

  async function editPost() {
    setIsEditing(true);

    try {
      const response = await fetch(
        `http://localhost:5000/posts/${Number(post_id)}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: postText,
          }),
        }
      );

      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

      setIsEditing(false);
      setError(null);
    } catch (err) {
      setError("Failed to update post");
    }
  }

  return (
    <div className="post">
      <div className="post-container">
        <div className="post-container-content">
          {isEditing ? (
            <textarea
              value={postText}
              onChange={(e) => setPost(e.target.value)}
            />
          ) : (
            <p>{postText}</p>
          )}
          <p className="post-date">{created_at}</p>
        </div>
        <button onClick={() => deletePost()}>Delete post</button>
        <button onClick={() => setIsEditing(true)}>Edit post</button>
        {isEditing && (
          <button
            onClick={() => {
              editPost();
            }}
          >
            Confirm Edit
          </button>
        )}

        {error && <p>{error}</p>}
      </div>
    </div>
  );
}

export default Post;
