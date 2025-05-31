import { useState } from 'react';
import { styled } from 'styled-components';
import Handle from './Handle';
import type { Item } from '../types';

interface TodoProps {
	className?: string;
	item: Item;
	onToggle?: (id: number) => void;
	onAddSubtask?: (parentId: number, name: string) => void;
	onToggleSubtask?: (parentId: number, subtaskId: number) => void;
	dragHandleProps?: any;
}

const Todo = ({
	className,
	item,
	onToggle,
	onAddSubtask,
	onToggleSubtask,
	dragHandleProps,
}: TodoProps) => {
	const [isExpanded, setIsExpanded] = useState(
		item.subItems && item.subItems.length > 0,
	);
	const [newSubtaskName, setNewSubtaskName] = useState('');

	const handleToggle = () => {
		onToggle?.(item.id);
	};

	const handleSubtaskToggle = (subtaskId: number) => {
		onToggleSubtask?.(item.id, subtaskId);
	};

	const handleAddSubtask = () => {
		if (newSubtaskName.trim()) {
			onAddSubtask?.(item.id, newSubtaskName.trim());
			setNewSubtaskName('');
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleAddSubtask();
		}
	};

	return (
		<div className={className}>
			<div className='todo-main'>
				<Handle {...dragHandleProps} />
				<div className='todo-content'>
					<h3>{item.name}</h3>
					<button
						className='add-subtask-btn'
						onClick={() => setIsExpanded(!isExpanded)}
					>
						{isExpanded ? '- Hide Subtasks' : '+ Add Subtask'}
					</button>
				</div>
				<div
					className={`checkbox ${item.completed ? 'completed' : ''}`}
					onClick={handleToggle}
				/>
			</div>

			{isExpanded && (
				<div className='subtasks'>
					{item.subItems?.map((subtask) => (
						<div key={subtask.id} className='subtask'>
							<span className='subtask-name'>{subtask.name}</span>
							<div
								className={`checkbox ${
									subtask.completed ? 'completed' : ''
								}`}
								onClick={() => handleSubtaskToggle(subtask.id)}
							/>
						</div>
					))}
					<div className='add-subtask'>
						<input
							type='text'
							placeholder='Enter Subtask'
							value={newSubtaskName}
							onChange={(e) => setNewSubtaskName(e.target.value)}
							onKeyPress={handleKeyPress}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

const StyledTodo = styled(Todo)`
	width: 100%;
	background-color: ${(props) => props.theme.colors.grey4};
	border-radius: 8px;
	margin-bottom: 12px;
	padding: 16px;

	.todo-main {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-bottom: 8px;
	}

	.todo-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.todo-content h3 {
		margin: 0;
		font-size: 16px;
		font-weight: 500;
		color: ${(props) => props.theme.colors.grey1};
	}

	.add-subtask-btn {
		background: none;
		border: none;
		color: ${(props) => props.theme.colors.primary};
		cursor: pointer;
		font-size: 14px;
		padding: 0;
		text-align: left;
	}

	.checkbox {
		width: 20px;
		height: 20px;
		border: 2px solid ${(props) => props.theme.colors.primary};
		border-radius: 50%;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: transparent;
		transition: all 0.2s ease;
	}

	.checkbox.completed {
		background-color: ${(props) => props.theme.colors.primary};
	}

	.checkbox.completed::after {
		content: '✓';
		color: white;
		font-size: 12px;
		font-weight: bold;
	}

	.subtasks {
		margin-left: 32px;
		border-left: 2px solid ${(props) => props.theme.colors.grey3};
		padding-left: 16px;
	}

	.subtask {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 8px 0;
		border-bottom: 1px solid ${(props) => props.theme.colors.grey3};
	}

	.subtask:last-of-type {
		border-bottom: none;
	}

	.subtask-name {
		flex: 1;
		font-size: 14px;
		color: ${(props) => props.theme.colors.grey2};
	}

	.add-subtask {
		margin-top: 12px;
	}

	.add-subtask input {
		width: 100%;
		padding: 8px 12px;
		border: 1px solid ${(props) => props.theme.colors.grey3};
		border-radius: 4px;
		font-size: 14px;
		background-color: ${(props) => props.theme.colors.grey4};
		color: ${(props) => props.theme.colors.grey1};
	}

	.add-subtask input::placeholder {
		color: ${(props) => props.theme.colors.grey2};
	}

	.add-subtask input:focus {
		outline: none;
		border-color: ${(props) => props.theme.colors.primary};
	}
`;

export default StyledTodo;
