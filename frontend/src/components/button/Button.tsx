// components/Button.tsx
import React from 'react';
import clsx from 'clsx';

interface ButtonProps {
  variant?: 'solid' | 'outline';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  bgColor?: string; // New prop for background color
  textColor?: string; // New prop for text color
  borderColor?: string; // New prop for border color
}

const Button: React.FC<ButtonProps> = ({
  variant = 'solid',
  children,
  onClick,
  className,
  bgColor,
  textColor,
  borderColor,
}) => {
  const inlineStyles = {
    backgroundColor: bgColor?.startsWith('#') ? bgColor : undefined,
    color: textColor?.startsWith('#') ? textColor : undefined,
    border: borderColor?.startsWith('#') ? `1px solid ${borderColor}` : undefined, // Explicitly set border
  };

  return (
    <button
      onClick={onClick}
      style={inlineStyles}
      className={clsx(
        'px-6 py-2 rounded-md font-semibold text-sm transition-all duration-200 cursor-pointer h-[54px] active:scale-95',
        {
          'bg-pharos-blue text-white hover:bg-blue-700': variant === 'solid' && !bgColor && !textColor,
          'border border-pharos-blue text-pharos-blue hover:bg-blue-50': variant === 'outline' && !borderColor && !textColor,
        },
        bgColor && !bgColor.startsWith('#') && `bg-${bgColor}`,
        textColor && !textColor.startsWith('#') && `text-${textColor}`,
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
