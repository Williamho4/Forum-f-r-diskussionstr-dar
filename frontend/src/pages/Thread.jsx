import Post from "../components/Post";
import "../styles/pages.css";
import { useFetchPosts } from "../hooks/fetchPosts";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Thread() {
  const { posts, fetchPosts } = useFetchPosts();
  const { id } = useParams();
  const [postContentInput, setPostContentInput] = useState("");
  const [postError, setPostError] = useState(null);
  const [threadInfo, setThreadInfo] = useState([]);

  useEffect(() => {
    fetchThread();
  }, []);

  useEffect(() => {
    fetchPosts(id);
  }, [id, posts]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (postContentInput.length === 0) {
      return setPostError("Content cannot be empty");
    }

    async function uploadPost() {
      try {
        const response = await fetch(
          `http://localhost:5000/posts?thread_id=${id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ content: postContentInput }),
          }
        );

        const data = await response.json();
        console.log("Post Created:", data);

        setPostContentInput("");
        setPostError(null);
        fetchPosts(id);
      } catch (err) {
        setPostError(err.message || "Something went wrong");
      }
    }

    uploadPost();

    setPostError(null);
  };

  const fetchThread = async () => {
    const response = await fetch(`http://localhost:5000/threads/${id}`);
    const data = await response.json();

    setThreadInfo(data);
  };

  return (
    <div className="page-container">
      <div className="thread-page">
        <h1>{threadInfo.title}</h1>
        <h2>Description</h2>
        <p>{threadInfo.content}</p>

        {posts?.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post.id}
              content={post.content}
              created_at={post.created_at}
              post_id={post.post_id}
            />
          ))
        ) : (
          <h1>No posts yet</h1>
        )}
        <form className="post-form" onSubmit={(e) => handleSubmit(e)}>
          <label className="input-label">Make a post</label>
          <textarea
            className="post-input-box"
            type="text"
            value={postContentInput}
            onChange={(e) => setPostContentInput(e.target.value)}
          />
          {postError && <p className="error-message">{postError}</p>}
          <button className="submit-button">Post</button>
        </form>
      </div>
    </div>
  );
}

export default Thread;
