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
				<div>
					{items.map((item) => (
						<Todo
							key={item.id}
							item={item}
							onToggle={onToggle}
							onAddSubtask={onAddSubtask}
							onToggleSubtask={onToggleSubtask}
							dragHandleProps={dragHandleProps}
						/>
					))}
				</div>
			)}
		</section>
	);
};

const StyledList = styled(memo(List))`
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 0 0 32px 0;

	h2 {
		font-weight: 600;
		font-size: 18px;
		color: white;
		margin-bottom: 16px;
		margin-top: 24px;
		padding: 8px 12px;
		background-color: transparent;
		border: 1px solid #3d3d47;
		border-radius: 6px;
		text-align: left;
		font-family: ${({ theme }) => theme.fonts.primary};
	}

	h2:first-of-type {
		margin-top: 0;
	}

	.empty {
		font-style: italic;
		color: ${({ theme }) => theme.colors.grey3};
		text-align: center;
		padding: 24px;
	}

	div {
		display: flex;
		flex-direction: column;
	}
`;

export default StyledList;
