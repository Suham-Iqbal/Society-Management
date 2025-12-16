import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { 
  MapPin,
  Home,
  Trees,
  GraduationCap,
  ShoppingCart,
  Heart,
  Dumbbell,
  Car,
  Building
} from 'lucide-react';

export function SocietyDirectory() {
  const residents = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      unit: 'A-101',
      block: 'A',
      phone: '+91 98765 43210',
      email: 'rajesh.k@email.com',
      role: 'President',
      family: 4,
    },
    {
      id: 2,
      name: 'Priya Sharma',
      unit: 'A-204',
      block: 'A',
      phone: '+91 98765 43211',
      email: 'priya.s@email.com',
      role: 'Secretary',
      family: 3,
    },
    {
      id: 3,
      name: 'Amit Patel',
      unit: 'B-302',
      block: 'B',
      phone: '+91 98765 43212',
      email: 'amit.p@email.com',
      role: 'Resident',
      family: 5,
    },
    {
      id: 4,
      name: 'Sunita Reddy',
      unit: 'B-105',
      block: 'B',
      phone: '+91 98765 43213',
      email: 'sunita.r@email.com',
      role: 'Treasurer',
      family: 2,
    },
    {
      id: 5,
      name: 'Vikram Singh',
      unit: 'C-201',
      block: 'C',
      phone: '+91 98765 43214',
      email: 'vikram.s@email.com',
      role: 'Resident',
      family: 4,
    },
    {
      id: 6,
      name: 'Meera Gupta',
      unit: 'C-403',
      block: 'C',
      phone: '+91 98765 43215',
      email: 'meera.g@email.com',
      role: 'Resident',
      family: 3,
    },
  ];

  const mapLocations = [
    {
      id: 1,
      name: 'Block A',
      type: 'building',
      icon: Building,
      color: 'bg-blue-500',
      position: { top: '15%', left: '20%' }
    },
    {
      id: 2,
      name: 'Block B',
      type: 'building',
      icon: Building,
      color: 'bg-blue-500',
      position: { top: '15%', right: '20%' }
    },
    {
      id: 3,
      name: 'Block C',
      type: 'building',
      icon: Building,
      color: 'bg-blue-500',
      position: { top: '50%', left: '20%' }
    },
    {
      id: 4,
      name: 'Central Park',
      type: 'park',
      icon: Trees,
      color: 'bg-green-600',
      position: { top: '35%', left: '48%' }
    },
    {
      id: 5,
      name: 'Clubhouse & Gym',
      type: 'amenity',
      icon: Dumbbell,
      color: 'bg-purple-600',
      position: { bottom: '25%', left: '48%' }
    },
    {
      id: 6,
      name: 'Kids Play Area',
      type: 'park',
      icon: Heart,
      color: 'bg-pink-600',
      position: { top: '50%', right: '20%' }
    },
    {
      id: 7,
      name: 'Parking Lot',
      type: 'parking',
      icon: Car,
      color: 'bg-slate-600',
      position: { bottom: '15%', left: '20%' }
    },
    {
      id: 8,
      name: 'Main Gate',
      type: 'entrance',
      icon: Home,
      color: 'bg-orange-600',
      position: { bottom: '15%', right: '20%' }
    },
  ];

  const nearbyPlaces = [
    {
      name: 'Green Valley School',
      distance: '500m',
      icon: GraduationCap,
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      name: 'City Supermarket',
      distance: '800m',
      icon: ShoppingCart,
      color: 'text-green-600 dark:text-green-400'
    },
    {
      name: 'Metro Station',
      distance: '1.2km',
      icon: MapPin,
      color: 'text-purple-600 dark:text-purple-400'
    },
    {
      name: 'City Hospital',
      distance: '2km',
      icon: Heart,
      color: 'text-red-600 dark:text-red-400'
    },
  ];

  const committeeMembers = residents.filter(r => r.role !== 'Resident');

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getRoleColor = (role: string) => {
    switch(role) {
      case 'President': return 'bg-purple-500';
      case 'Secretary': return 'bg-blue-500';
      case 'Treasurer': return 'bg-green-500';
      default: return 'bg-slate-400';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-slate-900 dark:text-slate-100">Society Directory & Map</h2>
        <p className="text-slate-600 dark:text-slate-400">Navigate your community and connect with neighbors</p>
      </div>

      {/* Interactive Map */}
      <Card className="border border-slate-200 dark:border-slate-800 shadow-sm dark:bg-slate-900 overflow-hidden">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-slate-100">GreenView Residency Layout</CardTitle>
          <CardDescription className="dark:text-slate-400">Interactive map of society facilities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-96 bg-gradient-to-br from-green-50 to-blue-50 dark:from-slate-800 dark:to-slate-900 rounded-xl border-2 border-green-200 dark:border-green-900 overflow-hidden">
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-10 dark:opacity-5"
              style={{
                backgroundImage: 'linear-gradient(to right, #cbd5e1 1px, transparent 1px), linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}
            />
            
            {/* Map Locations */}
            {mapLocations.map((location) => {
              const Icon = location.icon;
              return (
                <div
                  key={location.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                  style={location.position}
                >
                  <div className={`${location.color} w-12 h-12 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-white dark:bg-slate-800 px-3 py-1 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity border border-slate-200 dark:border-slate-700">
                    <p className="text-xs text-slate-900 dark:text-slate-100">{location.name}</p>
                  </div>
                </div>
              );
            })}

            {/* Compass */}
            <div className="absolute top-4 right-4 bg-white dark:bg-slate-800 rounded-lg p-3 shadow-lg border border-slate-200 dark:border-slate-700">
              <div className="text-center">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">N</p>
                <div className="w-8 h-8 border-2 border-green-600 dark:border-green-400 rounded-full flex items-center justify-center">
                  <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-green-600 dark:border-b-green-400"></div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white dark:bg-slate-800 rounded-lg p-3 shadow-lg border border-slate-200 dark:border-slate-700">
              <p className="text-xs text-slate-900 dark:text-slate-100 mb-2">Legend</p>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-xs text-slate-600 dark:text-slate-400">Buildings</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  <span className="text-xs text-slate-600 dark:text-slate-400">Parks</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                  <span className="text-xs text-slate-600 dark:text-slate-400">Amenities</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Nearby Places */}
      <Card className="border border-slate-200 dark:border-slate-800 shadow-sm dark:bg-slate-900">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-slate-100">Nearby Places</CardTitle>
          <CardDescription className="dark:text-slate-400">Important locations near the society</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {nearbyPlaces.map((place, index) => {
              const Icon = place.icon;
              return (
                <div key={index} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={`w-5 h-5 ${place.color}`} />
                    <h4 className="text-sm text-slate-900 dark:text-slate-100">{place.name}</h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">{place.distance} away</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}