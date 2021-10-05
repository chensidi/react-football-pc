import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import globalReducer from './global';
import homeReducer from '@pages/Home/store';
import liveReducer from '@pages/Live/store';

const mergeReducers = combineReducers({
    global: globalReducer, 
    homeData: homeReducer,
    liveData: liveReducer
});

const store = createStore(mergeReducers, applyMiddleware(thunk));

export default store;