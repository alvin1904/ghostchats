"use client";

import styles from "@/app/styles/home.module.css";
import { montserratFont } from "@/utils/fonts";
import Gradients from "@/components/home/Gradients";
import Header from "@/components/home/Header";
import MainSection from "@/components/home/MainSection";
import Copyright from "@/components/home/Copyright";

export default function Home() {
	return (
		<main className={styles.main}>
			<style jsx global>{`
				html {
					font-family: ${montserratFont.style.fontFamily};
				}
			`}</style>
			<Gradients />
			<section className={styles.section}>
				<Header />
				<MainSection />
			</section>
			<Copyright />
		</main>
	);
}
