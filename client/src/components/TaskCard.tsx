import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Camera, 
  FileText,
  User
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  dueTime?: string;
  status: 'pending' | 'completed' | 'verified' | 'failed';
  assignedBy?: string;
  completedAt?: string;
  verifiedBy?: string;
  notes?: string;
  photoUrl?: string;
}

interface TaskCardProps {
  task: Task;
  currentUserRole: 'employee' | 'manager';
  onComplete?: (taskId: string, notes?: string, photo?: File) => void;
  onVerify?: (taskId: string, verified: boolean) => void;
}

export default function TaskCard({ task, currentUserRole, onComplete, onVerify }: TaskCardProps) {
  const [notes, setNotes] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const getStatusIcon = () => {
    switch (task.status) {
      case 'completed':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'verified':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-blue-500" />;
    }
  };

  const getStatusBadge = () => {
    const variants = {
      pending: 'secondary',
      completed: 'secondary',
      verified: 'default',
      failed: 'destructive'
    } as const;

    return (
      <Badge variant={variants[task.status]}>
        {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
      </Badge>
    );
  };

  const handleComplete = () => {
    if (onComplete) {
      onComplete(task.id, notes, photoFile || undefined);
      setNotes('');
      setPhotoFile(null);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      console.log('Photo selected:', file.name);
    }
  };

  const canComplete = task.status === 'pending' && currentUserRole === 'employee';
  const canVerify = task.status === 'completed' && currentUserRole === 'employee';

  return (
    <Card className="hover-elevate transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {getStatusIcon()}
            <div>
              <CardTitle className="text-lg">{task.title}</CardTitle>
              {task.dueTime && (
                <p className="text-sm text-muted-foreground">Due: {task.dueTime}</p>
              )}
            </div>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm">{task.description}</p>

        {task.assignedBy && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="w-4 h-4" />
            Assigned by: {task.assignedBy}
          </div>
        )}

        {/* Task Completion Section */}
        {canComplete && (
          <div className="space-y-3 pt-3 border-t">
            <Textarea
              placeholder="Add notes about task completion (optional)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[80px]"
              data-testid="input-task-notes"
            />
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Add Photo Proof (optional)</label>
              <Input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="cursor-pointer"
                data-testid="input-task-photo"
              />
              {photoFile && (
                <p className="text-sm text-green-600 flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  Photo selected: {photoFile.name}
                </p>
              )}
            </div>

            <Button 
              onClick={handleComplete}
              className="w-full"
              data-testid={`button-complete-task-${task.id}`}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Mark Complete
            </Button>
          </div>
        )}

        {/* Task Verification Section */}
        {canVerify && (
          <div className="space-y-3 pt-3 border-t">
            <p className="text-sm font-medium">Verify this task was completed correctly:</p>
            <div className="flex gap-2">
              <Button
                variant="default"
                onClick={() => onVerify?.(task.id, true)}
                className="flex-1"
                data-testid={`button-verify-pass-${task.id}`}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Verified
              </Button>
              <Button
                variant="destructive"
                onClick={() => onVerify?.(task.id, false)}
                className="flex-1"
                data-testid={`button-verify-fail-${task.id}`}
              >
                <AlertCircle className="w-4 h-4 mr-2" />
                Failed
              </Button>
            </div>
          </div>
        )}

        {/* Task Details */}
        {(task.notes || task.completedAt || task.verifiedBy) && (
          <div className="pt-3 border-t">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
              className="mb-2"
              data-testid={`button-toggle-details-${task.id}`}
            >
              <FileText className="w-4 h-4 mr-2" />
              {showDetails ? 'Hide' : 'Show'} Details
            </Button>

            {showDetails && (
              <div className="space-y-2 text-sm text-muted-foreground">
                {task.completedAt && (
                  <p>Completed: {task.completedAt}</p>
                )}
                {task.verifiedBy && (
                  <p>Verified by: {task.verifiedBy}</p>
                )}
                {task.notes && (
                  <div>
                    <p className="font-medium">Notes:</p>
                    <p className="pl-2 border-l-2 border-muted">{task.notes}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}