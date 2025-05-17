import React from "react";

const Spinner = ({ size = 5, border = "border-4", color = "border-blue-500", text }) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`loader mr-3 border-t-transparent rounded-full animate-spin
        w-${size} h-${size} ${border} ${color}`}
      ></div>
      {text ? text : null}
    </div>
  );
};

export default Spinner;
