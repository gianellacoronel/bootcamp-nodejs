import jobs from "../jobs.json" with { type: "json" };

export class JobModel {
  static async getAll({ text, title, limit = 10, technology, offset = 0 }) {
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

    return paginatedJobs;
  }

  static async getId(req, res) {
    const job = jobs.find((job) => job.id === id);
    return job;
  }

  static async create({ title, company, address, data }) {
    const newJob = {
      id: crypto.randomUUID(),
      title,
      company,
      address,
      data,
    };

    jobs.push(newJob);
    return newJob;
  }
}
