import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AppContext from './Context/AppContext';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
//import { store, persistor } from './store';
import store from './store';

import LoadingScreen from './components/LoadingScreen';


ReactDOM.render(
  <>
  {/* <React.StrictMode> */}
  
    {/* <AppContext.Provider> */}
    <Provider store={store}>
      {/* <PersistGate loading={LoadingScreen} persistor={persistor}> */}
        <App />
      {/* </PersistGate> */}
    </Provider>
    {/* </AppContext.Provider> */}
  {/* </React.StrictMode> */}
  </>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
