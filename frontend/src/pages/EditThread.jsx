import { useState } from "react";
import { useFetchThreads } from "../hooks/fetchThread";
import { useNavigate, useParams } from "react-router-dom";

function EditThread() {
  const [postError, setPostError] = useState(null);
  const [threadTitleInput, setThreadTitleInput] = useState("");
  const [threadCategoryInput, setThreadCategoryInput] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  async function editThread(e) {
    e.preventDefault();

    if (!id) {
      return setPostError("Not valid Id");
    }
    if (!threadTitleInput) {
      return setPostError("Enter Title");
    }
    if (!threadCategoryInput) {
      return setPostError("Enter Category");
    }

    try {
      const response = await fetch(`http://localhost:5000/threads/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: threadTitleInput,
          category: threadCategoryInput,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      setThreadCategoryInput("");
      setThreadTitleInput("");
      setPostError(null);
      console.log("Thread Updated");
      navigate("/");
    } catch (err) {
      setPostError(err.message || "Something went wrong");
    }
  }

  return (
    <div>
      ({" "}
      <form className="thread-form" onSubmit={editThread}>
        <label className="input-label">Title</label>
        <input
          className="input-box"
          type="text"
          value={threadTitleInput}
          onChange={(e) => setThreadTitleInput(e.target.value)}
        />
        <label className="input-label">Category</label>
        <input
          className="input-box"
          type="text"
          value={threadCategoryInput}
          onChange={(e) => setThreadCategoryInput(e.target.value)}
        />
        {postError && <p className="error-message">{postError}</p>}
        <button className="submit-button">Edit</button>
      </form>
      )
    </div>
  );
}

export default EditThread;
