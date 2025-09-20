import { useState } from 'react';
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Import main components
import PinLogin from './components/PinLogin';
import Dashboard from './components/Dashboard';
import ManagerPanel from './components/ManagerPanel';
import ThemeToggle from './components/ThemeToggle';
import TaskCard from './components/TaskCard';
import TemperatureCard from './components/TemperatureCard';

// Mock data for demonstration
const mockTasks = [
  {
    id: '1',
    title: 'Clean Coffee Station',
    description: 'Wipe down coffee machines, refill supplies, and check cleanliness',
    dueTime: '2:00 PM',
    status: 'pending' as const,
    assignedBy: 'Manager Sarah'
  },
  {
    id: '2',
    title: 'Check Inventory Levels',
    description: 'Count cigarette stock and update system',
    status: 'completed' as const,
    completedAt: '1:30 PM',
    notes: 'All counts verified, restocked Marlboro'
  },
  {
    id: '3',
    title: 'Verify Restroom Cleaning',
    description: 'Check that previous shift completed restroom cleaning properly',
    status: 'completed' as const,
    completedAt: '11:00 AM'
  }
] as any[];

const mockTemperatureReadings = [
  {
    id: '1',
    location: 'Freezer-1',
    currentTemp: 2,
    targetMin: -5,
    targetMax: 5,
    lastChecked: '2:45 PM',
    status: 'normal' as const,
    trend: 'stable' as const,
    nextCheckDue: '5:45 PM',
    checkInterval: 'standard', // standard = 3 hours, escalated = 20 minutes
    consecutiveHighReadings: 0
  },
  {
    id: '2',
    location: 'Cooler-Front',
    currentTemp: 37,
    targetMin: 35,
    targetMax: 40,
    lastChecked: '2:30 PM',
    status: 'normal' as const,
    trend: 'stable' as const,
    nextCheckDue: '5:30 PM',
    checkInterval: 'standard',
    consecutiveHighReadings: 0
  },
  {
    id: '3',
    location: 'Ice-Cream-Box',
    currentTemp: -8,
    targetMin: -15,
    targetMax: -5,
    lastChecked: '2:15 PM',
    status: 'normal' as const,
    trend: 'stable' as const,
    nextCheckDue: '5:15 PM',
    checkInterval: 'standard',
    consecutiveHighReadings: 0
  }
] as any[];

interface User {
  pin: string;
  role: 'employee' | 'manager';
  name: string;
}

function TasksPage({ currentUser }: { currentUser: User }) {
  const [tasks, setTasks] = useState(mockTasks);

  const handleCompleteTask = (taskId: string, notes?: string, photo?: File) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { 
              ...task, 
              status: 'completed' as const, 
              completedAt: new Date().toLocaleTimeString(),
              notes 
            }
          : task
      )
    );
    console.log('Task completed:', { taskId, notes, photo: photo?.name });
  };

  const handleVerifyTask = (taskId: string, verified: boolean) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { 
              ...task, 
              status: verified ? 'verified' as const : 'failed' as const,
              verifiedBy: currentUser.name
            }
          : task
      )
    );
    console.log('Task verification:', { taskId, verified });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-card-border p-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold">Task Management</h1>
          <ThemeToggle />
        </div>
      </header>
      <main className="max-w-4xl mx-auto p-6">
        <div className="space-y-4">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              currentUserRole={currentUser.role}
              onComplete={handleCompleteTask}
              onVerify={handleVerifyTask}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

