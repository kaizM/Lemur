import ManagerPanel from '../ManagerPanel';

export default function ManagerPanelExample() {
  const handleClose = () => {
    console.log('Manager panel closed');
    alert('Manager panel closed');
  };

  return <ManagerPanel onClose={handleClose} />;
}