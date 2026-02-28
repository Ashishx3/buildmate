"use client";

import { useState, useRef } from "react";

export default function ProjectForm({ onSubmit, initialData = {} }) {
  const [form, setForm] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    languages: initialData.languages?.join(", ") || "",
    sourceCode: initialData.sourceCode || "",
    liveLink: initialData.liveLink || "",
    image: null, // new image if user changes
  });

  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (file) => {
    setForm({ ...form, image: file });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files[0]) {
      handleImage(e.dataTransfer.files[0]);
    }
  };

  // ✅ FINAL SUBMIT (FormData)
  const handleSubmit = async () => {
    const fd = new FormData();

    fd.append("title", form.title);
    fd.append("description", form.description);
    fd.append(
      "languages",
      JSON.stringify(form.languages.split(",").map((l) => l.trim()))
    );
    fd.append("sourceCode", form.sourceCode);
    fd.append("liveLink", form.liveLink);

    // if new image selected
    if (form.image) {
      fd.append("image", form.image);
    }

    // if editing
    if (initialData._id) {
      fd.append("projectId", initialData._id);
    }

    await onSubmit(fd);
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full max-w-5xl bg-slate-900/60 backdrop-blur-2xl border border-slate-700 rounded-3xl shadow-2xl p-10">
        <div className="grid md:grid-cols-2 gap-10">

          {/* LEFT — Drag Drop */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current.click()}
            className={`h-80 rounded-2xl border-2 border-dashed flex flex-col justify-center items-center text-center cursor-pointer transition-all duration-300
              ${dragActive
                ? "border-indigo-500 bg-indigo-500/10"
                : "border-slate-600 hover:border-slate-400"}
            `}
          >
            <input
              type="file"
              accept="image/*"
              hidden
              ref={inputRef}
              onChange={(e) => handleImage(e.target.files[0])}
            />

            {form.image ? (
              <img
                src={URL.createObjectURL(form.image)}
                alt="uploaded"
                className="h-full w-full object-cover rounded-2xl"
              />
            ) : initialData.image ? (
              // ✅ show old image in edit mode
              <img
                src={initialData.image}
                alt="old"
                className="h-full w-full object-cover rounded-2xl"
              />
            ) : (
              <>
                <p className="text-slate-300 text-lg font-medium">
                  Drag & Drop Project Image
                </p>
                <p className="text-slate-500 text-sm mt-2">
                  or click to upload
                </p>
              </>
            )}
          </div>

          {/* RIGHT — Fields */}
          <div className="flex flex-col gap-5">
            <input
              name="title"
              value={form.title}
              placeholder="Project Title"
              onChange={handleChange}
              className="bg-slate-800 border border-slate-700 p-3 rounded-xl text-slate-200 placeholder-slate-400 outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <textarea
              name="description"
              value={form.description}
              placeholder="Brief Description"
              rows={4}
              onChange={handleChange}
              className="bg-slate-800 border border-slate-700 p-3 rounded-xl text-slate-200 placeholder-slate-400 outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />

            <input
              name="languages"
              value={form.languages}
              placeholder="Technologies (React, Node, Mongo...)"
              onChange={handleChange}
              className="bg-slate-800 border border-slate-700 p-3 rounded-xl text-slate-200 placeholder-slate-400 outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              name="sourceCode"
              value={form.sourceCode}
              placeholder="GitHub / Source Code URL"
              onChange={handleChange}
              className="bg-slate-800 border border-slate-700 p-3 rounded-xl text-slate-200 placeholder-slate-400 outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              name="liveLink"
              value={form.liveLink}
              placeholder="Live Project URL"
              onChange={handleChange}
              className="bg-slate-800 border border-slate-700 p-3 rounded-xl text-slate-200 placeholder-slate-400 outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              onClick={handleSubmit}
              className="mt-3 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all hover:scale-105"
            >
              {initialData._id ? "Update Project" : "Save Project"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
