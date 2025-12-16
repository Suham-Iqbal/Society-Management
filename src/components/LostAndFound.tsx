import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Search, 
  Calendar,
  MapPin,
  Phone
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function LostAndFound() {
  const [searchTerm, setSearchTerm] = useState('');
  const [reportType, setReportType] = useState<'lost' | 'found'>('lost');
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const lostItems = [
    {
      id: 1,
      item: 'Black Umbrella',
      description: 'Large black umbrella with wooden handle, left in elevator',
      location: 'Block A - Elevator',
      date: '2025-10-30',
      contact: 'Priya S. (A-204)',
      phone: '+91 98765 43211',
      status: 'lost',
    },
    {
      id: 2,
      item: 'Car Keys - Toyota',
      description: 'Toyota car keys with red keychain',
      location: 'Parking Area B',
      date: '2025-10-28',
      contact: 'Amit P. (B-302)',
      phone: '+91 98765 43212',
      status: 'lost',
    },
    {
      id: 3,
      item: 'Kid\'s Bicycle',
      description: 'Red and blue bicycle for 6-8 years old, missing from parking',
      location: 'Parking Area C',
      date: '2025-10-25',
      contact: 'Vikram S. (C-201)',
      phone: '+91 98765 43214',
      status: 'lost',
    },
  ];

  const foundItems = [
    {
      id: 1,
      item: 'Wallet',
      description: 'Brown leather wallet found near main gate, contains ID cards',
      location: 'Main Gate',
      date: '2025-10-31',
      contact: 'Security Office',
      phone: '+91 98765 00001',
      status: 'found',
    },
    {
      id: 2,
      item: 'Mobile Phone - Samsung',
      description: 'Samsung phone found in clubhouse',
      location: 'Clubhouse',
      date: '2025-10-29',
      contact: 'Clubhouse Manager',
      phone: '+91 98765 00002',
      status: 'found',
    },
    {
      id: 3,
      item: 'Spectacles',
      description: 'Reading glasses in brown case, found in gym',
      location: 'Gymnasium',
      date: '2025-10-27',
      contact: 'Meera G. (C-403)',
      phone: '+91 98765 43215',
      status: 'found',
    },
    {
      id: 4,
      item: 'Pet Collar',
      description: 'Blue collar with bell, found near garden',
      location: 'Community Garden',
      date: '2025-10-26',
      contact: 'Sunita R. (B-105)',
      phone: '+91 98765 43213',
      status: 'found',
    },
  ];

  const handleSubmit = () => {
    if (!itemName || !description || !location) {
      toast.error('Please fill all fields');
      return;
    }
    toast.success(`${reportType === 'lost' ? 'Lost' : 'Found'} item report submitted successfully`);
    setItemName('');
    setDescription('');
    setLocation('');
  };

  const filteredLost = lostItems.filter(item =>
    item.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFound = foundItems.filter(item =>
    item.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-slate-900 dark:text-white">Lost & Found</h2>
          <p className="text-slate-600 dark:text-slate-300">Report and find lost items</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Report Item</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Report Lost or Found Item</DialogTitle>
              <DialogDescription>Provide details to help reunite items with owners</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Type</Label>
                <div className="flex gap-4">
                  <Button
                    variant={reportType === 'lost' ? 'default' : 'outline'}
                    onClick={() => setReportType('lost')}
                    className="flex-1"
                  >
                    Lost Item
                  </Button>
                  <Button
                    variant={reportType === 'found' ? 'default' : 'outline'}
                    onClick={() => setReportType('found')}
                    className="flex-1"
                  >
                    Found Item
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Item Name</Label>
                <Input
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder="e.g., Black Umbrella"
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the item in detail..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Where was it lost/found?"
                />
              </div>
              <Button onClick={handleSubmit} className="w-full">
                Submit Report
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="found" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="found">Found Items ({foundItems.length})</TabsTrigger>
          <TabsTrigger value="lost">Lost Items ({lostItems.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="found" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Found Items</CardTitle>
              <CardDescription>Items found by residents and security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {filteredFound.map((item) => (
                <div key={item.id} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-slate-900">{item.item}</h4>
                        <Badge variant="default" className="bg-green-500">Found</Badge>
                      </div>
                      <p className="text-sm text-slate-600">{item.description}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-600 mb-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{item.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                    <div className="text-sm">
                      <p className="text-slate-600">Contact: {item.contact}</p>
                    </div>
                    <Button size="sm" variant="outline" asChild>
                      <a href={`tel:${item.phone}`}>
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lost" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Lost Items</CardTitle>
              <CardDescription>Items reported lost by residents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {filteredLost.map((item) => (
                <div key={item.id} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-slate-900">{item.item}</h4>
                        <Badge variant="destructive">Lost</Badge>
                      </div>
                      <p className="text-sm text-slate-600">{item.description}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-600 mb-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{item.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                    <div className="text-sm">
                      <p className="text-slate-600">Contact: {item.contact}</p>
                    </div>
                    <Button size="sm" variant="outline" asChild>
                      <a href={`tel:${item.phone}`}>
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}