import React from "react";

function LoadingModel() {
  return (
    <div className="fixed inset-0 z-10 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg">
        <h1>Loading...</h1>
      </div>
    </div>
  );
}

export default LoadingModel;
