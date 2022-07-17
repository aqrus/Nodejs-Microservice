import { combineReducers, configureStore, applyMiddleware } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import { createWrapper } from 'next-redux-wrapper';

const combinedReducer = combineReducers({
    a: 'a'
});
const middleware = [thunk];
const initStore = () => {
    const store = configureStore({
        reducer: combinedReducer,
        composeWithDevTools: composeWithDevTools(applyMiddleware(...middleware))
    });
    return store;
}
const wrapper = createWrapper(initStore, {
    extraArgument: {},
    storeKey: 'store',
});
export default wrapper;
