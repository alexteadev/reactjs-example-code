import { NavLink } from 'react-router-dom';
import styles from './styles/NewPasswordPage.module.scss';
import { BiArrowBack } from 'react-icons/bi';

function NewPasswordPage() {
    return (
        <div className={styles.new_password}>
            <div className={styles.content}>
                <div className={styles.form}>
                    <header>Create new password</header>
                    <input type="password" placeholder="Create password" className="password" />
                    <input type="password" placeholder="Confirm password" className="password" />
                    <NavLink className={styles.button} to="/login">Save</NavLink>
                </div>
            </div>
        </div>
    );
}

export default NewPasswordPage;