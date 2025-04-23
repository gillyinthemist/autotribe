'use client';

import {
  HomeIcon,
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
        const isActive =
          pathname === link.href ||
          (link.href !== '/garage' && pathname.startsWith(link.href));

        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-12 items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
              {
                'bg-blue-500 text-white shadow-md': isActive,
                'bg-gray-700 text-gray-300 hover:bg-gray-600/70 hover:text-white':
                  !isActive,
              },
            )}
          >
            <LinkIcon className="h-5 w-5" />
            <span className="hidden md:block">{link.name}</span>
          </Link>
        );
      })}
    </>
  );
}
