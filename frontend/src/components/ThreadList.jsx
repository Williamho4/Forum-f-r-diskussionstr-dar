import { useFetchThreads } from "../hooks/fetchThread";
import "./ThreadList.css";
import "./Forms.css";
import CreateThreadButton from "./CreateThreadButton";
import Thread from "./Thread";
import { useEffect, useState } from "react";

function ThreadList() {
  const { fetchThreads, threads } = useFetchThreads();
  const [sortBy, setSortBy] = useState(null);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("");
  const [filteredThreads, setFilteredThreads] = useState([]);

  const [threadSearchInput, setThreadSearchInput] = useState("");

  useEffect(() => {
    setFilteredThreads(threads);
  }, [threads]);

  const categoryChange = (e) => {
    setCategory(e);

    setFilteredThreads(
      threads.filter((thread) =>
        thread.category.toLowerCase().includes(e.toLowerCase())
      )
    );
  };

  const searchThread = (e) => {
    setThreadSearchInput(e);

    setFilteredThreads(
      threads.filter(
        (thread) =>
          thread.title.toLowerCase().includes(e.toLowerCase()) ||
          thread.content.toLowerCase().includes(e.toLowerCase())
      )
    );

    if (category) {
      setFilteredThreads(
        threads.filter(
          (thread) =>
            (thread.title.toLowerCase().includes(e.toLowerCase()) &&
              thread.category.toLowerCase().includes(category.toLowerCase())) ||
            (thread.content.toLowerCase().includes(e.toLowerCase()) &&
              thread.category.toLowerCase().includes(category.toLowerCase()))
        )
      );
    }
  };

  useEffect(() => {
    setFilteredThreads(
      [...(filteredThreads || [])].sort((a, b) => {
        if (sortBy === "lastUpdated") {
          return new Date(b.last_updated) - new Date(a.last_updated);
        } else if (sortBy === "posts") {
          return b.total_posts - a.total_posts;
        }
        return 0;
      })
    );
  }, [sortBy]);

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
            <div>
              <label>Search for thread</label>
              <input
                type="text"
                value={threadSearchInput}
                onChange={(e) => searchThread(e.target.value)}
              />
            </div>
          </div>
          <CreateThreadButton
            onCreateThread={fetchThreads}
          ></CreateThreadButton>
          {filteredThreads?.length > 0 ? (
            filteredThreads.map((thread) => (
              <Thread
                key={thread.id}
                fetchThreads={fetchThreads}
                setError={setError}
                thread={thread}
              />
            ))
          ) : (
            <h2>No matches found</h2>
          )}
        </div>
      </div>
      {error && <h2>{error}</h2>}
    </div>
  );
}

export default ThreadList;
