'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  PencilSquareIcon,
  EyeIcon,
  WrenchIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Garage', href: '/garage', icon: HomeIcon },
  { name: 'Add Car', href: '/garage/add-vehicle', icon: PencilSquareIcon },
  {
    name: 'Discover',
    href: '/garage/discover',
    icon: EyeIcon,
  },
  { name: 'Settings', href: '/garage/settings', icon: WrenchIcon },
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
              },
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
