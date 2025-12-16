import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Upload,
  User,
  Phone,
  Mail,
  Briefcase,
  MapPin,
  CreditCard,
  Image as ImageIcon,
  Check,
  FileText,
  Shield,
  Camera
} from 'lucide-react';
import logoImage from 'figma:asset/81811da1ab9b0b594e30ddb09dd4e522ec82540e.png';

interface ServiceProviderSignUpProps {
  onSubmit?: () => void;
  onNavigateToLogin?: () => void;
}

export function ServiceProviderSignUp({ onSubmit, onNavigateToLogin }: ServiceProviderSignUpProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    cnic: '',
    phone: '',
    email: '',
    serviceCategory: '',
    yearsOfExperience: '',
    businessAddress: '',
    workingArea: '',
    bankAccount: '',
    termsAccepted: false,
  });

  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [experienceProof, setExperienceProof] = useState<string | null>(null);
  const [policeClearance, setPoliceClearance] = useState<string | null>(null);
  const [portfolioImages, setPortfolioImages] = useState<string[]>([]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (value: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setter(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePortfolioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPortfolioImages(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.termsAccepted) {
      onSubmit?.();
    }
  };

  const serviceCategories = [
    'Electrician',
    'Plumber',
    'Cleaner',
    'Painter',
    'Carpenter',
    'Technician',
    'Other'
  ];

  const cities = [
    'Karachi',
    'Lahore',
    'Islamabad',
    'Rawalpindi',
    'Faisalabad',
    'Multan',
    'Peshawar',
    'Quetta',
    'Sialkot',
    'Gujranwala'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-black dark:via-blue-950 dark:to-zinc-950 py-8 px-4">
      <div className="max-w-[480px] mx-auto">
        {/* Logo & Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl shadow-lg mb-4">
            <img src={logoImage} alt="UrbanEase Logo" className="w-10 h-10" />
          </div>
          <h1 className="text-slate-900 dark:text-white text-2xl mb-2">Service Provider Portal</h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Welcome back! Please login to continue</p>
        </div>

        <form 
          onSubmit={handleSubmit}
          className="bg-white dark:bg-[#141414] rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 p-8"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-slate-900 dark:text-white text-xl mb-2">
              Register as a Service Provider
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Create your account and complete your verification details to get started.
            </p>
          </div>

          {/* Personal Details Section */}
          <div className="space-y-4 mb-6">
            <div className="pb-2">
              <h2 className="text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <User className="w-4 h-4 text-green-600" />
                Personal Details
              </h2>
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-slate-700 dark:text-slate-300 text-sm">
                Full Name *
              </Label>
              <Input
                id="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className="h-11 rounded-lg border-slate-300 dark:border-slate-700 focus:border-green-600 dark:focus:border-green-500 bg-white dark:bg-[#1A1A1A] text-slate-900 dark:text-white"
                placeholder="Ahmed Khan"
              />
            </div>

            {/* CNIC */}
            <div className="space-y-2">
              <Label htmlFor="cnic" className="text-slate-700 dark:text-slate-300 text-sm">
                CNIC / National ID *
              </Label>
              <Input
                id="cnic"
                type="text"
                required
                value={formData.cnic}
                onChange={(e) => handleInputChange('cnic', e.target.value)}
                className="h-11 rounded-lg border-slate-300 dark:border-slate-700 focus:border-green-600 dark:focus:border-green-500 bg-white dark:bg-[#1A1A1A] text-slate-900 dark:text-white"
                placeholder="42101-1234567-8"
              />
            </div>

            {/* Profile Photo */}
            <div className="space-y-2">
              <Label className="text-slate-700 dark:text-slate-300 text-sm">
                Profile Photo (Optional)
              </Label>
              <div className="flex items-center gap-3">
                {profilePhoto ? (
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-green-500">
                    <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-300 dark:border-slate-700">
                    <Camera className="w-8 h-8 text-slate-400" />
                  </div>
                )}
                <label className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, setProfilePhoto)}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-slate-300 dark:border-slate-700 hover:border-green-600 dark:hover:border-green-500 text-slate-700 dark:text-slate-300"
                    onClick={(e) => {
                      e.preventDefault();
                      (e.currentTarget.parentElement?.querySelector('input[type="file"]') as HTMLInputElement)?.click();
                    }}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Photo
                  </Button>
                </label>
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-slate-700 dark:text-slate-300 text-sm">
                Phone Number *
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="h-11 pl-10 rounded-lg border-slate-300 dark:border-slate-700 focus:border-green-600 dark:focus:border-green-500 bg-white dark:bg-[#1A1A1A] text-slate-900 dark:text-white"
                  placeholder="+92 300 1234567"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 dark:text-slate-300 text-sm">
                Email Address *
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="h-11 pl-10 rounded-lg border-slate-300 dark:border-slate-700 focus:border-green-600 dark:focus:border-green-500 bg-white dark:bg-[#1A1A1A] text-slate-900 dark:text-white"
                  placeholder="ahmed@example.com"
                />
              </div>
            </div>
          </div>

          {/* Professional Information Section */}
          <div className="space-y-4 mb-6 pt-4 border-t border-slate-200 dark:border-slate-800">
            <div className="pb-2">
              <h2 className="text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-green-600" />
                Professional Information
              </h2>
            </div>

            {/* Service Category */}
            <div className="space-y-2">
              <Label htmlFor="serviceCategory" className="text-slate-700 dark:text-slate-300 text-sm">
                Service Category *
              </Label>
              <Select value={formData.serviceCategory} onValueChange={(value) => handleInputChange('serviceCategory', value)}>
                <SelectTrigger className="h-11 rounded-lg border-slate-300 dark:border-slate-700 focus:border-green-600 dark:focus:border-green-500 bg-white dark:bg-[#1A1A1A] text-slate-900 dark:text-white">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {serviceCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Years of Experience */}
            <div className="space-y-2">
              <Label htmlFor="experience" className="text-slate-700 dark:text-slate-300 text-sm">
                Years of Experience *
              </Label>
              <Input
                id="experience"
                type="number"
                required
                min="0"
                max="50"
                value={formData.yearsOfExperience}
                onChange={(e) => handleInputChange('yearsOfExperience', e.target.value)}
                className="h-11 rounded-lg border-slate-300 dark:border-slate-700 focus:border-green-600 dark:focus:border-green-500 bg-white dark:bg-[#1A1A1A] text-slate-900 dark:text-white"
                placeholder="5"
              />
            </div>

            {/* Business Address */}
            <div className="space-y-2">
              <Label htmlFor="businessAddress" className="text-slate-700 dark:text-slate-300 text-sm">
                Business / Work Address *
              </Label>
              <Textarea
                id="businessAddress"
                required
                value={formData.businessAddress}
                onChange={(e) => handleInputChange('businessAddress', e.target.value)}
                className="min-h-[80px] rounded-lg border-slate-300 dark:border-slate-700 focus:border-green-600 dark:focus:border-green-500 bg-white dark:bg-[#1A1A1A] text-slate-900 dark:text-white resize-none"
                placeholder="Enter your complete business address"
              />
            </div>

            {/* Working Area / City */}
            <div className="space-y-2">
              <Label htmlFor="workingArea" className="text-slate-700 dark:text-slate-300 text-sm">
                Working Area / City *
              </Label>
              <Select value={formData.workingArea} onValueChange={(value) => handleInputChange('workingArea', value)}>
                <SelectTrigger className="h-11 rounded-lg border-slate-300 dark:border-slate-700 focus:border-green-600 dark:focus:border-green-500 bg-white dark:bg-[#1A1A1A] text-slate-900 dark:text-white">
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Bank Account / IBAN */}
            <div className="space-y-2">
              <Label htmlFor="bankAccount" className="text-slate-700 dark:text-slate-300 text-sm">
                Bank Account / IBAN *
              </Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="bankAccount"
                  type="text"
                  required
                  value={formData.bankAccount}
                  onChange={(e) => handleInputChange('bankAccount', e.target.value)}
                  className="h-11 pl-10 rounded-lg border-slate-300 dark:border-slate-700 focus:border-green-600 dark:focus:border-green-500 bg-white dark:bg-[#1A1A1A] text-slate-900 dark:text-white"
                  placeholder="PK36MEZN0001234567890123"
                />
              </div>
            </div>
          </div>

          {/* Agreement Section */}
          <div className="mb-6 pt-4 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-start gap-3">
              <Checkbox
                id="terms"
                checked={formData.termsAccepted}
                onCheckedChange={(checked) => handleInputChange('termsAccepted', checked as boolean)}
                className="mt-0.5 border-slate-300 dark:border-slate-700 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
              />
              <Label
                htmlFor="terms"
                className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed cursor-pointer"
              >
                I confirm that all details provided are accurate and agree to the{' '}
                <a href="#" className="text-green-600 hover:underline">
                  Terms & Conditions
                </a>
                {' '}and{' '}
                <a href="#" className="text-green-600 hover:underline">
                  Privacy Policy
                </a>
                .
              </Label>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!formData.termsAccepted}
            className="w-full h-12 bg-green-600 hover:bg-green-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white rounded-lg shadow-md transition-colors"
          >
            Create Account & Submit for Verification
          </Button>

          {/* Login Link */}
          <div className="text-center mt-4">
            <a href="#" className="text-sm text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400" onClick={onNavigateToLogin}>
              Already have an account? Log in
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}