import reactLogo from '@/assets/react.svg';
import styles from './index.module.scss';

function Home() {
	return (
		<>
			<div className={styles.title}>
				<img src={reactLogo} alt="" />
				小哲自制react模板
			</div>
			<p className={styles.styleIsolated}>样式隔离</p>
		</>
	);
}

export default Home;
