import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { loadSettingsFromSessionStorage } from './utils/utility';
import { DefaultSettings } from '../types/common';
import "react-datepicker/dist/react-datepicker.css";
import Login from './pages/auth/Login';
// import RegisterPage from './pages/auth/RegisterPage';
import RecoveryPassword from './pages/auth/RecoveryPassword';
import LogoutPage from './pages/auth/LogoutPage';
import MaintenancePage from './pages/others/MaintenancePage';
import { Provider } from 'react-redux';
import { store } from './store/Store';
import { Toaster } from 'react-hot-toast';
import Index from './pages/Index';
import PrivateOne from './routes/private/PrivateOne';
import PublicRouteAccess from './routes/PublicRouteAccess';
import PaymentSuccess from './pages/others/PaymentSuccess';
import PaymentFailure from './pages/others/PaymentFailure';

// Define default settings
const defaultSettings: DefaultSettings = {
  'data-layout-mode': 'fluid',
  'data-bs-theme': 'light',
  'data-menu-color': 'light',
  'data-topbar-color': 'light',
  'data-layout-position': 'fixed',
  'data-sidenav-size': 'default',
  'data-sidenav-user': 'flase'
};

// Load settings from sessionStorage
loadSettingsFromSessionStorage();

// Set default settings if none are stored
const storedSettings = JSON.parse(sessionStorage.getItem('theme-settings') || '{}') as DefaultSettings;
Object.keys(defaultSettings).forEach(key => {
  const typedKey = key as keyof DefaultSettings;
  if (storedSettings[typedKey] === undefined) {
    storedSettings[typedKey] = defaultSettings[typedKey];
    sessionStorage.setItem('theme-settings', JSON.stringify(storedSettings));
  };

  document.documentElement.setAttribute(typedKey as string, storedSettings[typedKey]);
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route element={<PrivateOne />}>
          <Route path='*' element={<App />} />
        </Route>
        <Route
          path='/login'
          element={
            <PublicRouteAccess>
              <Login />
            </PublicRouteAccess>
          } />
        {/* <Route path='/register' element={<RegisterPage />} /> */}
        <Route path='/recovery-password' element={<RecoveryPassword />} />
        <Route path='/logout-page' element={<LogoutPage />} />
        <Route path='/maintenance' element={<MaintenancePage />} />
        <Route path='/payment-success' element={<PaymentSuccess />} />
        <Route path='/payment-error' element={<PaymentFailure />} />
      </Routes>
    </Router>
    <Toaster
      position='top-center'
      reverseOrder={false}
      gutter={10}
    />
  </Provider>
);

reportWebVitals();