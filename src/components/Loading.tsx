type Props = {
	size?: number;
};
export default function Loading(props: Props) {
	return (
		<div className="loading">
			loading...<span
				className="loader"
				style={{
					height: `${props.size || 15}px`,
					width: `${props.size || 15}px`
				}}
			></span>
		</div>
	);
}
