const Todo = require("../models/Todo");

const ALLOWED_FIELDS = ["author", "name", "description", "imageUrl", "completed"];

// keep only whitelisted fields from the request body
const pickFields = (body = {}) =>
  ALLOWED_FIELDS.reduce((acc, key) => {
    if (body[key] !== undefined) acc[key] = body[key];
    return acc;
  }, {});

// GET /api/todo  (optional filters: ?author=<id>&completed=true|false)
exports.getTodos = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.author) filter.author = req.query.author;
    if (req.query.completed !== undefined)
      filter.completed = req.query.completed === "true";

    const todos = await Todo.find(filter).sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch (err) {
    next(err);
  }
};

// POST /api/todo
exports.createTodo = async (req, res, next) => {
  try {
    const todo = await Todo.create(pickFields(req.body));
    res.status(201).json(todo);
  } catch (err) {
    next(err);
  }
};

// PUT /api/todo/:id
exports.updateTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, pickFields(req.body), {
      new: true,
      runValidators: true,
    });
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.status(200).json(todo);
  } catch (err) {
    next(err);
  }
};

// PUT /api/todo/:id/toggle
exports.toggleTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    todo.completed = !todo.completed;
    await todo.save();
    res.status(200).json(todo);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/todos/:id  (also reachable as /api/todo/:id)
exports.deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.status(200).json({ message: "Todo deleted", _id: todo._id });
  } catch (err) {
    next(err);
  }
};
