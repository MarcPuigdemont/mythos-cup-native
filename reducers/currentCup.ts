import { SET_CUP } from '../actions';

export default function(state = {}, action) {
  const { type, cup } = action;

  switch (type) {
    case SET_CUP:
      return cup;
    default:
      return state;
  }
}
