import React from 'react';
import Button from '../button/Button';

interface DashboardTitleProps {
  title: string;
  subtitle: string;
  buttonText?: string;
  onClick?: () => void;
}

const DashboardTitle: React.FC<DashboardTitleProps> = ({
  title,
  subtitle,
  buttonText = 'Action',
  onClick,
}) => {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-transparent">
      <div>
        <h1 className="text-[19px] font-semibold text-gray-900 uppercase">{title}</h1>
        <p className="text-gray-500 mt-1">{subtitle}</p>
      </div>
      <Button variant="outline" onClick={onClick}>
        {buttonText}
      </Button>
    </div>
  );
};

export default DashboardTitle;
