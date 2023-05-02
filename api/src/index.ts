import express from "express";
import cors from "cors";
import db from "./models";

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/todos", async (req, res) => {
  const todos = await db.todoRepo.find();
  res.send({ todos });
});

app.post("/todos", async (req, res) => {
  const { name } = req.body;
  const todo = await db.todoRepo.create(name, false, 0);
  res.send({ todo });
});

app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { name, completed, sort } = req.body;
  const todo = await db.todoRepo.update(parseInt(id), name, completed, sort);
  res.send({ todo });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
