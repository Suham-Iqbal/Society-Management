import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  Star,
  TrendingUp,
  Edit,
  Save,
  X,
  Award
} from 'lucide-react';

interface ServiceProviderProfileProps {
  darkMode: boolean;
  toggleDarkMode: (enabled: boolean) => void;
  onLogout: () => void;
}

export function ServiceProviderProfile({ darkMode, toggleDarkMode, onLogout }: ServiceProviderProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "Ahmed Khan's Professional Services",
    ownerName: "Ahmed Khan",
    email: "ahmed.khan@plumbingservices.com",
    phone: "+92 300 1234567",
    serviceType: "Plumbing",
    experience: "8 years",
    description: "Professional plumbing services with expertise in residential repairs, installations, and emergency services. Certified and insured with over 8 years of experience."
  });

  const performanceData = {
    totalServices: 127,
    rating: 4.7,
    totalRatings: 89,
    joinedDate: "January 15, 2024"
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would save to backend
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900 dark:text-white text-2xl mb-2">Service Provider Profile</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Manage your professional information
          </p>
        </div>
        <Button
          onClick={onLogout}
          variant="outline"
          className="border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950"
        >
          Logout
        </Button>
      </div>

      {/* Profile Overview Card */}
      <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar className="w-24 h-24 border-4 border-blue-200 dark:border-blue-900">
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-700 text-white text-2xl">
                {formData.ownerName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-slate-900 dark:text-white text-xl mb-1">{formData.businessName}</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-3">{formData.ownerName}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge className="bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 border-0">
                  <Briefcase className="w-3 h-3 mr-1" />
                  {formData.serviceType}
                </Badge>
                <Badge className="bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-400 border-0">
                  <Star className="w-3 h-3 mr-1" />
                  {performanceData.rating} Rating
                </Badge>
                <Badge className="bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400 border-0">
                  <Award className="w-3 h-3 mr-1" />
                  {formData.experience} Experience
                </Badge>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Member since {performanceData.joinedDate}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className={isEditing 
                  ? "bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white"
                  : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white"
                }
              >
                {isEditing ? (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                ) : (
                  <>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </>
                )}
              </Button>
              {isEditing && (
                <Button
                  onClick={() => setIsEditing(false)}
                  variant="outline"
                  className="border-slate-300 dark:border-slate-700"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Total Services</p>
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-950 rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <p className="text-slate-900 dark:text-white text-2xl">{performanceData.totalServices}</p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600 dark:text-slate-400">Rating</p>
              <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-950 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
            <p className="text-slate-900 dark:text-white text-2xl">{performanceData.rating}/5.0</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{performanceData.totalRatings} ratings</p>
          </CardContent>
        </Card>
      </div>

      {/* Business Information */}
      <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-white">Business Information</CardTitle>
          <CardDescription className="dark:text-slate-400">
            Your registered business details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="businessName" className="dark:text-slate-200">Business Name</Label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  disabled={!isEditing}
                  className="pl-10 dark:bg-slate-800 dark:border-slate-700 dark:text-white disabled:opacity-100"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ownerName" className="dark:text-slate-200">Owner Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="ownerName"
                  value={formData.ownerName}
                  onChange={(e) => handleInputChange('ownerName', e.target.value)}
                  disabled={!isEditing}
                  className="pl-10 dark:bg-slate-800 dark:border-slate-700 dark:text-white disabled:opacity-100"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="dark:text-slate-200">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={!isEditing}
                  className="pl-10 dark:bg-slate-800 dark:border-slate-700 dark:text-white disabled:opacity-100"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="dark:text-slate-200">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  disabled={!isEditing}
                  className="pl-10 dark:bg-slate-800 dark:border-slate-700 dark:text-white disabled:opacity-100"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience" className="dark:text-slate-200">Years of Experience</Label>
              <Input
                id="experience"
                value={formData.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                disabled={!isEditing}
                className="dark:bg-slate-800 dark:border-slate-700 dark:text-white disabled:opacity-100"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="serviceType" className="dark:text-slate-200">Service Type</Label>
              <Input
                id="serviceType"
                value={formData.serviceType}
                onChange={(e) => handleInputChange('serviceType', e.target.value)}
                disabled={!isEditing}
                className="dark:bg-slate-800 dark:border-slate-700 dark:text-white disabled:opacity-100"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="dark:text-slate-200">Business Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              disabled={!isEditing}
              rows={4}
              className="dark:bg-slate-800 dark:border-slate-700 dark:text-white disabled:opacity-100"
            />
          </div>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-white">Settings</CardTitle>
          <CardDescription className="dark:text-slate-400">
            Manage your preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-800">
            <div>
              <p className="text-sm text-slate-900 dark:text-white mb-1">Dark Mode</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Switch between light and dark theme
              </p>
            </div>
            <Switch
              checked={darkMode}
              onCheckedChange={toggleDarkMode}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
