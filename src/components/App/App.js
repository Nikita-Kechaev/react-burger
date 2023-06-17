import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProfilePage, ProfileInput, ProfileOrders } from '../pages/profile-page'
import { LoginPage } from '../pages/login-page'
import { MainPage } from '../pages/main-page';
import { RegisterPage } from '../pages/registration-page';
import { ForgotPasswordPage } from '../pages/forgot-password';
import { ResetPasswordPage } from '../pages/reset-password';
import { LayoutPage } from '../pages/layout';
import { OrderList } from '../pages/order-list-page';
import { ProtectedRouteElement } from '../protected-route/protected-route';
import { useLocation } from 'react-router-dom';
import { IngredientDetails } from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';


export default function App () {
  const ModalSwitch = () => {
    const  location  = useLocation();
    const background = location.state === null ? false: location.state.isModal;

    const ingModal = 
      background ?
      <Route path='ingredients/:ingredientId' element={<Modal><IngredientDetails /></Modal>} /> :
      <Route path='ingredients/:ingredientId' element={<IngredientDetails />} />
   
  return (
    <>
      <Routes>
        <Route path='/' element={<LayoutPage />}>
          <Route index element={<MainPage />} />
          {ingModal}
          <Route path="login" element={<LoginPage />} />
          <Route path="profile" element={<ProtectedRouteElement element={<ProfilePage />}/>} >
            <Route index element={<ProtectedRouteElement element={<ProfileInput />}/>} />
            <Route path="orders" element={<ProtectedRouteElement element={<ProfileOrders />}/>} />
          </Route>
          <Route path="register/" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />}/>
          <Route path="reset-password"  element={<ResetPasswordPage />} />
          <Route path="order-list" element={<OrderList />} />
        </Route>
      </Routes>
    </>
  );
}

return (<Router><ModalSwitch /></Router>)
}