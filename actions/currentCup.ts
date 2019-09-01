import { SET_CURRENT_CUP } from '.';
import { ICup } from '../interfaces';

export function setCurrentCup(cup: ICup) {
  return {
    type: SET_CURRENT_CUP,
    cup
  };
}