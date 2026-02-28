"use client"
import Navbar from '@/components/PageElements/Navbar'
import axios from 'axios'
import { motion } from 'framer-motion'

import React, { useEffect,useState } from 'react'

const Homepage = () => {
const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        const res = await axios.get("/api/projects/allProjectsFetch");
        setProjects(res.data);
        console.log(res.data);
        
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllProjects();
  }, []);
  
  return (
    <div className='min-h-screen bg-slate-950 text-white relative overflow-hidden px-8 py-16' >
      <div className='mt-8'>
      <Navbar/>

<div className="grid md:grid-cols-3 gap-14">
  {projects.map((project, index) => (
    <motion.div
      key={project._id}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      viewport={{ once: true }}
      className="group rounded-3xl overflow-hidden bg-white/5 backdrop-blur-2xl border border-transparent
      hover:border-blue-500/60
      shadow-[0_0_40px_rgba(59,130,246,0.15)]
      hover:shadow-[0_0_80px_rgba(168,85,247,0.35)]
      transition-all duration-500"
    >
      {/* IMAGE */}
      <div className="relative h-60 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {project.title}
            </h2>
            <p className="text-slate-300 text-sm">
              Built Project
            </p>
          </div>

          <span className="bg-black/40 px-4 py-1 rounded-full text-sm backdrop-blur-md border border-white/10 text-white">
            by {project.user.username}
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6">
        {/* Languages */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.languages?.map((lang, i) => (
            <span
              key={i}
              className="text-xs bg-black/40 px-3 py-1 rounded-full border border-white/10 text-white"
            >
              {lang}
            </span>
          ))}
        </div>

        {/* Description instead of price */}
        <div className="mb-6">
          <p className="text-slate-300 text-sm line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* SAME BUTTONS KEPT */}
        <div className="flex gap-4">
          <a
            href={project.sourceCode}
            target="_blank"
            className="w-[50%] bg-white/10 hover:bg-white/20 border border-white/10 py-2 rounded-lg text-white text-center"
          >
            View Project
          </a>

          <a
            href={project.liveLink}
            target="_blank"
            className="w-[50%] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-90 py-2 rounded-lg text-white text-center"
          >
            Live Preview
          </a>
        </div>
      </div>
    </motion.div>
  ))}
</div>
</div>

    </div>
  )
}

export default Homepage
