import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './login.module.css'
import {  useState, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from '../utils/hooks';
import {  regUser } from '../services/actions/user';
import { FC } from 'react';


export const RegisterPage: FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [form, setValue] = useState({name:'', email: '', password: '' });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const onClick = useCallback(
        (e: React.FormEvent) => {
          e.preventDefault();
          dispatch(regUser(form));
          navigate('/profile')
        },
        [form]
    );

    return (
        <form onSubmit={onClick} className={styles.mainContainer}>
            <p className="text text_type_main-medium">Регистрация</p>
            <Input
                name={'name'}
                placeholder={'Имя'}
                value={form.name}
                onChange={onChange}
                extraClass="mt-6 mb-6"
                errorText={'Данный пользователь уже существует'}
            />
            <EmailInput
                placeholder={'E-mail'}
                name={'email'}
                onChange={onChange}
                value={form.email}
                extraClass="mb-6"
            />
            <PasswordInput
                name={'password'}
                placeholder={'Пароль'}
                onChange={onChange}
                value={form.password}
                extraClass="mb-6"
            />
            <Button
                htmlType="submit"
                extraClass="mb-20"
                >Зарегистрироваться</Button>
            <div className={`${styles.linkCont}`}>
                <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы?</p>
                <Link to='/login' className={`${styles.link} text text_type_main-default`}>Войти</Link>
            </div>
        </form>
    )
}
// }