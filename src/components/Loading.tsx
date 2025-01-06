import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex justify-center">
      <div className="w-8 h-8 rounded-full animate-spin border-2 border-purple-500 border-t-transparent"></div>
    </div>
  );
};

export default Loading;
