"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import ProjectForm from "@/components/ProjectElements/ProjectCreationForm";
import { 
  FiLogOut, 
  FiPlus, 
  FiEdit3,
  FiPieChart, 
  FiDollarSign, 
  FiLayers, 
  FiTrash2, 
  FiX, 
  FiAlertCircle 
} from "react-icons/fi"; // All icons from one place
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Dashboard() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
const [editingProject, setEditingProject] = useState(null);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("/api/projects/my");
      setProjects(res.data || []);
    } catch (e) {
      console.log(e);
    }
  };

  const logout = async () => {
    await axios.get("/api/users/logout");
    router.push("/");
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const createProject = async (formData) => {
  try {
    if (editingProject) {
      // If we are editing, use the PUT method (your API above)
      await axios.put("/api/projects/update", formData);
      toast.success("Deployment updated");
    } else {
      // If we are creating, use POST
      await axios.post("/api/projects/create", formData);
      toast.success("New project deployed");
    }
    
    setShowModal(false);
    setEditingProject(null); // Clear edit state
    fetchProjects();         // Refresh list
  } catch (error) {
    toast.error("Operation failed");
  }
};


const handleEdit = (project) => {
  setEditingProject(project); // Store the project data
  setShowModal(true);        // Open the same modal we use for creation
};
  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-indigo-500/30 overflow-x-hidden">
      
      {/* 🌌 AMBIENT BACKGROUND */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-yellow-500/5 blur-[150px] rounded-full" />
      </div>

      <main className="max-w-7xl mx-auto px-6 md:px-12 py-8 pt-24">
        
        {/* 🛠 COMPACT HEADER */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-black italic tracking-tighter uppercase leading-none">
            HQ <span className="text-indigo-500">TERMINAL</span>
          </h1>
          <button
            onClick={logout}
            className="flex items-center gap-2 bg-white/5 hover:bg-red-500/10 border border-white/10 px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all"
          >
            <FiLogOut size={12} /> Logoff
          </button>
        </div>

        {/* ⚡ URGENCY ALERT (The "Deploy to Earn" Push) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8 p-4 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center gap-4"
        >
          <FiAlertCircle className="text-yellow-500 shrink-0" size={20} />
          <p className="text-xs md:text-sm font-bold uppercase tracking-tight text-yellow-200/80">
            System Alert: Deploy a new project now to instantly bank <span className="text-yellow-400 underline">+200 MatePoints</span> to your wallet.
          </p>
        </motion.div>

        {/* 💰 YELLOWISH STATS ROW */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-16">
          <div className="bg-white/5 border border-white/5 p-6 rounded-[2rem] backdrop-blur-3xl">
            <FiPieChart className="text-yellow-400 mb-3" size={20} />
            <p className="text-2xl font-black italic text-yellow-400">{projects.length * 200}</p>
            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mt-1">MatePoints</p>
          </div>
          <div className="bg-white/5 border border-white/5 p-6 rounded-[2rem] backdrop-blur-3xl">
            <FiDollarSign className="text-emerald-400 mb-3" size={20} />
            <p className="text-2xl font-black italic">₹{(projects.length * 100)}</p>
            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mt-1">Earnings</p>
          </div>
          <div className="hidden sm:block bg-white/5 border border-white/5 p-6 rounded-[2rem] backdrop-blur-3xl">
            <FiLayers className="text-indigo-400 mb-3" size={20} />
            <p className="text-2xl font-black italic">{projects.length}</p>
            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mt-1">Deployments</p>
          </div>
        </div>

        {/* 📦 DEPLOYMENTS GRID */}
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-600 italic">Active Deployments</h3>
            <div className="h-[1px] flex-1 bg-white/5" />
          </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
  {projects.map((project, index) => (
    <motion.div
      key={project._id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group relative bg-white/[0.03] backdrop-blur-2xl border border-white/5 rounded-[2rem] overflow-hidden hover:border-indigo-500/40 transition-all duration-300"
    >
      {/* IMAGE AREA */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        
        {/* 🛠️ ADMIN CONTROLS (Top Right Overlay) */}
        <div className="absolute top-3 right-3 flex gap-2">
          {/* EDIT BUTTON */}
          <button 
            onClick={() => handleEdit(project)}
            className="p-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-yellow-400 hover:bg-yellow-500 hover:text-black transition-all opacity-0 group-hover:opacity-100 translate-y-[-10px] group-hover:translate-y-0"
          >
            <FiEdit3 size={14} />
          </button>

          {/* DELETE BUTTON */}
          <button 
            onClick={() => handleDelete(project._id)}
            className="p-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-red-400 hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100 translate-y-[-10px] group-hover:translate-y-0 delay-75"
          >
            <FiTrash2 size={14}/>
          </button>
        </div>

        {/* TITLE INSIDE IMAGE */}
        <div className="absolute bottom-4 left-6 right-6">
          <h2 className="text-xl font-black italic tracking-tighter uppercase text-white group-hover:text-indigo-400 transition-colors leading-tight">
            {project.title}
          </h2>
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">
            BuildMate Deployment
          </p>
        </div>
      </div>

      {/* FOOTER ACTIONS */}
      <div className="p-6 space-y-4">
        <div className="flex gap-3">
          <a 
            href={project.sourceCode} 
            target="_blank" 
            className="flex-1 bg-white/5 border border-white/10 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest text-center hover:bg-white hover:text-black transition-all"
          >
            Files
          </a>
          <a 
            href={project.liveLink} 
            target="_blank" 
            className="flex-1 bg-indigo-600 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest text-center shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all"
          >
            Live
          </a>
        </div>
      </div>
    </motion.div>
  ))}
</div>
        </div>
      </main>

      {/* ➕ MINI FLOATING BUTTON */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowModal(true)}
        className="fixed bottom-8 right-8 z-40 bg-indigo-600 text-white p-5 rounded-full shadow-2xl transition-all"
      >
        <FiPlus size={24} />
      </motion.button>

      {/* 📑 MODAL */}
   <AnimatePresence>
  {showModal && (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      {/* 🌌 BACKDROP: Deep glass blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowModal(false)}
        className="absolute inset-0 bg-black/90 backdrop-blur-3xl"
      />

      {/* 📑 MODAL CONTAINER */}
      <motion.div
        initial={{ scale: 0.9, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 30, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-5xl bg-[#0a0a0c] border border-white/10 rounded-[3rem] shadow-[0_0_120px_rgba(0,0,0,1)] z-10 flex flex-col max-h-[92vh] overflow-hidden"
      >
        {/* HEADER */}
        <div className="px-8 md:px-12 py-8 flex justify-between items-center border-b border-white/5 bg-[#0a0a0c]/50 backdrop-blur-xl z-20">
          <div className="flex items-center gap-4">
            <div className="h-3 w-3 rounded-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.8)] animate-pulse" />
            <h3 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-white">
              System <span className="text-indigo-500 not-italic">Deploy</span>
            </h3>
          </div>
          <button 
            onClick={() => setShowModal(false)} 
            className="group p-3 rounded-full bg-white/5 hover:bg-red-500/10 border border-white/5 hover:border-red-500/50 transition-all duration-300"
          >
            <FiX size={20} className="text-slate-500 group-hover:text-red-500 transition-colors" />
          </button>
        </div>

        {/* 🛠 FORM BODY */}
        <div className="flex-1 overflow-y-auto px-6 md:px-12 py-10 scrollbar-hide">
          <style jsx global>{`
            .scrollbar-hide::-webkit-scrollbar { display: none; }
            .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
          `}</style>
          
          <div className="pb-10"> {/* Extra bottom padding for scroll comfort */}
            <ProjectForm onSubmit={createProject} />
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-10 py-6 text-center border-t border-white/5 bg-[#0a0a0c]/80 backdrop-blur-md">
          <div className="flex items-center justify-center gap-6 opacity-30">
            <div className="h-[1px] w-12 bg-white" />
            <p className="text-[10px] font-bold text-white uppercase tracking-[0.8em]">
              BuildMate v2.0 Protocol
            </p>
            <div className="h-[1px] w-12 bg-white" />
          </div>
        </div>
      </motion.div>
    </div>
  )}
</AnimatePresence>
    </div>
  );
}