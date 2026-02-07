"use client";

import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSummarize = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setError("");
    setSummary("");

    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to summarize");
      }

      setSummary(data.summary);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="max-w-3xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            Smart Document Summarizer
          </h1>
          <p className="mt-2 text-lg text-gray-600">Powered by Google Gemini</p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-6 md:p-10 space-y-6 border border-gray-100">
          <div>
            <label
              htmlFor="document-text"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Paste your document text here
            </label>
            <textarea
              id="document-text"
              rows={10}
              className="w-full flex-auto rounded-lg border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 resize-y"
              placeholder="Paste text to summarize (max 50,000 characters)..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div
              className={`mt-2 text-right text-xs ${text.length > 50000 ? "text-red-500 font-bold" : "text-gray-500"}`}
            >
              {text.length.toLocaleString()} / 50,000 characters
            </div>
          </div>

          <button
            onClick={handleSummarize}
            disabled={loading || !text.trim() || text.length > 50000}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-all
              ${
                loading || !text.trim() || text.length > 50000
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              }`}
          >
            {loading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Summarizing...
              </span>
            ) : (
              "Summarize Document"
            )}
          </button>

          {error && (
            <div className="rounded-md bg-red-50 p-4 border border-red-200 animate-in fade-in slide-in-from-top-2">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {summary && (
            <div className="rounded-xl bg-blue-50 p-6 md:p-8 border border-blue-100 animate-in fade-in duration-500 slide-in-from-bottom-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="bg-blue-600 text-white rounded-md p-1 mr-2 shadow-sm">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </span>
                Summary
              </h2>
              <div className="prose prose-blue max-w-none text-gray-800">
                <div className="whitespace-pre-wrap font-medium leading-relaxed">
                  {summary}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="text-center text-xs text-gray-400">
          Secure, Server-Side AI Processing • Gemini 1.5 Flash
        </div>
      </div>
    </main>
  );
}
