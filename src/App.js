import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Router from './router';
import { Provider } from 'react-redux';
import Store from './Store';

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Provider store={Store}>
        <Router />
      </Provider>
    </div >
  );
}

export default App;

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});