"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FiTrash2, FiEdit3, FiCode, FiExternalLink, FiEye } from 'react-icons/fi';
import Image from 'next/image';

export default function ProjectCard({ project, onEdit, onDelete, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: (index % 3) * 0.05, 
        ease: "easeOut" 
      }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group relative rounded-[2.5rem] overflow-hidden bg-white/[0.03] backdrop-blur-3xl border border-white/5
      hover:border-indigo-500/40 transition-all duration-300 shadow-2xl"
    >
      {/* 🖼️ IMAGE AREA */}
      <div className="relative h-60 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        {/* 🛠️ ADMIN OVERLAY (Top Right) */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => onEdit(project)}
            className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-yellow-400 hover:bg-yellow-500 hover:text-black transition-all opacity-0 group-hover:opacity-100 translate-y-[-10px] group-hover:translate-y-0"
          >
            <FiEdit3 size={16} />
          </button>
          <button
            onClick={() => onDelete(project._id)}
            className="p-3 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-red-400 hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100 translate-y-[-10px] group-hover:translate-y-0 delay-75"
          >
            <FiTrash2 size={16} />
          </button>
        </div>

        {/* 🏷️ INFO OVERLAY (Inside Image) */}
        <div className="absolute bottom-4 left-6 right-6">
          <h2 className="text-xl font-black italic text-white uppercase tracking-tighter group-hover:text-indigo-400 transition-colors leading-tight">
            {project.title}
          </h2>
          <div className="flex justify-between items-center mt-2">
            <span className="text-[10px] font-bold text-indigo-400/70 bg-indigo-500/10 px-2 py-0.5 rounded-md flex items-center gap-1">
              <FiEye size={10} /> {project.views || 0} Views
            </span>
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
              Deployment Active
            </p>
          </div>
        </div>
      </div>

      {/* 📝 CONTENT AREA */}
      <div className="p-7 space-y-5">
        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.languages?.slice(0, 3).map((lang, i) => (
            <span 
              key={i} 
              className="text-[9px] font-bold bg-white/5 px-3 py-1 rounded-full border border-white/10 text-slate-400 uppercase tracking-tighter italic"
            >
              {lang}
            </span>
          ))}
        </div>

        {/* Description (Keep it tight) */}
        <p className="text-slate-400 text-xs font-medium leading-relaxed line-clamp-2 opacity-60">
          {project.description}
        </p>

        {/* 🎮 ACTION BUTTONS */}
        <div className="flex gap-3 pt-2">
          <a
            href={project.sourceCode}
            target="_blank"
            className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-full text-white text-[10px] font-black uppercase tracking-[0.2em] text-center transition-all flex items-center justify-center gap-2"
          >
            <FiCode /> Code
          </a>

          <a
            href={project.liveLink}
            target="_blank"
            className="flex-1 bg-indigo-600 hover:bg-indigo-500 py-3 rounded-full text-white text-[10px] font-black uppercase tracking-[0.3em] text-center shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-2"
          >
            <FiExternalLink /> Live
          </a>
        </div>
      </div>
    </motion.div>
  );
}