import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LoginPage from './pages/LoginPage.jsx'
import DepositWithdrawPage from './pages/DepositWithdrawPage.jsx'
import MainLayout from './layouts/MainLayout.jsx'
import TransactionPage from './pages/TransactionPage.jsx'

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.user);
  return isLoggedIn ? <MainLayout>{children}</MainLayout> : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/deposit" element={<PrivateRoute><DepositWithdrawPage /></PrivateRoute>} />
        <Route path="/transaction" element={<PrivateRoute><TransactionPage /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;