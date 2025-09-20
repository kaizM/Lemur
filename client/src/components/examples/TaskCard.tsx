import TaskCard from '../TaskCard';

export default function TaskCardExample() {
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
      title: 'Deep Clean Restrooms',
      description: 'Complete restroom cleaning and sanitization',
      status: 'verified' as const,
      completedAt: '11:00 AM',
      verifiedBy: 'John D.',
      notes: 'Excellent work, restrooms spotless'
    }
  ];

  const handleComplete = (taskId: string, notes?: string, photo?: File) => {
    console.log('Task completed:', { taskId, notes, photo: photo?.name });
    alert(`Task ${taskId} completed with notes: ${notes || 'None'}`);
  };

  const handleVerify = (taskId: string, verified: boolean) => {
    console.log('Task verification:', { taskId, verified });
    alert(`Task ${taskId} ${verified ? 'verified' : 'failed verification'}`);
  };

  return (
    <div className="p-6 space-y-4 max-w-2xl mx-auto">
      {mockTasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          currentUserRole="employee"
          onComplete={handleComplete}
          onVerify={handleVerify}
        />
      ))}
    </div>
  );
}