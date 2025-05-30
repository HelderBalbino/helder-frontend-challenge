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
			<form onSubmit={handleSubmit}>
				<label htmlFor='new-todo' className='sr-only'></label>
				<input
					id='new-todo'
					type='text'
					name='new-todo'
					autoComplete='off'
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder='Enter new todo...'
				/>
				<button
					type='submit'
					disabled={!name.trim()}
					aria-label='Add Todo'
				>
					<img src='Plus.svg' alt='' width={20} height={20} />
				</button>
			</form>
		</div>
	);
};

const StyledAddTodo = styled(AddTodo)`
	width: 100%;
	max-width: 800px;
	margin: 0 auto 30px;
	z-index: ${(props) => props.theme.zLayers.overlay};
	form {
		display: flex;
		position: relative;
		overflow: visible; // Allow the button to overflow the input field
	}

	input {
		flex: 1;
		height: 40px;
		padding: 0px 20px;
		background-color: ${(props) => props.theme.colors.grey2};
		border: 1px solid ${(props) => props.theme.colors.grey3};
		border-radius: 50px;
		font-family: ${(props) => props.theme.fonts.primary};
		font-size: 16px;
		font-weight: 300;
		color: ${(props) => props.theme.colors.text};

		&::placeholder {
			color: ${(props) => props.theme.colors.text};
			font-weight: 300;
		}
		&:focus {
			outline: none;
			border-color: ${(props) => props.theme.colors.primary};
		}
	}
	button {
		width: 40px;
		height: 40px;
		position: absolute;
		top: 50%;
		right: -60px;
		transform: translateY(-50%);
		border: none;
		border-radius: 50%;
		background-color: ${(props) => props.theme.colors.primary};
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: background-color 0.2s, opacity 0.2s;
		&:hover:not(:disabled) {
			background-color: ${(props) => props.theme.colors.primary};
		}
		&:disabled {
			background-color: ${(props) => props.theme.colors.grey1};
			cursor: not-allowed;
			opacity: 0.6;
		}
		&:focus {
			outline: 2px solid ${(p) => p.theme.colors.primary};
			outline-offset: 2px;
		}
		img {
			width: 20px;
			height: 20px;
		}
	}
`;

export default StyledAddTodo;
