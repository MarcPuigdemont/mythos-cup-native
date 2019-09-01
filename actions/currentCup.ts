import { SET_CUP } from '.';
import { ICup } from '../interfaces';

export function setCurrentCup(cup: ICup) {
  return {
    type: SET_CUP,
    cup
  };
}