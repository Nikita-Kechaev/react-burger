import { useDispatch, useSelector } from '../utils/hooks';
import { AppHeader } from '../components/AppHeader/AppHeader';
import { useEffect } from 'react';
import { Outlet} from 'react-router-dom';
import styles from  './layout.module.css'
import { FC } from 'react';


export const LayoutPage: FC = () => {
    const { isLoading, hasError } = useSelector((store) => store.ingredients)

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