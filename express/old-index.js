import express from "express";
//In Node.js, we import JSON files using the import statement with the type option set to "json".
import jobs from "./jobs.json" with { type: "json" };
import { DEFAULTS } from "./config";

const PORT = process.env.PORT || DEFAULTS.PORT;
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

app.get("/jobs", async (req, res) => {
  // We only import data when we call this GET
  // const { default: jobs } = await import("./jobs.json", {
  //   with: { type: "json" },
  // });

  const {
    text,
    title,
    limit = DEFAULTS.LIMIT_PAGINATION,
    technology,
    offset = DEFAULTS.LIMIT_OFFSET,
  } = req.query;
  let filteredJobs = jobs;
  if (text) {
    const searchTerm = text.toLowerCase();
    filteredJobs = filteredJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(searchTerm) ||
        job.description.toLowerCase().includes(searchTerm),
    );
  }

  if (technology) {
    filteredJobs = filteredJobs.filter(
      (job) => job,
      technology.includes(technology),
    );
  }

  // Pagination
  const limitNumber = Number(limit);
  const offsetNumber = Number(offset);

  const paginatedJobs = filteredJobs.slice(
    offsetNumber,
    offsetNumber + limitNumber,
  );

  return res.json(paginatedJobs);
});

// Idempotente: Because system remains the same if it's called multiple times
app.get("/jobs/:id", (req, res) => {
  // Params are ALWAYS parsed as STRINGS
  const { id } = req.params;

  const idNumber = Number(id);

  return res.json({
    job: { id: idNumber, title: `Job with id ${id}` },
  });
});

// NO ES Idempotente
app.post("/jobs", (req, res) => {
  // TODO
});

// Replace complete resource
app.put("/jobs/:id", (req, res) => {
  // TODO
});

// Update partial resource
app.patch("/jobs/:id", (req, res) => {
  // TODO
});

app.delete("/jobs/:id", (req, res) => {
  // TODO
});

// Optional -> /acd o /abcd
app.get("a{b}cd", (req, res) => {
  res.send("abcd o acd");
});

// Comodin * -> return all routes that start with ab and end with cd
app.get("bb*bb", (req, res) => {
  res.send("ab*cd");
});

// Long routes that we don't know how it finished
app.get("/file/*filename", (req, res) => {
  res.send("/file/*");
});

// Usar Regex
app.get(/.*fly$/, (res, req) => {
  res.send("Terminando en fly");
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
