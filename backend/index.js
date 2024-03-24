const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
app.use(express.json());
const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db");
app.use(cors());
app.post("/todo", async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;

  //zod validation
  try {
    const parsepayLoad = createTodo.safeParse({ title, description });
  } catch (err) {
    res.status(411).json({ msg: "you sent the wrong input" });
  }

  //put the info in mongodb
  await todo.create({
    title: title,
    description: description,
    completed: false,
  });

  res.json({
    msg: "the todo has been created",
  });
});

app.get("/todos", async (req, res) => {
  const todos = await todo.find({});
  res.json({ todos });
});

app.put("/completed", async (req, res) => {
  const id = req.body.id;

  try {
    const parseLoad = updateTodo.safeParse({ id });
  } catch (err) {
    res.status(411).json({ msg: "not a valid id" });
  }

  await todo.update(
    {
      _id: req.body.id,
    },
    { completed: true }
  );

  res.json({
    msg: "todo marked as completed",
  });
});

app.listen(port, () => {
  console.log("the server has started");
});
