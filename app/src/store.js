import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux';
import reduces from './Redux';
import createSagaMiddleware from 'redux-saga'

import mySaga from './sagas'
const sagaMiddleware = createSagaMiddleware()
const store = createStore(combineReducers(reduces),applyMiddleware(sagaMiddleware));

sagaMiddleware.run(mySaga)
export default store;
