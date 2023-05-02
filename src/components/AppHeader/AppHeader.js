import React from 'react';
import styles from './AppHeader.module.css';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'


export default function AppHeader () {
    return (
        <header className={styles.header}>
            <nav className={styles.navbar}>
                <ul className='pt-4 pb-4 text text_type_main-default'>
                    <a>
                        <li className='p-5'>
                            <BurgerIcon type="primary" />
                            <p className='ml-2'>Конструктор</p>
                        </li>
                    </a>
                    <a>
                        <li className='p-5 ml-2'>
                            <ListIcon type="primary" />
                            <p className='ml-2'>Лента заказов</p>
                        </li>
                    </a>
                </ul>
                <Logo />
                <a>
                    <div className={`${styles.login} p-5`}>
                        <ProfileIcon type="primary" />
                        <p className='ml-2 text text_type_main-default'>Личный кабинет</p> 
                    </div>
                </a>
            </nav>
        </header>
    )
}