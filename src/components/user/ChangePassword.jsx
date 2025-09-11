import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import useUserStore from "../../store/userStore";

const ChangePassword = () => {
  // Zustand store access
  const {
    changePassword,
    changePasswordLoading,
    changePasswordError,
    changePasswordSuccess,
    resetChangePasswordState
  } = useUserStore();
  // State management
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [validationError, setValidationError] = useState("");

  // Reset states when component unmounts or success/error changes
  useEffect(() => {
    return () => {
      resetChangePasswordState();
      setValidationError("");
    };
  }, [resetChangePasswordState]);

  // Auto clear success message after 3 seconds
  useEffect(() => {
    if (changePasswordSuccess) {
      const timer = setTimeout(() => {
        resetChangePasswordState();
        setOldPassword("");
        setNewPassword("");
        setValidationError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [changePasswordSuccess, resetChangePasswordState]);

  const handlePasswordChange = async () => {
    // Clear previous validation error
    setValidationError("");
    
    // Validation
    if (!oldPassword.trim()) {
      setValidationError("Please enter your old password");
      return;
    }
    if (!newPassword.trim()) {
      setValidationError("Please enter your new password");
      return;
    }
    if (newPassword.length < 6) {
      setValidationError("New password must be at least 6 characters long");
      return;
    }
    if (oldPassword === newPassword) {
      setValidationError("New password must be different from old password");
      return;
    }

    // Call API
    await changePassword(1, oldPassword, newPassword);
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
            onChange={(e) => {
              setOldPassword(e.target.value);
              // Clear validation error when user starts typing
              if (validationError) setValidationError("");
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"></div>
        </div>

        <div className="relative group">
          <input
            className="w-full p-4 rounded-xl bg-gradient-to-r from-indigo-900/50 to-purple-900/40 border border-purple-400/30 text-white placeholder-purple-200/70 focus:border-yellow-400/60 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 group-hover:border-pink-400/50"
            type="password"
            placeholder="🆕 New Password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              // Clear validation error when user starts typing
              if (validationError) setValidationError("");
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"></div>        </div>

        {/* Success Message */}
        {changePasswordSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-xl p-4 text-center"
          >
            <div className="text-green-300 font-semibold">
              ✅ Password changed successfully!
            </div>
            <div className="text-green-400/70 text-sm mt-1">
              Your password has been updated.
            </div>
          </motion.div>
        )}        {/* Error Message - API Error or Validation Error */}
        {(changePasswordError || validationError) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-400/30 rounded-xl p-4 text-center"
          >
            <div className="text-red-300 font-semibold">
              ❌ {validationError ? 'Validation Error!' : 
                    (changePasswordError?.includes('Password change failed') || changePasswordError?.includes('旧密码') ? 'Incorrect old password!' : 'Password change failed!')}
            </div>
            <div className="text-red-400/70 text-sm mt-1">
              {validationError ? validationError :
                (changePasswordError?.includes('Password change failed') || changePasswordError?.includes('旧密码') 
                  ? 'Please check your old password and try again.' 
                  : changePasswordError)}
            </div>
            <button
              onClick={() => {
                if (validationError) {
                  setValidationError("");
                } else {
                  resetChangePasswordState();
                }
              }}
              className="mt-2 text-red-300 hover:text-red-200 text-sm underline"
            >
              Dismiss
            </button>
          </motion.div>
        )}

        <motion.button
          className={`w-full p-4 rounded-xl font-bold tracking-wide focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all duration-500 transform relative overflow-hidden ${
            changePasswordLoading
              ? 'bg-gradient-to-r from-gray-600 to-gray-700 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white hover:from-yellow-500 hover:via-pink-500 hover:to-purple-500 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30'
          }`}
          onClick={handlePasswordChange}
          disabled={changePasswordLoading}
          whileHover={!changePasswordLoading ? { y: -2 } : {}}
          whileTap={!changePasswordLoading ? { scale: 0.98 } : {}}
        >
          <span className="relative z-10 flex items-center justify-center">
            {changePasswordLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Changing Password...
              </>
            ) : (
              '✨ Confirm Change ✨'
            )}
          </span>
          {!changePasswordLoading && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          )}
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