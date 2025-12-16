import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Building, Mail, Lock, Eye, EyeOff, User, Phone, Home, ArrowRight, CreditCard } from 'lucide-react';

interface SignupProps {
  onSignup: () => void;
  onNavigateToLogin: () => void;
}

export function Signup({ onSignup, onNavigateToLogin }: SignupProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [propertyType, setPropertyType] = useState<'house' | 'plaza'>('house');
  const [ownershipType, setOwnershipType] = useState<'own' | 'rent'>('own');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cnic: '',
    phone: '',
    // House fields
    block: '',
    street: '',
    houseNo: '',
    houseFloor: '',
    // Plaza fields
    commercialArea: '',
    plazaName: '',
    plazaNo: '',
    plazaFloor: '',
    flatNo: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignup();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const blocks = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-slate-100 dark:from-black dark:via-green-950 dark:to-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        {/* Logo & Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl shadow-lg mb-4">
            <Building className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-slate-900 dark:text-white text-2xl mb-2">GreenView Residency</h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Create your account to get started</p>
        </div>

        {/* Signup Card */}
        <Card className="border border-slate-200 dark:border-zinc-800 shadow-xl dark:bg-zinc-950">
          <CardHeader className="space-y-1">
            <CardTitle className="text-slate-900 dark:text-white text-2xl tracking-wider">Signup Page
            </CardTitle>
            <CardDescription className="dark:text-slate-400">
              Enter your details to register as a resident
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="dark:text-slate-200">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Ahmed Khan"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="pl-10 dark:bg-zinc-900 dark:border-zinc-800 dark:text-white text-slate-900"
                    required
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <Label htmlFor="email" className="dark:text-slate-200">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="ahmed.khan@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-10 dark:bg-zinc-900 dark:border-zinc-800 dark:text-white text-slate-900"
                    required
                  />
                </div>
              </div>

              {/* CNIC */}
              <div className="space-y-2">
                <Label htmlFor="cnic" className="dark:text-slate-200">CNIC</Label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="cnic"
                    type="text"
                    placeholder="12345-1234567-1"
                    value={formData.cnic}
                    onChange={(e) => handleInputChange('cnic', e.target.value)}
                    className="pl-10 dark:bg-zinc-900 dark:border-zinc-800 dark:text-white text-slate-900"
                    required
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="dark:text-slate-200">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+92 300 1234567"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="pl-10 dark:bg-zinc-900 dark:border-zinc-800 dark:text-white text-slate-900"
                    required
                  />
                </div>
              </div>

              {/* Property Type Toggle */}
              <div className="space-y-2">
                <Label className="dark:text-slate-200">Property Type</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPropertyType('house')}
                    className={`py-3 px-4 rounded-lg border-2 transition-all ${
                      propertyType === 'house'
                        ? 'border-green-600 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400'
                        : 'border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <Home className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-sm font-medium">House</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPropertyType('plaza')}
                    className={`py-3 px-4 rounded-lg border-2 transition-all ${
                      propertyType === 'plaza'
                        ? 'border-green-600 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400'
                        : 'border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <Building className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-sm font-medium">Plaza/Apartment</span>
                  </button>
                </div>
              </div>

              {/* House Fields */}
              {propertyType === 'house' && (
                <>
                  {/* Ownership - Right after Property Type */}
                  <div className="space-y-2">
                    <Label className="dark:text-slate-200">Ownership</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setOwnershipType('own')}
                        className={`py-2 px-4 rounded-lg border transition-all text-sm font-medium ${
                          ownershipType === 'own'
                            ? 'border-green-600 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400'
                            : 'border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        Owner
                      </button>
                      <button
                        type="button"
                        onClick={() => setOwnershipType('rent')}
                        className={`py-2 px-4 rounded-lg border transition-all text-sm font-medium ${
                          ownershipType === 'rent'
                            ? 'border-green-600 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400'
                            : 'border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        Tenant
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Block */}
                    <div className="space-y-2">
                      <Label htmlFor="block" className="dark:text-slate-200">Block</Label>
                      <Select value={formData.block} onValueChange={(value) => handleInputChange('block', value)}>
                        <SelectTrigger className="dark:bg-zinc-900 dark:border-zinc-800 dark:text-white">
                          <SelectValue placeholder="Select block" />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-zinc-900 dark:border-zinc-800">
                          {blocks.map((block) => (
                            <SelectItem key={block} value={block} className="dark:text-white dark:focus:bg-zinc-800">
                              {block}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Street */}
                    <div className="space-y-2">
                      <Label htmlFor="street" className="dark:text-slate-200">Street</Label>
                      <Input
                        id="street"
                        type="text"
                        placeholder="Street 5"
                        value={formData.street}
                        onChange={(e) => handleInputChange('street', e.target.value)}
                        className="dark:bg-zinc-900 dark:border-zinc-800 dark:text-white text-slate-900"
                        required
                      />
                    </div>

                    {/* House No */}
                    <div className="space-y-2">
                      <Label htmlFor="houseNo" className="dark:text-slate-200">House No.</Label>
                      <Input
                        id="houseNo"
                        type="text"
                        placeholder="45"
                        value={formData.houseNo}
                        onChange={(e) => handleInputChange('houseNo', e.target.value)}
                        className="dark:bg-zinc-900 dark:border-zinc-800 dark:text-white text-slate-900"
                        required
                      />
                    </div>

                    {/* Floor - Only shown for Tenants */}
                    {ownershipType === 'rent' && (
                      <div className="space-y-2">
                        <Label htmlFor="houseFloor" className="dark:text-slate-200">Floor</Label>
                        <Input
                          id="houseFloor"
                          type="text"
                          placeholder="Ground / 1st / 2nd"
                          value={formData.houseFloor}
                          onChange={(e) => handleInputChange('houseFloor', e.target.value)}
                          className="dark:bg-zinc-900 dark:border-zinc-800 dark:text-white text-slate-900"
                          required
                        />
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Plaza/Apartment Fields */}
              {propertyType === 'plaza' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Plaza/Apartment Name */}
                  <div className="space-y-2">
                    <Label htmlFor="plazaName" className="dark:text-slate-200">Plaza/Apartment Name (Optional)</Label>
                    <Input
                      id="plazaName"
                      type="text"
                      placeholder="Royal Plaza"
                      value={formData.plazaName}
                      onChange={(e) => handleInputChange('plazaName', e.target.value)}
                      className="dark:bg-zinc-900 dark:border-zinc-800 dark:text-white text-slate-900"
                    />
                  </div>

                  {/* Plaza/Apartment No. */}
                  <div className="space-y-2">
                    <Label htmlFor="plazaNo" className="dark:text-slate-200">Plaza/Apartment No.</Label>
                    <Input
                      id="plazaNo"
                      type="text"
                      placeholder="B-12"
                      value={formData.plazaNo}
                      onChange={(e) => handleInputChange('plazaNo', e.target.value)}
                      className="dark:bg-zinc-900 dark:border-zinc-800 dark:text-white text-slate-900"
                      required
                    />
                  </div>

                  {/* Floor */}
                  <div className="space-y-2">
                    <Label htmlFor="plazaFloor" className="dark:text-slate-200">Floor</Label>
                    <Input
                      id="plazaFloor"
                      type="text"
                      placeholder="3rd Floor"
                      value={formData.plazaFloor}
                      onChange={(e) => handleInputChange('plazaFloor', e.target.value)}
                      className="dark:bg-zinc-900 dark:border-zinc-800 dark:text-white text-slate-900"
                      required
                    />
                  </div>

                  {/* Flat No. */}
                  <div className="space-y-2">
                    <Label htmlFor="flatNo" className="dark:text-slate-200">Flat No.</Label>
                    <Input
                      id="flatNo"
                      type="text"
                      placeholder="304"
                      value={formData.flatNo}
                      onChange={(e) => handleInputChange('flatNo', e.target.value)}
                      className="dark:bg-zinc-900 dark:border-zinc-800 dark:text-white text-slate-900"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Password Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="dark:text-slate-200">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="pl-10 pr-10 dark:bg-zinc-900 dark:border-zinc-800 dark:text-white text-slate-900"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="dark:text-slate-200">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="pl-10 pr-10 dark:bg-zinc-900 dark:border-zinc-800 dark:text-white text-slate-900"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-center gap-2">
                <Checkbox id="terms" required className="shrink-0" />
                <Label
                  htmlFor="terms"
                  className="text-sm cursor-pointer text-[#1E1E1E] dark:text-slate-300 leading-5 font-normal"
                >
                  I agree to the{' '}
                  <button
                    type="button"
                    className="text-[#00A35A] hover:underline inline"
                    onClick={(e) => {
                      e.preventDefault();
                      // Handle Terms & Conditions modal/navigation
                    }}
                  >
                    Terms & Conditions
                  </button>{' '}
                  and{' '}
                  <button
                    type="button"
                    className="text-[#00A35A] hover:underline inline"
                    onClick={(e) => {
                      e.preventDefault();
                      // Handle Privacy Policy modal/navigation
                    }}
                  >
                    Privacy Policy
                  </button>{' '}
                  of GreenView Residency.
                </Label>
              </div>

              {/* Sign Up Button */}
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white h-11"
              >
                Create Account
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-zinc-800"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white dark:bg-zinc-950 px-2 text-slate-500 dark:text-slate-400">
                    Or
                  </span>
                </div>
              </div>

              {/* Login Link */}
              <div className="text-center">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={onNavigateToLogin}
                    className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 font-medium"
                  >
                    Log in
                  </button>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-slate-500 dark:text-slate-600">
            2025 GreenView Residency. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}