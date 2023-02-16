import { type FC } from 'react';

import basedge from '../assets/Basedge.png';

type AvatarProps = {
	avatar?: string;
};

export const Avatar: FC<AvatarProps> = ({ avatar }) => {
	return (
		<div className="avatar">
			<div className="w-8 rounded-full">{avatar || <img src={basedge} alt="avatar picture" />}</div>
		</div>
	);
};
