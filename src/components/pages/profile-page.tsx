import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback, useState, useRef, useEffect } from 'react';
import { Outlet, NavLink} from 'react-router-dom';
import styles from './profile.module.css'
import { useDispatch, useSelector} from 'react-redux';
import { signOut, refreshData } from '../../services/actions/user'
import { FC } from 'react';
import { RootState } from "../../utils/types"

export const ProfileInput: FC = () => {
    const inputRef = useRef<HTMLInputElement | null>(null);;
    const dispatch = useDispatch();
    const user = useSelector((store: RootState) => store.user.user)

    const [form, setValue] = useState({
        name: user.name,
        email: user.email,
        password: '',
        initialName: user.name,
        initialEmail: user.email,
        initialPassword: '',
        inputNameDis: true,
        formChange: false
    });

    const dataToSend = ({
        'email': form.email,
        'name': form.name,
        'password': form.password
    })

    const canelInput = () => {
        setValue({
            ...form,
            formChange: false,
            name: form.initialName,
            email: form.initialEmail,
            password: form.initialPassword
        })
    }

    const onIconClick = () => {
        setTimeout(() => inputRef.current?.focus(), 0)
        setValue({
            ...form,
            inputNameDis: false
        })
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setValue({ ...form, formChange: true, [e.target.name]: e.target.value });
    };

    const onBlur = () => {
        setValue({
            ...form,
            inputNameDis: true
        })
    }

    const saveUserData = (e: React.FormEvent): void => {
        e.preventDefault();
        dispatch<any>(refreshData(dataToSend))
    }

    useEffect(() => {
        setValue({
            ...form,
            initialName: user.name,
            initialEmail: user.email,
            initialPassword: '',
            inputNameDis: true,
            formChange: false
        })
    }, [user])

    const buttons = 
        (
            <div>
                <Button htmlType="submit" disabled={!form.formChange} extraClass="mr-5">Сохранить</Button>
                <Button htmlType="button" disabled={!form.formChange} onClick={canelInput}>Отменить </Button>
            </div>
        )
    
    return (
        user &&
        <form onSubmit={saveUserData} className={`${styles.inputsContainer} pt-6`}>
            <Input
                type='text'
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
                onChange={onChange}
                value={form.email}
                name={'email'}
                placeholder="E-mail"
                isIcon={true}
                extraClass="mb-6"
                />
            <PasswordInput
                icon="EditIcon"
                extraClass="mb-6"
                value={form.password}
                onChange={onChange}
                name='password'
            />
            {buttons}
        </form>
        
    )
}

export const ProfileOrders: FC = () => {
    return (
        <div className={`${styles.inputsContainer} pt-6`}>
            <p className="text text_type_main-medium">Заказы в профиле</p>
        </div>
    )
}

export const ProfilePage: FC = () => {
    const user = useSelector((store: RootState) => store.user.user)
    const dispatch = useDispatch();

    let onClick = useCallback(
        (e: React.FormEvent) => {
          e.preventDefault();
          dispatch<any>(signOut());
        },
        [user]
    );

    const isActiveLink = useCallback<(isActive: any) => string>(({ isActive }) => (isActive ? `${styles.active} text` : `${styles.inactive} text`), [])

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