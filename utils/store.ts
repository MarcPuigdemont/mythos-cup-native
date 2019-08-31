import { createStore, applyMiddleware } from 'redux';

import rootReducer from '../reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

export default initialState =>
  createStoreWithMiddleware(rootReducer, initialState);
