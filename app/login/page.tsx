'use client';

import { ToastProvider } from '@/components/Toaster';
import Login from '@/components/Login';

export default function LoginPage() {
  return (
    <ToastProvider>
      <Login />
    </ToastProvider>
  );
}
