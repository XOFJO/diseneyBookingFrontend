import React, { useState } from "react";
import { motion } from "framer-motion";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handlePasswordChange = () => {
    if (oldPassword === "correct-password") {
      alert("Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
    } else {
      alert("Incorrect old password!");
      setOldPassword("");
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-900/40 via-blue-900/30 to-indigo-900/40 backdrop-blur-lg border border-purple-500/30 p-8 rounded-2xl shadow-2xl mb-8 w-full text-white relative overflow-hidden">
      {/* Magical glow effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/10 to-blue-500/5 opacity-50 animate-pulse pointer-events-none rounded-2xl"></div>

      <h2 className="text-2xl font-bold mb-8 text-center tracking-wider bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
        🔐 Change Password 🔐
      </h2>

      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative group">
          <input
            className="w-full p-4 rounded-xl bg-gradient-to-r from-indigo-900/50 to-purple-900/40 border border-purple-400/30 text-white placeholder-purple-200/70 focus:border-yellow-400/60 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 group-hover:border-pink-400/50"
            type="password"
            placeholder="🔑 Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"></div>
        </div>

        <div className="relative group">
          <input
            className="w-full p-4 rounded-xl bg-gradient-to-r from-indigo-900/50 to-purple-900/40 border border-purple-400/30 text-white placeholder-purple-200/70 focus:border-yellow-400/60 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 group-hover:border-pink-400/50"
            type="password"
            placeholder="🆕 New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"></div>
        </div>

        <motion.button
          className="w-full p-4 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white font-bold tracking-wide hover:from-yellow-500 hover:via-pink-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all duration-500 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30 relative overflow-hidden"
          onClick={handlePasswordChange}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10">✨ Confirm Change ✨</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        </motion.button>
      </motion.div>

      {/* Background magical elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-4 right-4 w-8 h-8 border border-yellow-400 rounded-full animate-spin-slow"></div>
        <div className="absolute bottom-4 left-4 w-6 h-6 border border-purple-400 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default ChangePassword;