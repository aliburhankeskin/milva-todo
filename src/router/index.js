import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Home from '../pages/Home';
import Content from '../pages/Content';
import Grid from '@material-ui/core/Grid';
import SideBarPage from '../pages/SideBar';
import { createStyles } from '@material-ui/core/styles';
import Opsiyon from '../assets/images/opsiyon.jpeg'


export default function RootRouter() {

    const styles = useStyles();
    return (
        <Router>

            <Grid container style={{minWidth:1300}}>

                <Grid item xs={2}>

                    <Switch>
                        <SideBarPage />
                    </Switch>

                </Grid>

                <Grid item xs={10}>
                    <div style={styles.root}>            

                    <Switch>

                        <Route exact path="/">
                            <Home />
                        </Route>

                        <Route exact path="/Content">
                            <Content />
                        </Route>

                    </Switch>

                    </div>
                </Grid>

            </Grid>

        </Router>
    )
}


const useStyles = () => createStyles({
    root: {
        backgroundImage: `url(${Opsiyon})`,
        height: '100vh',
    },
  });