"use client"

import styles from '@/app/styles/home.module.css';
import { montserratFont } from '@/utils/fonts';
import Gradients from '@/components/home/Gradients';
import Header from '@/components/home/Header';
import MainSection from '@/components/home/MainSection';

export const FontStyling = () => (
	<style jsx global>{`
		html {
			font-family: ${montserratFont.style.fontFamily};
		}
	`}</style>
);
export default function Home() {
	return (
		<main className={styles.main}>
			<FontStyling />
			<Gradients />
			<section className={styles.section}>
				<Header />
				<MainSection />
			</section>
		</main>
	);
}
