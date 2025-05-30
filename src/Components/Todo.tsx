import { styled } from 'styled-components';
import Handle from './Handle';

interface TodoProps {
	className?: string;
	id: number;
	name: string;
	completed: boolean;
	onToggle?: (id: number) => void;
	dragHandleProps?: any;
}

const Todo = ({
	className,
	id,
	name,
	completed,
	onToggle,
	dragHandleProps,
}: TodoProps) => {
	const handleToggle = () => {
		onToggle?.(id);
	};

	return (
		<li className={className}>
			<Handle {...dragHandleProps} />
			<input
				type='checkbox'
				checked={completed}
				onChange={handleToggle}
				id={`todo-${id}`}
			/>
			<label htmlFor={`todo-${id}`}>{name}</label>
		</li>
	);
};

const StyledTodo = styled(Todo)`
	width: 100%;
	background-color: ${(props) => props.theme.colors.grey4};
	display: flex;
	align-items: center;
	padding: 12px;
	border-radius: 4px;
	margin-bottom: 8px;
	gap: 12px;

	input[type='checkbox'] {
		margin: 0;
		cursor: pointer;
	}

	label {
		flex: 1;
		cursor: pointer;
		text-decoration: ${(props) =>
			props.completed ? 'line-through' : 'none'};
		opacity: ${(props) => (props.completed ? 0.6 : 1)};
	}
`;

export default StyledTodo;
