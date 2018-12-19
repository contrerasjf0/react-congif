import React from 'react';
import {
    Switch,
    Route
} from 'react-router-dom';
import Main from '../layouts/main';

function Routes() {

    return (
        <div>
            <Switch>
                <Route path="/"  component={Main} />
            </Switch>
        </div>
    );
}

export default Routes;
