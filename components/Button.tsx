import { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'ghost' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export default function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center text-sm font-medium px-4 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal';
  const variants: Record<Variant, string> = {
    primary: 'bg-royal text-paper hover:bg-royal-hover',
    ghost: 'border border-hairline-strong text-ink hover:bg-royal-faint',
    danger: 'border border-warning text-warning hover:bg-warning/10',
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
