import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  Car,
  MapPin,
  Clock,
  Users,
  Calendar,
  Plus,
  Phone
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner@2.0.3';

export function CarPooling() {
  const [rideType, setRideType] = useState('offered');

  const offeredRides = [
    {
      id: 1,
      driver: 'Rajesh Kumar',
      unit: 'A-101',
      from: 'GreenView Residency',
      to: 'MG Road Metro',
      time: '8:30 AM',
      days: 'Mon-Fri',
      seats: 2,
      phone: '+91 98765 43210',
      preferences: 'Non-smoking, AC car',
    },
    {
      id: 2,
      driver: 'Priya Sharma',
      unit: 'A-204',
      from: 'GreenView Residency',
      to: 'Electronic City',
      time: '9:00 AM',
      days: 'Mon-Fri',
      seats: 1,
      phone: '+91 98765 43211',
      preferences: 'Women only',
    },
    {
      id: 3,
      driver: 'Vikram Singh',
      unit: 'C-201',
      from: 'GreenView Residency',
      to: 'Whitefield',
      time: '7:45 AM',
      days: 'Mon-Sat',
      seats: 3,
      phone: '+91 98765 43214',
      preferences: 'Any, Cost sharing',
    },
  ];

  const requestedRides = [
    {
      id: 1,
      requester: 'Amit Patel',
      unit: 'B-302',
      from: 'GreenView Residency',
      to: 'Koramangala',
      time: '8:00 AM',
      days: 'Mon-Fri',
      phone: '+91 98765 43212',
      preferences: 'Flexible timing',
    },
    {
      id: 2,
      requester: 'Meera Gupta',
      unit: 'C-403',
      from: 'GreenView Residency',
      to: 'Indiranagar',
      time: '6:30 PM',
      days: 'Mon-Fri',
      phone: '+91 98765 43215',
      preferences: 'Return trip',
    },
  ];

  const myRides = [
    {
      id: 1,
      type: 'passenger',
      driver: 'Rajesh Kumar (A-101)',
      route: 'GreenView → MG Road Metro',
      time: 'Tomorrow, 8:30 AM',
      status: 'confirmed',
    },
  ];

  const handleSubmit = () => {
    toast.success('Carpool listing created successfully!');
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-slate-900 dark:text-white">Car Pooling</h2>
          <p className="text-slate-600 dark:text-slate-300">Share rides with your neighbors</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Listing
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Carpool Listing</DialogTitle>
              <DialogDescription>Offer a ride or request one</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Type</Label>
                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1">
                    <Car className="w-4 h-4 mr-2" />
                    Offer Ride
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Users className="w-4 h-4 mr-2" />
                    Request Ride
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>From</Label>
                <Input placeholder="Starting location" defaultValue="GreenView Residency" />
              </div>
              <div className="space-y-2">
                <Label>To</Label>
                <Input placeholder="Destination" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Time</Label>
                  <Input type="time" />
                </div>
                <div className="space-y-2">
                  <Label>Available Seats</Label>
                  <Input type="number" placeholder="2" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Days</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select days" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mon-fri">Monday - Friday</SelectItem>
                    <SelectItem value="mon-sat">Monday - Saturday</SelectItem>
                    <SelectItem value="all">All Days</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Preferences (Optional)</Label>
                <Input placeholder="e.g., Non-smoking, AC, Cost sharing" />
              </div>
              <Button onClick={handleSubmit} className="w-full">
                Create Listing
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* My Active Rides */}
      {myRides.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>My Active Rides</CardTitle>
            <CardDescription>Your upcoming carpool trips</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {myRides.map((ride) => (
                <div key={ride.id} className="p-4 border border-slate-200 rounded-lg bg-blue-50">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className="bg-green-500">Confirmed</Badge>
                        <Badge variant="outline">{ride.type}</Badge>
                      </div>
                      <p className="text-slate-900">{ride.route}</p>
                      <p className="text-sm text-slate-600">With {ride.driver}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Clock className="w-4 h-4" />
                    <span>{ride.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs value={rideType} onValueChange={setRideType} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="offered">Rides Offered ({offeredRides.length})</TabsTrigger>
          <TabsTrigger value="requested">Rides Requested ({requestedRides.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="offered" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Available Rides</CardTitle>
              <CardDescription>Rides offered by residents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {offeredRides.map((ride) => (
                <div key={ride.id} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-blue-500 text-white">
                        {getInitials(ride.driver)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-slate-900">{ride.driver}</h4>
                        <Badge variant="secondary">{ride.unit}</Badge>
                      </div>
                      <div className="space-y-2 mb-3">
                        <div className="flex items-start gap-2 text-sm text-slate-600">
                          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <div>
                            <p>{ride.from}</p>
                            <p className="text-slate-400">↓</p>
                            <p>{ride.to}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{ride.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{ride.days}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            <span>{ride.seats} seats available</span>
                          </div>
                        </div>
                        <p className="text-sm text-slate-500">{ride.preferences}</p>
                      </div>
                      <Button size="sm" asChild>
                        <a href={`tel:${ride.phone}`}>
                          <Phone className="w-4 h-4 mr-2" />
                          Contact Driver
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requested" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Ride Requests</CardTitle>
              <CardDescription>Residents looking for rides</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {requestedRides.map((ride) => (
                <div key={ride.id} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-slate-500 text-white">
                        {getInitials(ride.requester)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-slate-900">{ride.requester}</h4>
                        <Badge variant="secondary">{ride.unit}</Badge>
                      </div>
                      <div className="space-y-2 mb-3">
                        <div className="flex items-start gap-2 text-sm text-slate-600">
                          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <div>
                            <p>{ride.from}</p>
                            <p className="text-slate-400">↓</p>
                            <p>{ride.to}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{ride.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{ride.days}</span>
                          </div>
                        </div>
                        <p className="text-sm text-slate-500">{ride.preferences}</p>
                      </div>
                      <Button size="sm" asChild>
                        <a href={`tel:${ride.phone}`}>
                          <Phone className="w-4 h-4 mr-2" />
                          Contact
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Info Card */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Car className="w-5 h-5 text-blue-600 mt-1" />
            <div>
              <h4 className="text-blue-900 mb-2">Carpooling Benefits</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Save money on fuel and parking</li>
                <li>• Reduce traffic congestion and carbon footprint</li>
                <li>• Connect with your neighbors</li>
                <li>• Make commuting more convenient</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}