import { useDispatch, useSelector } from '../utils/hooks';
import { AppHeader } from '../components/AppHeader/AppHeader';
import { useEffect } from 'react';
import { Outlet} from 'react-router-dom';
import styles from  './layout.module.css'
import { FC } from 'react';
import { getCookie } from '../utils/cookie'
import { getUser } from '../services/actions/user'


export const LayoutPage: FC = () => {

    const dispatch = useDispatch();
    const { isLoading, hasError } = useSelector((store) => store.ingredients)

    const init = async () => {
        const isToken = getCookie('accessToken')
        if (isToken) {
          await dispatch(getUser());
        }
    }

    useEffect(() => {
        init()
    },[]);

    return (
        <>
            <AppHeader />
            { !isLoading && !hasError? (
            <main className={styles.main}>
                <Outlet />
            </main>
            ):(
            <main className={styles.main}>
                <p className="text text_type_main-medium">Подождите. Идёт загрузка данных</p>
            </main>
            )}
        </>
    )
}