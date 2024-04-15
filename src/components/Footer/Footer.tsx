import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import styles from './Footer.module.scss';

function Footer() {

    const count = useSelector((state: RootState) => state.counter.value);

    return (
        <>
            <footer className={styles.footer}>
                <div className={styles.footer__container}>
                    <h3 className={styles.footer__title}><span>Get</span> in Touch.</h3>
                    <span className={styles.footer__subtitle}>So that we can talk more about...</span>
                    <div className={styles.footer__socials}></div>
                    <div className={styles.footer__copyright}>Made with ❣️ by <span>&copy; BuyList 2023</span></div>
                </div>

            </footer>
        </>
    );
}

export { Footer };