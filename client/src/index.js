import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
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

// export const store = configureStore({
//   reducer: persistedReducer,
//   devTools: process.env.NODE_ENV !== 'production',
//   middleware: [thunk]
// })


// const store = createStore(rootReducer,composeWithDevTools());


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <Router> */}
        <App />
        {/* </Router> */}
      </PersistGate>
    </Provider>
  </React.StrictMode >,
  document.getElementById('root')
);
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
