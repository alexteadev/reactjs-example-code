import { Outlet } from 'react-router-dom';
import styles from './Main.module.scss';

function Main() {
    return (
        <>
            <main className={styles.main}>
                <div className={styles.main__container}>
                    <Outlet />
                </div>
            </main>
        </>
    )
}

export { Main };