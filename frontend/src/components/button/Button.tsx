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
  height?: string; // New prop for height
}

const Button: React.FC<ButtonProps> = ({
  variant = 'solid',
  children,
  onClick,
  className,
  bgColor,
  textColor,
  borderColor,
  height,
}) => {
  const inlineStyles = {
    backgroundColor: bgColor?.startsWith('#') ? bgColor : undefined,
    color: textColor?.startsWith('#') ? textColor : undefined,
    border: borderColor?.startsWith('#') ? `1px solid ${borderColor}` : undefined,
    height: height || '34px', // Default height if not provided
  };

  return (
    <button
      onClick={onClick}
      style={inlineStyles}
      className={clsx(
        'px-6 rounded-md font-semibold text-sm transition-all duration-200 cursor-pointer active:scale-95',
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
