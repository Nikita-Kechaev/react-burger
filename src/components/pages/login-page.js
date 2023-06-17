import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux';
import styles from './login.module.css'
import { useState, useCallback, useEffect } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { signIn, getUser } from '../../services/actions/user';
import { getCookie } from '../../utils/cookie'


export const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(store => store.user.user)
    const [form, setValue] = useState({email: '', password: '' });

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    
    let onClick = useCallback(
        e => {
          e.preventDefault();
          dispatch(signIn(form));
        },
        [form]
    );
    
    const init = async () => {
        const isToken = getCookie('accessToken')
        if (isToken) {
            await dispatch(getUser());
        }
    }
    
    useEffect(() => {
        init()
        if (user) {navigate(-1)}
    }, [user])

    if (user) {return <Navigate to = '/' replace={true} />} else {
    return (
        <form onSubmit={onClick} className={styles.mainContainer}>
            <p className="text text_type_main-medium">Вход</p>
            <EmailInput
                placeholder={'E-mail'}
                onChange={onChange}
                value={form.email}
                name='email'
                extraClass="mt-6 mb-6"
                errorText={`введите корректный email, а не вот это: ${form.email}`}
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
}}