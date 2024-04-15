import { Link, NavLink, useLocation } from 'react-router-dom';
import styles from './Header.module.scss';
import cn from 'classnames';
import { ReactComponent as Logo } from '../../assets/svg/logo.svg';
import { userAPI } from '../../services/api/UserServices';
import { useEffect, useState } from 'react';

const setActive = ({ isActive }: { isActive: boolean }): string => isActive ? styles.active : '';

const isHomeActive = () => {
    const location = useLocation();
    const isHomePageActive = location.pathname === '/' || location.pathname.startsWith('/list/');
    return isHomePageActive ? styles.active : '';
};

function Header() {
    useEffect(() => {
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    const { data: userData } = userAPI.useMeQuery();

    const [logout] = userAPI.useLogoutMutation();

    const handleLogout = async () => {
        try {
            await logout().unwrap();
        } catch (error) {
            console.error('Error:', error);
        }
        location.reload();
    };

    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const toggleMenu = () => {
        const showMenu = !isMenuVisible;
        if (showMenu) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        
        setIsMenuVisible(showMenu);
    };

    const removeMenu = () => {
        setIsMenuVisible(false);
        document.body.style.overflow = '';
    };

    return (
        <>
            <header className={styles.header}>

                <div className={styles.header__container}>
                    <NavLink className={styles.header__logo} to="/">
                        <Logo />
                    </NavLink>
                    <nav className={styles.header__nav}>
                        <ul className={cn(styles.header__menu, { [styles.header__menu__active]: isMenuVisible })}>
                            <li><NavLink className={isHomeActive} onClick={removeMenu} to="/">List</NavLink></li>
                            <li><NavLink className={setActive} onClick={removeMenu} to="/storage">Storage</NavLink></li>
                            <li><NavLink className={setActive} onClick={removeMenu} to="/plan">Plan to buy</NavLink></li>
                        </ul>
                        <div className={styles.header__authorization}>
                            {userData ? (
                                <>
                                    <div className={styles.helloEmail}>Hi, {userData.email}</div>
                                    <NavLink onClick={handleLogout} to="/">Logout</NavLink>
                                </>
                            ) : (
                                <>
                                    <NavLink className={setActive} to="/login">Login</NavLink>
                                    <NavLink className={setActive} to="/registration">Sign up</NavLink>
                                </>
                            )}
                        </div>
                        <div className={cn(styles.header__icons, { [styles.header__icons__active]: isMenuVisible })} onClick={toggleMenu}>
                            <span></span><span></span><span></span>
                        </div>
                    </nav>
                </div>
            </header>
        </>
    )
}

export { Header };