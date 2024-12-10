import ClipboardImg from './../assets/clipboard.svg';

import styles from './EmptyList.module.css';

export function EmptyList() {
	return (
		<div className={styles.emptyList}>
			<img src={ClipboardImg} />
			<p className={styles.description}>
				<strong>Você ainda não tem tarefas cadastradas</strong>
				Crie tarefas e organize seus itens a fazer
			</p>
		</div>
	);
}
