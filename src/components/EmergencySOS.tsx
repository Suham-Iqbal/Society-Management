import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { 
  Phone, 
  Ambulance, 
  Flame, 
  Shield, 
  Wrench,
  AlertTriangle,
  MapPin
} from 'lucide-react';

export function EmergencySOS() {
  const emergencyContacts = [
    {
      name: 'Police',
      number: '100',
      icon: Shield,
      color: 'bg-blue-500',
      description: 'For any law & order emergency',
    },
    {
      name: 'Ambulance',
      number: '108',
      icon: Ambulance,
      color: 'bg-red-500',
      description: 'Medical emergency services',
    },
    {
      name: 'Fire Brigade',
      number: '101',
      icon: Flame,
      color: 'bg-orange-500',
      description: 'Fire emergency services',
    },
    {
      name: 'Society Security',
      number: '+91 98765 00001',
      icon: Shield,
      color: 'bg-slate-700',
      description: 'Society security gate',
    },
  ];

  const societyContacts = [
    {
      role: 'President',
      name: 'Rajesh Kumar',
      number: '+91 98765 43210',
      available: '24/7',
    },
    {
      role: 'Secretary',
      name: 'Priya Sharma',
      number: '+91 98765 43211',
      available: '9 AM - 9 PM',
    },
    {
      role: 'Maintenance Manager',
      name: 'Suresh Menon',
      number: '+91 98765 43220',
      available: '8 AM - 8 PM',
    },
  ];

  const serviceProviders = [
    {
      service: 'Plumber',
      name: 'Ravi Plumbing Services',
      number: '+91 98765 11111',
      icon: Wrench,
    },
    {
      service: 'Electrician',
      name: 'PowerFix Solutions',
      number: '+91 98765 22222',
      icon: Wrench,
    },
    {
      service: 'Carpenter',
      name: 'WoodCraft Services',
      number: '+91 98765 33333',
      icon: Wrench,
    },
  ];

  const handleEmergencyCall = (number: string, service: string) => {
    if (confirm(`Do you want to call ${service}?\n\nNumber: ${number}`)) {
      window.location.href = `tel:${number}`;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-slate-900 dark:text-white">Emergency SOS</h2>
        <p className="text-slate-600 dark:text-slate-300">Quick access to emergency services</p>
      </div>

      <Alert className="border-red-200 bg-red-50">
        <AlertTriangle className="h-5 w-5 text-red-600" />
        <AlertTitle className="text-red-900">Emergency Information</AlertTitle>
        <AlertDescription className="text-red-700">
          In case of life-threatening emergencies, call emergency services (100/108/101) immediately. 
          The SOS button will alert society security and management committee members.
        </AlertDescription>
      </Alert>

      {/* SOS Button */}
      <Card className="border-red-500 bg-gradient-to-br from-red-50 to-red-100">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-32 h-32 rounded-full bg-red-500 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow cursor-pointer animate-pulse">
                <AlertTriangle className="w-16 h-16 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-red-900">Emergency SOS</h3>
              <p className="text-sm text-red-700">
                Press to alert security and management committee
              </p>
            </div>
            <Button 
              size="lg" 
              className="bg-red-600 hover:bg-red-700"
              onClick={() => handleEmergencyCall('+91 98765 00001', 'Society Security & All Committee Members')}
            >
              <Phone className="w-5 h-5 mr-2" />
              Activate Emergency SOS
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Services */}
      <Card>
        <CardHeader>
          <CardTitle>Emergency Services</CardTitle>
          <CardDescription>Quick dial emergency numbers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {emergencyContacts.map((contact, index) => {
              const Icon = contact.icon;
              return (
                <div
                  key={index}
                  className="p-4 border-2 border-slate-200 rounded-lg hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-lg ${contact.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-slate-900">{contact.name}</h4>
                      <p className="text-sm text-slate-600 mb-2">{contact.description}</p>
                      <Button 
                        className="w-full"
                        onClick={() => handleEmergencyCall(contact.number, contact.name)}
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call {contact.number}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Society Contacts */}
      <Card>
        <CardHeader>
          <CardTitle>Society Management Contacts</CardTitle>
          <CardDescription>Reach out to committee members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {societyContacts.map((contact, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                <div>
                  <h4 className="text-slate-900">{contact.role}</h4>
                  <p className="text-sm text-slate-600">{contact.name}</p>
                  <p className="text-xs text-slate-500">Available: {contact.available}</p>
                </div>
                <Button 
                  variant="outline"
                  onClick={() => handleEmergencyCall(contact.number, contact.role)}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Service Providers */}
      <Card>
        <CardHeader>
          <CardTitle>Approved Service Providers</CardTitle>
          <CardDescription>Emergency repair services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {serviceProviders.map((provider, index) => {
              const Icon = provider.icon;
              return (
                <div key={index} className="p-4 border border-slate-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="w-5 h-5 text-slate-600" />
                    <h4 className="text-slate-900">{provider.service}</h4>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">{provider.name}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleEmergencyCall(provider.number, provider.service)}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Location Info */}
      <Card>
        <CardHeader>
          <CardTitle>Society Location</CardTitle>
          <CardDescription>Share this address in emergencies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-slate-600 mt-1" />
            <div>
              <p className="text-slate-900">GreenView Residency</p>
              <p className="text-sm text-slate-600">
                123, MG Road, Sector 15<br />
                Bangalore, Karnataka - 560001<br />
                Landmark: Near City Mall
              </p>
              <Button variant="outline" size="sm" className="mt-3">
                <MapPin className="w-4 h-4 mr-2" />
                Open in Maps
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}