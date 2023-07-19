import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from '../utils/hooks';
import styles from './login.module.css'
import { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {  forgPass } from '../services/actions/user';
import { FC } from 'react';
import { SEND_FORGOT_PASS_MESS_FAILED } from '../services/constant'


export const ForgotPasswordPage:FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((store) => store.user.user)
    const isSendMail = useSelector((store) => store.user.sendEmail)
    const [form, setValue] = useState({
        email: '',
    })
 
    const onClick = useCallback(
        (e: React.FormEvent) => {
          e.preventDefault();
          if (form.email === '') {
            dispatch({
                type: SEND_FORGOT_PASS_MESS_FAILED
            })
          } else {
          dispatch(forgPass(form));
        }
        },
        [ form, isSendMail]
    );

    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (isSendMail) {navigate('/reset-password')}
    }, [user, onClick])


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
}
