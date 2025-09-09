import React from "react";

const MyFootprints = () => {
  const footprints = ["City A", "City B", "City C"];

  return (
    <div className="bg-gray-800/50 p-6 rounded-lg shadow-lg mb-6 w-full text-white">
      <h2 className="text-xl font-bold mb-4 text-center">My Footprints</h2>
      <ul className="text-center">
        {footprints.map((city, index) => (
          <li key={index}>{city}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyFootprints;
