import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditThread() {
  const [postError, setPostError] = useState(null);
  const [threadTitleInput, setThreadTitleInput] = useState("");
  const [threadCategoryInput, setThreadCategoryInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const [thread, setThread] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchThread();
  }, []);

  const fetchThread = async () => {
    const response = await fetch(`http://localhost:5000/threads/${id}`);
    const data = await response.json();

    setThreadTitleInput(data.title);
    setThreadCategoryInput(data.category);
    setDescInput(data.content);
    setThread(data);
  };

  async function editThread(e) {
    e.preventDefault();

    if (!threadTitleInput) {
      return setPostError("Enter Title");
    }
    if (!threadCategoryInput) {
      return setPostError("Enter Category");
    }
    if (!descInput) {
      return setPostError("Enter Description");
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
          content: descInput,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      navigate(`/thread/${thread.title}/${thread.thread_id}`);
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
        <label className="input-label">Description</label>
        <textarea
          className="input-textarea"
          type="text"
          value={descInput}
          onChange={(e) => setDescInput(e.target.value)}
        />
        {postError && <p className="error-message">{postError}</p>}
        <button className="submit-button">Edit</button>
      </form>
      )
    </div>
  );
}

export default EditThread;
