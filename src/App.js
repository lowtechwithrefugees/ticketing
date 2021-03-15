import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  useHistory,
} from "react-router-dom";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import {Provider, useDispatch} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react'
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers";
import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import SignInSide from "./routes/SignInSide";
import Album from "./routes/Album";
import Checkout from "./routes/Checkout";

const persistConfig = {
  key: 'root',
  version: 1,
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  }),
});
let persistor = persistStore(store);

const RouterPartial = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  return (
    <div>
      <Switch>
        <Route path="/admin/submit-repair">
          <Checkout/>
        </Route>
        <Route path="/admin">
          <SignInSide/>
        </Route>
        <Route path="/">
          <Album/>
        </Route>
      </Switch>
    </div>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <RouterPartial></RouterPartial>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
