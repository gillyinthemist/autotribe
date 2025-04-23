import Logo from '@/app/ui/autotribe-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col bg-black p-4 md:p-6 lg:p-8">
      {/* Header with logo */}
      <div className="flex h-16 w-full items-center rounded-lg bg-raisin p-4 md:h-24 md:px-10 lg:h-28 lg:px-20">
        <Logo />
      </div>

      {/* Main content container */}
      <div className="mt-6 flex flex-1 flex-col gap-6 md:mt-8 md:flex-row md:gap-8 lg:mt-10 lg:gap-12">
        {/* Left sidebar with welcome text and buttons */}
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-mag px-6 py-8 md:w-2/5 md:px-10 lg:w-1/4 lg:px-16">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-night md:text-3xl lg:text-4xl">
              Welcome to Autotribe.
            </h1>
            <p className="text-lg text-night md:text-xl">
              The app that lets you keep track of your pride and joys and get
              inspired by others
            </p>
          </div>

          <div className="mt-4 flex flex-col gap-4">
            <Link
              href="/login"
              className="flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-blue-400"
            >
              <span>Log in</span> <ArrowRightIcon className="w-5" />
            </Link>
            <Link
              href="/register"
              className="flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-blue-400"
            >
              <span>Register</span> <ArrowRightIcon className="w-5" />
            </Link>
          </div>
        </div>

        {/* Hero images container with better responsive handling */}
        <div className="flex flex-1 items-center justify-center">
          {/* Desktop hero image */}
          <div className="relative hidden h-full w-full md:block">
            <Image
              src="/desktop-hero.png"
              fill
              className="rounded-lg object-contain"
              sizes="(min-width: 1024px) 70vw, (min-width: 768px) 60vw, 100vw"
              priority
              alt="Screenshots of Autotribe dashboard showing vehicle management features"
            />
          </div>

          {/* Mobile hero image */}
          <Image
            src="/mobile-hero.png"
            width={560}
            height={620}
            className="max-h-[70vh] w-full rounded-lg object-contain md:hidden"
            priority
            alt="Screenshots of Autotribe mobile app showing vehicle management features"
          />
        </div>
      </div>
    </main>
  );
}
