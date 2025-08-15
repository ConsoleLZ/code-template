import styles from './index.module.scss';

function Error() {
	return (
		<>
			<div>404</div>
			<p className={styles.styleIsolated}>样式隔离</p>
		</>
	);
}

export default Error;
