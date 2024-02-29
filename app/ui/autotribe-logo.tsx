import Image from 'next/image';
export default function logo() {
  return (
    <Image
      src="/autotribe.svg"
      alt="Autotribe Logo"
      width={200}
      height={60}
      priority
    />
  );
}
