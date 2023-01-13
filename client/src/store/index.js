import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import CommonReducer from '../reducers/index';

// const rootReducer = combineReducers({
//     CommonReducer
//   })
  
const store = createStore(CommonReducer, applyMiddleware(thunk));
export default store;