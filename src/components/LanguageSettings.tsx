import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, 
  Globe, 
  Check,
  Languages
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface LanguageSettingsProps {
  onBack: () => void;
}

const languages = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    description: 'US English'
  },
  {
    code: 'ur',
    name: 'Urdu',
    nativeName: 'اردو',
    flag: '🇵🇰',
    description: 'Pakistani Urdu'
  }
];

const regions = [
  {
    code: 'PK',
    name: 'Pakistan',
    currency: 'PKR (₨)',
    flag: '🇵🇰'
  },
  {
    code: 'US',
    name: 'United States',
    currency: 'USD ($)',
    flag: '🇺🇸'
  }
];

export function LanguageSettings({ onBack }: LanguageSettingsProps) {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedRegion, setSelectedRegion] = useState('PK');

  const handleLanguageChange = (code: string) => {
    setSelectedLanguage(code);
    const language = languages.find(l => l.code === code);
    toast.success(`Language changed to ${language?.name}`);
  };

  const handleRegionChange = (code: string) => {
    setSelectedRegion(code);
    const region = regions.find(r => r.code === code);
    toast.success(`Region changed to ${region?.name}`);
  };

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
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center shadow-lg">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-slate-900 dark:text-white">Language & Region</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Customize your language preferences</p>
          </div>
        </div>
      </div>

      {/* Language Selection */}
      <Card className="border border-slate-200 dark:border-slate-800 shadow-sm dark:bg-black">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-white flex items-center gap-2">
            <Languages className="w-5 h-5 text-green-600 dark:text-green-400" />
            App Language
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`w-full p-4 rounded-lg border transition-all ${
                selectedLanguage === language.code
                  ? 'border-green-600 bg-green-50 dark:bg-green-950/20'
                  : 'border-slate-200 dark:border-slate-800 hover:border-green-400 dark:hover:border-green-600 bg-white dark:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{language.flag}</span>
                  <div className="text-left">
                    <h4 className="text-slate-900 dark:text-white">
                      {language.name}
                    </h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {language.nativeName}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                      {language.description}
                    </p>
                  </div>
                </div>
                {selectedLanguage === language.code && (
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                )}
              </div>
            </button>
          ))}
        </CardContent>
      </Card>

      {/* Region Selection */}
      <Card className="border border-slate-200 dark:border-slate-800 shadow-sm dark:bg-black">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            Region & Currency
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {regions.map((region) => (
            <button
              key={region.code}
              onClick={() => handleRegionChange(region.code)}
              className={`w-full p-4 rounded-lg border transition-all ${
                selectedRegion === region.code
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/20'
                  : 'border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 bg-white dark:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{region.flag}</span>
                  <div className="text-left">
                    <h4 className="text-slate-900 dark:text-white">
                      {region.name}
                    </h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {region.currency}
                    </p>
                  </div>
                </div>
                {selectedRegion === region.code && (
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                )}
              </div>
            </button>
          ))}
        </CardContent>
      </Card>

      {/* Current Selection Info */}
      <Card className="border border-slate-200 dark:border-slate-800 shadow-sm bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 dark:bg-black">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-lg flex items-center justify-center shadow-sm">
              <Check className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1">
              <h4 className="text-slate-900 dark:text-white mb-1">Current Settings</h4>
              <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                <p>
                  <span className="text-slate-500 dark:text-slate-500">Language:</span>{' '}
                  <span className="text-slate-900 dark:text-white">
                    {languages.find(l => l.code === selectedLanguage)?.name}
                  </span>
                </p>
                <p>
                  <span className="text-slate-500 dark:text-slate-500">Region:</span>{' '}
                  <span className="text-slate-900 dark:text-white">
                    {regions.find(r => r.code === selectedRegion)?.name}
                  </span>
                </p>
                <p>
                  <span className="text-slate-500 dark:text-slate-500">Currency:</span>{' '}
                  <span className="text-slate-900 dark:text-white">
                    {regions.find(r => r.code === selectedRegion)?.currency}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Info Note */}
      <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg p-4">
        <p className="text-sm text-blue-900 dark:text-blue-300">
          <strong>Note:</strong> Language changes will take effect immediately. Some content may require app restart to fully update.
        </p>
      </div>
    </div>
  );
}
