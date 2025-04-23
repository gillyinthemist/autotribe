import Logo from '@/app/ui/autotribe-logo';
import LoginForm from '../ui/login-form';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col bg-black p-4 md:p-6 lg:p-8">
      {/* Back to home link */}
      <Link
        href="/"
        className="mb-4 flex w-fit items-center gap-1 text-sm text-gray-300 transition-colors hover:text-white md:mb-6"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        <span>Back to home</span>
      </Link>

      {/* Login container with improved styling */}
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center">
        <div className="w-full rounded-lg bg-raisin p-6 shadow-xl md:p-8">
          {/* Logo with spacing */}
          <div className="mb-6 flex justify-center">
            <Logo />
          </div>

          {/* Login form */}
          <LoginForm />

          {/* Register link */}
          <div className="mt-8 text-center text-sm text-gray-300">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-white hover:text-blue-300">
              Register here
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
