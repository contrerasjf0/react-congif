import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor} from './system/redux/store';

import Routes from './routes';


import history from './system/helper/history';

function App() {

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Router history={history}>
                    <Routes/>
                </Router>  
            </PersistGate>
        </Provider>   
    );
}

export default App;
