import Link from 'next/link';
import NavLinks from '@/app/ui/navigation/nav-links';
import Logo from '@/app/ui/autotribe-logo';
import { PowerIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { fetchUserProfileById } from '@/app/lib/data';
import Image from 'next/image';
import { signOut } from '@/auth';
import { auth } from '@/auth';

export default async function SideNav() {
  const session = await auth();
  const userId = session?.user?.id || '';
  const user = await fetchUserProfileById(userId);

  const profile_pic = user?.profile_pic || '';

  return (
    <div className="flex h-full flex-col bg-gray-800 px-3 py-4 shadow-lg md:px-2">
      {/* Logo */}
      <Link
        className="mb-4 flex h-16 items-center justify-center rounded-lg p-3"
        href="/"
      >
        <Logo />
      </Link>

      {/* Main navigation container */}
      <div className="flex grow flex-col space-y-4">
        {/* User profile card */}
        <div className="hidden w-full flex-col items-center rounded-xl bg-gray-700 p-5 shadow-md md:flex">
          <div className="relative mb-3 aspect-square h-24 w-24 overflow-hidden rounded-full border-2 border-gray-600 bg-gray-800 shadow-lg">
            {profile_pic ? (
              <Image
                alt={`${user?.first_name || 'User'}'s profile picture`}
                src={profile_pic}
                fill
                sizes="96px"
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <UserCircleIcon className="h-16 w-16 text-gray-500" />
              </div>
            )}
          </div>
          <h3 className="text-lg font-medium text-white">
            {user?.first_name} {user?.last_name}
          </h3>
          <p className="text-sm text-gray-400">@{user?.username}</p>
        </div>

        {/* Navigation links */}
        <div className="space-y-2">
          <NavLinks />
        </div>

        {/* Spacer */}
        <div className="hidden h-auto w-full grow md:block"></div>

        {/* Sign out button */}
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-gray-700 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-red-500/20 hover:text-red-400 md:justify-start">
            <PowerIcon className="h-5 w-5" />
            <span className="hidden md:block">Sign Out</span>
          </button>
        </form>
      </div>
    </div>
  );
}
