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

router.post("/", (req, res) => {
  const { title, category } = req.body;

  if (!title) {
    return res.status(400).send({ message: "Title is required" });
  }

  if (!category) {
    return res.status(400).send({ message: "Category is required" });
  }

  const createdAt = new Date().toLocaleString();

  db.run(
    "INSERT INTO thread (title, created_at, category) VALUES(?,?, ?)",
    [title, createdAt, category],
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
  const { title, category } = req.body;
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

  db.run(
    "UPDATE Thread SET title = ?, category = ? WHERE thread_id = ?",
    [title, category, id],
    function (err) {
      if (err) {
        return console.error("Error updating data:", err.message);
      }

      res.json({ message: "Thread successfully updated" });
    }
  );
});

module.exports = router;
