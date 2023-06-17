import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './login.module.css'
import {  useState, useEffect, useCallback } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, regUser } from '../../services/actions/user'

export const RegisterPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(store => store.user.user)
    const [form, setValue] = useState({name:'', email: '', password: '' });

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    let onClick = useCallback(
        e => {
          e.preventDefault();
          dispatch(regUser(form));
          navigate('/profile')
        },
        [form]
    );

    const init = async () => {
        await dispatch(getUser());
    }

    useEffect(() => {
        init()
    }, [user])

    if (user) {return <Navigate to ='/' replace={true} />} else {
    return (
        <div className={styles.mainContainer}>
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
                errorText={`введите корректный email, а не вот это: ${form.email}`}
            />
            <PasswordInput
                name={'password'}
                placeholder={'Пароль'}
                onChange={onChange}
                value={form.password}
                extraClass="mb-6"
            />
            <Button
                onClick={onClick}
                htmlType="button"
                extraClass="mb-20"
                >Зарегистрироваться</Button>
            <div className={`${styles.linkCont}`}>
                <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы?</p>
                <Link to='/login' className={`${styles.link} text text_type_main-default`}>Войти</Link>
            </div>
        </div>
    )
}}