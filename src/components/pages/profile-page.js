import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback, useState, useRef } from 'react';
import { Outlet, NavLink} from 'react-router-dom';
import styles from './profile.module.css'
import { useDispatch, useSelector} from 'react-redux';
import { signOut, refreshData } from '../../services/actions/user'

export const ProfileInput = () => {
    const inputRef = useRef(null)
    const dispatch = useDispatch();
    const user = useSelector(store => store.user.user)

    const [form, setValue] = useState({
        name: user.name,
        email: user.email,
        initialName: user.name,
        initialEmail: user.email,
        inputNameDis: true
    });

    const canelInput = () => {
        setValue({
            ...form,
            name: form.initialName,
            email: form.initialEmail
        })
    }

    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
        setValue({
            ...form,
            inputNameDis: false
        })
    }

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const onBlur = e => {
        setValue({
            ...form,
            inputNameDis: true
        })
    }

    const saveUserData = () => {
        dispatch(refreshData(form))
    }

    return (
        user &&
        <div className={`${styles.inputsContainer} pt-6`}>
            <Input
                ref={inputRef}
                icon={'EditIcon'}
                placeholder={'Имя'}
                extraClass="mb-6"
                value={form.name}
                onChange={onChange}
                name='name'
                disabled={form.inputNameDis}
                onIconClick={onIconClick}
                onBlur={onBlur}
            />
            <EmailInput
                extraClass="mb-6"
                isIcon={true}
                value={form.email}
                onChange={onChange}
                name='email'
                />
            <PasswordInput
                icon="EditIcon"
                extraClass="mb-6"
                value='**************'
            />
            <div>
                <Button htmlType="button" extraClass="mr-5" onClick={saveUserData} >Сохранить</Button>
                <Button htmlType="button" onClick={canelInput}>Отменить </Button>
            </div>
        </div>
        

    )
}

export const ProfileOrders = () => {
    return (
        <div className={`${styles.inputsContainer} pt-6`}>
            <p className="text text_type_main-medium">Заказы в профиле</p>
        </div>
    )
}

export const ProfilePage = () => {
    const user = useSelector(store => store.user.user)
    const dispatch = useDispatch();

    let onClick = useCallback(
        e => {
          e.preventDefault();
          dispatch(signOut());
        },
        [user]
    );

    const isActiveLink = useCallback(({ isActive }) => (isActive ? `${styles.active} text` : `${styles.inactive} text`),)

    return (
        <div className={styles.mainContainer}>
            <div className={`${styles.tabsContainer} pt-6 pl-6`}>
                <NavLink to="/profile" end className={isActiveLink}>
                    <div className={`${styles.tabContainer} text text_type_main-medium`}>
                        Профиль
                    </div>
                </NavLink>
                <NavLink to="/profile/orders" className={isActiveLink}>
                    <div className={`${styles.tabContainer} text text_type_main-medium`}>
                        История заказов
                    </div>
                </NavLink>
                <NavLink to='/login' onClick={onClick} className={isActiveLink}>
                <div className={styles.tabContainer}>
                    <p className="text text_type_main-medium">Выход</p>
                </div>
                </NavLink>
                <div className={`${styles.tabContainer} mt-20`}>
                    <p className="text text_type_main-default text_color_inactive">В этом разделе Вы можете изменить свои персональные данные</p>
                </div>
            </div>
            <Outlet />
        </div>
    )
}