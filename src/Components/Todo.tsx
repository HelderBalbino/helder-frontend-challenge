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
					<div className='todo-header'>
						<h3>{item.name}</h3>
						<div
							className={`checkbox ${
								item.completed ? 'completed' : ''
							}`}
							onClick={handleToggle}
						/>
					</div>
					{!item.completed && (
						<button
							className='add-subtask-btn'
							onClick={() => setIsExpanded(!isExpanded)}
						>
							{isExpanded ? 'Hide Subtasks' : 'Add Subtask'}
						</button>
					)}
				</div>
			</div>

			{isExpanded && !item.completed && (
				<div className='subtasks'>
					{item.subItems?.map((subtask) => (
						<div key={subtask.id} className='subtask'>
							<span className='subtask-name'>{subtask.name}</span>
							<div
								className={`checkbox subtask-checkbox ${
									subtask.completed ? 'completed' : ''
								}`}
								onClick={() => handleSubtaskToggle(subtask.id)}
							/>
						</div>
					))}
					<div className='add-subtask-input'>
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
	background-color: #2c2c34;
	border: 1px solid #3d3d47;
	border-radius: 8px;
	margin-bottom: 8px;
	padding: 16px;
	position: relative;

	.todo-main {
		display: flex;
		align-items: flex-start;
		gap: 12px;
	}

	.todo-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.todo-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}

	.todo-content h3 {
		margin: 0;
		font-size: 16px;
		font-weight: 600;
		color: white;
		font-family: ${(props) => props.theme.fonts.primary};
	}

	.add-subtask-btn {
		background: none;
		border: none;
		color: #666;
		cursor: pointer;
		font-size: 13px;
		padding: 0;
		text-align: left;
		display: flex;
		align-items: center;
		gap: 6px;
		margin-top: 4px;
	}

	.add-subtask-btn:hover {
		color: #999;
	}

	.checkbox {
		width: 24px;
		height: 24px;
		border: 2px solid ${(props) => props.theme.colors.primary};
		border-radius: 50%;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: transparent;
		transition: all 0.2s ease;
		flex-shrink: 0;
	}

	.checkbox.completed {
		background-color: ${(props) => props.theme.colors.primary};
		border-color: ${(props) => props.theme.colors.primary};
	}

	.checkbox.completed::after {
		content: '✓';
		color: white;
		font-size: 14px;
		font-weight: bold;
	}

	.subtasks {
		margin-top: 16px;
		margin-left: 36px;
		padding-left: 12px;
		border-left: 1px solid #3d3d47;
	}

	.subtask {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px 0;
		border-bottom: 1px solid #3d3d47;
	}

	.subtask:last-of-type {
		border-bottom: none;
	}

	.subtask-name {
		flex: 1;
		font-size: 14px;
		color: white;
		font-family: ${(props) => props.theme.fonts.primary};
	}

	.subtask-checkbox {
		width: 20px;
		height: 20px;
	}

	.add-subtask-input {
		margin-top: 12px;
		padding-top: 12px;
	}

	.add-subtask-input input {
		width: 100%;
		padding: 12px;
		border: 1px solid #3d3d47;
		border-radius: 6px;
		font-size: 14px;
		background-color: #1e1e24;
		color: white;
		font-family: ${(props) => props.theme.fonts.primary};
		box-sizing: border-box;
	}

	.add-subtask-input input::placeholder {
		color: #666;
	}

	.add-subtask-input input:focus {
		outline: none;
		border-color: ${(props) => props.theme.colors.primary};
	}
`;

export default StyledTodo;
