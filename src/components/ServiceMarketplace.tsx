import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Search,
  Wrench,
  Zap,
  Hammer,
  GraduationCap,
  Sparkles,
  MoreHorizontal,
  Star,
  MapPin,
  Phone,
  Users,
  Briefcase,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

const serviceCategories = [
  { id: 'plumbing', name: 'Plumbing', icon: Wrench, color: 'text-blue-600 dark:text-blue-400', bgColor: 'bg-blue-100 dark:bg-blue-900/30' },
  { id: 'electrical', name: 'Electrical', icon: Zap, color: 'text-yellow-600 dark:text-yellow-400', bgColor: 'bg-yellow-100 dark:bg-yellow-900/30' },
  { id: 'carpentry', name: 'Carpentry', icon: Hammer, color: 'text-orange-600 dark:text-orange-400', bgColor: 'bg-orange-100 dark:bg-orange-900/30' },
  { id: 'tutoring', name: 'Tutoring', icon: GraduationCap, color: 'text-green-600 dark:text-green-400', bgColor: 'bg-green-100 dark:bg-green-900/30' },
  { id: 'cleaning', name: 'Cleaning', icon: Sparkles, color: 'text-cyan-600 dark:text-cyan-400', bgColor: 'bg-cyan-100 dark:bg-cyan-900/30' },
  { id: 'other', name: 'Other', icon: MoreHorizontal, color: 'text-gray-600 dark:text-gray-400', bgColor: 'bg-gray-100 dark:bg-gray-900/30' },
];

const residentProviders = [
  {
    id: 1,
    name: 'Ahmed Khan',
    service: 'Tutoring - Math & Science',
    rating: 4.8,
    reviews: 45,
    location: 'Block A-102',
    phone: '+92 300 1234567',
    available: true,
  },
  {
    id: 2,
    name: 'Ayesha Malik',
    service: 'Home Cleaning',
    rating: 4.9,
    reviews: 32,
    location: 'Block C-205',
    phone: '+92 321 9876543',
    available: true,
  },
  {
    id: 3,
    name: 'Bilal Ahmad',
    service: 'Computer Repair',
    rating: 4.7,
    reviews: 28,
    location: 'Block B-304',
    phone: '+92 333 4567890',
    available: false,
  },
  {
    id: 4,
    name: 'Zainab Hussain',
    service: 'English Tutoring',
    rating: 4.9,
    reviews: 56,
    location: 'Block D-101',
    phone: '+92 300 7778888',
    available: true,
  },
];

const professionalProviders = [
  {
    id: 1,
    name: 'Hassan Plumbing Services',
    service: 'Plumbing',
    rating: 4.9,
    reviews: 234,
    location: 'Verified Provider',
    phone: '+92 300 1112222',
    available: true,
  },
  {
    id: 2,
    name: 'Ali Electrical Works',
    service: 'Electrical',
    rating: 4.8,
    reviews: 189,
    location: 'Verified Provider',
    phone: '+92 321 3334444',
    available: true,
  },
  {
    id: 3,
    name: 'Kamran Carpentry',
    service: 'Carpentry',
    rating: 4.7,
    reviews: 156,
    location: 'Verified Provider',
    phone: '+92 333 5556666',
    available: true,
  },
  {
    id: 4,
    name: 'Faisal Home Repairs',
    service: 'General Maintenance',
    rating: 4.6,
    reviews: 143,
    location: 'Verified Provider',
    phone: '+92 300 9990000',
    available: true,
  },
];

export function ServiceMarketplace() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('resident');

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
    toast.success(`Showing ${serviceCategories.find(c => c.id === categoryId)?.name} services`);
  };

  const handleContactProvider = (providerName: string) => {
    toast.success(`Contacting ${providerName}...`);
  };

  return (
    <div className="space-y-6 pb-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
        <Input
          type="text"
          placeholder="Search for services or providers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
        />
      </div>

      {/* Service Categories */}
      <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-white">Service Categories</CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400">Browse services by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {serviceCategories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-all ${
                    selectedCategory === category.id
                      ? 'bg-green-50 dark:bg-green-900/20 ring-2 ring-green-600 dark:ring-green-500'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-700/50'
                  }`}
                >
                  <div className={`w-12 h-12 ${category.bgColor} rounded-full flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${category.color}`} />
                  </div>
                  <span className="text-xs text-center text-slate-900 dark:text-white">{category.name}</span>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Parallel Tabs for Resident & Professional Services */}
      <div className="bg-slate-100 dark:bg-slate-800/50 p-1.5 rounded-xl inline-flex w-full">
        <button
          onClick={() => setActiveTab('resident')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all duration-300 ${
            activeTab === 'resident'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-md shadow-slate-900/10 dark:shadow-black/30 scale-[1.02]'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Users className={`w-4 h-4 transition-all ${activeTab === 'resident' ? 'text-green-600 dark:text-green-500' : ''}`} />
          <span className="font-medium text-sm">Resident Services</span>
        </button>
        <button
          onClick={() => setActiveTab('professional')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all duration-300 ${
            activeTab === 'professional'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-md shadow-slate-900/10 dark:shadow-black/30 scale-[1.02]'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Briefcase className={`w-4 h-4 transition-all ${activeTab === 'professional' ? 'text-blue-600 dark:text-blue-500' : ''}`} />
          <span className="font-medium text-sm">Professional Services</span>
        </button>
      </div>

      {/* Tab Content with Animation */}
      <div className="relative">
        {/* Resident Services Content */}
        <div 
          className={`transition-all duration-300 ${
            activeTab === 'resident' 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 translate-x-4 absolute inset-0 pointer-events-none'
          }`}
        >
          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">Resident Services</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">Services offered by fellow residents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {residentProviders.map((provider) => (
                <div
                  key={provider.id}
                  className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-slate-900 dark:text-white">{provider.name}</h4>
                      {provider.available && (
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          Available
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{provider.service}</p>
                    <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-slate-900 dark:text-white">{provider.rating}</span>
                        <span>({provider.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{provider.location}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleContactProvider(provider.name)}
                    size="sm"
                    disabled={!provider.available}
                    className="bg-green-600 hover:bg-green-700 text-white dark:bg-green-600 dark:hover:bg-green-700"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Contact
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Professional Services Content */}
        <div 
          className={`transition-all duration-300 ${
            activeTab === 'professional' 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 translate-x-4 absolute inset-0 pointer-events-none'
          }`}
        >
          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">Professional Services</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">Verified professional service providers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {professionalProviders.map((provider) => (
                <div
                  key={provider.id}
                  className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-slate-900 dark:text-white">{provider.name}</h4>
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                        Verified
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{provider.service}</p>
                    <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-slate-900 dark:text-white">{provider.rating}</span>
                        <span>({provider.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{provider.location}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleContactProvider(provider.name)}
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white dark:bg-green-600 dark:hover:bg-green-700"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Contact
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}