import { ITask } from '../App';

import { Circle, CheckCircle, Trash } from 'phosphor-react';

import styles from './Task.module.css';

interface Props {
	data: ITask;
	toggleTaskStatus: ({ id, value }: { id: number; value: boolean }) => void;
	deleteTask: (id: number) => void;
}

export function Task({ data, toggleTaskStatus, deleteTask }: Props) {
	function handleTaskToggle() {
		toggleTaskStatus({ id: data.id, value: !data.isChecked });
	}

	function handleRemove() {
		deleteTask(data.id);
	}

	return (
		<section className={styles.task}>
			{data.isChecked ? (
				<label
					htmlFor='checkbox'
					className={styles.checkedIcon}
					onClick={handleTaskToggle}
				>
					<input
						className={styles.checkbox}
						readOnly
						type='checkbox'
					/>
					<CheckCircle
						size={18}
						weight='fill'
					/>
				</label>
			) : (
				<label
					htmlFor='checkbox'
					className={styles.uncheckedIcon}
					onClick={handleTaskToggle}
				>
					<input
						type='checkbox'
						readOnly
						className={styles.checkbox}
					/>
					<Circle size={18} />
				</label>
			)}

			<p
				className={
					data.isChecked
						? styles.taskDescriptionChecked
						: styles.taskDescription
				}
			>
				{data.description}
			</p>

			<button
				className={styles.trashIcon}
				onClick={handleRemove}
			>
				<Trash size={18} />
			</button>
		</section>
	);
}
