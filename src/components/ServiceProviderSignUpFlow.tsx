import { useState } from 'react';
import { ServiceProviderSignUp } from './ServiceProviderSignUp';
import { VerificationPending } from './VerificationPending';

interface ServiceProviderSignUpFlowProps {
  onSignup?: () => void;
  onNavigateToLogin?: () => void;
  onNavigateToUserSignup?: () => void;
}

export function ServiceProviderSignUpFlow({ 
  onSignup,
  onNavigateToLogin,
  onNavigateToUserSignup 
}: ServiceProviderSignUpFlowProps) {
  const [showVerificationPending, setShowVerificationPending] = useState(false);

  const handleSubmit = () => {
    setShowVerificationPending(true);
  };

  const handleBackToHome = () => {
    onNavigateToLogin?.();
  };

  if (showVerificationPending) {
    return <VerificationPending onBackToHome={handleBackToHome} />;
  }

  return <ServiceProviderSignUp onSubmit={handleSubmit} onNavigateToLogin={onNavigateToLogin} />;
}