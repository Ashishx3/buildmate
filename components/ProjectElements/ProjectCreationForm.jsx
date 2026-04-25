"use client";

import { useState, useRef } from "react";
import { FiUploadCloud, FiCode, FiPlayCircle, FiPlusCircle, FiZap, FiCheck } from "react-icons/fi";
import { motion } from "framer-motion";

export default function ProjectForm({ onSubmit, initialData = {} }) {
  const [form, setForm] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    languages: initialData.languages?.join(", ") || "",
    sourceCode: initialData.sourceCode || "",
    liveLink: initialData.liveLink || "",
    image: null,
  });

  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(initialData.image || null);
  const inputRef = useRef();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (file) => {
    if (file) {
      setForm({ ...form, image: file });
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("description", form.description);
    fd.append("languages", JSON.stringify(form.languages.split(",").map((l) => l.trim()).filter(l => l !== "")));
    fd.append("sourceCode", form.sourceCode);
    fd.append("liveLink", form.liveLink);

    if (form.image) fd.append("image", form.image);
    if (initialData._id) fd.append("projectId", initialData._id);

    await onSubmit(fd);
  };

  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-10">
        
        {/* LEFT: COMPACT MEDIA UPLOAD & INCENTIVE */}
        <div className="lg:col-span-2 space-y-5">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 ml-2">Visual Asset</label>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={(e) => { e.preventDefault(); setDragActive(false); if (e.dataTransfer.files[0]) handleImage(e.dataTransfer.files[0]); }}
              onClick={() => inputRef.current.click()}
              className={`relative h-44 lg:h-[280px] w-full rounded-[2rem] border-2 border-dashed flex flex-col justify-center items-center text-center cursor-pointer transition-all duration-300 overflow-hidden
                ${dragActive ? "border-indigo-500 bg-indigo-500/10" : "border-white/10 bg-white/5 hover:border-white/20"}
              `}
            >
              <input type="file" accept="image/*" hidden ref={inputRef} onChange={(e) => handleImage(e.target.files[0])} />
              {previewUrl ? (
                <img src={previewUrl} alt="preview" className="h-full w-full object-cover" />
              ) : (
                <div className="p-4">
                  <FiUploadCloud className="mx-auto text-indigo-500 mb-2" size={24} />
                  <p className="text-white text-[10px] font-black uppercase tracking-widest leading-tight">Drop Banner</p>
                </div>
              )}
            </div>
          </div>

          {/* 💰 DEPLOYMENT INCENTIVE (Placed below dropbox) */}
          <div className="bg-yellow-500/5 border border-yellow-500/10 p-5 rounded-[1.5rem] flex items-center justify-between group">
            <div className="flex items-center gap-2">
              <FiZap className="text-yellow-500 animate-pulse" />
              <p className="text-[9px] font-black text-yellow-500/80 uppercase tracking-widest">Deployment Bonus</p>
            </div>
            <span className="text-xs font-black italic text-yellow-400">+200 MATEPOINTS</span>
          </div>
        </div>

        {/* RIGHT: DATA INPUTS */}
        <div className="lg:col-span-3 flex flex-col gap-5">
          <div className="space-y-4">
            <input
              name="title"
              value={form.title}
              placeholder="PROJECT TITLE"
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white placeholder-slate-700 outline-none focus:border-indigo-500/50 transition-all font-black italic tracking-tight"
            />
            <textarea
              name="description"
              value={form.description}
              placeholder="PROJECT MISSION / INTEL"
              rows={3}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white placeholder-slate-700 outline-none focus:border-indigo-500/50 transition-all font-medium text-sm resize-none"
            />
          </div>

          <div className="space-y-3">
            <div className="relative">
              <FiPlusCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" />
              <input
                name="languages"
                value={form.languages}
                placeholder="TECH STACK (COMMA SEPARATED)"
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl text-white placeholder-slate-700 outline-none focus:border-indigo-500/50 transition-all font-bold text-[10px] tracking-widest"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {form.languages.split(',').map((tag, i) => tag.trim() !== "" && (
                <span key={i} className="text-[8px] font-black bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-md uppercase italic">
                  {tag.trim()}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative group">
              <FiCode className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-400" />
              <input
                name="sourceCode"
                value={form.sourceCode}
                placeholder="SOURCE URL"
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl text-white placeholder-slate-700 outline-none focus:border-indigo-500/50 transition-all text-[9px] font-bold tracking-widest uppercase"
              />
            </div>
            
            {/* 🎥 SUGGESTION: TACTICAL DEMO (Instead of Live URL) */}
            <div className="relative group">
              <FiPlayCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-400" />
              <input
                name="liveLink"
                value={form.liveLink}
                placeholder="DEMO / PREVIEW (OPTIONAL)"
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl text-white placeholder-slate-700 outline-none focus:border-indigo-500/50 transition-all text-[9px] font-bold tracking-widest uppercase"
              />
              <p className="absolute -bottom-5 left-2 text-[7px] font-bold text-slate-600 uppercase tracking-widest">Video or Hosting Link</p>
            </div>
          </div>

          <div className="pt-6">
            <button
              onClick={handleSubmit}
              className="w-full py-4 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase tracking-[0.3em] text-[10px] transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
            >
              <FiCheck /> Initialize Deployment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}