import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { resetPassword } from '../../utils/burger-api'
import { useDispatch, useSelector } from 'react-redux';
import styles from './login.module.css'
import { useState, useEffect } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { SEND_FORGOT_PASS_MESS_FAILED } from '../../services/actions/user'

export const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isSendMail = useSelector(store => store.user.sendEmail)
    const email = useSelector(store => store.user.email)

    const [form, setValue] = useState({password:'', token: '', email: email});
    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };


    const onClick = async () => {
        await resetPassword(form).then((res) => {
            if (res.success) {
                dispatch({
                    type: SEND_FORGOT_PASS_MESS_FAILED
                })
                navigate('/login')
            }
        })
    }

    useEffect(() => {
        if (!isSendMail) {navigate('/login')}
    }, [onClick])

    if (!isSendMail) {return <Navigate to='/forgot-password' />} else {
    return (
        <form className={styles.mainContainer}>
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
            <Button htmlType="button" onClick={onClick} extraClass="mb-20">Сохранить</Button>
            <div className={`${styles.linkCont}`}>
                <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
                <Link to='/login' className={`${styles.link} text text_type_main-default`}>Войти</Link>
            </div>
        </form>
    )
}}