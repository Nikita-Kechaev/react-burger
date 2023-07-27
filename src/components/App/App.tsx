import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProfilePage, ProfileInput, ProfileOrders } from '../../pages/profile-page'
import { LoginPage } from '../../pages/login-page'
import { MainPage } from '../../pages/main-page';
import { RegisterPage } from '../../pages/registration-page';
import { ForgotPasswordPage } from '../../pages/forgot-password';
import { ResetPasswordPage } from '../../pages/reset-password';
import { LayoutPage } from '../../pages/layout';
import { OrderList } from '../../pages/order-list-page';
import { OrderFeedDetail } from '../OrderFeedDetail/OrderFeedDetail'
import { ProtectedRouteElement } from '../protected-route/protected-route';
import { useLocation, useNavigate } from 'react-router-dom';
import { IngredientDetails } from '../IngredientDetails/IngredientDetails';
import { CLEAR_CONSTRUCTOR } from '../../services/constant';
import { CLOSE_ORDER_MODAL } from '../../services/constant'
import { useDispatch, useSelector } from '../../utils/hooks';
import { Modal } from '../Modal/Modal';
import { FC, useEffect } from 'react';
import { closeCurrentItemACtion } from '../../services/actions/ingredients'
import { getIngridients } from '../../services/actions/ingredients';
import { NotFound404 } from '../../pages/NotFound404';
import { getUser } from '../../services/actions/user';


export const  App: FC = () =>{
  const ModalSwitch = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const location = useLocation()

    const auth = useSelector((store) => store.user.auth)
    const from = location?.state?.from || '/';
    const background = location.state && location.state.background;

    const onClose = () => {
      dispatch(closeCurrentItemACtion());
      dispatch({
          type: CLOSE_ORDER_MODAL
      });
      !location.state && dispatch({type: CLEAR_CONSTRUCTOR});
      navigate(-1)
  }

  useEffect(() => {
    dispatch(getUser())
    dispatch(getIngridients());
  }, [])
 
  return (
    <>
      <Routes>
        <Route path='/' element={<LayoutPage />}>
          <Route index element={<MainPage />} />
          <Route path='ingredients/:ingredientId' element={<IngredientDetails />} />
          <Route path="login" element={!auth ? <LoginPage /> : <Navigate to={from} />} />
          <Route path="profile/orders/:orderId" element={<ProtectedRouteElement element={<OrderFeedDetail />}/>} />
          <Route path="profile" element={<ProtectedRouteElement element={<ProfilePage />}/>} >
            <Route index  element={<ProfileInput />} />
            <Route path="orders"  element={<ProfileOrders />}/>
          </Route>
          <Route path="register/" element={!auth ? <RegisterPage /> : <Navigate to={from} />} />
          <Route path="forgot-password" element={!auth ? <ForgotPasswordPage /> : <Navigate to={from} />}/>
          <Route path="reset-password"  element={!auth ? <ResetPasswordPage /> : <Navigate to={from} />} />
          <Route path="feed" element={<OrderList />} />
          <Route path="feed/:orderId" element={<OrderFeedDetail />} />
          <Route path="*" element={<NotFound404/>}/>
          {background && (
            <>
              <Route index  path='ingredients/:ingredientId' element={<MainPage element={<Modal onClose={()=>onClose()}><IngredientDetails /></Modal>} />} />
              <Route index path='feed/:orderId' element={<OrderList element={<Modal onClose={()=>onClose()}><OrderFeedDetail /></Modal>} />} />
              <Route index path="profile/orders/:orderId" element={<ProtectedRouteElement element={<ProfilePage element={<ProfileOrders element={<Modal onClose={()=>onClose()}><OrderFeedDetail /></Modal>} />} />} />} />
            </>
          )}
        </Route>
      </Routes>
    </>
  );
}

return (
  <Router>
    <ModalSwitch />
  </Router>)
}