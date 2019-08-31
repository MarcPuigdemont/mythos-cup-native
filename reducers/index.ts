import { combineReducers } from 'redux';

import cups from './cups';
import currentCup from './currentCup';

export default combineReducers({ cups, currentCup });
