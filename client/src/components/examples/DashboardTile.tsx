import DashboardTile from '../DashboardTile';
import { ClipboardList, Thermometer, Calendar, Package } from 'lucide-react';

export default function DashboardTileExample() {
  const handleClick = (title: string) => {
    console.log(`${title} tile clicked`);
    alert(`${title} section opened`);
  };

  return (
    <div className="p-6 grid grid-cols-2 gap-4 max-w-2xl mx-auto">
      <DashboardTile
        title="Tasks"
        icon={<ClipboardList size={32} />}
        description="View and manage daily tasks"
        onClick={() => handleClick('Tasks')}
        badge="3"
      />
      
      <DashboardTile
        title="Coolers/Freezers"
        icon={<Thermometer size={32} />}
        description="Monitor temperature logs"
        onClick={() => handleClick('Temperature')}
        variant="warning"
        badge="Alert"
      />
      
      <DashboardTile
        title="Schedule"
        icon={<Calendar size={32} />}
        description="Current shift schedule"
        onClick={() => handleClick('Schedule')}
      />
      
      <DashboardTile
        title="Inventory"
        icon={<Package size={32} />}
        description="Cigarette stock management"
        onClick={() => handleClick('Inventory')}
        variant="success"
      />
    </div>
  );
}