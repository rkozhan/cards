import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

import { Provider } from 'react-redux';
import { BrowserRouter as Rowter} from 'react-router-dom';

import ErrorBoundry from './components/error-boundry/error-boundry';
import CardService from './services/card-service';
import CardServiceContext from './components/card-service-context/card-service-context';
import store from './store';

import './index.css';

const cardService = new CardService();


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
    <Provider store={store}>
      <ErrorBoundry>
        <CardServiceContext.Provider value={cardService}>
          <Rowter>
            <App />
          </Rowter>
        </CardServiceContext.Provider>
      </ErrorBoundry>
    </Provider>
 // </React.StrictMode>
);
