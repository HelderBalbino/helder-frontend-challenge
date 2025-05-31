import { memo, useId } from 'react';
import styled from 'styled-components';
import Todo from './Todo';
import type { Item } from '../types';

interface ListProps {
	className?: string;
	title: string;
	items: Item[];
	onToggle?: (id: number) => void;
	onAddSubtask?: (parentId: number, name: string) => void;
	onToggleSubtask?: (parentId: number, subtaskId: number) => void;
	dragHandleProps?: any;
}

const List = ({
	className,
	title,
	items,
	onToggle,
	onAddSubtask,
	onToggleSubtask,
	dragHandleProps,
}: ListProps) => {
	const headingId = useId();
	return (
		<section className={className} aria-labelledby={headingId}>
			<h2 id={headingId}>{title}</h2>
			{items.length === 0 ? (
				<p className='empty'>No {title.toLowerCase()} items yet.</p>
			) : (
				<ul>
					{items.map((item) => (
						<li key={item.id}>
							<Todo
								item={item}
								onToggle={onToggle}
								onAddSubtask={onAddSubtask}
								onToggleSubtask={onToggleSubtask}
								dragHandleProps={dragHandleProps}
							/>
						</li>
					))}
				</ul>
			)}
		</section>
	);
};

const StyledList = styled(memo(List))`
	display: flex;
	flex-direction: column;
	width: 100%;
	border-bottom: 1px solid ${({ theme }) => theme.colors.grey2};
	padding: 30px 0;

	h2 {
		font-weight: 700;
		margin-bottom: 20px;
	}

	.empty {
		font-style: italic;
		color: ${({ theme }) => theme.colors.grey3};
	}

	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}
`;

export default StyledList;
