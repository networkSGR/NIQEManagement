import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { CustomProvider } from 'rsuite';
import { Provider } from 'react-redux';  // Import Provider from react-redux
import enGB from 'rsuite/locales/en_GB';
import locales from './locales';
import Frame from './components/Frame';
import DashboardPage from './pages/dashboard';
import Error404Page from './pages/authentication/404';
import Error403Page from './pages/authentication/403';
import Error500Page from './pages/authentication/500';
import Error503Page from './pages/authentication/503';
import PrivateRoute from '@/components/PrivateRoute';

import SignInPage from './pages/authentication/sign-in';
import SignUpPage from './pages/authentication/sign-up';
import MembersPage from './pages/tables/members';
import VirtualizedTablePage from './pages/tables/virtualized';
import FormBasicPage from './pages/forms/basic';
import FormWizardPage from './pages/forms/wizard';
import CalendarPage from './pages/calendar';
import { appNavs } from './config';
import { store } from './redux/store'; // Import the store
import LineChart from './components/charts/lineChart';
import 'leaflet/dist/leaflet.css';


const App = () => {
  return (
    <Provider store={store}>  {/* Wrap the app with Provider and pass the store */}
    <IntlProvider locale="en" messages={locales.en}>
      <CustomProvider locale={enGB} >
        <Routes>
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
          <Route path="/" element={<Frame navs={appNavs} />}>
            <Route index element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="table-members" element={<MembersPage />} />
            <Route path="table-virtualized" element={<VirtualizedTablePage />} />
            <Route path="calendar" element={<CalendarPage />} />
            {/* <Route path="dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
            <Route path="table-members" element={<PrivateRoute><MembersPage /></PrivateRoute>} />
            <Route path="table-virtualized" element={<PrivateRoute><VirtualizedTablePage /></PrivateRoute>} />
            <Route path="calendar" element={<PrivateRoute><CalendarPage /></PrivateRoute>} /> */}
            {/* <Route path="sor" element={<PrivateRoute><LineChart /></PrivateRoute>} /> */}
            <Route path="error-404" element={<Error404Page />} />
            <Route path="error-403" element={<Error403Page />} />
            <Route path="error-500" element={<Error500Page />} />
            {/* <Route path="error-503" element={<Error503Page />} /> */}
            <Route path="form-basic" element={<FormBasicPage />} />
            <Route path="form-wizard" element={<FormWizardPage />} />
          </Route>
          <Route path="*" element={<Error404Page />} />
        </Routes>
      </CustomProvider>
    </IntlProvider>
    </Provider>

  );
};

export default App;
