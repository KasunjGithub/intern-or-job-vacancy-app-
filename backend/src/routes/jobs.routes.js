import express from "express";
import { Job } from "../models/Job.js";
import { Application } from "../models/Application.js";
import { requireAuth } from "../middleware/auth.js";
import { requireRole } from "../middleware/role.js";

const router = express.Router();

// Public list + filters
router.get("/", async (req, res, next) => {
  try {
    const { q, type, location, status } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (type) filter.type = type;
    if (location) filter.location = new RegExp(String(location), "i");
    if (q) {
      filter.$or = [
        { title: new RegExp(String(q), "i") },
        { companyName: new RegExp(String(q), "i") },
        { tags: new RegExp(String(q), "i") }
      ];
    }

    const jobs = await Job.find(filter).sort({ createdAt: -1 }).limit(50);
    res.json(jobs);
  } catch (e) { next(e); }
});

router.get("/:id", async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (e) { next(e); }
});

// Employer creates job
router.post("/", requireAuth, requireRole("employer", "admin"), async (req, res, next) => {
  try {
    const { title, companyName, location, type, salaryMin, salaryMax, tags, description } = req.body || {};
    if (!title || !companyName) return res.status(400).json({ message: "title and companyName are required" });

    const job = await Job.create({
      employerId: req.user.id,
      title,
      companyName,
      location: location || "Remote",
      type: type || "internship",
      salaryMin: Number(salaryMin || 0),
      salaryMax: Number(salaryMax || 0),
      tags: Array.isArray(tags) ? tags : [],
      description: description || ""
    });

    res.status(201).json(job);
  } catch (e) { next(e); }
});

// Candidate apply
router.post("/:id/apply", requireAuth, requireRole("candidate", "admin"), async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    if (job.status !== "active") return res.status(400).json({ message: "Job is closed" });

    const { coverLetter } = req.body || {};
    const app = await Application.create({
      jobId: job._id,
      candidateId: req.user.id,
      coverLetter: coverLetter || ""
    });

    res.status(201).json(app);
  } catch (e) {
    // duplicate key -> already applied
    if (String(e?.code) === "11000") return res.status(409).json({ message: "Already applied" });
    next(e);
  }
});

// Employer: view applicants for my job
router.get("/:id/applicants", requireAuth, requireRole("employer", "admin"), async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    if (req.user.role === "employer" && String(job.employerId) !== String(req.user.id)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const applicants = await Application.find({ jobId: job._id })
      .populate("candidateId", "name email role")
      .sort({ createdAt: -1 });

    res.json(applicants);
  } catch (e) { next(e); }
});

export default router;
