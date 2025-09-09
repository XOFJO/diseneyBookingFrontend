import React from "react";

const MyAchievements = () => {
  const achievements = ["Theme Room 1", "Theme Room 2"];

  return (
    <div className="bg-gray-800/50 p-6 rounded-lg shadow-lg w-full text-white">
      <h2 className="text-xl font-bold mb-4 text-center">My Achievements</h2>
      <ul className="text-center">
        {achievements.map((theme, index) => (
          <li key={index}>{theme}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyAchievements;
