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
  Home,
  Bed,
  Bath,
  Maximize,
  MapPin,
  Phone,
  DollarSign
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner@2.0.3';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function PropertyMarket() {
  const [searchTerm, setSearchTerm] = useState('');
  const [listingType, setListingType] = useState('sale');

  const saleListings = [
    {
      id: 1,
      unit: 'B-305',
      type: '3 BHK Apartment',
      price: '₹85,00,000',
      area: 1450,
      bedrooms: 3,
      bathrooms: 2,
      owner: 'Amit Patel',
      phone: '+91 98765 43212',
      description: 'Well-maintained 3BHK with modern interiors, sea-facing balcony, modular kitchen.',
      status: 'available',
      postedDate: '2025-10-28',
    },
    {
      id: 2,
      unit: 'C-402',
      type: '2 BHK Apartment',
      price: '₹62,00,000',
      area: 1150,
      bedrooms: 2,
      bathrooms: 2,
      owner: 'Sunita Reddy',
      phone: '+91 98765 43213',
      description: 'Spacious 2BHK, corner unit, excellent ventilation, recent renovation.',
      status: 'available',
      postedDate: '2025-10-25',
    },
  ];

  const rentListings = [
    {
      id: 1,
      unit: 'A-103',
      type: '2 BHK Apartment',
      price: '₹28,000/month',
      area: 1100,
      bedrooms: 2,
      bathrooms: 2,
      owner: 'Vikram Singh',
      phone: '+91 98765 43214',
      description: 'Fully furnished 2BHK, includes all appliances, immediate possession.',
      status: 'available',
      postedDate: '2025-10-30',
    },
    {
      id: 2,
      unit: 'B-201',
      type: '3 BHK Apartment',
      price: '₹35,000/month',
      area: 1400,
      bedrooms: 3,
      bathrooms: 2,
      owner: 'Meera Gupta',
      phone: '+91 98765 43215',
      description: 'Semi-furnished 3BHK, great for families, near school.',
      status: 'available',
      postedDate: '2025-10-27',
    },
    {
      id: 3,
      unit: 'A-505',
      type: '1 BHK Apartment',
      price: '₹18,000/month',
      area: 650,
      bedrooms: 1,
      bathrooms: 1,
      owner: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      description: 'Compact 1BHK, perfect for bachelors or young couples.',
      status: 'available',
      postedDate: '2025-10-26',
    },
  ];

  const getCurrentListings = () => {
    return listingType === 'sale' ? saleListings : rentListings;
  };

  const handleSubmit = () => {
    toast.success('Property listing submitted successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-slate-900 dark:text-white">Property Market</h2>
          <p className="text-slate-600 dark:text-slate-300">Buy, sell, or rent properties within the society</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>List Your Property</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>List Your Property</DialogTitle>
              <DialogDescription>Fill in details to list your property</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Listing Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sale">For Sale</SelectItem>
                      <SelectItem value="rent">For Rent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Unit Number</Label>
                  <Input placeholder="e.g., A-204" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Bedrooms</Label>
                  <Input type="number" placeholder="2" />
                </div>
                <div className="space-y-2">
                  <Label>Bathrooms</Label>
                  <Input type="number" placeholder="2" />
                </div>
                <div className="space-y-2">
                  <Label>Area (sq.ft)</Label>
                  <Input type="number" placeholder="1200" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Price</Label>
                <Input placeholder="₹ Enter amount" />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea placeholder="Describe your property..." rows={4} />
              </div>
              <div className="space-y-2">
                <Label>Contact Number</Label>
                <Input placeholder="+91 98765 43210" />
              </div>
              <Button onClick={handleSubmit}>Submit Listing</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="1bhk">1 BHK</SelectItem>
                <SelectItem value="2bhk">2 BHK</SelectItem>
                <SelectItem value="3bhk">3 BHK</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs value={listingType} onValueChange={setListingType} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sale">For Sale ({saleListings.length})</TabsTrigger>
          <TabsTrigger value="rent">For Rent ({rentListings.length})</TabsTrigger>
        </TabsList>

        <TabsContent value={listingType} className="space-y-4 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {getCurrentListings().map((property) => (
              <Card key={property.id}>
                <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-200 rounded-t-lg">
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-blue-500">{property.status}</Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white drop-shadow-lg">{property.type}</h3>
                    <p className="text-white text-sm drop-shadow-lg">Unit {property.unit}</p>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-blue-600">{property.price}</CardTitle>
                      <CardDescription className="mt-1">{property.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Bed className="w-4 h-4" />
                      <span>{property.bedrooms} Beds</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Bath className="w-4 h-4" />
                      <span>{property.bathrooms} Baths</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Maximize className="w-4 h-4" />
                      <span>{property.area} sq.ft</span>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-slate-200">
                    <p className="text-sm text-slate-600 mb-2">
                      Owner: {property.owner}
                    </p>
                    <p className="text-xs text-slate-500 mb-3">
                      Posted on {property.postedDate}
                    </p>
                    <div className="flex gap-2">
                      <Button className="flex-1" asChild>
                        <a href={`tel:${property.phone}`}>
                          <Phone className="w-4 h-4 mr-2" />
                          Contact Owner
                        </a>
                      </Button>
                      <Button variant="outline">View Details</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {getCurrentListings().length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <Home className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-slate-900 mb-2">No listings available</h3>
                <p className="text-sm text-slate-600">
                  Be the first to list your property!
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}