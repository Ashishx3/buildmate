"use client"
import Navbar from '@/components/PageElements/Navbar'
import axios from 'axios'
import { motion } from 'framer-motion'
import Lenis from "@studio-freight/lenis";
import React, { useEffect, useState } from 'react'
import { FiUploadCloud, FiZap, FiCheckCircle, FiStar } from 'react-icons/fi'

import dummyProjects from './preData/DummyProjects';

function initLenis() {
  const lenis = new Lenis({ duration: 1.4, smooth: true });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

const Homepage = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    initLenis();
    const fetchAllProjects = async () => {
      try {
        const res = await axios.get("/api/projects/allProjectsFetch");
        setProjects(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllProjects();
  }, []);

  return (
    <div className='min-h-screen bg-slate-950 text-white selection:bg-indigo-500/30 overflow-hidden'>
      <Navbar />
      
      {/* 🌌 GLASSY BACKGROUND DECOR */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[180px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[180px] rounded-full" />
      </div>

      {/* Main Content with distance from top */}
      <main className="max-w-7xl mx-auto px-6 md:px-10 pt-40 pb-20">
        
        {/* 🚀 HERO WITH NEW QUOTES */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          className="text-center mb-32"
        >
          <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase leading-none bg-gradient-to-b from-white to-white/30 bg-clip-text text-transparent">
            Your Code. <br/> <span className="text-indigo-500 not-italic">Your Kingdom.</span>
          </h1>
          <p className="text-slate-400 text-xs md:text-lg mt-8 max-w-xl mx-auto font-bold tracking-[0.3em] uppercase opacity-50">
            "Stop Building for Free. Start Building for keeps."
          </p>
        </motion.div>

        {/* 💰 DETAILED EARN SECTION: POINTS ON UPLOAD */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-40"
        >
          <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[3rem] p-8 md:p-14 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-5">
              <FiUploadCloud size={200} />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-block px-4 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-widest">
                  Incentive Program v1.0
                </div>
                <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase">
                  Instant Rewards <br/> <span className="text-indigo-500">Per Upload</span>
                </h2>
                <p className="text-slate-400 font-medium leading-relaxed max-w-md">
                  No gatekeeping here. Every time you push a project to BuildMate, we credit your account with **200 MatePoints** instantly. No strings attached.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-all group">
                  <FiStar className="text-indigo-500 mb-4 group-hover:scale-125 transition-transform" />
                  <h4 className="font-bold text-sm uppercase tracking-widest">Post & Get</h4>
                  <p className="text-xs text-slate-500 mt-2">+200 Pts per valid upload</p>
                </div>
                <div className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-all group">
                  <FiCheckCircle className="text-emerald-500 mb-4 group-hover:scale-125 transition-transform" />
                  <h4 className="font-bold text-sm uppercase tracking-widest">Convert</h4>
                  <p className="text-xs text-slate-500 mt-2">1000 Pts = ₹500 Liquid</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 📦 THE PROJECT GRID (Fixed Mobile View) */}
        <div className="space-y-12">
          <div className="flex items-center gap-6">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-600 italic">Latest Drops</h3>
            <div className="h-[1px] flex-1 bg-white/5" />
          </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
  {[...dummyProjects, ...projects].map((project, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: (index % 3) * 0.05, 
        ease: "easeOut" 
      }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group relative rounded-[2rem] overflow-hidden bg-white/[0.03] backdrop-blur-3xl border border-white/5
      hover:border-indigo-500/50 transition-all duration-300 shadow-2xl"
    >
      {/* IMAGE AREA */}
      <div className="relative h-60 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        {/* REWARD BADGE */}
        <div className="absolute top-4 right-4 bg-indigo-600 px-3 py-1 rounded-full shadow-lg">
          <span className="text-[9px] font-black italic text-white uppercase tracking-tighter">
            +200 Pts
          </span>
        </div>

        {/* FULL TITLE INSIDE - Fixed the "too short" issue */}
        <div className="absolute bottom-4 left-6 right-6">
          <h2 className="text-xl font-black italic text-white uppercase tracking-tighter group-hover:text-indigo-400 transition-colors leading-tight">
            {project.title}
          </h2>
          <div className="flex justify-between items-center mt-2">
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
              By {project.author || project.user?.username || "Architect"}
            </p>
            <span className="text-[9px] font-bold text-indigo-400/70 bg-indigo-500/10 px-2 py-0.5 rounded-md">
              {project.views} Views
            </span>
          </div>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="p-6">
        {/* Tech Stack Tags (Using your 'tech' array) */}
        <div className="flex flex-wrap gap-2 mb-4">
          {(project.tech || project.languages)?.slice(0, 3).map((t, i) => (
            <span key={i} className="text-[8px] font-bold bg-white/5 px-2 py-1 rounded-full border border-white/10 text-slate-400 uppercase tracking-tighter">
              {t}
            </span>
          ))}
        </div>

        {/* BUTTONS: Perfectly curved & Gap Removed */}
        <div className="flex gap-3 mt-4"> 
          <a
            href={project.sourceCode || "#"}
            className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 py-2.5 rounded-full text-white text-[10px] font-bold uppercase tracking-widest text-center transition-all"
          >
            Details
          </a>

          <a
            href={project.liveLink || "#"}
            className="flex-1 bg-indigo-600 hover:bg-indigo-500 py-2.5 rounded-full text-white text-[10px] font-bold uppercase tracking-widest text-center shadow-lg shadow-indigo-500/20 transition-all"
          >
            {project.price || "Live"}
          </a>
        </div>
      </div>
    </motion.div>
  ))}
</div>  
        </div>
      </main>

      <footer className="py-20 text-center opacity-10">
        <p className="text-[10px] font-bold uppercase tracking-[2em]">BuildMate Sovereign</p>
      </footer>
    </div>
  )
}

export default Homepage




















// "use client"
// import Navbar from '@/components/PageElements/Navbar'
// import axios from 'axios'
// import { motion } from 'framer-motion'
// import Lenis from "@studio-freight/lenis";
// import React, { useEffect,useState } from 'react'

// import dummyProjects from './preData/DummyProjects';


// function initLenis() {
//   const lenis = new Lenis({ duration: 1.2, smooth: true });
//   function raf(time) {
//     lenis.raf(time);
//     requestAnimationFrame(raf);
//   }
//   requestAnimationFrame(raf);
// }






// const Homepage = () => {
// const [projects, setProjects] = useState([]);



// useEffect(() => {
//     initLenis();
//   }, []);


//   useEffect(() => {
//     const fetchAllProjects = async () => {
//       try {
//         const res = await axios.get("/api/projects/allProjectsFetch");
//         setProjects(res.data);
//         console.log(res.data);
        
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchAllProjects();
//   }, []);
  
//   return (
//     <div className='min-h-screen bg-slate-950 text-white relative overflow-hidden px-8 py-16' >
//       <div className='mt-8'>

//      <Navbar/>
//           <div className="mt-8 min-h-screen bg-slate-950 text-white relative overflow-hidden px-8 py-16">
      
//             {/* BACKGROUND GLOW */}
//             <div className="absolute inset-0 -z-10">
//               <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] bg-blue-600/20 blur-[180px] rounded-full" />
//               <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] bg-purple-600/20 blur-[180px] rounded-full" />
//             </div>
      
//             {/* HERO */}
//             <motion.div
//               initial={{ opacity: 0, y: 60 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.9 }}
//               className="text-center mb-24"
//             >
//               <h1 className="text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-300 to-slate-500 bg-clip-text text-transparent">
//                 Explore Elite BuildMate Projects
//               </h1>
//               <p className="text-slate-400 text-xl mt-6 max-w-2xl mx-auto">
//                 Ready-to-use Projects with full source code and live previews
//               </p>
//             </motion.div>
      
//             {/* GRID */}
//             <div className="grid md:grid-cols-3 gap-14">
//               {dummyProjects.map((dummyProjects, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 80 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.7, delay: index * 0.15 }}
//                   viewport={{ once: true }}
//                   className="group rounded-3xl overflow-hidden bg-white/5 backdrop-blur-2xl border border-transparent
//                   hover:border-blue-500/60
//                   shadow-[0_0_40px_rgba(59,130,246,0.15)]
//                   hover:shadow-[0_0_80px_rgba(168,85,247,0.35)]
//                   transition-all duration-500"
//                 >
//                   {/* IMAGE */}
//                   <div className="relative h-60 overflow-hidden">
//                     <img
//                       src={dummyProjects.image}
//                       alt={dummyProjects.title}
//                       className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            
//                     <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
//                       <div>
//                         <h2 className="text-2xl font-bold text-white">
//                           {dummyProjects.title}
//                         </h2>
//                         <p className="text-slate-300 text-sm">
//                           Built Project
//                         </p>
//                       </div>
            
//                       <span className="bg-black/40 px-4 py-1 rounded-full text-sm backdrop-blur-md border border-white/10 text-white">
//                         🚀 Live
//                       </span>
//                     </div>
//                   </div>
            
//                   {/* CONTENT */}
//                   <div className="p-6">
//                     {/* Languages */}
//                     <div className="flex flex-wrap gap-2 mb-4">
//                       {dummyProjects.languages?.map((lang, i) => (
//                         <span
//                           key={i}
//                           className="text-xs bg-black/40 px-3 py-1 rounded-full border border-white/10 text-white"
//                         >
//                           {lang}
//                         </span>
//                       ))}
//                     </div>
            
//                     {/* Description instead of price */}
//                     <div className="mb-6">
//                       <p className="text-slate-300 text-sm line-clamp-3">
//                         {dummyProjects.description}
//                       </p>
//                     </div>
            
//                     {/* SAME BUTTONS KEPT */}
//                     <div className="flex gap-4">
//                       <a
//                         href={dummyProjects.sourceCode}
//                         target="_blank"
//                         className="w-[50%] bg-white/10 hover:bg-white/20 border border-white/10 py-2 rounded-lg text-white text-center"
//                       >
//                         View Project
//                       </a>
            
//                       <a
//                         href={dummyProjects.liveLink}
//                         target="_blank"
//                         className="w-[50%] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-90 py-2 rounded-lg text-white text-center"
//                       >
//                         Live Preview
//                       </a>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>









// <div className="grid md:grid-cols-3 gap-14">
//   {projects.map((project, index) => (
//     <motion.div
//       key={project._id}
//       initial={{ opacity: 0, y: 80 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.7, delay: index * 0.15 }}
//       viewport={{ once: true }}
//       className="group rounded-3xl overflow-hidden bg-white/5 backdrop-blur-2xl border border-transparent
//       hover:border-blue-500/60
//       shadow-[0_0_40px_rgba(59,130,246,0.15)]
//       hover:shadow-[0_0_80px_rgba(168,85,247,0.35)]
//       transition-all duration-500"
//     >
//       {/* IMAGE */}
//       <div className="relative h-60 overflow-hidden">
//         <img
//           src={project.image}
//           alt={project.title}
//           className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

//         <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
//           <div>
//             <h2 className="text-2xl font-bold text-white">
//               {project.title}
//             </h2>
//             <p className="text-slate-300 text-sm">
//               Built Project
//             </p>
//           </div>

//           <span className="bg-black/40 px-4 py-1 rounded-full text-sm backdrop-blur-md border border-white/10 text-white">
//             by {project.user.username}
//           </span>
//         </div>
//       </div>

//       {/* CONTENT */}
//       <div className="p-6">
//         {/* Languages */}
//         <div className="flex flex-wrap gap-2 mb-4">
//           {project.languages?.map((lang, i) => (
//             <span
//               key={i}
//               className="text-xs bg-black/40 px-3 py-1 rounded-full border border-white/10 text-white"
//             >
//               {lang}
//             </span>
//           ))}
//         </div>

//         {/* Description instead of price */}
//         <div className="mb-6">
//           <p className="text-slate-300 text-sm line-clamp-3">
//             {project.description}
//           </p>
//         </div>

//         {/* SAME BUTTONS KEPT */}
//         <div className="flex gap-4">
//           <a
//             href={project.sourceCode}
//             target="_blank"
//             className="w-[50%] bg-white/10 hover:bg-white/20 border border-white/10 py-2 rounded-lg text-white text-center"
//           >
//             View Project
//           </a>

//           <a
//             href={project.liveLink}
//             target="_blank"
//             className="w-[50%] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-90 py-2 rounded-lg text-white text-center"
//           >
//             Live Preview
//           </a>
//         </div>
//       </div>
//     </motion.div>
//   ))}
// </div>
// </div>

//     </div>
//   )
// }

// export default Homepage
