require("dotenv").config();
const mongoose = require("mongoose");
const Todo = require("./models/Todo"); // adjust path if your folders differ

const author = "685958298ae29b346b0f6d56";

const todos = [
  {
    author,
    name: "Complete the React challenge",
    description: "Implement all required features for the todo list application",
    imageUrl: "https://picsum.photos/seed/react/300/200",
    completed: false,
  },
  {
    author,
    name: "Buy groceries",
    description: "Milk, eggs, bread, olive oil and tomatoes",
    imageUrl: "https://picsum.photos/seed/groceries/300/200",
    completed: true,
  },
  {
    author,
    name: "Prepare the class slides",
    description: "Finish the slides about components and props",
    imageUrl: "https://picsum.photos/seed/slides/300/200",
    completed: false,
  },
  {
    author,
    name: "Go to the gym",
    description: "Leg day, 1 hour",
    imageUrl: "https://picsum.photos/seed/gym/300/200",
    completed: false,
  },
  {
    author,
    name: "Call the plumber",
    description: "Fix the kitchen sink leak",
    imageUrl: "https://picsum.photos/seed/plumber/300/200",
    completed: true,
  },
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Todo.deleteMany({}); // remove this line to keep existing data
    const created = await Todo.insertMany(todos);
    console.log(`✅ Inserted ${created.length} todos`);
  } catch (err) {
    console.error("❌ Seed failed:", err.message);
  } finally {
    await mongoose.disconnect();
  }
})();