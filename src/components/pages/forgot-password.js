import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux';
import styles from './login.module.css'
import { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { getUser, forgPass } from '../../services/actions/user'

export const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(store => store.user.user)
    const isSendMail = useSelector(store => store.user.sendEmail)
    const [state, setState] = useState({email: ''})
 
    let onClick = useCallback(
        e => {
          e.preventDefault();
          dispatch(forgPass(state));
        },
        [ isSendMail]
    );

    const init = async () => {
        await dispatch(getUser());
    }

    useEffect(() => {
        init()
        if (isSendMail) {navigate('/reset-password')}
    }, [user, onClick])



    if (user) {return(<Navigate to='/' replace={true} />)} else {
    return (
        <div className={styles.mainContainer}>
            <p className="text text_type_main-medium">Восстановление пароля</p>
            <EmailInput
                placeholder={'Укажите e-mail'}
                onChange={e => setState({email: e.target.value})}
                name='email'
                value={state.email}
                extraClass="mt-6 mb-6"
                errorText={`введите корректный email, а не вот это: ${state.email}`}
            />
            <Button htmlType="button" extraClass="mb-20" onClick={onClick}>Восстановить</Button>
            <div className={`${styles.linkCont}`}>
                <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
                <Link to='/login' className={`${styles.link} text text_type_main-default`}>Войти</Link>
            </div>
        </div>
    )
}}