import React from 'react';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { userReducer } from './store/user/userReducer';
import { matchMakerReducer } from './store/matchMaker/matchMakerReducer';
import { managerReducer } from './store/manager/managerReducer';
import { combineReducers } from 'redux';
import { createStore } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react'
import './index.css';
import App from './App';

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  user: userReducer,
  matchMaker: matchMakerReducer,
  manager: managerReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer, composeWithDevTools());
const persistor = persistStore(store);

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
);

reportWebVitals();
