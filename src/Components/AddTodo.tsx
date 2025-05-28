import { FormEvent, useState } from 'react';
import styled from 'styled-components';

interface AddTodoProps {
	className?: string;
	onSubmit: (name: string) => void;
}

const AddTodo = ({ className, onSubmit }: AddTodoProps) => {
	const [name, setName] = useState('');

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		const trimmedName = name.trim();
		if (!trimmedName) return; // Prevent submission if the input is empty or only contains whitespace
		onSubmit(trimmedName); // Call the onSubmit prop with the trimmed name
		setName(''); // Clear the input field after submission
	};

	return (
		<div className={className}>
			<form
				onSubmit={(e) => {
					handleSubmit(e);
				}}
			>
				<input
					placeholder='Enter new Todo...'
					onChange={(e) => setName(e.target.value)}
				/>
				<button type='submit' />
			</form>
		</div>
	);
};

const StyledAddTodo = styled(AddTodo)`
	width: 100%;
	margin-bottom: 40px;
	z-index: ${(props) => props.theme.zLayers.overlay};
	form {
		display: flex;
		position: relative;
		border-radius: 24px;
		overflow: hidden;
	}
	input {
		flex: 1;
		padding: 20px 24px;
		background-color: ${(props) => props.theme.colors.grey2};
		border: 2px solid ${(props) => props.theme.colors.grey1};
		border-radius: 24px;
		font-family: ${(props) => props.theme.fonts.primary};
		font-weight: 300;
		font-size: 16px;
		color: ${(props) => props.theme.colors.text};

		&::placeholder {
			color: ${(props) => props.theme.colors.text};
			font-weight: 300;
		}
	}
	button {
		width: 48px;
		height: 48px;
		position: absolute;
		top: 50%;
		right: 4px;
		transform: translateY(-50%);
		background-color: ${(props) => props.theme.colors.primary};
		border: none;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		&:before {
			background-image: url('Plus.svg');
			background-size: contain;
			content: '';
			width: 20px;
			height: 20px;
		}
	}
`;

export default StyledAddTodo;
