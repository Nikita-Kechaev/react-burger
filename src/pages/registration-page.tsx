import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './login.module.css'
import {  useState, useEffect, useCallback } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, regUser } from '../services/actions/user';
import { getCookie } from '../utils/cookie'
import { FC } from 'react';
import { RootState } from "../utils/types"


export const RegisterPage: FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((store: RootState) => store.user.user)
    const [form, setValue] = useState({name:'', email: '', password: '' });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const onClick = useCallback(
        (e: React.FormEvent) => {
          e.preventDefault();
          dispatch<any>(regUser(form));
          navigate('/profile')
        },
        [form]
    );

    const init = async () => {
        const isToken = getCookie('accessToken')
        if (isToken) {
            await dispatch<any>(getUser());
        }
    }

    useEffect(() => {
        init()
        if (user) {navigate(-1)}
    }, [user])

    if (user) {return <Navigate to ='/' replace={true} />} else {
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
}}