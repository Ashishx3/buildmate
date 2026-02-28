"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import ProjectForm from "@/components/ProjectElements/ProjectCreationForm";
import { LogOut, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Dashboard({ isOwner }) {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("/api/projects/my");
      setProjects(res.data || []);

      // console.log(res.data); 
      

    } catch (e) {
    console.log(e);
  };
}

  const logout = async () => {
    await axios.get("/api/users/logout");
    router.push("/");
  };

  useEffect(() => {
    fetchProjects();
  }, []);
 
  

  const createProject = async (data) => {
    await axios.post("/api/projects/create", data);
    setShowModal(false);
    fetchProjects();
  };

  return (
    <div className="min-h-screen relative overflow-hidden text-white px-8 py-12">

      {/* ===== BACKGROUND GLOW ===== */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-250px] left-[-250px] w-[700px] h-[700px] bg-purple-700/30 blur-[180px] rounded-full" />
        <div className="absolute bottom-[-250px] right-[-250px] w-[700px] h-[700px] bg-indigo-700/30 blur-[180px] rounded-full" />
        <div className="absolute inset-0 bg-[#0b0f19]" />
      </div>

      {/* ===== HEADER ===== */}
      <div className="max-w-7xl mx-auto">
        <div className="rounded-3xl px-12 py-10 flex justify-between items-center
          bg-white/5 border border-white/10
          shadow-[0_0_80px_rgba(139,92,246,0.15)] backdrop-blur-3xl">

          <div>
            <h1 className="text-3xl font-bold tracking-wide">
              Welcome back 👋
            </h1>
            <p className="text-gray-400 mt-2">
              You have{" "}
              <span className="text-indigo-400 font-semibold">
                {projects.length}
              </span>{" "}
              projects in your workspace
            </p>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/40
            border border-red-500/30 px-5 py-3 rounded-xl transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {/* ===== PROJECT GRID (important spacing for Lenis reveal) ===== */}
      <div className="max-w-7xl mx-auto mt-28 pb-40">
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
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width:768px) 100vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700"
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
        <div className="flex flex-wrap gap-2 mb-4">
          {project.languages?.map((lang, i) => (
            <span
              key={`${project._id}-${i}`}
              className="text-xs bg-black/40 px-3 py-1 rounded-full border border-white/10 text-white"
            >
              {lang}
            </span>
          ))}
        </div>

        <div className="mb-6">
          <p className="text-slate-300 text-sm line-clamp-3">
            {project.description}
          </p>
        </div>

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

      {/* ===== FLOATING BUTTON ===== */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setShowModal(true)}
        className="fixed bottom-14 right-14 bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 rounded-full text-lg font-semibold
        shadow-[0_0_70px_rgba(99,102,241,0.7)]"
      >
        + Create Project
      </motion.button>

      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.85, y: 80, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="relative w-[95%] md:w-[720px] bg-white/5 border border-white/10
            rounded-3xl p-12 shadow-[0_0_100px_rgba(139,92,246,0.35)] backdrop-blur-3xl"
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-white/70 hover:text-white"
            >
              <X size={26} />
            </button>

            <h3 className="text-3xl font-semibold text-center mb-10">
              Create New Project
            </h3>

            <ProjectForm onSubmit={createProject} />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
