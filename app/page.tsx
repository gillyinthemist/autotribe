import Logo from '@/app/ui/autotribe-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6 md:max-h-screen">
      <div className="flex h-20 w-full rounded-lg bg-raisin p-4 md:h-52 md:px-20">
        {<Logo />}
      </div>
      <div className="mt-4 flex flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-mag px-6 py-10 md:w-1/5 md:px-20">
          <p className={`text-xl text-night md:text-3xl md:leading-normal `}>
            <strong>Welcome to Autotribe.</strong> The app that lets you keep
            track of your pride and joys and get inspired by others
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
          <Link
            href="/register"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Register</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>

        {/* Add Hero Images Here */}
        <Image
          src="/desktop-hero.jpg"
          width={1000}
          height={500}
          className="hidden max-w-full flex-grow rounded-lg object-cover md:block"
          alt="Screenshots of the dashboard project showing desktop version"
        />
        <Image
          src="/mobile-hero.jpg"
          width={560}
          height={620}
          className="block w-full rounded-lg md:hidden "
          alt="Screenshots of the dashboard project showing mobile version"
        />
      </div>
    </main>
  );
}
