import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../utils/hooks';
import  React, { FC } from 'react';

interface IProtectRouteProps {
  element: React.ReactNode
}

export const ProtectedRouteElement: FC<IProtectRouteProps> = ({ element }: any) => {
    const location = useLocation();
    const auth = useSelector((store) => store.user.auth)
    return (auth ? element : <Navigate to='/login' state={{ from: location }} />)
}