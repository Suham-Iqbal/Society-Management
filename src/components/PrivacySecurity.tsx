import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, 
  Shield, 
  Lock,
  Eye,
  EyeOff,
  Fingerprint,
  Key,
  UserX,
  Database,
  AlertTriangle,
  CheckCircle,
  ShieldCheck,
  FileText,
  UserCheck
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface PrivacySecurityProps {
  onBack: () => void;
}

export function PrivacySecurity({ onBack }: PrivacySecurityProps) {
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: true,
    showOnlineStatus: true,
    shareActivityStatus: false,
    allowMessagesFromAnyone: false,
    biometricAuth: false,
    twoFactorAuth: false,
    sessionTimeout: true,
    dataEncryption: true,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = (key: keyof typeof privacySettings) => {
    setPrivacySettings(prev => {
      const newValue = !prev[key];
      toast.success(newValue ? 'Enabled' : 'Disabled');
      return { ...prev, [key]: newValue };
    });
  };

  const privacyGroups = [
    {
      title: 'Privacy Controls',
      icon: Eye,
      color: 'text-green-600 dark:text-green-400',
      settings: [
        {
          key: 'profileVisibility' as const,
          label: 'Profile Visibility',
          description: 'Allow other residents to see your profile',
          icon: UserCheck,
        },
        {
          key: 'showOnlineStatus' as const,
          label: 'Show Online Status',
          description: 'Let others know when you are active',
          icon: Eye,
        },
        {
          key: 'shareActivityStatus' as const,
          label: 'Share Activity Status',
          description: 'Share your activity with community',
          icon: Database,
        },
        {
          key: 'allowMessagesFromAnyone' as const,
          label: 'Allow Messages from Anyone',
          description: 'Receive messages from all residents',
          icon: UserX,
        },
      ]
    },
    {
      title: 'Security Settings',
      icon: Lock,
      color: 'text-red-600 dark:text-red-400',
      settings: [
        {
          key: 'biometricAuth' as const,
          label: 'Biometric Authentication',
          description: 'Use fingerprint or face ID to unlock',
          icon: Fingerprint,
        },
        {
          key: 'twoFactorAuth' as const,
          label: 'Two-Factor Authentication',
          description: 'Add extra security layer to your account',
          icon: ShieldCheck,
        },
        {
          key: 'sessionTimeout' as const,
          label: 'Auto Session Timeout',
          description: 'Automatically log out after inactivity',
          icon: Key,
        },
        {
          key: 'dataEncryption' as const,
          label: 'Data Encryption',
          description: 'Encrypt sensitive data on device',
          icon: Lock,
        },
      ]
    },
  ];

  const securityScore = Object.values(privacySettings).filter(Boolean).length;
  const totalSettings = Object.keys(privacySettings).length;
  const scorePercentage = (securityScore / totalSettings) * 100;

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={onBack}
          className="border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center shadow-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-slate-900 dark:text-white">Privacy & Security</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Protect your account and data</p>
          </div>
        </div>
      </div>

      {/* Security Score */}
      <Card className="border border-slate-200 dark:border-slate-800 shadow-sm bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 dark:bg-black">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center shadow-lg">
              <Shield className={`w-8 h-8 ${
                scorePercentage >= 70 ? 'text-green-600' : 
                scorePercentage >= 40 ? 'text-orange-600' : 
                'text-red-600'
              }`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="text-slate-900 dark:text-white">Security Score</h4>
                <Badge className={
                  scorePercentage >= 70 ? 'bg-green-600 text-white' : 
                  scorePercentage >= 40 ? 'bg-orange-600 text-white' : 
                  'bg-red-600 text-white'
                }>
                  {Math.round(scorePercentage)}%
                </Badge>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                {securityScore} of {totalSettings} security features enabled
              </p>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full transition-all ${
                    scorePercentage >= 70 ? 'bg-green-600' : 
                    scorePercentage >= 40 ? 'bg-orange-600' : 
                    'bg-red-600'
                  }`}
                  style={{ width: `${scorePercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Security Settings */}
      {privacyGroups.map((group, groupIndex) => {
        const GroupIcon = group.icon;
        return (
          <Card key={groupIndex} className="border border-slate-200 dark:border-slate-800 shadow-sm dark:bg-black">
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white flex items-center gap-2">
                <GroupIcon className={`w-5 h-5 ${group.color}`} />
                {group.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {group.settings.map((setting) => {
                const SettingIcon = setting.icon;
                return (
                  <div
                    key={setting.key}
                    className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-lg flex items-center justify-center shadow-sm">
                        <SettingIcon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-slate-900 dark:text-white text-sm">
                          {setting.label}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {setting.description}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={privacySettings[setting.key]}
                      onCheckedChange={() => handleToggle(setting.key)}
                    />
                  </div>
                );
              })}
            </CardContent>
          </Card>
        );
      })}

      {/* Change Password */}
      <Card className="border border-slate-200 dark:border-slate-800 shadow-sm dark:bg-black">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-white flex items-center gap-2">
            <Key className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            Change Password
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <label className="text-sm text-slate-600 dark:text-slate-400 mb-1.5 block">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter current password"
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <div>
            <label className="text-sm text-slate-600 dark:text-slate-400 mb-1.5 block">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="text-sm text-slate-600 dark:text-slate-400 mb-1.5 block">
              Confirm New Password
            </label>
            <input
              type="password"
              placeholder="Confirm new password"
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white"
            />
          </div>
          <Button 
            className="w-full bg-green-600 hover:bg-green-700 text-white mt-2"
            onClick={() => toast.success('Password updated successfully')}
          >
            Update Password
          </Button>
        </CardContent>
      </Card>

      {/* Data & Privacy Info */}
      <Card className="border border-slate-200 dark:border-slate-800 shadow-sm dark:bg-black">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            Data & Privacy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors group">
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              <span className="text-slate-900 dark:text-white text-sm">Download My Data</span>
            </div>
            <ArrowLeft className="w-5 h-5 text-slate-400 rotate-180 group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors group"
            onClick={() => toast.error('This action requires confirmation')}
          >
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
              <span className="text-red-600 dark:text-red-400 text-sm">Delete My Account</span>
            </div>
            <ArrowLeft className="w-5 h-5 text-red-400 rotate-180 group-hover:translate-x-1 transition-transform" />
          </button>
        </CardContent>
      </Card>

      {/* Security Tips */}
      <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="text-blue-900 dark:text-blue-300 text-sm mb-1">Security Tips</h4>
            <ul className="text-xs text-blue-800 dark:text-blue-400 space-y-1">
              <li>• Use a strong, unique password</li>
              <li>• Enable two-factor authentication</li>
              <li>• Review your privacy settings regularly</li>
              <li>• Be cautious about sharing personal information</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
