import { forwardRef } from 'react';
import { LucideIcon, LucideProps } from 'lucide-react';
import { cn } from '@/utils/cn';

interface IconProps extends Omit<LucideProps, 'ref'> {
  icon: LucideIcon;
}

const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ icon: IconComponent, className, size = 20, ...props }, ref) => {
    return (
      <IconComponent
        ref={ref}
        size={size}
        className={cn('shrink-0', className)}
        {...props}
      />
    );
  }
);

Icon.displayName = 'Icon';

export default Icon;
