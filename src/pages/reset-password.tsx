import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from '../utils/hooks';
import styles from './login.module.css'
import { useState, useEffect } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { FC, useCallback } from 'react';
import { resetPassword } from '../services/actions/user';

export const ResetPasswordPage: FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isSendMail = useSelector((store) => store.user.sendEmail)
    const email = useSelector((store) => store.user.email)

    const [form, setValue] = useState({password:'', token: '', email: email});
    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const onClick = useCallback(
        (e: React.FormEvent) => {
          e.preventDefault();
          dispatch(resetPassword(form));
        },
        [form, isSendMail]
    );

    useEffect(() => {
        if (!isSendMail) {navigate('/login')}
    }, [onClick])

    if (!isSendMail) {return <Navigate to='/forgot-password' />} else {
    return (
        <form onSubmit={onClick} className={styles.mainContainer}>
            <p className="text text_type_main-medium">Восстановление пароля</p>
            <PasswordInput
                placeholder={'Введите новый пароль'}
                onChange={onChange}
                value={form.password}
                name='password'
                extraClass="mt-6 mb-6"
            />
            <Input
                placeholder={'Введите код из письма'}
                value={form.token}
                onChange={onChange}
                extraClass="mb-6"
                name='token'
            />
            <Button htmlType="submit"  extraClass="mb-20">Сохранить</Button>
            <div className={`${styles.linkCont}`}>
                <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
                <Link to='/login' className={`${styles.link} text text_type_main-default`}>Войти</Link>
            </div>
        </form>
    )
}}