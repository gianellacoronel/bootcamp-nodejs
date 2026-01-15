import express from "express";
import cors from "cors";
import jobs from "./jobs.json" with { type: "json" };
import { DEFAULTS } from "./config.js";

const PORT = process.env.PORT ?? DEFAULTS.PORT;
const app = express();

const ACCEPTED_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
  }),
);

// Parse POST request, detect if had the header with json type, and parse it to a json
app.use(express.json());

app.use((request, respond, next) => {
  const timeString = new Date().toLocaleTimeString();
  console.log(`[${timeString}] ${request.method} ${request.url}`);

  next();
});

app.get("/", (request, response) => {
  response.send("Hello World!");
});

app.get("/health", (request, response) => {
  response.json({ status: "ok", uptime: process.uptime() });
});

// CRUD: Create, Read, Update, Delete

app.get("/jobs", async (req, res) => {
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

  const limitNumber = Number(limit);
  const offsetNumber = Number(offset);

  const paginatedJobs = filteredJobs.slice(
    offsetNumber,
    offsetNumber + limitNumber,
  );

  return res.json(paginatedJobs);
});

app.get("/jobs/:id", (req, res) => {
  const { id } = req.params;

  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ error: "Job not found" });
  }
  return res.json(job);
});

app.post("/jobs", (req, res) => {
  const { title, company, address, data } = req.body;

  const newJob = {
    id: crypto.randomUUID(),
    title,
    company,
    address,
    data,
  };

  jobs.push(newJob); // We have to do it using DB with an INSERT
  return res.status(201).json(newJob); // IMPORTANT to add status
});

app.put("/jobs/:id", (req, res) => {
  // TODO
});

app.patch("/jobs/:id", (req, res) => {
  // TODO
});

app.delete("/jobs/:id", (req, res) => {
  // TODO
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
