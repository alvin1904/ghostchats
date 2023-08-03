import styles from "@/app/styles/popover.module.css";
type ThemeProps = {
	name: string;
};
export default function Theme(props: ThemeProps) {
	return (
		<div className={styles.themeListed}>
			<span className={styles.circle} />
			{props.name}
		</div>
	);
}
