import LoginStep from '@/componants/auth/LoginStep';
import { Suspense } from 'react';
export const metadata = {
  title: 'Login | Feel Safe Sakhi Yojana',
  description:
    'Feel Safe Sakhi Yojana portal me secure login karein. Apna dashboard access karein aur mahila sashaktikaran ke safar me judein.',
  openGraph: {
    title: 'Login | Feel Safe Sakhi Yojana',
    description:
      'Feel Safe Sakhi Yojana portal me secure login karein. Apna dashboard access karein aur mahila sashaktikaran ke safar me judein.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Login | Feel Safe Sakhi Yojana',
    description:
      'Feel Safe Sakhi Yojana portal me secure login karein. Apna dashboard access karein aur mahila sashaktikaran ke safar me judein.',
  },
};

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginStep />
    </Suspense>
  );
}
