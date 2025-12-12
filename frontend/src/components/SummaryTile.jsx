import React from "react";

const SummaryTile = ({ label, value }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border-2 border-gray-200">
      <h2 className="text-gray-600 text-sm">{label}</h2>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default SummaryTile;
