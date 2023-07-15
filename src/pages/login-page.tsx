import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch } from 'react-redux';
import styles from './login.module.css'
import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom';
import { signIn} from '../services/actions/user';

import { FC } from 'react';


export const LoginPage: FC = () => {
    const dispatch = useDispatch();
    const [form, setValue] = useState({email: '', password: '' });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    
    const onClick = useCallback(
        (e: React.FormEvent) => {
          e.preventDefault();
          dispatch<any>(signIn(form));
        },
        [form]
    );
    
    return (
        <form onSubmit={onClick} className={styles.mainContainer}>
            <p className="text text_type_main-medium">Вход</p>
            <EmailInput
                placeholder={'E-mail'}
                onChange={onChange}
                value={form.email}
                name='email'
                extraClass="mt-6 mb-6"
            />
            <PasswordInput
                placeholder={'Пароль'}
                onChange={onChange}
                value={form.password}
                extraClass="mb-6"
                name='password'
            />
            <Button htmlType="submit" extraClass="mb-20">Войти</Button>
            <div className={`${styles.linkCont} mb-4`}>
                <p className="text text_type_main-default text_color_inactive">Вы - новый пользователь?</p>
                <Link to='/register' className={`${styles.link} text text_type_main-default`}>Зарегестрироваться</Link>
            </div>
            <div className={`${styles.linkCont}`}>
                <p className="text text_type_main-default text_color_inactive">Забыли пароль?</p>
                <Link to="/forgot-password" className={`${styles.link} text text_type_main-default`}>Восстановить пароль</Link>
            </div>
        </form>
    )
}
