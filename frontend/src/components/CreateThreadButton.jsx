import { useState } from "react";
import { useFetchThreads } from "../hooks/fetchThread";

function CreateThreadButton({ onCreateThread }) {
  const [isOpen, setIsOpen] = useState(false);
  const [postError, setPostError] = useState(null);
  const [threadTitleInput, setThreadTitleInput] = useState("");
  const [threadCategoryInput, setThreadCategoryInput] = useState("");
  const { fetchThreads, threads } = useFetchThreads();

  async function postThread(e) {
    e.preventDefault();

    if (threadTitleInput.length === 0 || threadCategoryInput.length === 0) {
      return setPostError("Choose Title and Category");
    } else {
      try {
        const response = await fetch("http://localhost:5000/threads", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: threadTitleInput,
            category: threadCategoryInput,
          }),
        });

        const data = await response.json();
        console.log("Thread Created:", data);

        fetchThreads();
        setThreadTitleInput("");
        setThreadCategoryInput("");
        setPostError(null);
        setIsOpen(false);

        if (onCreateThread) {
          onCreateThread();
        }
      } catch (err) {
        setPostError(err.message || "Something went wrong");
      }
    }
  }

  return (
    <div>
      <button
        className="create-thread-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Close" : "Create new thread"}
      </button>
      {isOpen && (
        <form className="thread-form" onSubmit={postThread}>
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
          <button className="submit-button">Create</button>
        </form>
      )}
    </div>
  );
}

export default CreateThreadButton;
