import { useFetchThreads } from "../hooks/fetchThread";
import "./ThreadList.css";
import "./Forms.css";
import CreateThreadButton from "./CreateThreadButton";
import Thread from "./Thread";
import { useState } from "react";

function ThreadList() {
  const { fetchThreads, threads } = useFetchThreads();
  const [sortBy, setSortBy] = useState(null);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("");
  const [categoryFilteredThreads, setCategoryFilteredThreads] = useState([]);

  const categoryChange = (e) => {
    setCategory(e);

    setCategoryFilteredThreads(
      threads.filter(
        (thread) => thread.category.toLowerCase() === e.toLowerCase()
      )
    );
  };

  const sortedThreads = [...(threads || [])].sort((a, b) => {
    if (sortBy === "lastUpdated") {
      return new Date(b.last_updated) - new Date(a.last_updated);
    } else if (sortBy === "posts") {
      return b.total_posts - a.total_posts;
    }
    return 0;
  });

  const threadsToDisplay =
    categoryFilteredThreads.length > 0
      ? categoryFilteredThreads
      : sortedThreads;

  return (
    <div>
      <div className="thread-list">
        <div className="threads">
          <div className="sort-by">
            <h2>Sort By</h2>
            <button
              onClick={() => setSortBy("lastUpdated")}
              style={{ color: `${sortBy === "lastUpdated" ? "red" : "black"}` }}
            >
              Last Updated
            </button>
            <button
              onClick={() => setSortBy("posts")}
              style={{ color: `${sortBy === "posts" ? "red" : "black"}` }}
            >
              Most Posts
            </button>
            <div>
              <label>Search for category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => categoryChange(e.target.value)}
              />
            </div>
          </div>
          <CreateThreadButton
            onCreateThread={fetchThreads}
          ></CreateThreadButton>
          {threadsToDisplay?.length > 0 &&
            threadsToDisplay.map((thread) => (
              <Thread
                fetchThreads={fetchThreads}
                setError={setError}
                thread={thread}
              ></Thread>
            ))}
        </div>
      </div>
      {error && <h2>{error}</h2>}
    </div>
  );
}

export default ThreadList;
