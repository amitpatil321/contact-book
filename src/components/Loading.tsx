import React from "react";

interface LoadingProps {
  size?: "small" | "medium" | "large" | "xlarge" | number;
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({ size = "small", className }) => {
  const sizeMap: Record<string, string> = {
    small: "w-4 h-4",
    medium: "w-6 h-6",
    large: "w-8 h-8",
    xlarge: "w-10 h-10",
  };

  const sizeClass =
    typeof size === "number"
      ? `w-${size} h-${size}`
      : sizeMap[size] || sizeMap["medium"];

  return (
    <div className="flex justify-center">
      <div
        className={`${sizeClass} rounded-full animate-spin border-2 border-purple-500 border-t-transparent ${className}`}
      ></div>
    </div>
  );
};

export default Loading;
