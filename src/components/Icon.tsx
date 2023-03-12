import { ArrowRightCircleIcon, CheckCircleIcon, RectangleStackIcon } from '@heroicons/react/24/solid';
import { type FC, type ReactElement } from 'react';

export enum IconNames {
	Backlog = 'BACKLOG',
	InProgress = 'IN_PROGRESS',
	Done = 'DONE',
}

export const ICON_LIST: {
	[index: string]: ReactElement;
} = {
	BACKLOG: <RectangleStackIcon className="h-4 w-4 text-gray-400" />,
	IN_PROGRESS: <ArrowRightCircleIcon className="h-4 w-4 text-yellow-300" />,
	DONE: <CheckCircleIcon className="h-4 w-4 text-green-500" />,
};

type IconProps = {
	iconName: string;
};

export const Icon: FC<IconProps> = ({ iconName }): ReactElement => {
	return <>{ICON_LIST[iconName]}</>;
};
