import { useState } from 'react';
import Header from './Components/Layout/Header';
import Layout from './Components/Layout/Layout';
import List from './Components/List';
import AddTodo from './Components/AddTodo';
import { Item } from './types';
import Main from './Components/Layout/Main';

const initialItems: Item[] = [
	{
		id: 1,
		name: 'Todo Name',
		completed: false,
		subItems: [
			{ id: 11, name: 'Subtask', completed: false },
			{ id: 12, name: 'Subtask', completed: false },
			{ id: 13, name: 'Subtask', completed: false },
		],
	},
	{
		id: 2,
		name: 'Todo Name',
		completed: false,
		subItems: [],
	},
];
const initialCompletedItems: Item[] = [
	{ id: 3, name: 'Todo Name', completed: true, subItems: [] },
	{ id: 4, name: 'Todo Name', completed: true, subItems: [] },
	{ id: 5, name: 'Todo Name', completed: true, subItems: [] },
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
		setItems([
			...items,
			{ id: newId, name, completed: false, subItems: [] },
		]);
	};

	const onAddSubtask = (parentId: number, name: string) => {
		const allIds = [
			...items.flatMap((item) => [
				item.id,
				...(item.subItems?.map((sub) => sub.id) || []),
			]),
			...completedItems.flatMap((item) => [
				item.id,
				...(item.subItems?.map((sub) => sub.id) || []),
			]),
		];
		const newSubtaskId = Math.max(...allIds) + 1;

		const updateItems = (itemsList: Item[]) => {
			return itemsList.map((item) => {
				if (item.id === parentId) {
					return {
						...item,
						subItems: [
							...(item.subItems || []),
							{ id: newSubtaskId, name, completed: false },
						],
					};
				}
				return item;
			});
		};

		setItems(updateItems(items));
		setCompletedItems(updateItems(completedItems));
	};

	const onToggleSubtask = (parentId: number, subtaskId: number) => {
		const updateSubtaskInList = (
			itemsList: Item[],
			setList: (items: Item[]) => void,
		) => {
			const updatedItems = itemsList.map((item) => {
				if (item.id === parentId && item.subItems) {
					return {
						...item,
						subItems: item.subItems.map((subtask) =>
							subtask.id === subtaskId
								? { ...subtask, completed: !subtask.completed }
								: subtask,
						),
					};
				}
				return item;
			});
			setList(updatedItems);
		};

		// Check if parent is in active items
		const parentInActive = items.find((item) => item.id === parentId);
		if (parentInActive) {
			updateSubtaskInList(items, setItems);
		} else {
			updateSubtaskInList(completedItems, setCompletedItems);
		}
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
					<List
						title='Todo'
						items={items}
						onToggle={onToggle}
						onAddSubtask={onAddSubtask}
						onToggleSubtask={onToggleSubtask}
					/>
					<List
						title='Complete'
						items={completedItems}
						onToggle={onToggle}
						onAddSubtask={onAddSubtask}
						onToggleSubtask={onToggleSubtask}
					/>
				</Main>
			</Layout>
		</div>
	);
}
