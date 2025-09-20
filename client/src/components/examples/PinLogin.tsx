import PinLogin from '../PinLogin';

export default function PinLoginExample() {
  const handleLogin = (pin: string, role: 'employee' | 'manager') => {
    console.log('Login triggered:', { pin, role });
    alert(`Logged in as ${role} with PIN: ${pin}`);
  };

  return <PinLogin onLogin={handleLogin} />;
}