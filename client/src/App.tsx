import { useState } from 'react';
import { Switch, Route } from "wouter";
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
    location: 'Walk-in Cooler #1',
    currentTemp: 38,
    targetMin: 35,
    targetMax: 40,
    lastChecked: '1:45 PM',
    status: 'normal' as const,
    trend: 'stable' as const,
    nextCheckDue: '4:45 PM'
  },
  {
    id: '2', 
    location: 'Freezer Unit #2',
    currentTemp: 12,
    targetMin: -5,
    targetMax: 5,
    lastChecked: '1:30 PM',
    status: 'critical' as const,
    trend: 'rising' as const,
    nextCheckDue: '2:30 PM'
  },
  {
    id: '3',
    location: 'Beverage Cooler',
    currentTemp: 42,
    targetMin: 35,
    targetMax: 40,
    lastChecked: '1:15 PM',
    status: 'warning' as const,
    trend: 'rising' as const,
    nextCheckDue: '1:00 PM'
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
      prevReadings.map(reading => 
        reading.id === id 
          ? { 
              ...reading, 
              currentTemp: newTemp,
              lastChecked: new Date().toLocaleTimeString(),
              status: newTemp >= reading.targetMin && newTemp <= reading.targetMax 
                ? 'normal' as const
                : newTemp > reading.targetMax + 5 || newTemp < reading.targetMin - 5
                ? 'critical' as const
                : 'warning' as const
            }
          : reading
      )
    );
    console.log('Temperature updated:', { id, newTemp });
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

function Router({ currentUser }: { currentUser: User | null }) {
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
            if (section === 'tasks') window.location.hash = '/tasks';
            else if (section === 'temperature') window.location.hash = '/temperature';
            else console.log(`Navigate to ${section}`);
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
          <Router currentUser={currentUser} />
          
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