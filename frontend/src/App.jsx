import { useState } from "react";
import { analyzeCV } from "./api";

export default function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!file) {
      setError("Please upload a CV first.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await analyzeCV(file);
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setError("Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            AI CV Analyzer
          </h1>

          <p className="text-slate-400 mt-4 text-lg">
            Upload your resume and receive an AI-powered analysis, ATS score,
            strengths, weaknesses and key skills.
          </p>
        </div>

        {/* Upload Card */}
        <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700 rounded-2xl p-10 cursor-pointer hover:border-blue-500 transition"
          >
            <div className="text-5xl mb-3">📄</div>

            <p className="text-lg font-medium">Click to upload your CV</p>

            <p className="text-slate-400 text-sm mt-2">PDF format only</p>

            {file && (
              <p className="mt-4 text-blue-400 font-medium">{file.name}</p>
            )}

            <input
              id="file-upload"
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 py-4 rounded-xl font-semibold transition"
          >
            {loading ? "Analyzing CV..." : "Analyze CV"}
          </button>

          {loading && (
            <div className="mt-6 text-center">
              <div className="loader mx-auto"></div>
              <p className="text-slate-400 mt-3">AI is analyzing your CV...</p>
            </div>
          )}

          {error && <p className="text-red-400 text-center mt-4">{error}</p>}
        </div>

        {/* Results */}
        {result && (
          <div className="mt-12 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
              <h2 className="text-2xl font-bold mb-4">ATS Score</h2>

              <div className="w-full bg-slate-700 rounded-full h-5">
                <div
                  className="bg-gradient-to-r from-green-400 to-green-600 h-5 rounded-full"
                  style={{ width: `${result.ats_score}%` }}
                />
              </div>

              <p className="mt-4 text-4xl font-bold text-green-400">
                {result.ats_score}/100
              </p>
            </div>
            {/* Skills */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
              <h2 className="text-2xl font-bold mb-4 text-blue-400">Skills</h2>

              <div className="flex flex-wrap gap-3">
                {result.skills?.map((s, i) => (
                  <span
                    key={i}
                    className="bg-blue-500/20 px-3 py-1 rounded-full"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
            {/* Strengths */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
              <h2 className="text-2xl font-bold mb-4 text-green-400">
                Strengths
              </h2>

              <ul className="space-y-2">
                {result.strengths?.map((s, i) => (
                  <li key={i}>✅ {s}</li>
                ))}
              </ul>
            </div>
            {/* Education */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
              <h2 className="text-2xl font-bold mb-4 text-purple-400">
                Education
              </h2>

              <ul className="space-y-2">
                {result.education?.map((e, i) => (
                  <li key={i}>
                    🎓 <strong>{e.degree}</strong>
                    <br />
                    <span className="text-slate-400">
                      {e.institution} - {e.location}
                    </span>
                    <br />
                    <span className="text-xs text-slate-500">{e.duration}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Projects */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
              <h2 className="text-2xl font-bold mb-4 text-yellow-400">
                Projects
              </h2>

              <ul className="space-y-2">
                {result.projects?.map((p, i) => (
                  <li key={i}>
                    🚀{" "}
                    {typeof p === "string" ? (
                      p
                    ) : (
                      <>
                        <strong>{p.name}</strong>
                        <br />
                        <span>{p.description}</span>
                        <br />
                        <span className="text-sm text-blue-400">
                          {p.tech?.join(", ")}
                        </span>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            {/* Summary */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
              <h2 className="text-2xl font-bold mb-4">AI Summary</h2>

              <p className="text-slate-300 leading-8">{result.summary}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
