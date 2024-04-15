import { NavLink } from 'react-router-dom';
import styles from './styles/LoginPage.module.scss';
import { BiLogoFacebookCircle, BiLogoGoogle } from 'react-icons/bi';
import { useState } from 'react';
import { authAPI } from '../../services/api/AuthServices';
import { handleError } from '../../services/ErrorHandler';
import { isValidEmail } from '../../services/utils';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const navigate = useNavigate();

    const [loginUser, { }] = authAPI.useLoginMutation();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<string[]>([]);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleLogin = async (event: React.MouseEvent) => {
        const validEmail = isValidEmail(email);
        const emptyPass = password.length >= 6;
        if (validEmail && emptyPass) {
            const result = await loginUser({ email, password, mobile: false });

            if ('data' in result) {
                window.location.href = '/';
                
                // navigate('/');
                // location.reload();

                // React Router использует подход, который называется "client-side routing" (маршрутизация на стороне клиента).
                // В отличие от "server-side routing" (маршрутизации на стороне сервера), где каждый переход по ссылке приводит к полной перезагрузке страницы и запросу новой страницы с сервера, "client-side routing" позволяет управлять историей браузера и изменять URL без перезагрузки страницы.
            }

            if ('error' in result) {
                setErrors([]);
                setErrors((errors) => [...errors, handleError(result.error)]);
            }
        } else {
            setErrors([]);
            if (!validEmail) {
                //setErrors([...errors, 'Email is not correct']); // not write to object at time but with some delay
                setErrors((errors) => [...errors, 'Email is not correct']);
            }
            if (!emptyPass) {
                setErrors((errors) => [...errors, 'Password less then 6 symbols']);
            }
        }
    }

    return (
        <div className={styles.login}>
            <div className={styles.content}>
                <div className={styles.form}>
                    <header>Login</header>
                    <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
                    <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                    <button onClick={handleLogin}>Login</button>
                    <NavLink to="/forgot-password">Forgot password?</NavLink>
                    {errors.length > 0 && (
                        <div>
                            <ul>
                                {errors.map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <div className={styles.divider}></div>
                <div className={styles.social}>
                    <a href="#" className="">
                        <BiLogoFacebookCircle />
                        <span>Login with Facebook</span>
                    </a>
                    <a href="#" className="">
                        <BiLogoGoogle />
                        <span>Login with Google</span>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;