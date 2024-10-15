const express = require('express');
const mongoose = require('mongoose');
const Task = require('./taskSchema.js');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/tasksdb')
.then(() => console.log('DB Connected'))
.catch(err => console.error('DB Failed', err));

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/tasks', async (req, res) => {
  const { title, description, dueDate, completed } = req.body;

  const task = new Task({
    title,
    description,
    dueDate,
    completed
  });

  try {
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running...");
});
