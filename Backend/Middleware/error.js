export default (err, req, res, next) => {
  console.log("🔥 ERROR TYPE:", typeof err);
  console.log("🔥 ERROR INSTANCE:", err instanceof Error);

  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  res.status(err.statusCode).json({
    success: false,
    message: err.message
  });
};
