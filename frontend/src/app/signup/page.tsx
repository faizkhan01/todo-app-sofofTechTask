'use client';

import { Suspense } from 'react';
import { SignupForm } from '@/components/SignupForm';

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<div>Loading...</div>}>
        <SignupForm />
      </Suspense>
    </div>
  );
}
