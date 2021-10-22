import express from "express";

const app = express();

app.listen(4000, () =>
  console.log("✅ Server running on http://localhost:4000")
);

app.get("/", (request, response) => {
  return response.json({ message: "Mundo Jix Challenge" });
});
