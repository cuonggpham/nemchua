import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-2xl font-medium transition-all duration-300 focus-ring disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group',
  {
    variants: {
      variant: {
        primary: 'btn-primary text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 border-0',
        secondary: 'bg-secondary-100 text-secondary-900 hover:bg-secondary-200 active:bg-secondary-300 border border-secondary-200 hover:border-secondary-300',
        outline: 'border-2 border-primary-300 bg-white/80 text-primary-700 hover:bg-primary-50 hover:border-primary-400 active:bg-primary-100 backdrop-blur-sm',
        ghost: 'text-secondary-700 hover:bg-primary-50/80 hover:text-primary-700 active:bg-primary-100/80 backdrop-blur-sm',
        danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 active:from-red-700 active:to-red-800 shadow-lg shadow-red-500/25 hover:shadow-red-500/40',
        success: 'bg-gradient-to-r from-primary-500 to-accent-500 text-white hover:from-primary-600 hover:to-accent-600 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40',
      },
      size: {
        sm: 'h-9 px-4 text-sm gap-1.5',
        md: 'h-11 px-6 text-sm gap-2',
        lg: 'h-13 px-8 text-base gap-2.5',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

interface ButtonProps 
  extends ButtonHTMLAttributes<HTMLButtonElement>, 
         VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading = false, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <div className="loading-spinner mr-2"></div>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
