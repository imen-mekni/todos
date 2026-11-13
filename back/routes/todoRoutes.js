const express = require("express");
const {
  getTodos,
  createTodo,
  updateTodo,
  toggleTodo,
  deleteTodo,
} = require("../controllers/todoController");
const validateObjectId = require("../middleware/validateObjectId");

const router = express.Router();
console.log({ getTodos, createTodo, updateTodo, toggleTodo, deleteTodo, validateObjectId });
router.route("/").get(getTodos).post(createTodo);
router.put("/:id/toggle", validateObjectId, toggleTodo);
router.put("/:id" , validateObjectId, updateTodo)
router.delete("/:id" , validateObjectId, deleteTodo);

module.exports = router;
