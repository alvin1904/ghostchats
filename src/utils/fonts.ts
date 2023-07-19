import { Montserrat } from 'next/font/google';

export const montserratFont = Montserrat({
	weight: ['100', '200', '300', '400', '600', '800'],
	style: 'normal',
	subsets: ['latin'],
	variable: '--font-montserrat'
});
