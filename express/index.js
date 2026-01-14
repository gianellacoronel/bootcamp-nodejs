import express from "express";

const PORT = process.env.PORT || 1234;
const app = express();

// Defining the route
app.get("/", (request, respond) => {
  respond.send("Hello World!");
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
