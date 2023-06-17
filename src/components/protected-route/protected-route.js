import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../services/actions/user'
import { useEffect, useState } from 'react';
import { getCookie } from '../../utils/cookie'


export const ProtectedRouteElement = ({ element }) => {
    const dispatch = useDispatch();
    const user = useSelector(store => store.user.user)
    const [isUserLoaded, setUserLoaded] = useState(false);


    const init = async () => {
      const isToken = getCookie('accessToken')
      if (isToken) {
        await dispatch(getUser());
      }
      setUserLoaded(true);
    }

    useEffect(() => {
      init();
    }, []);
  
      if (!isUserLoaded) {
      return null;
    }

    return user ? element : <Navigate to="/login"/>;
}