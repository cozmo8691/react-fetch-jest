import {combineReducers} from 'redux';

import ItemsReducer from './ItemsReducer';


const reducers = combineReducers({
  itemsState: ItemsReducer
});

export default reducers;
