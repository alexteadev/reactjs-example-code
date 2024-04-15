import { NavLink } from 'react-router-dom';
import styles from './styles/ForgotPassPage.module.scss';
import { BiArrowBack } from 'react-icons/bi';

function ForgotPassPage() {
    return (
        <div className={styles.restore_password}>
            <div className={styles.content}>
                <div className={styles.form}>
                    <input type="email" placeholder="Email" className="input" />
                    <NavLink className={styles.button} to="/new-password">Restore password</NavLink>
                    <NavLink className={styles.return} to="/login">
                        <BiArrowBack/>
                        Return to login
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassPage;