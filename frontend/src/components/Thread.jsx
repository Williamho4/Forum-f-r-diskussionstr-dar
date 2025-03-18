import { Link } from "react-router-dom";

function Thread({ fetchThreads, setError, thread }) {
  async function deleteThread(thread_id) {
    try {
      const response = await fetch("http://localhost:5000/threads", {
        method: "Delete",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ thread_id }),
      });
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

      fetchThreads();
      setError(null);
    } catch (err) {
      setError("Failed to delete thread");
    }
  }

  return (
    <Link
      key={thread.thread_id}
      to={`/thread/${thread.title}/${thread.thread_id}`}
    >
      <div className="thread-info">
        <div>
          <h1>{thread.title}</h1>
          <p>Total Posts {thread.total_posts}</p>
          <h4>Category {thread.category}</h4>
        </div>
        <div className="time-stamps">
          <div className="last-update">
            <h4>Thread Created</h4>
            <p>{thread.created_at}</p>
          </div>
          <div className="last-update">
            <h4>Last Updated</h4>
            <p>{thread.last_updated}</p>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            deleteThread(thread.thread_id);
          }}
        >
          Delete Thread
        </button>
        <Link to={`/edit-Thread/${thread.thread_id}`}>
          <button>Edit Thread</button>
        </Link>
      </div>
    </Link>
  );
}

export default Thread;
