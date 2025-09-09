import React, { useState } from "react";

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
    <div className="bg-gray-800/50 p-6 rounded-lg shadow-lg mb-6 w-full text-white">
      <h2 className="text-xl font-bold mb-4 text-center">Change Password</h2>
      <input
        className="border p-2 mb-4 w-full rounded bg-gray-700 text-white placeholder-gray-400"
        type="password"
        placeholder="Old Password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
      />
      <input
        className="border p-2 mb-4 w-full rounded bg-gray-700 text-white placeholder-gray-400"
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button
        className="bg-red-600 text-white px-4 py-2 rounded w-full hover:bg-red-700"
        onClick={handlePasswordChange}
      >
        Confirm Change
      </button>
    </div>
  );
};

export default ChangePassword;
