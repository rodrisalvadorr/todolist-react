import { useState, FormEvent, ChangeEvent, InvalidEvent } from 'react';

import { Header } from './components/Header';
import { Task } from './components/Task';
import { EmptyList } from './components/EmptyList';

import { PlusCircle } from 'phosphor-react';

import styles from './App.module.css';
import './global.css';

export interface ITask {
	id: number;
	description: string;
	isChecked: boolean;
}

export function App() {
	const [tasks, setTasks] = useState<ITask[]>([]);
	const [newTaskText, setNewTaskText] = useState('');

	function handleAddTask(event: FormEvent) {
		event.preventDefault();

		const newTask: ITask = {
			id: new Date().getTime(),
			description: newTaskText,
			isChecked: false,
		};

		setTasks(state => [...state, newTask]);
		setNewTaskText('');
	}

	function handleNewTaskText(event: ChangeEvent<HTMLInputElement>) {
		event.target.setCustomValidity('');
		setNewTaskText(event.target.value);
	}

	function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
		event.target.setCustomValidity('A tarefa não pode estar vazia.');
	}

	function handleToggleTask({ id, value }: { id: number; value: boolean }) {
		const updatedTasks = tasks.map(task => {
			if (task.id === id) {
				return { ...task, isChecked: value };
			}

			return { ...task };
		});

		setTasks(updatedTasks);
	}

	function handleDeleteTask(id: number) {
		const filteredTasks = tasks.filter(task => task.id !== id);

		if (!confirm('Deseja realmente apagar essa tarefa?')) {
			return;
		}

		setTasks(filteredTasks);
	}

	return (
		<div>
			<Header />

			<div className={styles.wrapper}>
				<form onSubmit={handleAddTask}>
					<input
						placeholder='Adicione uma nova tarefa'
						value={newTaskText}
						onChange={handleNewTaskText}
						onInvalid={handleNewTaskInvalid}
						required
					/>

					<button type='submit'>
						<p>Criar</p>
						<PlusCircle />
					</button>
				</form>

				<main className={styles.tasks}>
					<header>
						<div className={styles.createdTasks}>
							<p>Tarefas criadas</p>
							<span className={styles.counter}>{tasks.length}</span>
						</div>

						<div className={styles.concludedTasks}>
							<p>Concluídas</p>
							<span className={styles.counter}>
								{
									tasks.filter(checkedTask => checkedTask.isChecked === true)
										.length
								}{' '}
								de {tasks.length}
							</span>
						</div>
					</header>

					<div className={styles.tasksList}>
						{tasks.length === 0 ? (
							<EmptyList />
						) : (
							tasks.map(task => (
								<Task
									key={task.id}
									data={task}
									toggleTaskStatus={handleToggleTask}
									deleteTask={handleDeleteTask}
								/>
							))
						)}
					</div>
				</main>
			</div>
		</div>
	);
}
