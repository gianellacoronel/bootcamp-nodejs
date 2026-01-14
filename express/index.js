import express from "express";

const PORT = process.env.PORT || 1234;
const app = express();

//This is a middleware, in every route, it will be executed before the route handler
app.use((request, respond, next) => {
  const timeString = new Date().toLocaleTimeString();
  console.log(`[${timeString}] ${request.method} ${request.url}`);

  // We NEED to put its NEXT step
  next();
});

const previousHomeMiddleware = (request, response, next) => {
  console.log("Executing previous middleware to the route");
  next();
};

// Defining the route
// Here, the middleware will be executed before the route handler
app.get("/", previousHomeMiddleware, (request, respond) => {
  respond.send("Hello World!");
});

app.get("/health", (request, response) => {
  response.json({ status: "ok", uptime: process.uptime() });
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
