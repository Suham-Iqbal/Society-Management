import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { 
  ArrowLeft, 
  Smartphone, 
  Wifi,
  Database,
  Download,
  Image,
  Volume2,
  Vibrate,
  BellRing,
  Zap,
  Gauge,
  HardDrive
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface AppPreferencesProps {
  onBack: () => void;
}

export function AppPreferences({ onBack }: AppPreferencesProps) {
  const [preferences, setPreferences] = useState({
    autoUpdate: true,
    wifiOnlyDownloads: true,
    autoPlayVideos: false,
    hdImages: true,
    soundEffects: true,
    vibration: true,
    pushNotifications: true,
    backgroundSync: true,
    lowDataMode: false,
    autoDownloadUpdates: false,
  });

  const handleToggle = (key: keyof typeof preferences) => {
    setPreferences(prev => {
      const newValue = !prev[key];
      toast.success(newValue ? 'Enabled' : 'Disabled');
      return { ...prev, [key]: newValue };
    });
  };

  const settingsGroups = [
    {
      title: 'Network & Data',
      icon: Wifi,
      color: 'text-blue-600 dark:text-blue-400',
      settings: [
        {
          key: 'autoUpdate' as const,
          label: 'Auto-Update Content',
          description: 'Automatically refresh feed and updates',
          icon: Download,
        },
        {
          key: 'wifiOnlyDownloads' as const,
          label: 'WiFi Only Downloads',
          description: 'Download large files only on WiFi',
          icon: Wifi,
        },
        {
          key: 'lowDataMode' as const,
          label: 'Low Data Mode',
          description: 'Reduce data usage across the app',
          icon: Gauge,
        },
        {
          key: 'backgroundSync' as const,
          label: 'Background Sync',
          description: 'Sync data in the background',
          icon: Database,
        },
      ]
    },
    {
      title: 'Media & Display',
      icon: Image,
      color: 'text-purple-600 dark:text-purple-400',
      settings: [
        {
          key: 'autoPlayVideos' as const,
          label: 'Auto-Play Videos',
          description: 'Automatically play videos in feed',
          icon: Image,
        },
        {
          key: 'hdImages' as const,
          label: 'HD Images',
          description: 'Load high-quality images',
          icon: HardDrive,
        },
      ]
    },
    {
      title: 'Sound & Haptics',
      icon: Volume2,
      color: 'text-orange-600 dark:text-orange-400',
      settings: [
        {
          key: 'soundEffects' as const,
          label: 'Sound Effects',
          description: 'Play sounds for actions',
          icon: Volume2,
        },
        {
          key: 'vibration' as const,
          label: 'Vibration',
          description: 'Vibrate on notifications and actions',
          icon: Vibrate,
        },
      ]
    },
    {
      title: 'Notifications',
      icon: BellRing,
      color: 'text-green-600 dark:text-green-400',
      settings: [
        {
          key: 'pushNotifications' as const,
          label: 'Push Notifications',
          description: 'Receive push notifications',
          icon: BellRing,
        },
      ]
    },
    {
      title: 'Advanced',
      icon: Zap,
      color: 'text-red-600 dark:text-red-400',
      settings: [
        {
          key: 'autoDownloadUpdates' as const,
          label: 'Auto-Download App Updates',
          description: 'Automatically download new versions',
          icon: Download,
        },
      ]
    }
  ];

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
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
            <Smartphone className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-slate-900 dark:text-white">App Preferences</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Customize your app experience</p>
          </div>
        </div>
      </div>

      {/* Settings Groups */}
      {settingsGroups.map((group, groupIndex) => {
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
                      checked={preferences[setting.key]}
                      onCheckedChange={() => handleToggle(setting.key)}
                    />
                  </div>
                );
              })}
            </CardContent>
          </Card>
        );
      })}

      {/* Storage Info */}
      <Card className="border border-slate-200 dark:border-slate-800 shadow-sm bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 dark:bg-black">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-lg flex items-center justify-center shadow-sm">
              <HardDrive className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <h4 className="text-slate-900 dark:text-white mb-2">Storage Usage</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">App Data</span>
                  <span className="text-slate-900 dark:text-white">45.2 MB</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">Cache</span>
                  <span className="text-slate-900 dark:text-white">12.8 MB</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mt-3">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full" style={{ width: '35%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Clear Cache Button */}
      <Button
        variant="outline"
        className="w-full text-red-600 border-red-200 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950 h-12"
        onClick={() => toast.success('Cache cleared successfully')}
      >
        <HardDrive className="w-5 h-5 mr-2" />
        Clear Cache (12.8 MB)
      </Button>
    </div>
  );
}
