import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { increment, decrement } from '../../redux/slices/counterSlice';
import styles from './styles/PlanPage.module.scss';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

function PlanPage() {
    const count = useSelector((state: RootState) => state.counter.value);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        AOS.init({
            duration: 2000,
        });
    }, []);

    return (
        <>
            <section className={styles.hero} data-aos="flip-down">
                <h1 className={styles.hero__title}>
                    Hello <span>my Plan</span> for buy goods.
                </h1>
                <a href="#about" className={styles.hero__arrow}></a>
            </section>

            <section className={styles.clients} data-aos="fade-up">
                <h2 className={styles.clients__title}><span>Some of</span> the clients I have designed for</h2>
                <div className={styles.clients__body}>
                    <div className={styles.clients__item}>
                        <img src="img/logos/air.svg" alt="" />
                    </div>
                    <div className={styles.clients__item}>
                        <img src="img/logos/google.svg" alt="" />
                    </div>
                    <div className={styles.clients__item}>
                        <img src="img/logos/microsoft.svg" alt="" />
                    </div>
                    <div className={styles.clients__item}>
                        <img src="img/logos/fedex.svg" alt="" />
                    </div>
                </div>
            </section>

            <section id="about" className={styles.about}></section>
        </>

    );
}

export default PlanPage;
