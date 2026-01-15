import { Router } from "express";
import { JobController } from "../controllers/jobs";

const jobsRouter = Router();
jobsRouter.get("/", JobController.getAll);

jobsRouter.get("/:id", JobController.getId);

jobsRouter.post("/", (req, res) => {
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

jobsRouter.put("/:id", (req, res) => {
  // TODO
});

jobsRouter.patch("/:id", (req, res) => {
  // TODO
});

jobsRouter.delete("/:id", (req, res) => {
  // TODO
});
