import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Upload, User } from "lucide-react";

export default function Apply() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const jobId = searchParams.get("id");
  const jobType = searchParams.get("type"); // 'internship' or 'job'
  const jobTitle = searchParams.get("title") || "Position";
  const company = searchParams.get("company") || "Company";

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    experience: "",
    coverLetter: "",
    cv: null
  });

  const [submitted, setSubmitted] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setForm(prev => ({ ...prev, cv: file }));
    } else {
      alert("Please upload a PDF file only");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.phone || !form.cv) {
      alert("Please fill all required fields and upload your CV");
      return;
    }
    
    // Convert file to base64 for storage
    const reader = new FileReader();
    reader.onload = function(e) {
      const application = {
        id: Date.now(),
        jobId,
        jobType,
        jobTitle,
        company,
        ...form,
        cv: {
          name: form.cv.name,
          data: e.target.result,
          type: form.cv.type
        },
        appliedAt: new Date().toISOString()
      };
      
      const applications = JSON.parse(localStorage.getItem("applications") || "[]");
      applications.push(application);
      localStorage.setItem("applications", JSON.stringify(applications));
      
      setSubmitted(true);
    };
    reader.readAsDataURL(form.cv);
  };

  if (submitted) {
    return (
      <div className="space-y-6">
        <div className="rounded-3xl bg-gradient-to-r from-green-500/25 via-cyan-500/20 to-blue-500/20 p-8 ring-1 ring-white/10 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
            <User className="text-green-300" size={32} />
          </div>
          <h1 className="text-3xl font-extrabold text-green-300 mb-2">
            Application Submitted!
          </h1>
          <p className="text-white/70 mb-4">
            Your application for <span className="font-semibold text-white">{jobTitle}</span> at <span className="font-semibold text-white">{company}</span> has been submitted successfully.
          </p>
          <p className="text-sm text-white/60">
            You will receive a confirmation email shortly. The employer will review your application and contact you if selected.
          </p>
        </div>
        
        <div className="flex gap-4 justify-center">
          <Link 
            to="/" 
            className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black hover:bg-cyan-400"
          >
            Back to Home
          </Link>
          <Link 
            to="/candidate" 
            className="rounded-xl bg-white/10 px-6 py-3 font-semibold text-white hover:bg-white/20"
          >
            View My Applications
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-r from-cyan-500/25 via-fuchsia-500/20 to-amber-500/20 p-6 ring-1 ring-white/10">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white mb-4">
          <ArrowLeft size={16} />
          Back to Home
        </Link>
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-cyan-500/20 p-3 ring-1 ring-cyan-400/25">
            <User className="text-cyan-300" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-cyan-300">
              Apply for {jobType === 'job' ? 'Job' : 'Internship'}
            </h1>
            <p className="mt-1 text-sm text-white/70">
              {jobTitle} at {company}
            </p>
          </div>
        </div>
      </div>

      {/* Application Form */}
      <form onSubmit={handleSubmit} className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
        <h2 className="text-xl font-bold text-cyan-300 mb-6">Personal Information</h2>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Full Name *</label>
            <input
              type="text"
              required
              value={form.fullName}
              onChange={(e) => setForm(prev => ({ ...prev, fullName: e.target.value }))}
              className="w-full rounded-xl bg-black/40 p-3 ring-1 ring-white/10 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
              placeholder="Enter your full name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Email Address *</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
              className="w-full rounded-xl bg-black/40 p-3 ring-1 ring-white/10 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
              placeholder="your.email@example.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Phone Number *</label>
            <input
              type="tel"
              required
              value={form.phone}
              onChange={(e) => setForm(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full rounded-xl bg-black/40 p-3 ring-1 ring-white/10 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
              placeholder="+1 (555) 123-4567"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Address</label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => setForm(prev => ({ ...prev, address: e.target.value }))}
              className="w-full rounded-xl bg-black/40 p-3 ring-1 ring-white/10 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
              placeholder="City, State, Country"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-white/70 mb-2">Relevant Experience</label>
          <textarea
            value={form.experience}
            onChange={(e) => setForm(prev => ({ ...prev, experience: e.target.value }))}
            rows={3}
            className="w-full rounded-xl bg-black/40 p-3 ring-1 ring-white/10 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
            placeholder="Briefly describe your relevant experience, skills, or projects..."
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-white/70 mb-2">Cover Letter</label>
          <textarea
            value={form.coverLetter}
            onChange={(e) => setForm(prev => ({ ...prev, coverLetter: e.target.value }))}
            rows={4}
            className="w-full rounded-xl bg-black/40 p-3 ring-1 ring-white/10 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
            placeholder="Why are you interested in this position? What makes you a good fit?"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-white/70 mb-2">Upload CV/Resume *</label>
          <div className="relative">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
              id="cv-upload"
              required
            />
            <label
              htmlFor="cv-upload"
              className="flex items-center justify-center w-full p-6 border-2 border-dashed border-white/20 rounded-xl bg-black/20 hover:bg-black/30 cursor-pointer transition-all"
            >
              <div className="text-center">
                <Upload className="mx-auto text-white/50 mb-2" size={32} />
                <p className="text-white/70">
                  {form.cv ? form.cv.name : "Click to upload your CV (PDF only)"}
                </p>
                <p className="text-xs text-white/50 mt-1">Maximum file size: 5MB</p>
              </div>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 py-3 font-bold text-black hover:from-cyan-400 hover:to-cyan-500 transition-all"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}