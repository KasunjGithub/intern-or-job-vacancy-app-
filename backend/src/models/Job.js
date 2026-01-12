import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    employerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    companyName: { type: String, required: true, trim: true },
    location: { type: String, default: "Remote", trim: true },
    type: { type: String, enum: ["internship", "full-time", "part-time", "contract"], default: "internship" },
    salaryMin: { type: Number, default: 0 },
    salaryMax: { type: Number, default: 0 },
    tags: { type: [String], default: [] },
    description: { type: String, default: "" },
    status: { type: String, enum: ["active", "closed"], default: "active" }
  },
  { timestamps: true }
);

export const Job = mongoose.model("Job", jobSchema);
