import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Link2, 
  Calendar, 
  Settings,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  UserPlus,
  ClipboardList
} from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  phone: string;
  pin: string;
  role: 'employee' | 'manager';
  status: 'active' | 'inactive';
  startDate: string;
  notes?: string;
  createdBy: string;
  createdAt: string;
}

interface CustomTile {
  id: string;
  title: string;
  url: string;
  description: string;
}

interface ManagerPanelProps {
  onClose: () => void;
}

export default function ManagerPanel({ onClose }: ManagerPanelProps) {
  const [employees, setEmployees] = useState<Employee[]>([
    { 
      id: '1', 
      name: 'John Smith', 
      phone: '(555) 123-4567',
      pin: '1234', 
      role: 'employee', 
      status: 'active',
      startDate: '2024-01-15',
      notes: 'Morning shift preferred',
      createdBy: 'Manager Sarah',
      createdAt: '2024-01-15 09:00 AM'
    },
    { 
      id: '2', 
      name: 'Sarah Johnson', 
      phone: '(555) 234-5678',
      pin: '5678', 
      role: 'employee', 
      status: 'active',
      startDate: '2024-02-01',
      notes: 'Excellent with customers',
      createdBy: 'Manager Sarah',
      createdAt: '2024-02-01 10:30 AM'
    },
    { 
      id: '3', 
      name: 'Mike Wilson', 
      phone: '(555) 345-6789',
      pin: '9012', 
      role: 'employee', 
      status: 'inactive',
      startDate: '2024-01-08',
      notes: 'Temporarily inactive - school',
      createdBy: 'Manager Sarah',
      createdAt: '2024-01-08 02:15 PM'
    }
  ]);

  const [customTiles, setCustomTiles] = useState<CustomTile[]>([
    { id: '1', title: 'Lottery', url: 'https://modisoft.com', description: 'Modisoft lottery system' },
    { id: '2', title: 'Inventory', url: 'https://luxury-cajeta-636124.netlify.app', description: 'Cigarette inventory tracking' }
  ]);

  const [newTileUrl, setNewTileUrl] = useState('');
  const [newTileTitle, setNewTileTitle] = useState('');
  const [newTileDescription, setNewTileDescription] = useState('');

  const [newEmployeeName, setNewEmployeeName] = useState('');
  const [newEmployeePhone, setNewEmployeePhone] = useState('');
  const [newEmployeePin, setNewEmployeePin] = useState('');
  const [newEmployeeNotes, setNewEmployeeNotes] = useState('');

  const handleAddCustomTile = () => {
    if (newTileUrl && newTileTitle) {
      const newTile: CustomTile = {
        id: Date.now().toString(),
        title: newTileTitle,
        url: newTileUrl,
        description: newTileDescription
      };
      setCustomTiles([...customTiles, newTile]);
      setNewTileUrl('');
      setNewTileTitle('');
      setNewTileDescription('');
      console.log('Added custom tile:', newTile);
    }
  };

  const handleRemoveTile = (tileId: string) => {
    setCustomTiles(customTiles.filter(tile => tile.id !== tileId));
    console.log('Removed tile:', tileId);
  };

  const handleAddEmployee = () => {
    // Validation
    if (!newEmployeeName || !newEmployeePin || !newEmployeePhone) {
      alert('Please fill in all required fields (Name, Phone, PIN)');
      return;
    }

    // Validate PIN length
    if (newEmployeePin.length < 4 || newEmployeePin.length > 6) {
      alert('PIN must be 4-6 digits');
      return;
    }

    // Check if PIN is unique
    const pinExists = employees.some(emp => emp.pin === newEmployeePin);
    if (pinExists || newEmployeePin === '786110') {
      alert('This PIN is already in use. Please choose a different PIN.');
      return;
    }

    // Validate phone format (basic)
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
    if (!phoneRegex.test(newEmployeePhone) && newEmployeePhone.length > 0) {
      // Auto-format phone if it's just digits
      const digitsOnly = newEmployeePhone.replace(/\D/g, '');
      if (digitsOnly.length === 10) {
        const formatted = `(${digitsOnly.slice(0,3)}) ${digitsOnly.slice(3,6)}-${digitsOnly.slice(6)}`;
        setNewEmployeePhone(formatted);
      }
    }

    const newEmployee: Employee = {
      id: Date.now().toString(),
      name: newEmployeeName,
      phone: newEmployeePhone,
      pin: newEmployeePin,
      role: 'employee',
      status: 'active',
      startDate: new Date().toISOString().split('T')[0],
      notes: newEmployeeNotes,
      createdBy: 'Manager Sarah',
      createdAt: new Date().toLocaleString()
    };
    
    setEmployees([...employees, newEmployee]);
    console.log('Added employee:', newEmployee);
    
    // Clear form
    setNewEmployeeName('');
    setNewEmployeePhone('');
    setNewEmployeePin('');
    setNewEmployeeNotes('');
    
    alert(`Employee ${newEmployeeName} added successfully with PIN ${newEmployeePin}`);
  };

  const handleResetPin = (employeeId: string) => {
    const newPin = prompt('Enter new 4-6 digit PIN:');
    if (!newPin) return;

    if (newPin.length < 4 || newPin.length > 6) {
      alert('PIN must be 4-6 digits');
      return;
    }

    // Check if new PIN is unique
    const pinExists = employees.some(emp => emp.pin === newPin && emp.id !== employeeId);
    if (pinExists || newPin === '786110') {
      alert('This PIN is already in use. Please choose a different PIN.');
      return;
    }

    setEmployees(employees.map(emp => 
      emp.id === employeeId 
        ? { ...emp, pin: newPin }
        : emp
    ));
    
    const employee = employees.find(emp => emp.id === employeeId);
    alert(`PIN reset for ${employee?.name}. New PIN: ${newPin}`);
  };

  const handleToggleStatus = (employeeId: string) => {
    setEmployees(employees.map(emp => 
      emp.id === employeeId 
        ? { ...emp, status: emp.status === 'active' ? 'inactive' : 'active' }
        : emp
    ));
  };

  const handleScheduleUpload = () => {
    console.log('Schedule upload clicked');
    alert('Schedule upload feature - Manager would upload Excel/CSV file');
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl flex items-center gap-2">
              <Settings className="w-6 h-6" />
              Manager Admin Panel
            </CardTitle>
            <Button variant="outline" onClick={onClose} data-testid="button-close-admin">
              Close
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="employees" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="employees">Employees</TabsTrigger>
              <TabsTrigger value="tiles">Custom Tiles</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="tasks">Task Management</TabsTrigger>
            </TabsList>

            {/* Employee Management */}
            <TabsContent value="employees" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Employee Management
                </h3>

                {/* Add New Employee */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <UserPlus className="w-4 h-4" />
                      Add New Employee
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="employee-name">Full Name *</Label>
                        <Input
                          id="employee-name"
                          value={newEmployeeName}
                          onChange={(e) => setNewEmployeeName(e.target.value)}
                          placeholder="Enter employee name"
                          data-testid="input-employee-name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="employee-phone">Phone Number *</Label>
                        <Input
                          id="employee-phone"
                          value={newEmployeePhone}
                          onChange={(e) => setNewEmployeePhone(e.target.value)}
                          placeholder="(555) 123-4567"
                          data-testid="input-employee-phone"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="employee-pin">Unique PIN (4-6 digits) *</Label>
                        <Input
                          id="employee-pin"
                          type="number"
                          value={newEmployeePin}
                          onChange={(e) => setNewEmployeePin(e.target.value)}
                          placeholder="Enter 4-6 digit PIN"
                          data-testid="input-employee-pin"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Must be unique. Cannot use 786110 (manager PIN)
                        </p>
                      </div>
                      <div>
                        <Label htmlFor="employee-notes">Notes (Optional)</Label>
                        <Input
                          id="employee-notes"
                          value={newEmployeeNotes}
                          onChange={(e) => setNewEmployeeNotes(e.target.value)}
                          placeholder="Shift preference, notes, etc."
                          data-testid="input-employee-notes"
                        />
                      </div>
                    </div>
                    <Button onClick={handleAddEmployee} data-testid="button-add-employee">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Employee
                    </Button>
                  </CardContent>
                </Card>

                {/* Employee List */}
                <div className="space-y-3">
                  {employees.map((employee) => (
                    <Card key={employee.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium">{employee.name}</h4>
                                <Badge variant={employee.status === 'active' ? 'default' : 'secondary'}>
                                  {employee.status}
                                </Badge>
                              </div>
                              <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                                <div>
                                  <p><strong>Phone:</strong> {employee.phone}</p>
                                  <p><strong>PIN:</strong> {employee.pin}</p>
                                </div>
                                <div>
                                  <p><strong>Start Date:</strong> {employee.startDate}</p>
                                  <p><strong>Added:</strong> {employee.createdAt}</p>
                                </div>
                              </div>
                              {employee.notes && (
                                <p className="text-sm text-muted-foreground mt-2">
                                  <strong>Notes:</strong> {employee.notes}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleResetPin(employee.id)}
                              title="Reset PIN"
                            >
                              Reset PIN
                            </Button>
                            <Button 
                              variant={employee.status === 'active' ? 'secondary' : 'default'}
                              size="sm"
                              onClick={() => handleToggleStatus(employee.id)}
                              title={`${employee.status === 'active' ? 'Deactivate' : 'Activate'} employee`}
                            >
                              {employee.status === 'active' ? 'Deactivate' : 'Activate'}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Custom Tiles Management */}
            <TabsContent value="tiles" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Link2 className="w-5 h-5" />
                  Custom Dashboard Tiles
                </h3>

                {/* Add New Tile */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Add Custom Link Tile</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="tile-title">Tile Title</Label>
                      <Input
                        id="tile-title"
                        value={newTileTitle}
                        onChange={(e) => setNewTileTitle(e.target.value)}
                        placeholder="e.g., Lottery System"
                        data-testid="input-tile-title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="tile-url">URL</Label>
                      <Input
                        id="tile-url"
                        value={newTileUrl}
                        onChange={(e) => setNewTileUrl(e.target.value)}
                        placeholder="https://example.com"
                        data-testid="input-tile-url"
                      />
                    </div>
                    <div>
                      <Label htmlFor="tile-description">Description (optional)</Label>
                      <Textarea
                        id="tile-description"
                        value={newTileDescription}
                        onChange={(e) => setNewTileDescription(e.target.value)}
                        placeholder="Brief description of what this link does"
                        data-testid="input-tile-description"
                      />
                    </div>
                    <Button onClick={handleAddCustomTile} data-testid="button-add-tile">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Tile
                    </Button>
                  </CardContent>
                </Card>

                {/* Existing Tiles */}
                <div className="space-y-3">
                  {customTiles.map((tile) => (
                    <Card key={tile.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <ExternalLink className="w-5 h-5 text-muted-foreground" />
                            <div>
                              <h4 className="font-medium">{tile.title}</h4>
                              <p className="text-sm text-muted-foreground">{tile.url}</p>
                              {tile.description && (
                                <p className="text-sm text-muted-foreground mt-1">{tile.description}</p>
                              )}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveTile(tile.id)}
                            data-testid={`button-remove-tile-${tile.id}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Schedule Management */}
            <TabsContent value="schedule" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Schedule Management
                </h3>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Upload Schedule</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Upload a CSV or Excel file with employee schedules. The system will automatically 
                      cross-reference shifts with task assignments and verification requirements.
                    </p>
                    <div className="space-y-3">
                      <Input
                        type="file"
                        accept=".csv,.xlsx,.xls"
                        className="cursor-pointer"
                        data-testid="input-schedule-file"
                      />
                      <Button onClick={handleScheduleUpload} data-testid="button-upload-schedule">
                        <Calendar className="w-4 h-4 mr-2" />
                        Upload Schedule
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Current Schedule Preview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Current Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center text-muted-foreground py-8">
                      <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No schedule uploaded yet</p>
                      <p className="text-sm">Upload a schedule file to see shift assignments</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Task Management */}
            <TabsContent value="tasks" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <ClipboardList className="w-5 h-5" />
                  Task Management & Oversight
                </h3>

                {/* Task Assignment */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Create New Task</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="task-title">Task Title</Label>
                      <Input
                        id="task-title"
                        placeholder="e.g., Clean Coffee Station"
                        data-testid="input-task-title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="task-description">Description</Label>
                      <Textarea
                        id="task-description"
                        placeholder="Detailed instructions for completing this task"
                        data-testid="input-task-description"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="task-assignee">Assign To</Label>
                        <select className="w-full px-3 py-2 border border-input bg-background rounded-md">
                          <option>Select employee...</option>
                          <option>Next shift</option>
                          <option>All employees</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="task-priority">Priority</Label>
                        <select className="w-full px-3 py-2 border border-input bg-background rounded-md">
                          <option>Normal</option>
                          <option>High</option>
                          <option>Critical</option>
                        </select>
                      </div>
                    </div>
                    <Button data-testid="button-create-task">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Task
                    </Button>
                  </CardContent>
                </Card>

                {/* Task Status Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Task Status Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-4 bg-orange-500/10 rounded-lg">
                        <div className="text-2xl font-bold text-orange-500">3</div>
                        <div className="text-sm text-muted-foreground">Pending Tasks</div>
                      </div>
                      <div className="text-center p-4 bg-blue-500/10 rounded-lg">
                        <div className="text-2xl font-bold text-blue-500">2</div>
                        <div className="text-sm text-muted-foreground">In Progress</div>
                      </div>
                      <div className="text-center p-4 bg-red-500/10 rounded-lg">
                        <div className="text-2xl font-bold text-red-500">1</div>
                        <div className="text-sm text-muted-foreground">Failed Verification</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Alerts & Notifications */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Recent Alerts</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-red-500/10 rounded-lg">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">Freezer Unit #2 Temperature Critical</div>
                        <div className="text-xs text-muted-foreground">12°F - Move stock to backup storage</div>
                      </div>
                      <div className="text-xs text-muted-foreground">2:30 PM</div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-orange-500/10 rounded-lg">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">Task Verification Failed</div>
                        <div className="text-xs text-muted-foreground">Restroom cleaning - requires attention</div>
                      </div>
                      <div className="text-xs text-muted-foreground">1:45 PM</div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-yellow-500/10 rounded-lg">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">Beverage Cooler Warning</div>
                        <div className="text-xs text-muted-foreground">42°F - Temperature rising</div>
                      </div>
                      <div className="text-xs text-muted-foreground">1:15 PM</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}