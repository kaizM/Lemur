import { useState } from 'react';
import DashboardTile from './DashboardTile';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ClipboardList, 
  Thermometer, 
  Calendar, 
  Package, 
  ExternalLink, 
  Settings,
  LogOut,
  Plus
} from 'lucide-react';

interface DashboardProps {
  userRole: 'employee' | 'manager';
  userName: string;
  onLogout: () => void;
  onNavigate: (section: string) => void;
}

export default function Dashboard({ userRole, userName, onLogout, onNavigate }: DashboardProps) {
  const [customTiles] = useState([
    // Mock custom tiles that managers can add
    { id: '1', title: 'Lottery System', url: 'https://modisoft.example.com', description: 'Daily lottery operations' },
    { id: '2', title: 'LRTRI Inventory', url: 'https://lrtri.example.com', description: 'Cigarette stock system' }
  ]);

  const handleTileClick = (section: string) => {
    console.log(`Navigating to ${section}`);
    onNavigate(section);
  };

  const handleExternalLink = (url: string, title: string) => {
    console.log(`Opening external link: ${title} - ${url}`);
    // In a real app, this would open the URL
    alert(`Opening ${title}: ${url}`);
  };

  const handleAddCustomTile = () => {
    console.log('Add custom tile clicked');
    alert('Add Custom Tile feature - Manager would paste URL here');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-card-border p-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-xl font-bold px-4 py-2">
              LEMUR
            </Badge>
            <div>
              <h1 className="text-xl font-semibold">Welcome, {userName}</h1>
              <p className="text-sm text-muted-foreground capitalize">
                {userRole} Dashboard
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {userRole === 'manager' && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleTileClick('admin')}
                data-testid="button-admin-panel"
              >
                <Settings className="w-4 h-4 mr-2" />
                Admin
              </Button>
            )}
            <Button
              variant="destructive"
              size="sm"
              onClick={onLogout}
              data-testid="button-logout"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Core System Tiles */}
          <DashboardTile
            title="Tasks"
            icon={<ClipboardList size={40} />}
            description="Daily tasks and verification"
            onClick={() => handleTileClick('tasks')}
            badge="3 pending"
          />
          
          <DashboardTile
            title="Coolers/Freezers"
            icon={<Thermometer size={40} />}
            description="Temperature monitoring"
            onClick={() => handleTileClick('temperature')}
            variant="warning"
            badge="Check due"
          />
          
          <DashboardTile
            title="Schedule"
            icon={<Calendar size={40} />}
            description="Shift schedules and coverage"
            onClick={() => handleTileClick('schedule')}
          />

          {/* External Link Tiles */}
          {customTiles.map((tile) => (
            <DashboardTile
              key={tile.id}
              title={tile.title}
              icon={<ExternalLink size={40} />}
              description={tile.description}
              onClick={() => handleExternalLink(tile.url, tile.title)}
              variant="success"
            />
          ))}

          {/* Manager-only: Add Custom Tile */}
          {userRole === 'manager' && (
            <DashboardTile
              title="Add Custom Link"
              icon={<Plus size={40} />}
              description="Add external system link"
              onClick={handleAddCustomTile}
              variant="default"
            />
          )}
        </div>

        {/* AI Assistant Status */}
        <div className="mt-8 p-4 bg-muted rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">AI Assistant Active</span>
            <span className="text-sm text-muted-foreground">
              Monitoring temperature alerts and task reminders
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}