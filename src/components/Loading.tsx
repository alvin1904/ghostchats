type Props = {
	size?: number;
	color?: string;
};
export default function Loading(props: Props) {
	return (
		<div className="loading">
			loading...<span
				className="loader"
				style={{
					height: `${props.size || 15}px`,
					width: `${props.size || 15}px`,
					borderColor: `transparent ${props.color || '#000'} transparent transparent`
				}}
			></span>
		</div>
	);
}
