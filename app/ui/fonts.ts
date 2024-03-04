import { Open_Sans } from 'next/font/google';
import localFont from 'next/font/local';

export const numberPlate = localFont({
  src: '../../public/fonts/UKNumberPlate.ttf',
});

export const openSans = Open_Sans({
  weight: ['500', '700'],
  subsets: ['latin'],
});
