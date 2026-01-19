import { cn } from '@utils';
import React from 'react';

export type MyButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger';
};

const variantClasses = {
  primary: 'bg-blue-500 text-white hover:bg-blue-600',
  secondary: 'bg-gray-500 text-white hover:bg-gray-600',
  danger: 'bg-red-500 text-white hover:bg-red-600',
};
const MyButton = ({ variant = 'primary', className, ...props }: MyButtonProps) => {
  return (
    <button className={cn(variantClasses[variant], 'rounded-xl p-4', className)} {...props}>
      {props.children}
    </button>
  );
};

export default MyButton;
