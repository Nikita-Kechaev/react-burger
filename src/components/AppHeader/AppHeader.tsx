import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './AppHeader.module.css';
import { Link, NavLink } from 'react-router-dom';
import { useCallback, FC } from 'react';


export const AppHeader: FC  = () => {
    const isActiveLink = useCallback<(isActive: any) => string>(({ isActive }) => (isActive ? `${styles.activeNav} text` : `${styles.inactiveNav} text`), [])

    return (
        <header className={styles.header}>
            <nav className={styles.navbar}>
                <div className={styles.navElemLeft}>
                    <ul className='pt-4 pb-4 text text_type_main-default'>
                        <NavLink to="/" className={isActiveLink}>
                            {({ isActive }) => (
                            <li className='p-5'>
                                <BurgerIcon type={isActive ? "primary" : "secondary"} />
                                <p className='ml-2'>Конструктор</p>
                            </li>
                            )}
                        </NavLink>
                        <NavLink to="/feed" className={isActiveLink}>
                            {({ isActive }) => (
                            <li className='p-5 ml-2'>
                                <ListIcon type={isActive ? "primary" : "secondary"} />
                                <p className='ml-2'>Лента заказов</p>
                            </li>
                            )}
                        </NavLink>
                    </ul>
                </div>
                <div className={styles.navElemCenter}>
                    <Link to={'/'}>
                        <Logo />
                    </Link>
                </div>
                <div className={styles.navElemRight}>
                    <NavLink to="profile" className={isActiveLink}>
                        {({ isActive }) => (
                        <div className={`${styles.login} p-5 text text_type_main-default`}>
                            <ProfileIcon type={isActive ? "primary" : "secondary"} />
                            <p className='ml-2'>Личный кабинет</p> 
                        </div>
                        )}
                    </NavLink>
                </div>
            </nav>
        </header>
    )
}