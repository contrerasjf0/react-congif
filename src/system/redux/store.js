import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer} from 'redux-persist';
import thunkMiddleware from 'redux-thunk';

import storage from 'redux-persist/lib/storage';

import rootReducer from './reducer';

const persistConfig = {
  key:'user',
  storage,
  whitelist: ['user']
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers( applyMiddleware(thunkMiddleware) );

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
    persistedReducer,
    enhancer
);

const persistor = persistStore(store);

export {
    store,
    persistor
};