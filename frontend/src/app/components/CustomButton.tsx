import React from 'react';

interface CustomButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit' | 'reset';
}

const baseClasses = 'font-semibold py-2 rounded-2xl transition text-white w-full';

const variants = {
  primary: 'bg-blue-400 hover:bg-blue-500',
  secondary: 'bg-gray-400 hover:bg-gray-500',
};

export default function CustomButton({
  children,
  onClick,
  variant = 'primary',
  type = 'button',
}: CustomButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]}`}
    >
      {children}
    </button>
  );
}