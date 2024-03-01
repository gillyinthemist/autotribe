import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import Logo from '@/app/ui/autotribe-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { fetchUserProfileById } from '@/app/lib/data';
import Image from 'next/image';

// import { signOut } from '@/auth';

export default async function SideNav() {
  const user = await fetchUserProfileById(
    '410544b2-4001-4271-9855-fec4b6a6442a',
  );

  const profile_pic = user?.profile_pic || '' ;

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-center justify-center  rounded-md bg-blue-600 p-4"
        href="/"
      >
        <Logo />
      </Link>

      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <div className="hidden h-96 w-full flex-col p-6 items-center gap-5 rounded-md bg-brown md:flex">
          <div className="overflow-hidden rounded-full">
            <Image
              alt="user"
              src={profile_pic}
              height={100}
              width={100}
              className="h-full w-full"
            />
          </div>
          <p>{user?.first_name} {user?.first_name}</p>
          <p><strong>{user?.username}</strong></p>
        </div>
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-brown md:block"></div>
        <form
        // action={async () => {
        //   'use server';
        //   await signOut();
        // }}
        >
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-brown p-3 text-sm font-medium hover:bg-dun hover:text-night md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
