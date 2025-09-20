import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Thermometer, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

interface TemperatureReading {
  id: string;
  location: string;
  currentTemp: number;
  targetMin: number;
  targetMax: number;
  lastChecked: string;
  status: 'normal' | 'warning' | 'critical';
  trend: 'stable' | 'rising' | 'falling';
  nextCheckDue: string;
}

interface TemperatureCardProps {
  reading: TemperatureReading;
  onUpdateTemperature: (id: string, newTemp: number) => void;
}

export default function TemperatureCard({ reading, onUpdateTemperature }: TemperatureCardProps) {
  const [newTemp, setNewTemp] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const getStatusColor = () => {
    switch (reading.status) {
      case 'normal':
        return 'text-green-500';
      case 'warning':
        return 'text-yellow-500';
      case 'critical':
        return 'text-red-500';
      default:
        return 'text-blue-500';
    }
  };

  const getStatusIcon = () => {
    switch (reading.status) {
      case 'normal':
        return <CheckCircle className={`w-5 h-5 ${getStatusColor()}`} />;
      case 'warning':
      case 'critical':
        return <AlertTriangle className={`w-5 h-5 ${getStatusColor()}`} />;
      default:
        return <Thermometer className={`w-5 h-5 ${getStatusColor()}`} />;
    }
  };

  const getStatusBadge = () => {
    const variants = {
      normal: 'default',
      warning: 'secondary', 
      critical: 'destructive'
    } as const;

    return (
      <Badge variant={variants[reading.status]}>
        {reading.status.charAt(0).toUpperCase() + reading.status.slice(1)}
      </Badge>
    );
  };

  const getTrendIcon = () => {
    switch (reading.trend) {
      case 'rising':
        return <TrendingUp className="w-4 h-4 text-red-500" />;
      case 'falling':
        return <TrendingDown className="w-4 h-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const handleUpdateTemp = async () => {
    const temp = parseFloat(newTemp);
    if (isNaN(temp)) {
      alert('Please enter a valid temperature');
      return;
    }

    setIsUpdating(true);
    // Simulate API call
    setTimeout(() => {
      onUpdateTemperature(reading.id, temp);
      setNewTemp('');
      setIsUpdating(false);
    }, 500);
  };

  const isOverdue = new Date(reading.nextCheckDue) < new Date();

  return (
    <Card className={`hover-elevate transition-all duration-200 ${
      reading.status === 'critical' ? 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20' :
      reading.status === 'warning' ? 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950/20' :
      'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20'
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {getStatusIcon()}
            <div>
              <CardTitle className="text-lg">{reading.location}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Target: {reading.targetMin}°F - {reading.targetMax}°F
              </p>
            </div>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Current Temperature Display */}
        <div className="text-center p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Thermometer className={`w-6 h-6 ${getStatusColor()}`} />
            <span className={`text-3xl font-bold ${getStatusColor()}`}>
              {reading.currentTemp}°F
            </span>
            {getTrendIcon()}
          </div>
          <p className="text-sm text-muted-foreground">
            Last checked: {reading.lastChecked}
          </p>
        </div>

        {/* Next Check Due */}
        <div className={`flex items-center gap-2 p-3 rounded-lg ${
          isOverdue ? 'bg-red-100 dark:bg-red-950/20' : 'bg-blue-100 dark:bg-blue-950/20'
        }`}>
          <Clock className={`w-4 h-4 ${isOverdue ? 'text-red-600' : 'text-blue-600'}`} />
          <span className={`text-sm font-medium ${isOverdue ? 'text-red-600' : 'text-blue-600'}`}>
            Next check: {reading.nextCheckDue} {isOverdue && '(OVERDUE)'}
          </span>
        </div>

        {/* Temperature Update Section */}
        <div className="space-y-3 pt-3 border-t">
          <label className="text-sm font-medium">Record New Temperature</label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Temperature °F"
              value={newTemp}
              onChange={(e) => setNewTemp(e.target.value)}
              className="flex-1"
              data-testid={`input-temp-${reading.id}`}
            />
            <Button
              onClick={handleUpdateTemp}
              disabled={!newTemp || isUpdating}
              data-testid={`button-update-temp-${reading.id}`}
            >
              {isUpdating ? 'Updating...' : 'Update'}
            </Button>
          </div>
        </div>

        {/* AI Alert Messages */}
        {reading.status !== 'normal' && (
          <div className={`p-3 rounded-lg border-l-4 ${
            reading.status === 'critical' 
              ? 'bg-red-50 border-red-500 dark:bg-red-950/20' 
              : 'bg-yellow-50 border-yellow-500 dark:bg-yellow-950/20'
          }`}>
            <p className={`text-sm font-medium ${
              reading.status === 'critical' ? 'text-red-700 dark:text-red-300' : 'text-yellow-700 dark:text-yellow-300'
            }`}>
              {reading.status === 'critical' 
                ? '🚨 CRITICAL: Temperature outside safe range! Check equipment immediately.'
                : '⚠️ WARNING: Temperature trending outside normal range. Monitor closely.'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}