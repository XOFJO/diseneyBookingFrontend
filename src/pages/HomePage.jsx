import React from "react";
import { motion } from "motion/react";
import SearchForm from "../components/search/SearchForm";
import Header from "../components/layout/Header";

const HomePage = () => {
  return (
    <div>
      <Header />
      <div
        className="h-screen w-screen flex items-center justify-center p-8 relative overflow-hidden"
        style={{
          backgroundImage: "url(/assets/image.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          paddingTop: "15vh",
        }}
      >
        {/* Animated Background Overlay */}
        <motion.div
          className="absolute inset-0 bg-black/40"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(220, 38, 38, 0.1) 0%, rgba(0, 0, 0, 0.4) 50%)",
              "radial-gradient(circle at 80% 50%, rgba(251, 191, 36, 0.1) 0%, rgba(0, 0, 0, 0.4) 50%)",
              "radial-gradient(circle at 50% 20%, rgba(59, 130, 246, 0.1) 0%, rgba(0, 0, 0, 0.4) 50%)",
              "radial-gradient(circle at 20% 50%, rgba(220, 38, 38, 0.1) 0%, rgba(0, 0, 0, 0.4) 50%)",
            ],
          }}
          transition={{
            duration: 8,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        ></motion.div>

        {/* Floating Tech Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: "0 0 10px rgba(59, 130, 246, 0.8)",
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() > 0.5 ? 10 : -10, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Scanning Lines */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(251, 191, 36, 0.1) 50%, transparent 100%)",
          }}
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 4,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 3,
          }}
        />

        {/* Pulsing Energy Rings */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`ring-${i}`}
            className="absolute border border-red-400/20 rounded-full pointer-events-none"
            style={{
              width: `${300 + i * 200}px`,
              height: `${300 + i * 200}px`,
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, 360],
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}

        {/* Arc Reactor Effect in corner */}
        <motion.div
          className="absolute top-10 right-10 w-20 h-20 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 opacity-30"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            boxShadow:
              "0 0 30px rgba(59, 130, 246, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.2)",
          }}
        >
          <div className="absolute inset-4 rounded-full border-2 border-white/40 animate-pulse"></div>
          <div className="absolute inset-6 rounded-full bg-gradient-to-r from-blue-300 to-cyan-300"></div>
        </motion.div>

        {/* HUD Elements */}
        <motion.div
          className="absolute top-20 left-10 text-cyan-400 font-mono text-sm opacity-60"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 0.6, x: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <div>SYSTEM STATUS: ONLINE</div>
          <div>ARC REACTOR: 100%</div>
          <div>SHIELD: ACTIVE</div>
        </motion.div>

        {/* Glitch Effect Lines */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`glitch-${i}`}
            className="absolute h-px bg-gradient-to-r from-transparent via-red-400/30 to-transparent"
            style={{
              left: 0,
              right: 0,
              top: `${10 + i * 12}%`,
            }}
            animate={{
              opacity: [0, 0.3, 0],
              scaleX: [0, 1, 0],
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              delay: Math.random() * 5,
              repeatDelay: 3 + Math.random() * 4,
            }}
          />
        ))}

        {/* Center content area */}
        <div className="relative z-10 w-full max-w-6xl">
          <SearchForm />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
