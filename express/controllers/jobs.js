import { JobModel } from "../models/job";

export class JobController {
  // We put ASYNC because, if we want to work with asynchronous services, we have to put it anyway
  static async getAll(req, res) {
    const {
      text,
      title,
      limit = DEFAULTS.LIMIT_PAGINATION,
      technology,
      offset = DEFAULTS.LIMIT_OFFSET,
    } = req.query;

    const paginatedJobs = await JobModel.getAll({
      text,
      title,
      technology,
      limit,
      offset,
    });

    return res.json(paginatedJobs);
  }

  static async getId(req, res) {
    const { id } = req.params;

    const job = await JobModel.getId(id);

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }
    return res.json(job);
  }

  static async create(req, res) {
    const { title, company, address, data } = req.body;
    const newJob = await JobModel.create({ title, company, address, data });
    return res.status(201).json(newJob);
  }
}
