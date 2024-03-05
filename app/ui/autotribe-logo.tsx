import Image from 'next/image';
import Link from 'next/link';
export default function Logo() {
  return (
    <Link href={'/'}>
    <Image
      src="/autotribe.svg"
      alt="Autotribe Logo"
      width={200}
      height={60}
      priority
    />
    </Link>
  );
}
