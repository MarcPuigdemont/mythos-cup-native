import { SET_CURRENT_CUP } from '../actions';
import { ICup } from '../interfaces';

export default function(state: ICup | {} = {}, action: { type: string, cup: ICup }) {
  const { type, cup } = action;

  switch (type) {
    case SET_CURRENT_CUP:
      return cup;
    default:
      return state;
  }
}
