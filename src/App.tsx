import { useState } from 'react';
import Header from './Components/Layout/Header';
import Layout from './Components/Layout/Layout';
import List from './Components/List';
import AddTodo from './Components/AddTodo';
import { Item } from './types';
import Main from './Components/Layout/Main';

const initialItems: Item[] = [
	{ id: 1, name: 'Write documentation for new website', completed: false },
	{
		id: 2,
		name: 'Speak to Dave about code review process',
		completed: false,
	},
	{ id: 3, name: 'Plan project show and tell', completed: false },
	{ id: 4, name: 'Buy Tessa a birthday card', completed: false },
];
const initialCompletedItems: Item[] = [
	{ id: 5, name: 'Annual leave request for Holiday', completed: true },
	{ id: 6, name: 'Learn more about Typescript', completed: true },
	{ id: 7, name: 'Do some christmas shopping', completed: true },
];

export default function App() {
	const [items, setItems] = useState(initialItems);
	const [completedItems, setCompletedItems] = useState(initialCompletedItems);

	const onSubmit = (name: string) => {
		const newId =
			Math.max(
				...items.map((item) => item.id),
				...completedItems.map((item) => item.id),
			) + 1;
		setItems([...items, { id: newId, name, completed: false }]);
	};

	const onToggle = (id: number) => {
		// Find item in active items
		const itemInActive = items.find((item) => item.id === id);
		if (itemInActive) {
			// Move from active to completed
			const updatedItem = { ...itemInActive, completed: true };
			setItems(items.filter((item) => item.id !== id));
			setCompletedItems([...completedItems, updatedItem]);
			return;
		}

		// Find item in completed items
		const itemInCompleted = completedItems.find((item) => item.id === id);
		if (itemInCompleted) {
			// Move from completed to active
			const updatedItem = { ...itemInCompleted, completed: false };
			setCompletedItems(completedItems.filter((item) => item.id !== id));
			setItems([...items, updatedItem]);
		}
	};

	return (
		<div className='App'>
			<Layout>
				<Header />
				<Main>
					<AddTodo onSubmit={onSubmit} />
					<List title='Todo' items={items} onToggle={onToggle} />
					<List
						title='Done'
						items={completedItems}
						onToggle={onToggle}
					/>
				</Main>
			</Layout>
		</div>
	);
}
