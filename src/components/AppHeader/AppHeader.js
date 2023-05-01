import React from 'react';
import styles from './AppHeader.module.css';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'


export default class AppHeader extends React.Component {
    render() {
        return (
            <header className={styles.header}>
                <nav className={styles.navbar}>
                    <ui className='pt-4 pb-4 text text_type_main-default'>
                        <li className='p-5'>
                            <BurgerIcon type="primary" />
                            <p className='ml-2'>Конструктор</p>
                        </li>
                        <li className='p-5 ml-2'>
                            <ListIcon type="primary" />
                            <p className='ml-2'>Лента заказов</p>
                        </li>
                    </ui>
                    <Logo />
                    <div className={`${styles.login} p-5`}>
                        <ProfileIcon type="primary" />
                        <p className='ml-2 text text_type_main-default'>Личный кабинет</p> 
                    </div>
                </nav>
            </header>
        )
    }
}