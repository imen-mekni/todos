const notFound = (req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: "Validation failed", errors });
  }
  if (err.name === "CastError") {
    return res.status(400).json({ message: `Invalid value for "${err.path}"` });
  }
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Server error" });
};

module.exports = { notFound, errorHandler };
