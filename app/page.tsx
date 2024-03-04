import Logo from '@/app/ui/autotribe-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col md:justify-center  p-6">
      <div className="flex h-20 md:justify-center md:self-center rounded-lg bg-raisin p-4 md:h-52 md:w-2/5 md:px-20">
        {<Logo />}
      </div>
      <div className="mt-4 flex flex-col gap-4">
        <div className="flex flex-col flex-grow justify-center gap-6 self-center rounded-lg bg-mag px-6 py-10 md:w-2/5 md:px-20">
          <p className={`text-xl text-night md:text-3xl md:leading-normal `}>
            <strong>Welcome to Autotribe.</strong> The app that lets you keep track of your pride and joys and get inspired by others
          </p>
          <Link href="/login" className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base">
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
      </div>
    </main>
  );
}
