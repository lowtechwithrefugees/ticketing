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
import Home from "./routes/Home";
import SubmitRepair from "./routes/SubmitRepair";
import CheckStatus from "./routes/CheckStatus";
import CheckStatusResult from "./routes/CheckStatusResult";
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import {makeStyles} from "@material-ui/core/styles/index";
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import Dashboard from './routes/dashboard/Dashboard';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Low-Tech with Refugees
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
  const classes = useStyles();

  return (
    <div>
      <Switch>
        <Route path="/repair/status/:repairId">
          <CheckStatusResult/>
        </Route>
        <Route path="/repair/status">
          <CheckStatus/>
        </Route>
        <Route path="/admin/repair/submit">
          <SubmitRepair/>
        </Route>
        <Route path="/admin">
          <Dashboard/>
        </Route>
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          <FacebookIcon/>
          <InstagramIcon/>
        </Typography>
        <Copyright/>
      </footer>
      {/* End footer */}
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
