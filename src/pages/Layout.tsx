import { Main } from '../components/Main/Main';
import { Footer } from '../components/Footer/Footer';
import { Header } from '../components/Header/Header';
import { userAPI } from '../services/api/UserServices';
import { useEffect } from 'react';

const Layout = () => {

    const { data, error, isLoading } = userAPI.useMeQuery();

    useEffect(() => {
        if (data) {
            // console.log(data);
        }

        if (error) {
            // console.error('Error in request:', error);
        }
    }, [data, error]);

    return (
        <>
            <Header />
            <Main />
            <Footer />
        </>
    )
}

export { Layout }
