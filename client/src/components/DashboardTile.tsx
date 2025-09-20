import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface DashboardTileProps {
  title: string;
  icon: React.ReactNode;
  description?: string;
  onClick: () => void;
  variant?: 'default' | 'warning' | 'success' | 'destructive';
  badge?: string;
  disabled?: boolean;
}

export default function DashboardTile({ 
  title, 
  icon, 
  description, 
  onClick, 
  variant = 'default',
  badge,
  disabled = false
}: DashboardTileProps) {
  const variants = {
    default: 'hover-elevate active-elevate-2',
    warning: 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950/20 hover-elevate active-elevate-2',
    success: 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20 hover-elevate active-elevate-2',
    destructive: 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20 hover-elevate active-elevate-2'
  };

  return (
    <Card 
      className={cn(
        'cursor-pointer transition-all duration-200 min-h-[120px] relative',
        variants[variant],
        disabled && 'opacity-50 cursor-not-allowed'
      )}
      onClick={disabled ? undefined : onClick}
      data-testid={`tile-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-3 h-full">
        {badge && (
          <Badge variant="secondary" className="absolute top-2 right-2">
            {badge}
          </Badge>
        )}
        
        <div className="text-primary mb-2">
          {icon}
        </div>
        
        <h3 className="font-semibold text-lg leading-tight">
          {title}
        </h3>
        
        {description && (
          <p className="text-sm text-muted-foreground leading-tight">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}