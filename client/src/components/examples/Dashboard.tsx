import Dashboard from '../Dashboard';

export default function DashboardExample() {
  const handleLogout = () => {
    console.log('Logout clicked');
    alert('Logging out...');
  };

  const handleNavigate = (section: string) => {
    console.log(`Navigate to ${section}`);
    alert(`Navigating to ${section} section`);
  };

  return (
    <Dashboard
      userRole="employee"
      userName="John Smith"
      onLogout={handleLogout}
      onNavigate={handleNavigate}
    />
  );
}