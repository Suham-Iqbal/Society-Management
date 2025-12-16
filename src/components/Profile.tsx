import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { 
  User,
  Bell,
  Shield,
  LogOut,
  ChevronRight,
  Edit,
  Moon,
  Sun,
  Info,
  HelpCircle,
  FileText,
  Lock,
  Globe,
  Smartphone,
  CheckCircle2,
  Clock,
  TrendingUp,
  Award,
  Package
} from 'lucide-react';

interface ProfileProps {
  onNavigate?: (section: string) => void;
  darkMode?: boolean;
  toggleDarkMode?: (enabled: boolean) => void;
  onLogout?: () => void;
}

export function Profile({ onNavigate, darkMode = false, toggleDarkMode, onLogout }: ProfileProps) {
  const profileData = {
    name: 'Ahmed Khan',
    unit: 'A-204',
    block: 'Block A',
    email: 'ahmed.khan@email.com',
    phone: '+92 300 1234567',
    role: 'Resident',
    joinDate: 'March 15, 2020',
    membershipDuration: '4 years',
  };

  const activityStats = [
    {
      label: 'Complaints Resolved',
      value: '8/10',
      percentage: 80,
      icon: CheckCircle2,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-[#E8F5E9] dark:bg-[#0F2E1C]',
      borderColor: 'border-green-200 dark:border-green-900'
    },
    {
      label: 'Events Attended',
      value: '12',
      icon: Award,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-[#E3F2FD] dark:bg-[#141E3B]',
      borderColor: 'border-blue-200 dark:border-blue-900'
    },
    {
      label: 'Service Requests',
      value: '18',
      icon: Package,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-[#F3E5F5] dark:bg-[#2A0D3F]',
      borderColor: 'border-purple-200 dark:border-purple-900'
    },
    {
      label: 'Active Since',
      value: '4 years',
      icon: Clock,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-[#FFF3E0] dark:bg-[#2B1A0F]',
      borderColor: 'border-orange-200 dark:border-orange-900'
    },
  ];

  const notificationSettings = [
    { label: 'Push Notifications', enabled: true },
    { label: 'Email Notifications', enabled: true },
    { label: 'SMS Alerts', enabled: false },
    { label: 'Event Reminders', enabled: true },
  ];

  const settingsGroups = [
    {
      title: 'Preferences',
      items: [
        { label: 'Language & Region', icon: Globe, color: 'text-green-600 dark:text-green-400', badge: 'English', action: 'language-settings' },
        { label: 'App Preferences', icon: Smartphone, color: 'text-purple-600 dark:text-purple-400', action: 'app-preferences' },
      ]
    },
    {
      title: 'Security & Privacy',
      items: [
        { label: 'Privacy & Security', icon: Shield, color: 'text-red-600 dark:text-red-400', action: 'privacy-security' },
      ]
    },
    {
      title: 'Support',
      items: [
        { label: 'Help Center', icon: HelpCircle, color: 'text-slate-600 dark:text-slate-400' },
        { label: 'Terms & Conditions', icon: FileText, color: 'text-slate-600 dark:text-slate-400' },
        { label: 'About', icon: Info, color: 'text-slate-600 dark:text-slate-400', badge: 'v1.0.0' },
      ]
    }
  ];

  return (
    <div className="space-y-6 pb-6">
      {/* Profile Header Card */}
      <Card className="border-0 shadow-sm bg-white dark:bg-black dark:border dark:border-slate-800">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center shadow-lg">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-4 border-white dark:border-black flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div>
                <h2 className="text-slate-900 dark:text-white text-xl mb-1">{profileData.name}</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{profileData.unit}, {profileData.block}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className="bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400 border-0">
                    {profileData.role}
                  </Badge>
                  <Badge variant="outline" className="border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                    Member since {profileData.joinDate.split(' ')[2]}
                  </Badge>
                </div>
              </div>
            </div>
            <Button 
              size="icon" 
              variant="outline"
              className="border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              <Edit className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Activity Overview */}
      <Card className="border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-black">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
            Your Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {activityStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className={`${stat.bgColor} ${stat.borderColor} rounded-lg p-4`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">{stat.label}</p>
                  <p className="text-2xl text-slate-900 dark:text-white">{stat.value}</p>
                  {stat.percentage && (
                    <div className="mt-2">
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
                        <div 
                          className="bg-green-600 h-1.5 rounded-full transition-all"
                          style={{ width: `${stat.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Dark Mode & Appearance */}
      <Card className="border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-black">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-white">Appearance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-900">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                darkMode ? 'bg-slate-700' : 'bg-yellow-100'
              }`}>
                {darkMode ? (
                  <Moon className="w-5 h-5 text-slate-300" />
                ) : (
                  <Sun className="w-5 h-5 text-yellow-600" />
                )}
              </div>
              <div>
                <p className="text-slate-900 dark:text-white">Dark Mode</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {darkMode ? 'Full black theme enabled' : 'Light theme enabled'}
                </p>
              </div>
            </div>
            <Switch 
              checked={darkMode} 
              onCheckedChange={toggleDarkMode}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-black">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-white flex items-center gap-2">
            <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {notificationSettings.map((setting, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
              <span className="text-slate-900 dark:text-white">{setting.label}</span>
              <Switch defaultChecked={setting.enabled} />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Settings Groups */}
      {settingsGroups.map((group, groupIndex) => (
        <Card key={groupIndex} className="border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-black">
          <CardHeader>
            <CardTitle className="text-slate-900 dark:text-white">{group.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {group.items.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  onClick={() => item.action && onNavigate?.(item.action)}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 dark:bg-slate-900 rounded-lg flex items-center justify-center group-hover:bg-slate-200 dark:group-hover:bg-slate-800 transition-colors">
                      <Icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                    <span className="text-slate-900 dark:text-white">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <Badge variant="secondary" className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {item.badge}
                      </Badge>
                    )}
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              );
            })}
          </CardContent>
        </Card>
      ))}

      {/* Logout Button */}
      <Button 
        variant="outline" 
        className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 dark:border-red-900 dark:hover:bg-red-950 dark:text-red-400 dark:hover:text-red-300 h-12"
        onClick={onLogout}
      >
        <LogOut className="w-5 h-5 mr-2" />
        Logout from GreenView Residency
      </Button>

      {/* App Version Footer */}
      <div className="text-center pt-4 pb-2">
        <p className="text-xs text-slate-400 dark:text-slate-600">
          GreenView Residency App v1.0.0
        </p>
        <p className="text-xs text-slate-400 dark:text-slate-600 mt-1">
          © 2025 All rights reserved
        </p>
      </div>
    </div>
  );
}