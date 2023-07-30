import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from '../../utils/hooks';
import  React, { FC, useEffect } from 'react';
import { getUser } from '../../services/actions/user';

interface IProtectRouteProps {
  element: React.ReactNode
}

export const ProtectedRouteElement: FC<IProtectRouteProps> = ({ element }: any) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser())
  }, [])

    const location = useLocation();
    const auth = useSelector((store) => store.user.auth)
    return (auth ? element : <Navigate to='/login' state={{ from: location }} />)
}