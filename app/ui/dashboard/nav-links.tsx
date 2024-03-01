'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Discover', href: '/dashboard', icon: HomeIcon },
  {
    name: 'My Garage',
    href: '/dashboard/garage',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Add Car', href: '/dashboard/garage/add-vehicle', icon: UserGroupIcon },
  { name: 'New Diary Entry', href: '/', icon: UserGroupIcon },
  { name: 'Settings', href: '/dashboard/settings', icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-brown p-3 text-sm font-medium hover:bg-dun hover:text-night md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-dun text-night': pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
