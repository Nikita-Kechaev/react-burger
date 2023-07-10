import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProfilePage, ProfileInput, ProfileOrders } from '../../pages/profile-page'
import { LoginPage } from '../../pages/login-page'
import { MainPage } from '../../pages/main-page';
import { RegisterPage } from '../../pages/registration-page';
import { ForgotPasswordPage } from '../../pages/forgot-password';
import { ResetPasswordPage } from '../../pages/reset-password';
import { LayoutPage } from '../../pages/layout';
import { OrderList } from '../../pages/order-list-page';
import { ProtectedRouteElement } from '../protected-route/protected-route';
import { useLocation, useNavigate } from 'react-router-dom';
import { IngredientDetails } from '../IngredientDetails/IngredientDetails';
import { CLEAR_CONSTRUCTOR } from '../../services/actions/constructor';
import { CLOSE_CURRENT_ITEM } from '../../services/actions/ingredients'
import { CLOSE_ORDER_MODAL } from '../../services/actions/order'
import { useDispatch } from 'react-redux';
import { Modal } from '../Modal/Modal';
import { FC } from 'react';


export const  App: FC = () =>{
  const ModalSwitch = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const location = useLocation()

    const onClose = () => {
        dispatch({
            type: CLOSE_CURRENT_ITEM
        });
        dispatch({
            type: CLOSE_ORDER_MODAL
        });
        !location.state && dispatch({type: CLEAR_CONSTRUCTOR});
        navigate(-1)
    }

    const background = location.state && location.state.background;
 
  return (
    <>
      <Routes>
        <Route path='/' element={<LayoutPage />}>
          <Route index element={<MainPage />} />
          <Route path='ingredients/:ingredientId' element={<IngredientDetails />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="profile" element={<ProtectedRouteElement element={<ProfilePage />}/>} >
            <Route index element={<ProtectedRouteElement element={<ProfileInput />}/>} />
            <Route path="orders" element={<ProtectedRouteElement element={<ProfileOrders />}/>} />
          </Route>
          <Route path="register/" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />}/>
          <Route path="reset-password"  element={<ResetPasswordPage />} />
          <Route path="order-list" element={<OrderList />} />
          {background && (
            <Route index  path='ingredients/:ingredientId' element={<MainPage element={<Modal onClose={()=>onClose()}><IngredientDetails /></Modal>} />} />
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