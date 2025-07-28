import { HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const cardVariants = cva(
  'rounded-2xl p-6 transition-all duration-300 backdrop-blur-sm',
  {
    variants: {
      variant: {
        default: 'bg-white/90 border border-primary-100/50 shadow-sm hover:shadow-md hover:border-primary-200/60',
        elevated: 'glass border-primary-100/50 shadow-lg hover:shadow-xl card-hover',
        outlined: 'bg-white/80 border-2 border-primary-200 shadow-sm hover:border-primary-300 hover:shadow-md',
        ghost: 'bg-transparent border-0 shadow-none p-0',
        gradient: 'bg-gradient-to-br from-white via-primary-50/30 to-accent-50/20 border border-primary-100/50 shadow-md hover:shadow-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface CardProps 
  extends HTMLAttributes<HTMLDivElement>, 
         VariantProps<typeof cardVariants> {}

export default function Card({ 
  className, 
  variant, 
  children, 
  ...props 
}: CardProps) {
  return (
    <div
      className={cn(cardVariants({ variant, className }))}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex flex-col space-y-2 pb-4', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn('text-lg font-semibold leading-none tracking-tight text-secondary-900 group-hover:text-primary-700 transition-colors duration-300', className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({ className, children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('text-sm text-secondary-600 leading-relaxed', className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function CardContent({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex items-center pt-4', className)}
      {...props}
    >
      {children}
    </div>
  );
}
