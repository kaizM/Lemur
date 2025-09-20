import TemperatureCard from '../TemperatureCard';

export default function TemperatureCardExample() {
  const mockReadings = [
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
  ];

  const handleUpdateTemperature = (id: string, newTemp: number) => {
    console.log('Temperature updated:', { id, newTemp });
    alert(`Temperature for unit ${id} updated to ${newTemp}°F`);
  };

  return (
    <div className="p-6 space-y-4 max-w-2xl mx-auto">
      {mockReadings.map((reading) => (
        <TemperatureCard
          key={reading.id}
          reading={reading}
          onUpdateTemperature={handleUpdateTemperature}
        />
      ))}
    </div>
  );
}