import { getIngridients } from '../../services/actions/ingredients';
import { useDispatch, useSelector } from 'react-redux';
import AppHeader from '../AppHeader/AppHeader';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import styles from  './layout.module.css'


export const LayoutPage = () => {

    const dispatch = useDispatch();
    const { isLoading, hasError } = useSelector(store => store.ingredients)

    useEffect(
        () => {
        dispatch(getIngridients());
        },
        []
    );

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