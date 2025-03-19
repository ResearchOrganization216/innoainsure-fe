import React from "react";

interface CustomButtonProps {
  label: string;
  icon?: string;
  onClick: () => void;
  className?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  icon,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={`p-button p-button-sm bg-gradient-to-r from-blue-700 to-indigo-700 border-none hover:from-indigo-800 hover:to-blue-700 text-white text-sm rounded-md shadow-md transition-all duration-300 ${className}`}>
      {icon && <i className={`pi ${icon} mr-2`} />}
      {label}
    </button>
  );
};

export default CustomButton;
