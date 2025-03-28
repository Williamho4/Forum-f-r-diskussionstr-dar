const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  db.all("SELECT * FROM thread", (err, rows) => {
    if (err) {
      res.status(500).send("Error");
    } else {
      res.send(rows);
    }
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  db.get("SELECT * FROM thread WHERE thread_id = ?", [id], (err, row) => {
    if (err) {
      res.status(500).send("Error");
    } else if (!row) {
      res.status(404).send("Thread not found");
    } else {
      res.json(row);
    }
  });
});

router.post("/", (req, res) => {
  const { title, category, content } = req.body;

  if (!title) {
    return res.status(400).send({ message: "Title is required" });
  }

  if (!category) {
    return res.status(400).send({ message: "Category is required" });
  }

  if (!content) {
    return res.status(400).send({ message: "Content is required" });
  }

  const createdAt = new Date().toLocaleString();

  db.run(
    "INSERT INTO thread (title, created_at, category, content) VALUES(?,?, ?,?)",
    [title, createdAt, category, content],
    function (err) {
      if (err) {
        return console.error("Error inserting data:", err.message);
      }

      res.json({ message: "Thread successfully created" });
    }
  );
});

router.delete("/", (req, res) => {
  const { thread_id } = req.body;

  if (!thread_id) {
    return res.status(400).send("Missing thread_id");
  }

  db.run("DELETE FROM thread WHERE thread_id = ?", [thread_id], function (err) {
    if (err) {
      return console.error("Error deleting data:", err.message);
    }

    res.json({ message: "Thread successfully deleted" });
  });
});

router.patch("/:id", (req, res) => {
  const { title, category, content } = req.body;
  const { id } = req.params;

  if (!id) {
    return res.status(400).send("Missing id");
  }
  if (!title) {
    return res.status(400).send("Missing title");
  }
  if (!category) {
    return res.status(400).send("Missing category");
  }
  if (!content) {
    return res.status(400).send("Missing content");
  }

  db.run(
    "UPDATE Thread SET title = ?, category = ?, content = ?  WHERE thread_id = ?",
    [title, category, content, id],
    function (err) {
      if (err) {
        return console.error("Error updating data:", err.message);
      }

      res.json({ message: "Thread successfully updated" });
    }
  );
});

module.exports = router;
