// components/Button.tsx
import React from 'react';
import clsx from 'clsx';

interface ButtonProps {
  variant?: 'solid' | 'outline';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'solid',
  children,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'px-6 py-2 rounded-md font-semibold text-sm transition-all duration-200 cursor-pointer h-[54px] active:scale-95',
        {
          'bg-pharos-blue text-white hover:bg-blue-700': variant === 'solid',
          'border border-pharos-blue text-pharos-blue hover:bg-blue-50': variant === 'outline',
        },
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
