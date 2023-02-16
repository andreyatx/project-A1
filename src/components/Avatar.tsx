import basedge from '../assets/Basedge.png';

export const Avatar = () => {
	return (
		<div className="avatar">
			<div className="w-8 rounded-full">
				<img src={basedge} alt="avatar picture" />
			</div>
		</div>
	);
};