function TemperaturePage() {
  const [readings, setReadings] = useState(mockTemperatureReadings);

  const handleUpdateTemperature = (id: string, newTemp: number) => {
    setReadings(prevReadings => 
      prevReadings.map(reading => {
        if (reading.id !== id) return reading;

        // AI Temperature Guardian Logic
        let newStatus: 'normal' | 'warning' | 'critical';
        let newInterval = 'standard';
        let consecutiveCount = reading.consecutiveHighReadings || 0;
        
        // Determine status based on unit-specific target ranges
        const tempMargin = 3; // Degrees of acceptable variance from target range
        const criticalMargin = 8; // Degrees that trigger critical status
        
        if (newTemp >= reading.targetMin && newTemp <= reading.targetMax) {
          // Within target range - normal status
          newStatus = 'normal';
          consecutiveCount = 0;
        } else if ((newTemp < reading.targetMin && (reading.targetMin - newTemp) <= tempMargin) ||
                   (newTemp > reading.targetMax && (newTemp - reading.targetMax) <= tempMargin)) {
          // Slightly outside target range - warning status
          newStatus = 'warning';
          consecutiveCount = 0;
        } else if ((newTemp < reading.targetMin && (reading.targetMin - newTemp) > criticalMargin) ||
                   (newTemp > reading.targetMax && (newTemp - reading.targetMax) > criticalMargin)) {
          // Far outside target range - critical status
          newStatus = 'critical';
          newInterval = 'escalated'; // 20 minutes instead of 3 hours
          consecutiveCount = (reading.currentTemp < reading.targetMin || reading.currentTemp > reading.targetMax) 
            ? consecutiveCount + 1 : 1;
        } else {
          // Moderately outside target range - critical status
          newStatus = 'critical';
          consecutiveCount = 0;
        }
        
        // Special rule: Any temperature ≥50°F gets critical status and escalated checks
        // regardless of unit type (universal safety threshold)
        if (newTemp >= 50) {
          newStatus = 'critical';
          newInterval = 'escalated';
          consecutiveCount = (reading.currentTemp >= 50) ? consecutiveCount + 1 : 1;
        }

        // Calculate next check due time
        const now = new Date();
        const minutesToAdd = newInterval === 'escalated' ? 20 : 180; // 20 min vs 3 hours
        const nextCheck = new Date(now.getTime() + minutesToAdd * 60000);
        
        // AI Messages for critical situations
        if (newTemp >= 50 && consecutiveCount >= 2) {
          // Two consecutive critical readings - trigger move stock alert
          alert(`🚨 CRITICAL ALERT: ${reading.location} has had two consecutive readings ≥50°F. MOVE STOCK TO BACKUP STORAGE NOW!`);
          console.log(`CRITICAL ALERT: ${reading.location} - Move stock to backup storage`);
        } else if (newTemp >= 50) {
          // First critical reading - shortened interval
          alert(`⚠️ ${reading.location} at ${newTemp}°F. Next check due in 20 minutes.`);
          console.log(`Temperature escalation: ${reading.location} - check interval shortened to 20 minutes`);
        }

        return {
          ...reading,
          currentTemp: newTemp,
          lastChecked: new Date().toLocaleTimeString(),
          status: newStatus,
          checkInterval: newInterval,
          consecutiveHighReadings: consecutiveCount,
          nextCheckDue: nextCheck.toLocaleTimeString(),
          // Determine trend based on temperature change
          trend: newTemp > reading.currentTemp ? 'rising' as const : 
                 newTemp < reading.currentTemp ? 'falling' as const : 'stable' as const
        };
      })
    );
    console.log('Temperature updated with AI logic:', { id, newTemp });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-card-border p-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold">Temperature Monitoring</h1>
          <ThemeToggle />
        </div>
      </header>
      <main className="max-w-4xl mx-auto p-6">
        <div className="space-y-4">
          {readings.map((reading) => (
            <TemperatureCard
              key={reading.id}
              reading={reading}
              onUpdateTemperature={handleUpdateTemperature}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

function Router({ currentUser, onShowManagerPanel }: { currentUser: User | null; onShowManagerPanel: () => void; }) {
  const [, setLocation] = useLocation();

  if (!currentUser) {
    return null; // This should not happen in normal flow
  }

  return (
    <Switch>
      <Route path="/tasks">
        <TasksPage currentUser={currentUser} />
      </Route>
      <Route path="/temperature">
        <TemperaturePage />
      </Route>
      <Route path="/">
        <Dashboard
          userRole={currentUser.role}
          userName={currentUser.name}
          onLogout={() => window.location.reload()}
          onNavigate={(section) => {
            if (section === 'tasks') setLocation('/tasks');
            else if (section === 'temperature') setLocation('/temperature');
            else if (section === 'admin' && currentUser.role === 'manager') {
              onShowManagerPanel();
            } else console.log(`Navigate to ${section}`);
          }}
        />
      </Route>
    </Switch>
  );
}

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showManagerPanel, setShowManagerPanel] = useState(false);

  const handleLogin = (pin: string, role: 'employee' | 'manager') => {
    // Mock user data based on PIN
    const userData = {
      pin,
      role,
      name: role === 'manager' ? 'Manager Sarah' : pin === '1234' ? 'John Smith' : 'Employee User'
    };
    setCurrentUser(userData);
    console.log('User logged in:', userData);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setShowManagerPanel(false);
    console.log('User logged out');
  };

  // Show login screen if no user is logged in
  if (!currentUser) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <div className="dark"> {/* Default to dark mode as per design guidelines */}
            <PinLogin onLogin={handleLogin} />
          </div>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="dark"> {/* Default to dark mode as per design guidelines */}
          <Router currentUser={currentUser} onShowManagerPanel={() => setShowManagerPanel(true)} />
          
          {/* Manager Panel Overlay */}
          {showManagerPanel && (
            <ManagerPanel onClose={() => setShowManagerPanel(false)} />
          )}
          
          {/* Theme Toggle in fixed position */}
          <div className="fixed top-4 right-4 z-40">
            <ThemeToggle />
          </div>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;