import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { AlertCircle, CheckCircle, Clock, MessageSquare, XCircle, Camera } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function Complaints() {
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const complaints = [
    {
      id: '#C1245',
      title: 'Elevator Not Working',
      category: 'Maintenance & Infrastructure Issues',
      date: '2025-11-15',
      status: 'in-progress',
      priority: 'high',
      description: 'Elevator in Block A is stuck on 3rd floor since morning.',
      response: 'Technician has been called. Expected resolution by evening.',
    },
    {
      id: '#C1244',
      title: 'Illegal Parking',
      category: 'Parking & Traffic Problems',
      date: '2025-11-14',
      status: 'open',
      priority: 'medium',
      description: 'Unknown vehicle parked in my reserved spot (#A-24).',
      response: null,
    },
    {
      id: '#C1240',
      title: 'Water Leakage in Bathroom',
      category: 'Maintenance & Infrastructure Issues',
      date: '2025-11-10',
      status: 'resolved',
      priority: 'high',
      description: 'Water leaking from ceiling in bathroom.',
      response: 'Plumber fixed the issue. Leak has been stopped.',
    },
    {
      id: '#C1235',
      title: 'Noise Disturbance',
      category: 'Community Behavior Complaints',
      date: '2025-11-08',
      status: 'cancelled',
      priority: 'low',
      description: 'Loud music from neighboring apartment after 11 PM.',
      response: 'Complaint withdrawn by resident.',
    },
  ];

  const categories = [
    'Maintenance & Infrastructure Issues',
    'Utility & Billing Issues',
    'Security & Safety Concerns',
    'Cleanliness & Sanitation Problems',
    'Community Behavior Complaints',
    'Administration & Staff Issues',
    'Service Provider / Marketplace Complaints',
    'Parking & Traffic Problems',
    'Environmental Issues',
    'Amenities & Facility Issues',
    'Other',
  ];

  const handleSubmit = () => {
    if (!category || !title || !description) {
      toast.error('Please fill in all fields');
      return;
    }
    toast.success('Complaint submitted successfully!');
    setCategory('');
    setTitle('');
    setDescription('');
    setSelectedImage(null);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle className="w-4 h-4" />;
      case 'in-progress':
        return <Clock className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStatusVariant = (status: string): "default" | "destructive" | "outline" | "secondary" | null | undefined => {
    switch (status) {
      case 'resolved':
        return 'default';
      case 'in-progress':
        return 'secondary';
      case 'cancelled':
        return 'outline';
      default:
        return 'destructive';
    }
  };

  const getPriorityVariant = (priority: string): "default" | "destructive" | "outline" | "secondary" | null | undefined => {
    switch (priority) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'default';
      default:
        return 'outline';
    }
  };

  const stats = [
    { label: 'Open', count: 1, color: 'text-red-600' },
    { label: 'In Progress', count: 1, color: 'text-orange-600' },
    { label: 'Resolved', count: 1, color: 'text-green-600' },
    { label: 'Cancelled', count: 1, color: 'text-slate-600' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-slate-900 dark:text-white">Help Desk</h2>
          <p className="text-slate-600 dark:text-slate-300">Submit and track your complaints</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700">
              <MessageSquare className="w-4 h-4 mr-2" />
              New Complaint
            </Button>
          </DialogTrigger>
          <DialogContent className="dark:bg-slate-900 dark:border-slate-700 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="dark:text-white">Submit a Complaint</DialogTitle>
              <DialogDescription className="dark:text-slate-400">Describe your issue and we'll address it as soon as possible</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label className="dark:text-slate-200">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="dark:bg-slate-800 dark:border-slate-700 dark:text-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat} className="dark:text-white dark:focus:bg-slate-700">
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="dark:text-slate-200">Title</Label>
                <Input 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder="Brief description" 
                  className="dark:bg-slate-800 dark:border-slate-700 dark:text-white text-slate-900"
                />
              </div>
              <div className="space-y-2">
                <Label className="dark:text-slate-200">Description</Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide detailed information about the issue"
                  rows={4}
                  className="dark:bg-slate-800 dark:border-slate-700 dark:text-white text-slate-900"
                />
              </div>
              <div className="space-y-2">
                <Label className="dark:text-slate-200">Upload Image (Optional)</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setSelectedImage(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="dark:bg-slate-800 dark:border-slate-700 dark:text-white text-slate-900"
                />
                {selectedImage && (
                  <div className="mt-2">
                    <img
                      src={selectedImage}
                      alt="Uploaded"
                      className="w-20 h-20 object-cover rounded"
                    />
                  </div>
                )}
              </div>
              <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700">
                Submit Complaint
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</p>
                  <p className={`text-2xl ${stat.color} dark:${stat.color}`}>{stat.count}</p>
                </div>
                <div className="text-slate-400 dark:text-slate-500">
                  {getStatusIcon(stat.label.toLowerCase().replace(' ', '-'))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-white">My Complaints</CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400">Track status of your submitted complaints</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {complaints.map((complaint) => (
            <div key={complaint.id} className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 rounded-xl p-4 space-y-3 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-slate-900 dark:text-white">{complaint.title}</h4>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge 
                      variant={getPriorityVariant(complaint.priority)} 
                      className="rounded-full px-3 py-0.5 text-xs"
                    >
                      {complaint.priority}
                    </Badge>
                    <Badge 
                      variant={getStatusVariant(complaint.status)} 
                      className="rounded-full px-3 py-0.5 text-xs"
                    >
                      {complaint.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{complaint.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-medium text-slate-600 dark:text-slate-300">{complaint.id}</span>
                <span>•</span>
                <span>{complaint.category}</span>
                <span>•</span>
                <span>{complaint.date}</span>
              </div>
              {complaint.response && (
                <div className="bg-[#F1F7FF] dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-lg p-3 mt-3">
                  <p className="text-sm text-blue-900 dark:text-blue-200">
                    <span className="font-medium text-blue-700 dark:text-blue-400">Response:</span> {complaint.response}
                  </p>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}