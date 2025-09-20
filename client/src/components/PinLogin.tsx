import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PinLoginProps {
  onLogin: (pin: string, role: 'employee' | 'manager') => void;
}

export default function PinLogin({ onLogin }: PinLoginProps) {
  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleNumberClick = (num: string) => {
    if (pin.length < 6) {
      setPin(prev => prev + num);
    }
  };

  const handleClear = () => {
    setPin('');
  };

  const handleLogin = async () => {
    if (pin.length >= 4) {
      setIsLoading(true);
      // Simulate login process
      setTimeout(() => {
        // Mock authentication - in real app this would be API call
        const role = pin === '0000' ? 'manager' : 'employee';
        onLogin(pin, role);
        setIsLoading(false);
      }, 500);
    }
  };

  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <Badge variant="outline" className="text-2xl font-bold px-6 py-2">
              LEMUR
            </Badge>
          </div>
          <CardTitle className="text-2xl">Employee Login</CardTitle>
          <p className="text-muted-foreground">Enter your PIN to access the system</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* PIN Display */}
          <div className="text-center">
            <div className="bg-muted rounded-lg p-4 mb-4">
              <div className="text-3xl font-mono tracking-wider">
                {pin.replace(/./g, '●').padEnd(6, '○')}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {pin.length}/6 digits
            </p>
          </div>

          {/* Number Pad */}
          <div className="grid grid-cols-3 gap-3">
            {numbers.slice(0, 9).map((num) => (
              <Button
                key={num}
                variant="outline"
                size="lg"
                className="h-16 text-xl font-semibold"
                onClick={() => handleNumberClick(num)}
                data-testid={`button-pin-${num}`}
              >
                {num}
              </Button>
            ))}
            <Button
              variant="destructive"
              size="lg"
              className="h-16 text-lg"
              onClick={handleClear}
              data-testid="button-pin-clear"
            >
              Clear
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-16 text-xl font-semibold"
              onClick={() => handleNumberClick('0')}
              data-testid="button-pin-0"
            >
              0
            </Button>
            <Button
              size="lg"
              className="h-16 text-lg"
              onClick={handleLogin}
              disabled={pin.length < 4 || isLoading}
              data-testid="button-pin-login"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>Manager PIN: 0000 | Employee PIN: Any 4+ digits</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}