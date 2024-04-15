import styles from './styles/HomePage.module.scss';
import PurchaseList from "./PurchaseList";
import NamedList from './NamedList';
import { useLocation } from 'react-router-dom';
import { getListId } from '../../services/utils';
import { listAPI } from '../../services/api/ListServices';

function HomePage() {

    const location = useLocation();
    const { data: lists } = listAPI.useFindByIdQuery(getListId(location.pathname));
    const listIdParam = lists?._id ?? '';

    return (
        <div className={styles.home}>
            <div>
                <NamedList listId={listIdParam} />
            </div>
            <div className={styles.body}>
                {listIdParam === ''
                    ? <div className={styles.select_list}>Please select List or create new List.</div>
                    : <PurchaseList listId={listIdParam} />
                }
            </div>
        </div>
    );
}

export default HomePage;