import { Button } from './ui/button';
import { CheckCircle, Clock, Mail, Phone } from 'lucide-react';

interface VerificationPendingProps {
  onBackToHome?: () => void;
}

export function VerificationPending({ onBackToHome }: VerificationPendingProps) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black flex items-center justify-center py-8 px-4">
      <div className="max-w-[480px] w-full">
        <div className="bg-white dark:bg-[#141414] rounded-xl shadow-lg border-2 border-green-500 dark:border-green-600 p-8">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-950/30 flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-500" />
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-slate-900 dark:text-white mb-3">
              Registration Received!
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Your registration has been received. Our team will verify your details shortly.
            </p>
          </div>

          {/* Info Card */}
          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-green-600 dark:text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-1">
                  What happens next?
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Once verified, you'll get access to your dashboard and new service requests. This usually takes 24-48 hours.
                </p>
              </div>
            </div>
          </div>

          {/* Status Details */}
          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-[#1A1A1A] rounded-lg border border-slate-200 dark:border-slate-800">
              <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-950/30 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-900 dark:text-white mb-1">Application Submitted</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Your details have been received successfully</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-[#1A1A1A] rounded-lg border border-slate-200 dark:border-slate-800">
              <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-950/30 flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 text-orange-600 dark:text-orange-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-900 dark:text-white mb-1">Verification in Progress</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Our team is reviewing your documents</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-[#1A1A1A] rounded-lg border border-slate-200 dark:border-slate-800 opacity-50">
              <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-4 h-4 text-slate-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-900 dark:text-white mb-1">Account Activation</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">You'll receive login credentials via email</p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-slate-50 dark:bg-[#1A1A1A] rounded-lg p-4 mb-6 border border-slate-200 dark:border-slate-800">
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
              Need help or have questions?
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-green-600 dark:text-green-500" />
                <a href="mailto:support@society.com" className="text-xs text-green-600 dark:text-green-500 hover:underline">
                  support@society.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-green-600 dark:text-green-500" />
                <a href="tel:+923001234567" className="text-xs text-green-600 dark:text-green-500 hover:underline">
                  +92 300 1234567
                </a>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <Button
            onClick={onBackToHome}
            className="w-full h-12 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md"
          >
            Back to Home
          </Button>

          {/* Check Status Link */}
          <div className="text-center mt-4">
            <a href="#" className="text-sm text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400">
              Check Application Status
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
