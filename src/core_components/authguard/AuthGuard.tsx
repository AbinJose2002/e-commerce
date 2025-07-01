// components/AuthGuard.tsx
'use client'

import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

type Props = {
  children: React.ReactNode;
};

const AuthGuard = ({ children }: Props) => {
  const isLogged = useSelector((state: RootState) => state.authReducer.isLogged);
  const router = useRouter();

  useEffect(() => {
    if (!isLogged) {
      router.push('/login'); // Redirect to login
    }
  }, [isLogged, router]);

  // Optionally show loading or null while redirecting
  if (!isLogged) return null;

  return <>{children}</>;
};

export default AuthGuard;
