import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux';
import styles from './login.module.css'
import { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { getUser, forgPass } from '../services/actions/user';
import { getCookie } from '../utils/cookie'
import { FC } from 'react';
import { RootState } from "../utils/types"


export const ForgotPasswordPage:FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((store:RootState) => store.user.user)
    const isSendMail = useSelector((store:RootState) => store.user.sendEmail)
    const [form, setValue] = useState({
        email: '',
    })
 
    const onClick = useCallback(
        (e: React.FormEvent) => {
          e.preventDefault();
          dispatch<any>(forgPass(form));
        },
        [ form, isSendMail]
    );

    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };


    const init = async () => {
        const isToken = getCookie('accessToken')
        if (isToken) {
            await dispatch<any>(getUser());
        }
    }

    useEffect(() => {
        init()
        if (isSendMail) {navigate('/reset-password')}
    }, [user, onClick])


    if (user) {return(<Navigate to='/' replace={true} />)} else {
    return (
        <form onSubmit={onClick} className={styles.mainContainer}>
            <p className="text text_type_main-medium">Восстановление пароля</p>
            <EmailInput
                placeholder={'Укажите e-mail'}
                onChange={onChange}
                name='email'
                value={form.email}
                extraClass="mt-6 mb-6"
            />
            <Button htmlType="submit" extraClass="mb-20">Восстановить</Button>
            <div className={`${styles.linkCont}`}>
                <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
                <Link to='/login' className={`${styles.link} text text_type_main-default`}>Войти</Link>
            </div>
        </form>
    )
}}