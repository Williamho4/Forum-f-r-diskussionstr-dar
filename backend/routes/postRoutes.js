const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  if (!req.query.thread_id) {
    return res.status(404).send("Missing thread_id");
  }

  db.all(
    "SELECT * FROM post WHERE thread_id = ?",
    [Number(req.query.thread_id)],
    (err, rows) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(rows);
      }
    }
  );
});

router.post("/", (req, res) => {
  const threadID = Number(req.query.thread_id);

  const createdAt = new Date().toLocaleString();

  const { content } = req.body;

  if (!threadID) {
    return res.status(404).send("Missing thread_id");
  }

  if (!content) {
    return res.status(404).send("Missing content");
  }

  db.run(
    "INSERT INTO post (content, thread_id, created_at) VALUES (?, ?, ?)",
    [content, threadID, createdAt],
    function (err) {
      if (err) {
        console.error("Error inserting data:", err.message);
        return res
          .status(500)
          .json({ error: "Database error", details: err.message });
      }

      db.run(
        "UPDATE thread SET last_updated = ?, total_posts = total_posts + 1 WHERE thread_id = ?",
        [createdAt, threadID],
        function (err) {
          if (err) {
            console.error("Error updating thread:", err.message);
            return res.status(500).json({ error: "Database error" });
          }

          res.json({ message: "Post successfully created" });
        }
      );
    }
  );
});

router.delete("/:post_id/:thread_id", (req, res) => {
  const { post_id, thread_id } = req.params;

  if (!post_id || !thread_id) {
    return res.status(400).json({ error: "post_id and thread_id is required" });
  }

  db.run("DELETE FROM post WHERE post_id = ?", [post_id], function (err) {
    if (err) {
      return console.error("Error deleting post:", err.message);
    }

    db.run(
      "UPDATE thread SET last_updated = ?, total_posts = total_posts - 1 WHERE thread_id = ?",
      [new Date().toLocaleString(), thread_id],
      function (err) {
        if (err) {
          console.error("Error updating thread:", err.message);
          return res.status(500).json({ error: "Database error" });
        }

        res.json({ message: "Post successfully deleted" });
      }
    );
  });
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  db.run(
    "UPDATE post SET content = ? WHERE post_id = ? ",
    [content, id],
    function (err) {
      if (err) {
        console.error("Error updating post:", err.message);
        return res.status(500).json({ error: "Database error" });
      }

      res.json({ message: "Post successfully updated" });
    }
  );
});

module.exports = router;
