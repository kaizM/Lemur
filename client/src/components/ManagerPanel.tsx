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
  UserPlus
} from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  pin: string;
  role: 'employee' | 'manager';
  status: 'active' | 'inactive';
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
  const [employees] = useState<Employee[]>([
    { id: '1', name: 'John Smith', pin: '1234', role: 'employee', status: 'active' },
    { id: '2', name: 'Sarah Johnson', pin: '5678', role: 'employee', status: 'active' },
    { id: '3', name: 'Mike Wilson', pin: '9012', role: 'employee', status: 'inactive' }
  ]);

  const [customTiles, setCustomTiles] = useState<CustomTile[]>([
    { id: '1', title: 'Lottery System', url: 'https://modisoft.example.com', description: 'Daily lottery operations' },
    { id: '2', title: 'LRTRI Inventory', url: 'https://lrtri.example.com', description: 'Cigarette stock system' }
  ]);

  const [newTileUrl, setNewTileUrl] = useState('');
  const [newTileTitle, setNewTileTitle] = useState('');
  const [newTileDescription, setNewTileDescription] = useState('');

  const [newEmployeeName, setNewEmployeeName] = useState('');
  const [newEmployeePin, setNewEmployeePin] = useState('');

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
    if (newEmployeeName && newEmployeePin) {
      const newEmployee: Employee = {
        id: Date.now().toString(),
        name: newEmployeeName,
        pin: newEmployeePin,
        role: 'employee',
        status: 'active'
      };
      console.log('Added employee:', newEmployee);
      setNewEmployeeName('');
      setNewEmployeePin('');
      alert(`Employee ${newEmployeeName} added successfully`);
    }
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
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="employees">Employees</TabsTrigger>
              <TabsTrigger value="tiles">Custom Tiles</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
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
                        <Label htmlFor="employee-name">Full Name</Label>
                        <Input
                          id="employee-name"
                          value={newEmployeeName}
                          onChange={(e) => setNewEmployeeName(e.target.value)}
                          placeholder="Enter employee name"
                          data-testid="input-employee-name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="employee-pin">PIN (4-6 digits)</Label>
                        <Input
                          id="employee-pin"
                          value={newEmployeePin}
                          onChange={(e) => setNewEmployeePin(e.target.value)}
                          placeholder="Enter 4-6 digit PIN"
                          data-testid="input-employee-pin"
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
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div>
                              <h4 className="font-medium">{employee.name}</h4>
                              <p className="text-sm text-muted-foreground">PIN: {employee.pin}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={employee.status === 'active' ? 'default' : 'secondary'}>
                              {employee.status}
                            </Badge>
                            <Badge variant="outline">
                              {employee.role}
                            </Badge>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
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
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}